import { router } from "./builder";
import { chatBotRouter } from "./routers/chatbot";
import { speechToTextRouter } from "./routers/speechToText";

export const appRouter = router({
  chatBot: chatBotRouter,
  speechToText: speechToTextRouter,
});

export type AppRouter = typeof appRouter;
