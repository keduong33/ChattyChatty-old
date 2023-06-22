import axios from "axios";
import dotenv from "dotenv";

export const sendMessageToAI = async (userInput: string, language: string) => {
  const model = "facebook/blenderbot-400M-distill";
  dotenv.config({ path: "../serverless/.env" });

  const response = await axios.post(
    `https://api-inference.huggingface.co/models/${model}`,
    userInput,
    {
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      },
    }
  );
  const result = response.data;
  return result;
};
