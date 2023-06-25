import "react-dropdown/style.css";
import { SpeechToText } from "./speechToText/SpeechToText";
import { LanguagePicker } from "./languagePicker/LanguagePicker";

import { MessageList } from "./MessageList";
import { UserInputForm } from "./UserInputForm";

export function DialoguePage() {
  return (
    <div className="max-w-sm">
      <div title="Page Title" className="text-4xl text-red-600">
        Chatbot!
      </div>

      <div className="">
        <b>Disclaimer:</b> First time sending the text or recording your voice,
        the servers (HuggingFace will be a bit slow)
      </div>

      <LanguagePicker />

      <UserInputForm />

      <MessageList />

      <SpeechToText />
    </div>
  );
}
