import "react-dropdown/style.css";
import { SpeechToText } from "./speechToText/SpeechToText";
import { LanguagePicker } from "./LanguagePicker";

import { MessageList } from "./MessageList";
import { UserInputForm } from "./UserInputForm";

export function DialoguePage() {
  return (
    <div>
      <div title="Page Title" className="text-4xl text-red-600">
        Chatbot!
      </div>

      <LanguagePicker />

      <UserInputForm />

      <MessageList />

      <SpeechToText />
    </div>
  );
}
