import { useState } from "react";
import { trpc } from "../providers/trpc";
import ReactDropdown from "react-dropdown";
import { allowedLanguages } from "../../../serverless/src/dialogue/chatbot/verifyLanguage";
import "react-dropdown/style.css";
import { BlueButton } from "../components/buttons";

export function DialoguePage() {
  const [userText, setUserText] = useState("");
  const { mutate } = trpc.chatBot.submitUserText.useMutation();
  const [messageList, setMessageList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("");
  const [disabledChat, setDisabledChat] = useState(true);

  function handleSelectButtonClick() {
    if (!language) {
      console.error("Select a language");
      return;
    }

    setDisabledChat(false);
  }

  async function handleSendButtonClick() {
    if (!userText) {
      console.error("You are not texting");
      return;
    }

    setLoading(true);
    setMessageList((prevMessage) => [...prevMessage, userText]);
    mutate(
      { userText: userText, language: language },
      {
        onSuccess: (chatBotReply) => {
          if (chatBotReply) {
            setMessageList((prevMessage) => [...prevMessage, chatBotReply]);
            setUserText("");
          } else console.error("There is no bot reply");
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
    setLoading(false);
  }

  /* TODO: Add Language Picker (prolly a component itself) */

  return (
    <div>
      <div title="Page Title" className="text-4xl text-red-600">
        Chatbot!
      </div>
      <div title="Language Drop Down" className="flex mb-4">
        <div className="flex mr-2 items-center">Language:</div>
        <ReactDropdown
          className="w-48"
          options={allowedLanguages}
          placeholder={"Select language"}
          value={language}
          onChange={(option) => {
            setLanguage(option.value);
          }}
        />
        <div>
          <BlueButton onClick={handleSelectButtonClick}>Start</BlueButton>
        </div>
      </div>

      <div title="Prompt Form" className="mb-2">
        <input
          className="px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none w-max focus:outline-none focus:shadow-outline disabled:bg-gray-600"
          id="prompt"
          type="text"
          value={userText}
          onChange={(event) => setUserText(event.target.value)}
          disabled={disabledChat}
        ></input>
        <BlueButton onClick={handleSendButtonClick} disabled={disabledChat}>
          Send
        </BlueButton>
      </div>

      {loading && <div>Bot Typing...</div>}
      <div title="Messages List" className="mb-2">
        {messageList.map((message, i) => (
          <div key={i}>
            <div>{message}</div>
          </div>
        ))}
      </div>

      {/*TODO: Setup voice recording*/}
      <div title="Voice Record">
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
