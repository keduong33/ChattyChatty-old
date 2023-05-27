import { ChangeEvent, useState } from "react";
import { sendUserMessage } from "../server/Dialogue/Dialogue";
export default Dialogue;

function Dialogue() {
  const [text, setText] = useState("");
  const [messageList, setMessageList] = useState<messageModal[]>([]);

  async function handleOnClick() {
    const [userMessage, aiMessage] = await sendUserMessage(text);
    setMessageList((prevMessage) => [...prevMessage, userMessage, aiMessage]);
    setText("");
  }

  return (
    <div>
      <div className="text-4xl text-red-600">Chatbot!</div>
      <div>
        <input
          className="shadow appearance-none border rounded w-max py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="prompt"
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
        ></input>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline max-w-fit max-h-fit"
          type="button"
          onClick={() => {
            handleOnClick();
          }}
        >
          Send
        </button>
      </div>
      <div>
        {messageList.map((message: messageModal, i) => (
          <div key={i}>
            <div>
              {message.sender}: {message.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
