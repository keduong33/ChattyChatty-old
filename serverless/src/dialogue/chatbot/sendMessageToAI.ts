import axios from "axios";

export const sendMessageToAI = async (
  convoPayload: string,
  language: string
) => {
  const model = "facebook/blenderbot-400M-distill";
  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${model}`,
      convoPayload,
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
      }
    );
    const result = response.data["generated_text"];
    return result;
  } catch (e) {
    console.error(e);
  }
};
