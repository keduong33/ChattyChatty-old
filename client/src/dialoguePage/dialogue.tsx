import { useEffect, useState } from "react";
import { trpc } from "../providers/trpc";
import ReactDropdown from "react-dropdown";
import { allowedLanguages } from "../../../serverless/src/dialogue/chatbot/verifyLanguage";
import "react-dropdown/style.css";
import { BlueButton } from "../components/buttons";
import { VoiceRecord } from "./speechToText/VoiceRecord";

export function DialoguePage() {
  const { mutate: submitText } = trpc.chatBot.submitUserText.useMutation();
  const [userText, setUserText] = useState("");
  const [messageList, setMessageList] = useState<string[]>([]);
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

    setMessageList((prevMessage) => [...prevMessage, userText]);
    submitText(
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
  }

  /* TODO: Add Language Picker (prolly a component itself) */

  return (
    <div>
      <div title="Page Title" className="text-4xl text-red-600">
        Chatbot!
      </div>
      <div title="Language Drop Down" className="mb-4 flex">
        <div className="mr-2 flex items-center">Language:</div>
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
          className="focus:shadow-outline w-max appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none disabled:bg-gray-600"
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

      <div title="Messages List" className="mb-2">
        {messageList.map((message, i) => (
          <div key={i}>
            <div>{message}</div>
          </div>
        ))}
        {/* Maybe find a better way but rn check if there has not been a response --> messageList length is odd */}
        {messageList.length % 2 != 0 && <div>Bot Typing...</div>}
      </div>

      <VoiceRecord />
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
