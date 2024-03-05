import dbConnect from "@/libs/database/dbconnect";
import openAiSettings from "@/libs/database/models/openAiSettings";
import axios from "axios";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);
// async function getSementicSearch(query) {
//   var axres = await axios
//     .post("http://localhost:4090/api/SementicSearch/QuerySearch", { query })
//     .then((d) => d.data);

//   return axres?.msg == "Sementic Search Error" ? "<<REFERENCES>>" : axres?.msg;
// }
async function getSementicSearch(query) {
  try {
    var axres = await axios
      .post("http://localhost:4090/api/ScrapWebsite/querySementicSearch", {
        query,
      })
      .then((d) => d.data);
    console.log(axres.data);
    return { data: axres.data, userSpecificLink: axres.userSpecificLink };
  } catch (error) {
    return "<<REFERENCES>>";
  }
}
export default function handler(req, res) {
  (async () => {
    await dbConnect();
    var { openaiSettings } = await openAiSettings.findOne({
      type: "openaiSettings",
    });
    req.body.transcript = req.body.transcript.map((ell) => {
      delete ell.allowbuttons;
      return ell;
    });
    req.body.transcript = req.body.transcript.map((ell) => {
      var newobj = {};
      newobj.role = ell.role;
      newobj.content = ell.content;
      return newobj;
    });

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
      sementicResp += sementicdataResp.data;
      // var response = await new Promise((resolve) =>
      getresponsefromopenai(
        openaiSettings,
        req.body.transcript,
        sementicResp,
        (response) => {
          res.status(200).json({
            response: {
              role: "assistant",
              content:
                response?.data?.choices[0]?.message?.content ||
                "We Got An Technical Problem. Please Contact Us If This Problem Repeat.",
              userSpecificLink: sementicdataResp.userSpecificLink || [],
            },
          });
        }
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
    callbackforrespfromopenai
  ) =>
    (async () => {
      try {
        var response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                openaiSettings.openaiPrompt.replace(
                  "<<REFERENCES>>",
                  sementicResp
                ) || "",
            },

            ...messages.splice(-10),
          ],
          temperature: Number(openaiSettings.openaiTemperature),
          max_tokens: Number(openaiSettings.openaiMaxLength),
          top_p: Number(openaiSettings.openaiTopP),
          presence_penalty: Number(openaiSettings.openaiPresencePenalty),
          frequency_penalty: Number(openaiSettings.openaiFrequencyPenalty),
        });
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
