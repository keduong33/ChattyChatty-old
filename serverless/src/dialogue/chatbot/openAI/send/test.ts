import { exec, execSync } from "child_process";
import { isValidLanguage } from "../../verifyLanguage";
import path, { resolve } from "path";

export function testChatBotReply(userText: string, language: string) {
  if (!isValidLanguage(language)) {
    console.error("We not supporting this language");
    return;
  }
  return `This is the bot reply to : ${userText} in ${language}`;
}

export function testInitialMessageReply(language: string): string | undefined {
  if (!isValidLanguage(language)) {
    console.error("We not supporting this language");
    return;
  }
  return `This is initial message in ${language}`;
}
