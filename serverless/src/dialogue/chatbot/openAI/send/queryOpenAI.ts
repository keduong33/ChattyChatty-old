import axios from "axios";
import { isValidLanguage } from "../../verifyLanguage";
import {
  OPENAI_API_ENDPOINT,
  OPENAI_MODEL_NAME,
  OPENAI_MODEL_TEMPERATURE,
  OPENAI_MODEL_MAX_TOKEN,
  OPENAI_MODEL_TOP_P,
  OPENAI_MODEL_FREQUENCY_PENALTY,
  OPENAI_PRESENCE_PENALTY,
  AXIOS_OPENAI_HEADER,
} from "../config";
import {
  createOpenAISystemMessage,
  createInitialOpenAISystemMessage,
  createBotMessage,
} from "./botMessage";
import { messageModel } from "./messageModel";

export async function sendMessageToOpenAI(
  userMessage: messageModel,
  language: string
) {
  try {
    const response = await axios.post(
      OPENAI_API_ENDPOINT,
      {
        messages: [
          createOpenAISystemMessage(language),
          { role: "user", content: `${userMessage.content}` },
        ],
        model: OPENAI_MODEL_NAME,
        temperature: OPENAI_MODEL_TEMPERATURE,
        max_tokens: OPENAI_MODEL_MAX_TOKEN,
        top_p: OPENAI_MODEL_TOP_P,
        frequency_penalty: OPENAI_MODEL_FREQUENCY_PENALTY,
        presence_penalty: OPENAI_PRESENCE_PENALTY,
      },
      {
        headers: AXIOS_OPENAI_HEADER,
      }
    );
    const botMessage = createBotMessage(response);

    if (botMessage) return botMessage;
    throw Error("No reply from OpenAI API");
  } catch (e) {
    console.log(e);
  }
}

export async function sendInitialMessageToOpenAPI(language: string) {
  try {
    const response = await axios.post(
      OPENAI_API_ENDPOINT,
      {
        messages: [createInitialOpenAISystemMessage(language)],
        model: OPENAI_MODEL_NAME,
      },
      {
        headers: AXIOS_OPENAI_HEADER,
      }
    );

    const botMessage = createBotMessage(response);
    if (botMessage) return botMessage;
    throw Error("No reply from OpenAI API");
  } catch (e) {
    console.log(e);
  }
}
