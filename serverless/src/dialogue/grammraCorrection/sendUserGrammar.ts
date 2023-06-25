import axios, { AxiosError } from "axios";
import { ApiResponse } from "../speechToText/convertSpeechToText";

export const sendUserGrammar = async (
  userInput: string,
  language: string
): Promise<ApiResponse> => {
  let model;
  switch (language.toLowerCase()) {
    case "german":
      model = "";
      break;

    default:
      model = "vennify/t5-base-grammar-correction";
      break;
  }

  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${model}`,
      userInput,
      {
        timeout: 9000,
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
      }
    );
    return {
      isSuccess: true,
      content: response.data[0]["generated_text"],
    };
  } catch (e) {
    const error = e as AxiosError;
    return {
      isSuccess: false,
      content: error.response?.statusText ?? JSON.stringify(e),
    };
  }
};
