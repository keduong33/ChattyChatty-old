import { useState } from "react";
import { BlueButton } from "../components/buttons";
import { trpc } from "../providers/trpc";
import { useDialogueState } from "./DialogueState";

export const MessageList = ({
  setToastOn,
}: {
  setToastOn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [grammarFix, setGrammarFix] = useState("");
  const [messageList, language, userMessageList] = useDialogueState((state) => [
    state.messageList,
    state.language,
    state.userMessageList,
  ]);
  const { mutateAsync: sendUserGrammar } =
    trpc.grammarCorrection.submitUserGrammar.useMutation();

  const handleGrammarCorrection = async () => {
    const formattedInput = checkPunctuation(
      userMessageList[userMessageList.length - 1]
    );
    const correctedGrammar = await sendUserInput(formattedInput, language);
    setGrammarFix(correctedGrammar);
  };

  async function sendUserInput(
    userInput: string,
    language: string,
    retryCounter = -1
  ): Promise<string> {
    let correctedText = "";
    console.log(retryCounter);
    await sendUserGrammar(
      { userInput: userInput, language: language },
      {
        onSuccess: async (response) => {
          if (response.isSuccess) {
            correctedText = response.content;
            if (!correctedText) {
              console.error("No correction found");
            }
          } else if (!response.isSuccess && retryCounter > 0) {
            await new Promise((f) => setTimeout(f, 5000));
            console.error("Retry: #" + Math.abs(retryCounter - 5));
            sendUserInput(userInput, language, retryCounter - 1);
          } else {
            console.log("Set toast");
            setToastOn(true);
            setTimeout(() => {
              setToastOn(false);
            }, 5000);
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
    <div
      title="Messages List"
      className="mb-2 flex w-[300px] flex-col sm:w-[700px]"
    >
      <div className="mb-4">
        {messageList.map((message, i) => (
          <div key={i}>
            <div>
              {i % 2 != 0 && "Bot: "}
              {i % 2 == 0 && "Human: "}
              {message}
            </div>
          </div>
        ))}
        {/* Maybe find a better way but rn check if there has not been a response --> messageList length is odd */}
        {messageList.length % 2 != 0 && <div>Bot Typing...</div>}
      </div>

      <div className="mx-auto">
        {grammarFix && (
          <p>
            {userMessageList[userMessageList.length - 1]} &#10140; {grammarFix}{" "}
          </p>
        )}
        <BlueButton
          onClick={handleGrammarCorrection}
          disabled={userMessageList.length == 0}
        >
          Check Grammar of the last sent message
        </BlueButton>
      </div>
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
