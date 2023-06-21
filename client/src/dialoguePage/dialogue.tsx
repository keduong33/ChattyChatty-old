import "react-dropdown/style.css";
import { VoiceRecord } from "./speechToText/VoiceRecord";
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
