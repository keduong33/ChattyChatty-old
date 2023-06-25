import axios, { AxiosError } from "axios";
import { ApiResponse } from "../speechToText/convertSpeechToText";

export const sendMessageToAI = async (
  convoPayload: string,
  language: string
): Promise<ApiResponse> => {
  let model;
  switch (language.toLowerCase()) {
    case "german":
      model = "";
      break;

    default:
      model = "facebook/blenderbot-400M-distill";
      break;
  }

  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${model}`,
      convoPayload,
      {
        timeout: 9000,
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
      }
    );
    return {
      isSuccess: true,
      content: response.data["generated_text"],
    };
  } catch (e) {
    const error = e as AxiosError;
    console.error(e);
    return {
      isSuccess: false,
      content: error.response?.statusText ?? JSON.stringify(e),
    };
  }
};
