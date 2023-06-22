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

  function sendUserInput(
    userInput: string,
    language: string,
    retryCounter = 3
  ) {
    submitText(
      { userInput: userInput, language: language },
      {
        onSuccess: (chatBotReply) => {
          if (chatBotReply) {
            setMessageList(chatBotReply.content);
            setUserInput("");
          } else console.error("There is no bot reply");
        },
        onError: async (error) => {
          if (
            error.data?.httpStatus == 500 &&
            // error.message.includes(
            //   `"errorMessage":"Task timed out after 10.00 seconds`
            // ) &&
            retryCounter > 0
          ) {
            console.error("Retry: #" + retryCounter);
            await new Promise((f) => setTimeout(f, 20000));
            sendUserInput(userInput, language, retryCounter - 1);
          } else {
            setUserInput("Try again");
          }
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
