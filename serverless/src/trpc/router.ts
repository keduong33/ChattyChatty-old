import { router } from "./builder";
import { chatBotRouter } from "./routers/chatbot";
import { grammarCorrectionRouter } from "./routers/grammarCorrection";
import { speechToTextRouter } from "./routers/speechToText";

export const appRouter = router({
  chatBot: chatBotRouter,
  speechToText: speechToTextRouter,
  grammarCorrection: grammarCorrectionRouter,
});

export type AppRouter = typeof appRouter;
