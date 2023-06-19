import z from "zod";
import { publicProcedure, router } from "../builder";
import { convertSpeechToText } from "../../dialogue/speechToText/convertSpeechToText";

export const speechToTextRouter = router({
  submitVoiceRecording: publicProcedure
    .input(z.object({ speechFile: z.string(), language: z.string() }))
    .mutation((voice) =>
      convertSpeechToText(voice.input.speechFile, voice.input.language)
    ),
});
