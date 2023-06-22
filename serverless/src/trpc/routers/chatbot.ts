import z from "zod";
import { publicProcedure, router } from "../builder";
import {
  testChatBotReply,
  testInitialMessageReply,
} from "../../dialogue/chatbot/openAI/send/test";
import { sendUserInput } from "../../dialogue/chatbot/sendMessage";

export const chatBotRouter = router({
  submitUserInput: publicProcedure
    .input(z.object({ convoPayload: z.string(), language: z.string() }))
    .mutation((message) =>
      sendUserInput(message.input.convoPayload, message.input.language)
    ),
  // submitInitialText: publicProcedure
  //   .input(z.string())
  //   .mutation((language) => testInitialMessageReply(language.input)),
});
