import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";

export const sendMessageToAI = async (
  convoPayload: string,
  language: string
) => {
  const model = "facebook/blenderbot-400M-distill";
  dotenv.config();
  console.log(process.env.HUGGINGFACE_API_KEY);
  // const response = await axios.post(
  //   `https://api-inference.huggingface.co/models/${model}`,
  //   convoPayload,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
  //     },
  //   }
  // );
  // console.log(response.data);
  // const result = response.data["generated_text"];
  return "test";
};
