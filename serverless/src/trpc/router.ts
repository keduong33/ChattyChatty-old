import { router } from "./builder";
import { chatBotRouter } from "./routers/chatbot";
import { userRouter } from "./routers/user";

export const appRouter = router({
  user: userRouter,
  chatBot: chatBotRouter,
});

export type AppRouter = typeof appRouter;
