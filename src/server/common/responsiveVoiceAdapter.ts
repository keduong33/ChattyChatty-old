import { TLanguage } from "../models/types";

export function speak(content: string, language: TLanguage) {
  responsiveVoice.speak(content, `${language} Male`);
}
