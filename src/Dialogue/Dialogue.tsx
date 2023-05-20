import { ChangeEvent, useState } from "react";
import ApiConfigure from "./commons/ApiConfigure";

function Dialogue() {
  const [prompt, setPrompt] = useState("");
  const [messageList, setMessageList] = useState<Message[]>([]);

  function updatePrompt(event: ChangeEvent<HTMLInputElement>) {
    setPrompt(event.target.value);
  }

  async function sendUserMessage(text: string) {
    const newMessage: Message = {
      sender: "user",
      text: text,
    };
    setMessageList((prevMessage) => [...prevMessage, newMessage]);

    const openai = ApiConfigure();

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a sarcastic person. Answer everything sarcastically",
        },
        {
          role: "user",
          content: `${text}`,
        },
      ],
      temperature: 0.9,
      max_tokens: 50,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
    });

    console.log(response.data.choices[0].message);
  }

  return (
    <div>
      <div className="text-4xl text-red-600">Chatbot!</div>
      <div>
        <input
          className="shadow appearance-none border rounded w-max py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="prompt"
          type="text"
          value={prompt}
          onChange={updatePrompt}
        ></input>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline max-w-fit max-h-fit"
          type="button"
          onClick={() => sendUserMessage(prompt)}
        >
          Send
        </button>
      </div>
      <div>
        {messageList.map((message: Message) => (
          <div key={message.sender}>
            <div>
              {message.sender}: {message.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dialogue;
