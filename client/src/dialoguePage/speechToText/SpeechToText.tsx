import { useState } from "react";
import { BlueButton } from "../../components/buttons";
import { trpc } from "../../providers/trpc";
import { AudioRecorder } from "./AudioRecorder";
import { useDialogueState } from "../DialogueState";

const audioRecorder = new AudioRecorder();

export const SpeechToText = () => {
  const [setUserInput, disabledChat, language] = useDialogueState((state) => [
    state.setUserInput,
    state.disabledChat,
    state.language,
  ]);

  const { mutate: submitVoiceRecording } =
    trpc.speechToText.submitVoiceRecording.useMutation();
  const [disabledStopButton, setDisabledStopButton] = useState(true);

  function handleStartRecordingButtonClick() {
    setDisabledStopButton(false);
    audioRecorder.startRecording();
  }

  async function handleStopRecordingButtonClick() {
    setDisabledStopButton(true);
    audioRecorder.stopRecording();

    await new Promise((f) => setTimeout(f, 1000));
    const speech = await audioRecorder.getSpeech();
    if (speech) {
      submitVoice(speech, language);
    } else {
      console.error("No speech found");
    }
  }

  function submitVoice(speech: string, language: string, retryCounter = 3) {
    submitVoiceRecording(
      { speechData: speech, language: language },
      {
        onSuccess: async (response) => {
          if (response.isSuccess) {
            const userVoice = response.content;
            if (userVoice) {
              setUserInput(response.content);
            } else {
              console.error(`Cannot transcribe user's voice`);
            }
          } else if (!response.isSuccess && retryCounter > 0) {
            console.error("Retry: #" + Math.abs(retryCounter - 3));
            await new Promise((f) => setTimeout(f, 5000));
            submitVoice(speech, language, retryCounter - 1);
          }
        },
        onError: async (error) => {
          console.error(error);
        },
      }
    );
  }

  return (
    <div title="Voice Record">
      <BlueButton
        onClick={handleStartRecordingButtonClick}
        disabled={disabledChat}
      >
        Record
      </BlueButton>
      <BlueButton
        disabled={disabledStopButton}
        onClick={handleStopRecordingButtonClick}
      >
        Stop
      </BlueButton>
    </div>
  );
};
