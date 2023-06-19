import { exec, execSync } from "child_process";
import { isValidLanguage } from "../../verifyLanguage";
import path, { resolve } from "path";

export function testChatBotReply(userText: string, language: string) {
  // if (!isValidLanguage(language)) {
  //   console.error("We not supporting this language");
  //   return;
  // }
  // return `This is the bot reply to : ${userText} in ${language}`;
  // console.log(path.dirname(__dirname));
  // exec(`ls ${__dirname}`, (err, stdout, stderr) => {
  //   console.log(stdout);
  // });
  // const result = execSync(
  //   `whisper '../serverless/src/dialogue/chatbot/openAI/send/test.wav' --model tiny --language English --task transcribe --verbose False --output`
  // ).toString();
  // console.log(result);
  return "result";
}

export function testInitialMessageReply(language: string): string | undefined {
  if (!isValidLanguage(language)) {
    console.error("We not supporting this language");
    return;
  }
  return `This is initial message in ${language}`;
}
