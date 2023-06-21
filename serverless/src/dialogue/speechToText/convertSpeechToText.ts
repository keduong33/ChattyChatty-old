import dotenv from "dotenv";
import axios, { AxiosError } from "axios";

export async function convertSpeechToText(
  speechData: string,
  language: string
) {
  const model = "openai/whisper-tiny";
  dotenv.config({ path: "../serverless/.env" });
  const data = base64ToArrayBuffer(speechData);
  const result = await sendAudioToAPI(model, data);
  return result["text"];
}

async function sendAudioToAPI(
  model: string,
  data: ArrayBuffer,
  retryCounter = 3
) {
  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${model}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    console.error(error.response);
    if (
      error.response?.status == 503 &&
      error.response?.statusText == "Service Unavailable" &&
      retryCounter > 0
    ) {
      console.log("I GOT HERE!! DEBUG ME");
      setTimeout(() => {}, 20000);
      sendAudioToAPI(model, data, retryCounter - 1);
    }
    return;
  }
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const length = binaryString.length;
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}
