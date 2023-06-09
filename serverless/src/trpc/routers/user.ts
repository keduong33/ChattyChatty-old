import { publicProcedure, router } from "../builder";

export const userRouter = router({
  me: publicProcedure.query((req: any) => "hello, it's me"),
});
