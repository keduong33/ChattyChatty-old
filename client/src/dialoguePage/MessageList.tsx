import { BlueButton } from "../components/buttons";
import { trpc } from "../providers/trpc";
import { useDialogueState } from "./DialogueState";

export const MessageList = () => {
  const [messageList, userInput, language] = useDialogueState((state) => [
    state.messageList,
    state.userInput,
    state.language,
  ]);
  const { mutateAsync: sendUserGrammar } =
    trpc.grammarCorrection.submitUserGrammar.useMutation();

  const handleGrammarCorrection = async () => {
    const formattedInput = checkPunctuation(userInput);
    const correctedGrammar = await sendUserInput(formattedInput, language);
    console.log(correctedGrammar);
  };

  async function sendUserInput(
    userInput: string,
    language: string,
    retryCounter = 3
  ): Promise<string> {
    let correctedText = "";
    await sendUserGrammar(
      { userInput: userInput, language: language },
      {
        onSuccess: async (response) => {
          if (response.status == 200) {
            correctedText = response.content;
            if (!correctedText) {
              console.error("No correction");
            }
          } else if (response.status == 500 && retryCounter > 0) {
            console.error("Retry: #" + Math.abs(retryCounter - 3));
            sendUserInput(userInput, language, retryCounter - 1);
          }
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
    return correctedText;
  }

  return (
    <div title="Messages List" className="mb-2">
      {messageList.map((message, i) => (
        <div key={i}>
          <div>
            {i % 2 != 0 && i != 0 && "Bot: "}
            {i % 2 == 0 && "Human: "}
            {message}
          </div>
        </div>
      ))}
      {/* Maybe find a better way but rn check if there has not been a response --> messageList length is odd */}
      {messageList.length % 2 != 0 && <div>Bot Typing...</div>}

      <BlueButton onClick={handleGrammarCorrection}>Check Grammar</BlueButton>
    </div>
  );
};

const checkPunctuation = (userInput: string) => {
  let formattedInput = userInput;
  const lastCharacter = userInput.charAt(userInput.length - 1);
  if (
    (lastCharacter >= "a" && lastCharacter <= "z") ||
    (lastCharacter >= "A" && lastCharacter <= "Z")
  ) {
    formattedInput = formattedInput + ".";
  }
  return formattedInput;
};
