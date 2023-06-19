import { router } from "./builder";
import { chatBotRouter } from "./routers/chatbot";
import { speechToTextRouter } from "./routers/speechToText";
import { userRouter } from "./routers/user";

export const appRouter = router({
  user: userRouter,
  chatBot: chatBotRouter,
  speechToText: speechToTextRouter,
});

export type AppRouter = typeof appRouter;
