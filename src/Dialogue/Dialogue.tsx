import { ChangeEvent, useState } from "react";
import ApiConfigure from "./commons/ApiConfigure";

function Dialogue() {
  const [prompt, setPrompt] = useState("");
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [history, setHistory] = useState("");

  function updatePrompt(event: ChangeEvent<HTMLInputElement>) {
    setPrompt(event.target.value);
  }

  async function sendUserMessage(text: string) {
    const newMessage: Message = {
      id: messageList.length,
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
            "You are my German language teacher. I only speak English and am practicing my German. You are gonna ask me what sentence that I want to translate and then translate that sentence into German.",
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

    const apiResponse = response.data.choices[0].message?.content || "";
    const botMessage: Message = {
      id: messageList.length,
      sender: "bot",
      text: apiResponse,
    };
    setMessageList((prevMessage) => [...prevMessage, botMessage]);
    // setHistory(history + "," + text); //history concat --> not sure proper way yet

    // console.log(messageList[messageList.length - 1]?.text);
    console.log(response.data.usage);
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
          onClick={() => {
            sendUserMessage(prompt);
            setPrompt("");
          }}
        >
          Send
        </button>
      </div>
      <div>
        {messageList.map((message: Message, i) => (
          <div key={i}>
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
