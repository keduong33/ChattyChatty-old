import { exec, execSync } from "child_process";
// const file = "../severless/src/dialogue/chatbot/OpenAI/send/test.wav";
import dotenv from "dotenv";
import fs from "fs";
import axios from "axios";

export async function convertSpeechToText(
  speechData: string,
  language: string
) {
  const model = "openai/whisper-tiny";
  dotenv.config({ path: "../serverless/.env" });
  const data = base64ToArrayBuffer(speechData);
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/openai/whisper-tiny",
      data,
      {
        headers: {
          Authorization: `Bearer ${process.env.AUDIO_API_KEY}`,
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
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
