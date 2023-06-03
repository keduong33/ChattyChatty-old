import axios, { AxiosResponse } from "axios";
import { messageModel } from "../models/messageModel";
import { AXIOS_OPENAI_HEADER } from "../common/config";
import {
  createInitialOpenAiSystemMessage,
  createNewMessage,
  createOpenAiSystemMessage,
} from "../common/functions";
import { TLanguage } from "../models/types";
import {
  OPENAI_API_ENDPOINT,
  OPENAI_MODEL_NAME,
  OPENAI_MODEL_MAX_TOKEN,
  OPENAI_MODEL_TEMPERATURE,
  OPENAI_MODEL_TOP_P,
  OPENAI_MODEL_FREQUENCY_PENALTY,
  OPENAI_PRESENCE_PENALTY,
} from "../api/openAIAPI";
import { getResponseContent } from "../handlers/axiosHandler";

export async function sendUserMessage(
  userMessage: messageModel,
  language: TLanguage
) {
  try {
    const response = await axios.post(
      OPENAI_API_ENDPOINT,
      {
        messages: [
          createOpenAiSystemMessage(language),
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
    const aiMessage = createAiMessage(response);
    if (aiMessage) return aiMessage;
    throw Error("No reply from OpenAI API");
  } catch (error) {
    console.error("Error: ", error);
  }
}

export async function sendInitialMessage(language: TLanguage) {
  try {
    const response = await axios.post(
      OPENAI_API_ENDPOINT,
      {
        messages: [createInitialOpenAiSystemMessage(language)],
        model: OPENAI_MODEL_NAME,
      },
      {
        headers: AXIOS_OPENAI_HEADER,
      }
    );

    const aiMessage = createAiMessage(response);
    if (aiMessage) return aiMessage;
    throw Error("No reply from OpenAI API");
  } catch (error) {
    console.error("Error:", error);
  }
}

function createAiMessage(response: AxiosResponse): messageModel | undefined {
  const reply = getResponseContent(response);
  if (reply) {
    const aiMessage: messageModel = createNewMessage("bot", reply);
    return aiMessage;
  }
  return undefined;
}
