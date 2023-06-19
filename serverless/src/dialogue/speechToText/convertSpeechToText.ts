import { exec, execSync } from "child_process";
import path, { dirname } from "path";
const file = "../severless/src/dialogue/chatbot/OpenAI/send/test.wav";

export function convertSpeechToText(speechFile: string, language: string) {
  const model = "tiny";
  const task = "transcribe";
  const verbose = "False";
  const outputDir = "./transcript/";

  try {
    // let result = "";
    console.log(speechFile + " in " + language);

    const result = execSync(
      `whisper '${speechFile}' --model ${model} --language ${language} --task ${task} --verbose ${verbose} --output_dir ${outputDir}`
    ).toString();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
