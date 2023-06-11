import { useEffect, useState } from "react";
import { trpc } from "../providers/trpc";

export function DialoguePage() {
  const [userText, setUserText] = useState("");
  const { mutate } = trpc.chatBot.submitUserText.useMutation();
  const [messageList, setMessageList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSendButtonClick() {
    if (!userText) {
      console.log("You are not texting");
      return;
    }

    setLoading(true);
    setMessageList((prevMessage) => [...prevMessage, userText]);
    mutate(userText, {
      onSuccess: (chatBotReply) => {
        setMessageList((prevMessage) => [...prevMessage, chatBotReply]);
      },
      onError: (error) => {
        console.log(error);
      },
    });
    setLoading(false);
  }

  /* TODO: Add Language Picker (prolly a component itself) */

  return (
    <div>
      <div className="text-4xl text-red-600">Chatbot!</div>
      <div>
        <input
          className="px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none w-max focus:outline-none focus:shadow-outline"
          id="prompt"
          type="text"
          value={userText}
          onChange={(event) => setUserText(event.target.value)}
        ></input>
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline max-w-fit max-h-fit"
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
          className="px-4 py-2 mx-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline max-w-fit max-h-fit"
          type="button"
          onClick={() => {
            // handleOnClick();
          }}
        >
          Record
        </button>
        <button
          disabled
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded  hover:bg-blue-700 focus:outline-none focus:shadow-outline max-w-fit max-h-fit disabled:opacity-40"
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
