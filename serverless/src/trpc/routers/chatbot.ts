import z from "zod";
import { publicProcedure, router } from "../builder";
import { sendMessageToAI } from "../../dialogue/chatbot/sendMessageToAI";

export const chatBotRouter = router({
  submitUserInput: publicProcedure
    .input(z.object({ convoPayload: z.string(), language: z.string() }))
    .mutation((message) =>
      sendMessageToAI(message.input.convoPayload, message.input.language)
    ),
});
