import ReactDropdown from "react-dropdown";
import { allowedLanguages } from "../../../serverless/src/dialogue/chatbot/verifyLanguage";
import { BlueButton } from "../components/buttons";
import { useDialogueState } from "./DialogueState";

export const LanguagePicker = () => {
  const [setDisabledChat, language, setLanguage] = useDialogueState((state) => [
    state.setDisabledChat,
    state.language,
    state.setLanguage,
  ]);
  function handleSelectButtonClick() {
    if (!language) {
      console.error("Select a language");
      return;
    }

    setDisabledChat(false);
  }
  return (
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
  );
};
