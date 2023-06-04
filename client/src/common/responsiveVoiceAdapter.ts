import { TLanguage } from "../../../server/src/models/types";

export function AISpeak(content: string, language: TLanguage) {
  try {
    responsiveVoice.speak(content, `${language} Male`);
  } catch (e) {
    console.error("Error", e);
  }
}
