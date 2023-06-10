import { useEffect, useState } from "react";
import { trpc } from "../providers/trpc";

export function DialoguePage() {
  const [userText, setUserText] = useState("");
  const { data: chatBotReply, mutate } =
    trpc.chatBot.submitUserText.useMutation();
  const [messageList, setMessageList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSendButtonClick() {
    setLoading(true);
    if (userText) {
      setMessageList((prevMessage) => [...prevMessage, userText]);
      mutate(userText, {
        onSuccess: () => {
          // Update the message list with the fetched data
          if (chatBotReply)
            setMessageList((prevMessage) => [...prevMessage, chatBotReply]);
        },
      });
    } else {
      console.log("You are not texting");
    }
    setLoading(false);
  }

  /* TODO: Add Language Picker (prolly a component itself) */

  return (
    <div>
      <div className="text-4xl text-red-600">Chatbot!</div>
      <div>
        <input
          className="shadow appearance-none border rounded w-max py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="prompt"
          type="text"
          value={userText}
          onChange={(event) => setUserText(event.target.value)}
        ></input>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline max-w-fit max-h-fit"
          type="button"
          onClick={handleSendButtonClick}
        >
          Send
        </button>
      </div>
      <div>
        {messageList.map((message, i) => (
          <div key={i}>
            <div>{message}</div>
          </div>
        ))}
        {loading && <div>Bot Typing...</div>}
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
  );
}
