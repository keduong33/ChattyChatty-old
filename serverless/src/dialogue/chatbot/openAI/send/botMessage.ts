import { AxiosResponse } from "axios";
import { messageModel } from "./messageModel";

export function createBotMessage(
  response: AxiosResponse
): messageModel | undefined {
  const reply = getResponseContent(response);
  if (reply) {
    const botMessage: messageModel = createNewMessage("bot", reply);
    return botMessage;
  }
  return undefined;
}

export function createOpenAISystemMessage(language: string) {
  return {
    role: "system",
    content: `You are my ${language} language teacher. I only speak English and I am practicing my ${language}. Translate my sentence into ${language}.`,
  };
}

export function createInitialOpenAISystemMessage(language: string) {
  return {
    role: "system",
    content: `(friendly) Translate I'm Chatty Chatty. Ask me any question into ${language}`,
  };
}

function getResponseContent(response: AxiosResponse): string {
  return response.data.choices[0].text;
}

function createNewMessage(
  sender: "user" | "bot",
  content: string
): messageModel {
  return {
    sender: sender,
    content: content,
  };
}
