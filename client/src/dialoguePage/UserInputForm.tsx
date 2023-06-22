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

  const { mutate: submitText } = trpc.chatBot.submitUserInput.useMutation();

  function handleSendButtonClick() {
    if (!userInput) {
      console.error("You are not texting");
      return;
    }

    setMessageList(userInput);
    sendUserInput(userInput, language);
  }

  function sendUserInput(userInput: string, language: string) {
    submitText(
      { userInput: userInput, language: language },
      {
        onSuccess: (chatBotReply) => {
          if (chatBotReply) {
            setMessageList(chatBotReply);
            setUserInput("");
          } else console.error("There is no bot reply");
        },
        onError: async (error) => {
          console.log(error);
        },
      }
    );
  }

  return (
    <div title="User Input Form" className="mb-2 flex items-center ">
      <textarea
        className="focus:shadow-outline w-96 appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none disabled:bg-gray-600"
        id="prompt"
        value={userInput}
        onChange={(event) => setUserInput(event.target.value)}
        disabled={disabledChat}
      />
      <BlueButton
        onClick={handleSendButtonClick}
        disabled={disabledChat}
        className="h-fit align-middle"
      >
        Send
      </BlueButton>
    </div>
  );
};
