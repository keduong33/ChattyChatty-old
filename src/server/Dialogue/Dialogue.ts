import apiConfigure from "../api/apiConfigure";
import { messageModal } from "../modals/messageModal";

export async function sendUserMessage(
  userMessage: messageModal,
  language: string
) {
  try {
    const openai = apiConfigure();
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are my ${language} language teacher. I only speak English and am practicing my ${language}. You are gonna translate my sentence into ${language}.`,
        },
        {
          role: "user",
          content: `${userMessage.content}`,
        },
      ],
      temperature: 0.9,
      max_tokens: 50,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
    });

    const apiResponse = response.data.choices[0].message?.content || "";
    const aiMessage: messageModal = {
      sender: "bot",
      content: apiResponse,
    };

    // console.log(response.data.usage);
    return aiMessage;
  } catch (e) {
    console.log(e);
  }
}

export async function sendInitialMessage(language: string) {
  const openai = apiConfigure();
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Translate into ${language} and make it casual: I'm Chatty Chatty. Ask me any question`,
        },
      ],
      temperature: 0.9,
      max_tokens: 50,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
    });

    const apiResponse = response.data.choices[0].message?.content || "";
    const aiMessage: messageModal = {
      sender: "bot",
      content: apiResponse,
    };

    return aiMessage;
  } catch (e) {
    console.log(e);
  }
}
