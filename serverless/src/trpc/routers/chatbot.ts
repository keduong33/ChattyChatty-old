import z from "zod";
import { ChatBotReply } from "../../dialogue/reply";
import { publicProcedure, router } from "../builder";

export const chatBotRouter = router({
  submitUserText: publicProcedure
    .input(z.string())
    .mutation(({ input }) => `This is the bot reply to : ${input}`),
});
