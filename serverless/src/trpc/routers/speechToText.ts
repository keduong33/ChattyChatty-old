import z, { ZodArray, ZodError } from "zod";
import { publicProcedure, router } from "../builder";
import { convertSpeechToText } from "../../dialogue/speechToText/convertSpeechToText";

const isBlob = z.custom<Blob>((value) => {
  console.log(value);
  console.log(value instanceof Blob);
  return value instanceof Blob;
});

export const speechToTextRouter = router({
  submitVoiceRecording: publicProcedure
    .input(z.object({ speechData: z.any(), language: z.string() }))
    .mutation((voice) =>
      convertSpeechToText(voice.input.speechData, voice.input.language)
    ),
});
