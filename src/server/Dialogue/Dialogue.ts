import ApiConfigure from "../commons/ApiConfigure";

export async function sendUserMessage(text: string) {
  const userMessage: messageModal = {
    sender: "user",
    content: text,
  };
  const openai = ApiConfigure();

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are my German language teacher. I only speak English and am practicing my German. You are gonna ask me what sentence that I want to translate and then translate that sentence into German.",
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

  console.log(response.data.usage);
  return [userMessage, aiMessage];
}
