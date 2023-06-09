import z from "zod";
import { ChatBotReply } from "../../dialogue/reply";
import { publicProcedure, router } from "../builder";

export const chatBotRouter = router({
  getReply: publicProcedure.input(z.string()).query((resp: any) => {
    return ChatBotReply(resp.input);
  }),
});
