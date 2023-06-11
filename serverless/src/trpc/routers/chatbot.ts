import z from "zod";
import { publicProcedure, router } from "../builder";
import { testChatBot } from "../../dialogue/chatbot/openAI/chatbot";

export const chatBotRouter = router({
  submitUserText: publicProcedure
    .input(z.string())
    .mutation(({ input }) => testChatBot(input)),
});
