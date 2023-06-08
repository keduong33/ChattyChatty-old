import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { netlifyTRPCHandler } from "trpc-netlify-functions";
import { appRouter } from "./src/trpc/router";

export const handler = netlifyTRPCHandler({
  router: appRouter,
});
