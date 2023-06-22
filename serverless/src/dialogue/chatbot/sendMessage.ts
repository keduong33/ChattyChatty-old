import {
  sendInitialMessageToOpenAPI,
  sendMessageToOpenAI,
} from "./openAI/send/queryOpenAI";
import { isValidLanguage } from "./verifyLanguage";
import { messageModel } from "./openAI/send/messageModel";
import { createBotMessage } from "./openAI/send/botMessage";
import { sendMessageToAI } from "./sendMessageToAI";

export async function sendUserInput(convoPayload: string, language: string) {
  if (!isValidLanguage(language)) {
    console.error("We not supporting this language");
    return;
  }
  try {
    const botMessage = await sendMessageToAI(convoPayload, language);
    if (botMessage) return botMessage;
    throw Error("Chatbot encountering problems");
  } catch (error) {
    console.error(error);
  }
}

export async function sendInitialMessage(language: string) {
  if (!isValidLanguage(language)) {
    console.error("We not supporting this language");
    return;
  }
  try {
    const botMessage = await sendInitialMessageToOpenAPI(language);
    if (botMessage) return botMessage;
    throw Error("Chatbot encountering problems");
  } catch (error) {
    console.error(error);
  }
}
