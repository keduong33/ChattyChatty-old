import "react-dropdown/style.css";
import { SpeechToText } from "./speechToText/SpeechToText";
import { LanguagePicker } from "./languagePicker/LanguagePicker";

import { MessageList } from "./MessageList";
import { UserInputForm } from "./UserInputForm";
import { useState } from "react";
import { Toast } from "../components/toast";

export function DialoguePage() {
  const [toastOn, setToastOn] = useState(false);
  return (
    <div className="flex w-full flex-col">
      <div className="flex h-16 w-full justify-end">
        {toastOn && <Toast setToastOn={setToastOn} />}
      </div>
      <div className="m-auto flex w-[300px] flex-col items-center sm:w-[700px]">
        <div title="Page Title" className="flex text-4xl text-red-600">
          Chatbot!
        </div>

        <div className="mb-10 w-[270px] sm:w-fit">
          <b>Notes:</b>
          <ul className="list-disc">
            <li>
              First time sending the text, recording your voice or checking
              grammars, the HuggingFace servers will be slow. It will request
              the retry of action if necessary!
            </li>
            <br />
            <li>
              This app is just a proof of concept/MVP for our language partner
              chatbot so not much UI design and only supports English
            </li>

            <br />
            <li>
              The conversational and grammar checking models are quite basic so
              they could be repetitive or not perform well.
            </li>
            <br />
            <li>
              If you wanna learn more about this idea, check out my friend's
              blog:
              <a
                href="https://jason-siu-portfolio.vercel.app/article/chattychatty"
                className="ml-1 text-blue-600 underline hover:text-blue-800"
              >
                Link
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center border-[4px] p-1 sm:p-8">
          <LanguagePicker />

          <UserInputForm setToastOn={setToastOn} />

          <MessageList setToastOn={setToastOn} />

          <SpeechToText setToastOn={setToastOn} />
        </div>
      </div>
    </div>
  );
}
