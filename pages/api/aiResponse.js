import dbConnect from "@/libs/database/dbconnect";
import openAiSettings from "@/libs/database/models/openAiSettings";
import axios from "axios";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});

const openai = new OpenAIApi(configuration);
// async function getSementicSearch(query) {
//   var axres = await axios
//     .post("http://localhost:4090/api/SementicSearch/QuerySearch", { query })
//     .then((d) => d.data);

//   return axres?.msg == "Sementic Search Error" ? "<<REFERENCES>>" : axres?.msg;
// }
async function getSementicSearch(query) {
  // if(typeof query == )
  // console.log({ query, j: "kk" });

  if (query.length <= 0 || typeof query[0].text == undefined) return "";

  query = query[0].text;

  try {
    var axres = await axios
      .post(
        `${
          process.env.ADMIN_URI || "http://localhost:4090"
        }/api/ScrapWebsite/querySementicSearch`,
        {
          query,
        }
      )
      .then((d) => d.data);

    // console.log({ axres });

    return { data: axres.data, userSpecificLink: axres.userSpecificLink };
  } catch (error) {
    return "<<REFERENCES>>";
  }
}

let ts = 0;

async function logTimeTaken(t, reson) {
  if (ts == 0) {
    ts = t;
  }
  let ct = (new Date().getTime() - ts) / 1000;
  ts = new Date().getTime();
  console.log(`Time Taken: ${ct} seconds (${reson})`);
}
export default function handler(req, res) {
  ts = new Date().getTime();

  logTimeTaken(ts, "Inital");

  (async () => {
    await dbConnect();
    logTimeTaken(ts, "DConn");

    var { openaiSettings } = await openAiSettings.findOne({
      type: "openaiSettings",
    });
    req.body.transcript = req.body.transcript.map((ell) => {
      delete ell.allowbuttons;
      return ell;
    });
    logTimeTaken(ts, "OA Setting");
    // console.log(req.body);

    req.body.transcript = req.body.transcript.map((ell) => {
      var camShot =
        ell.camShot &&
        ell.camShot.trim().length > 200 &&
        ell.camShot.includes("data:image/jpeg;base64")
          ? [
              {
                type: "image_url",
                image_url: {
                  url: ell.camShot,
                },
              },
            ]
          : [];
      var newobj = {};

      newobj.role = ell.role;
      newobj.content = [{ type: "text", text: ell.content }, ...camShot];
      newobj.emotion =
        ell.emotion && ell.emotion.length > 5
          ? ell.emotion
          : "Camera Not On. Please Turn it On";
      return newobj;
    });
    // console.log(req.body.content);

    // console.log("------------------");

    var sementicQuery = req.body.transcript.at(-1).content;
    // .splice(-5)
    // .reverse()
    // .filter((el) => el.role == "user")
    // .map((el) => el.content)
    // .join("\n");
    try {
      var sementicResp = "";
      // sementicResp = await getSementicSearch(sementicQuery);
      var sementicdataResp = await getSementicSearch(sementicQuery);

      console.log({ sementicdataResp });

      logTimeTaken(ts, "Gen Smeatic Resp");

      sementicResp += sementicdataResp.data;

      req.body.transcript[
        req.body.transcript.length - 1
      ].content[0].text = `<<<<< Users Emotion Detection Result From Camera >>>>\n  ${req.body.transcript[
        req.body.transcript.length - 1
      ].emotion
        .replace("Emotion Stats", "")
        .replace(/%/g, "% ")}   
      <<<<< Users Emotion Detection Result From Camera>>>>\n    ${
        req.body.transcript[req.body.transcript.length - 1].content[0].text
      }`;

      // delete req.body.transcript[req.body.transcript.length - 1].emotion;

      console.log(req.body.transcript[req.body.transcript.length - 1]);

      // var response = await new Promise((resolve) =>
      getresponsefromopenai(
        openaiSettings,
        req.body.transcript,
        sementicResp,
        (response) => {
          console.dir({ response }, { depth: null });

          logTimeTaken(ts, "gen Open Ai resp");
          ts = 0;
          res.status(200).json({
            response: {
              role: "assistant",
              content:
                response?.data?.choices[0]?.message?.content ||
                "We Got An Technical Problem. Please Contact Us If This Problem Repeat.",
              userSpecificLink: sementicdataResp.userSpecificLink || [],
            },
          });
        },
        req.body.image
      );

      // );
      // var response = await getresponsefromopenai(
      //   openaiSettings,
      //   req.body.transcript,
      //   sementicResp
      // );
      // res.status(200).json({
      //   response: {
      //     role: "assistant",
      //     content:
      //       response?.data?.choices[0]?.message?.content ||
      //       "We Got An Technical Problem. Please Contact Us If This Problem Repeat.",
      //   },
      // });
    } catch (err) {
      console.log(err?.response?.data || err);
      res.status(200).json({
        response: {
          role: "assistant",
          content: `We Got An Technical Problem. Please Contact Us If This Problem Repeat.`,
        },
      });
    }
  })();
  var opneaiRetries = {
    currentReties: 0,
    TotalRetries: 20,
  };
  var getresponsefromopenai = async (
    openaiSettings,
    messages,
    sementicResp,
    callbackforrespfromopenai,
    image
  ) =>
    (async () => {
      // console.log({
      //   text:
      //     openaiSettings.openaiPrompt.replace("<<REFERENCES>>", sementicResp) ||
      //     "",
      // });

      try {
        var response = await openai.createChatCompletion({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: [
                ...(image && typeof image == "string"
                  ? [
                      {
                        type: "image_url",
                        image_url: {
                          url: image,
                        },
                      },
                    ]
                  : []),
                {
                  type: "text",
                  text:
                    openaiSettings.openaiPrompt.replace(
                      "<<REFERENCES>>",
                      sementicResp
                    ) || "",
                },
              ],
            },

            ...messages.splice(-10),
          ],
          temperature: Number(openaiSettings.openaiTemperature),
          max_tokens: Number(openaiSettings.openaiMaxLength),
          top_p: Number(openaiSettings.openaiTopP),
          presence_penalty: Number(openaiSettings.openaiPresencePenalty),
          frequency_penalty: Number(openaiSettings.openaiFrequencyPenalty),
        });

        // console.log(response.data.choices);

        callbackforrespfromopenai(response);
      } catch (error) {
        console.log(error?.response?.data || error);
        if (opneaiRetries.TotalRetries <= opneaiRetries.currentReties) {
          callbackforrespfromopenai(response);
        } else {
          getresponsefromopenai(
            openaiSettings,
            messages,
            sementicResp,
            callbackforrespfromopenai
          );
          opneaiRetries.currentReties++;
        }
      }
    })();
  // res.status(200).json({ name: "John Doe" });
}
