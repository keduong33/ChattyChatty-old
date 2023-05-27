import { useState } from "react";
import {
  sendInitialMessage,
  sendUserMessage,
} from "../server/dialogue/Dialogue";
import { messageModal } from "../server/modals/messageModal";
import React from "react";

export function Dialogue() {
  const [text, setText] = useState("");
  const [messageList, setMessageList] = useState<messageModal[]>([]);
  const [loading, setLoading] = useState(true);
  const language = "Vietnamese";

  async function handleOnClick() {
    setLoading(true);
    const userMessage: messageModal = {
      sender: "user",
      content: text,
    };
    setMessageList((prevMessage) => [...prevMessage, userMessage]);
    const aiMessage = await sendUserMessage(userMessage, language);
    if (aiMessage) setMessageList((prevMessage) => [...prevMessage, aiMessage]);
    else console.log("Something wrong backend");
    setText("");
    setLoading(false);
  }

  /* TODO: Uncomment this for a complete app */
  window.onload = async () => {
    setLoading(true);
    const aiMessage = await sendInitialMessage(language);
    if (aiMessage) setMessageList([aiMessage]);
    else console.log("Bad");
    setLoading(false);
  };

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
        {loading && <div>Bot Typing...</div>}
      </div>
    </div>
  );
}
