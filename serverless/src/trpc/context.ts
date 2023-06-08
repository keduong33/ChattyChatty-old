// file: trpc/context.ts
import { inferAsyncReturnType } from "@trpc/server";
import { CreateNetlifyContextOptions } from "trpc-netlify-functions";

function createContext({ event, context }: CreateNetlifyContextOptions) {
  return { event, context };
}

export type Context = inferAsyncReturnType<typeof createContext>;
