import axios from "axios";
import apiConfigure from "../api/apiConfigure";
import { messageModel } from "../models/messageModel";
const apiEndpoint = "https://api.openai.com/v1/chat/completions";
export async function sendUserMessage(
  userMessage: messageModel,
  language: string
) {
  try {
    const response = await axios.post(
      apiEndpoint,
      {
        messages: [
          {
            role: "system",
            content: `You are my ${language} language teacher. I only speak English and am practicing my ${language}. Translate my sentence into ${language}.`,
          },
          { role: "user", content: `${userMessage.content}` },
        ],
        model: "gpt-3.5-turbo",
        temperature: 0.9,
        max_tokens: 50,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    const aiMessage: messageModel = {
      sender: "bot",
      content: reply,
    };
    return aiMessage;
  } catch (error) {
    console.error("Error: ", error);
  }
}

export async function sendInitialMessage(language: string) {
  try {
    const response = await axios.post(
      apiEndpoint,
      {
        messages: [
          {
            role: "system",
            content: `(friendly) Translate I'm Chatty Chatty. Ask me any question into ${language}`,
          },
        ],
        model: "gpt-3.5-turbo",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    const aiMessage: messageModel = {
      sender: "bot",
      content: reply,
    };
    return aiMessage;
  } catch (error) {
    console.error("Error:", error);
  }
}
