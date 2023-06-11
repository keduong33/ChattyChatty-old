import z from "zod";
import { publicProcedure, router } from "../builder";
import {
  testChatBotReply,
  testInitialMessageReply,
} from "../../dialogue/chatbot/openAI/send/test";

export const chatBotRouter = router({
  submitUserText: publicProcedure
    .input(z.object({ userText: z.string(), language: z.string() }))
    .mutation((message) =>
      testChatBotReply(message.input.userText, message.input.language)
    ),
  submitInitialText: publicProcedure
    .input(z.string())
    .mutation((language) => testInitialMessageReply(language.input)),
});
