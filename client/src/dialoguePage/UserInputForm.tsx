import { BlueButton } from "../components/buttons";
import { trpc } from "../providers/trpc";
import { useDialogueState } from "./DialogueState";

export const UserInputForm = () => {
  const [userInput, setUserInput, disabledChat, language, setMessageList] =
    useDialogueState((state) => [
      state.userInput,
      state.setUserInput,
      state.disabledChat,
      state.language,
      state.setMessageList,
    ]);

  const { mutate: submitText } = trpc.chatBot.submitUserText.useMutation();

  async function handleSendButtonClick() {
    if (!userInput) {
      console.error("You are not texting");
      return;
    }

    setMessageList(userInput);
    submitText(
      { userText: userInput, language: language },
      {
        onSuccess: (chatBotReply) => {
          if (chatBotReply) {
            setMessageList(chatBotReply);
            setUserInput("");
          } else console.error("There is no bot reply");
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  }

  return (
    <div title="User Input Form" className="mb-2">
      <input
        className="focus:shadow-outline w-max appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none disabled:bg-gray-600"
        id="prompt"
        type="text"
        value={userInput}
        onChange={(event) => setUserInput(event.target.value)}
        disabled={disabledChat}
      ></input>
      <BlueButton onClick={handleSendButtonClick} disabled={disabledChat}>
        Send
      </BlueButton>
    </div>
  );
};
