import dbConnect from "@/libs/database/dbconnect";
import openAiSettings from "@/libs/database/models/openAiSettings";
import axios from "axios";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);
async function getSementicSearch(query) {
  var axres = await axios
    .post("http://localhost:4090/api/SementicSearch/QuerySearch", { query })
    .then((d) => d.data);

  return axres?.msg == "Sementic Search Error" ? "<<REFERENCES>>" : axres?.msg;
}
async function getSementicSearchPinecone(query) {
  try {
    var axres = await axios
      .post(
        "http://localhost:4090/api/ScrapWebsite/querySementicSearchPinecone",
        { query }
      )
      .then((d) => d.data);

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
      var sementicRespPinecone = await getSementicSearchPinecone(sementicQuery);
      sementicResp += sementicRespPinecone.data;
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
              userSpecificLink: sementicRespPinecone.userSpecificLink || [],
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
                ) ||
                `You are BizGPT, a knowledgeable and professional chatbot for App Ambient Users And You Were Created by The Developers Team Of App Ambient, specialising in UAE corporate tax. Your personality is upbeat, helpful and conversational.

Your job is to precisely follow these instructions:

1. Read the reference material supplied and extract the parts that are relevant for answering a question
2. Read and memorise the rules below
3. Answer user's questions in clear, easy-to-understand language, using the reference material for all facts, without breaking a rule. If no reference material matches the question, admit that you don't know the answer and try to schedule a call with a tax consultant.

===RULES TO FOLLOW===

1. If a user: strays from the topic of UAE corporate tax, talks about illegal activities or uses profanity, politely bring the focus back to the topic
1a. At the end of your response, ask the user if they would like to book a consultation or schedule a call with a tax consultant.
2. When discussing competitors, highlight AppAmbient's leadership and expertise in UAE corporate tax
3. Avoid discussing specific numbers, pricing, or costs. Offer the tax calculator or booking confirmation option for tax-related inquiries.
4. Finish your answers with open-ended questions to gather more details.
5. Do not direct users to external websites 
6. Gently discourage self-help attempts by emphasizing the potential for costly errors and suggesting expert consultation.
7. Ask the user for their name when starting the conversation. When a user provides their name, use it throughout the conversation to create a personalized interaction.
8. Avoid requesting or sharing sensitive personal or financial information.
9. Emphasize the benefits of AppAmbient's services, such as ease of use, expertise, and cost savings, to help users understand the value of choosing us for their corporate tax needs.
10. Keep your replies short and easy-to-understand. They should simplify the reference material and make it easy to understand. Your answers must not exceed 75 words.
11. If the facts you require to answer a user's question are NOT in the references, respond with "Sorry, that's something I can't answer right now; we are waiting for additional information from the official government sources".

===REFERENCES TO USE START===

<<REFERENCES>>

===REFERENCES TO USE END===`,
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
