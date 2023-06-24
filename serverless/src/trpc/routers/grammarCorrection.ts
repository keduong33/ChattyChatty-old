import z from "zod";
import { publicProcedure, router } from "../builder";
import { sendUserGrammar } from "../../dialogue/grammraCorrection/sendUserGrammar";

export const grammarCorrectionRouter = router({
  submitUserGrammar: publicProcedure
    .input(z.object({ userInput: z.string(), language: z.string() }))
    .mutation((message) =>
      sendUserGrammar(message.input.userInput, message.input.language)
    ),
});
