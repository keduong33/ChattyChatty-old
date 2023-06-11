import { messageModel } from "../models/messageModel";
import { TLanguage } from "../models/types";

export function createNewMessage(
  sender: "user" | "bot",
  content: string
): messageModel {
  return {
    sender: sender,
    content: content,
  };
}

export function createOpenAISystemMessage(language: TLanguage) {
  return {
    role: "system",
    content: `You are my ${language} language teacher. I only speak English and I am practicing my ${language}. Translate my sentence into ${language}.`,
  };
}

export function createInitialOpenAISystemMessage(language: TLanguage) {
  return {
    role: "system",
    content: `(friendly) Translate I'm Chatty Chatty. Ask me any question into ${language}`,
  };
}
