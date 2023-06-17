import {
  sendInitialMessageToOpenAPI,
  sendMessageToOpenAI,
} from "./openAI/send/queryOpenAI";
import { isValidLanguage } from "./verifyLanguage";
import { messageModel } from "./openAI/send/messageModel";
import { createBotMessage } from "./openAI/send/botMessage";

export async function sendUserMessage(
  userMessage: messageModel,
  language: string
) {
  if (!isValidLanguage(language)) {
    console.error("We not supporting this language");
    return;
  }
  try {
    const botMessage = await sendMessageToOpenAI(userMessage, language);
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
