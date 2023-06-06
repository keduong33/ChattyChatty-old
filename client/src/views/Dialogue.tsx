import { useState } from "react";
// import {
//   sendInitialMessage,
//   sendUserMessage,
// } from "../../../server/src/dialogue/Dialogue";
// import { messageModel } from "../../../server/src/models/messageModel";
// import React from "react";
// import { AISpeak } from "../../../src/server/src/common/responsiveVoiceAdapter";
// import { TLanguage } from "../../../server/src/models/types";
// import { createNewMessage } from "../../../src/server/src/common/functions";

export function DialoguePage() {
  const [text, setText] = useState("");
  // const [messageList, setMessageList] = useState<messageModel[]>([]);
  // const [loading, setLoading] = useState(true);
  // const language: TLanguage = "Deutsch";

  // async function handleSendButtonClick() {
  //   setLoading(true);

  //   const userMessage: messageModel = createNewMessage("user", text);
  //   setMessageList((prevMessage) => [...prevMessage, userMessage]);
  //   const aiMessage = await sendUserMessage(userMessage, language);

  //   if (aiMessage) {
  //     AISpeak(aiMessage.content, language);
  //     setMessageList((prevMessage) => [...prevMessage, aiMessage]);
  //   } else console.log("Something wrong backend");

  //   setText("");
  //   setLoading(false);
  // }

  /* TODO: Uncomment this for a complete app */
  /* TODO: Add AISpeak to the initial Message */
  // window.onload = async () => {
  //   setLoading(true);
  //   const aiMessage = await sendInitialMessage(language);
  //   if (aiMessage) {
  //     speak(aiMessage.content, language);
  //     setMessageList([aiMessage]);
  //   } else console.log("Uh oh something bad");
  //   setLoading(false);
  // };

  /* TODO: Add Language Picker (prolly a component itself) */

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
            // handleSendButtonClick();
          }}
        >
          Send
        </button>
      </div>
      <div>
        {/* {messageList.map((message: messageModel, i) => (
          <div key={i}>
            <div>
              {message.sender}: {message.content}
            </div>
          </div>
        ))} */}
        {/* {loading && <div>Bot Typing...</div>} */}
      </div>
      {/*TODO: Setup voice recording*/}
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded focus:outline-none focus:shadow-outline max-w-fit max-h-fit"
          type="button"
          onClick={() => {
            // handleOnClick();
          }}
        >
          Record
        </button>
        <button
          disabled
          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline max-w-fit max-h-fit disabled:opacity-40"
          type="button"
          onClick={() => {
            // handleOnClick();
          }}
        >
          Stop
        </button>
      </div>
    </div>
  );
}
