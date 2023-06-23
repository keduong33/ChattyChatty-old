import axios, { AxiosError } from "axios";
import { ApiResponse } from "../speechToText/convertSpeechToText";

export const sendMessageToAI = async (
  convoPayload: string,
  language: string
): Promise<ApiResponse> => {
  const model = "facebook/blenderbot-400M-distill";
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
      status: response.status,
      content: response.data["generated_text"],
    };
  } catch (e) {
    const error = e as AxiosError;
    return {
      status: error.response?.status ?? 500,
      content: error.response?.statusText ?? "",
    };
  }
};
