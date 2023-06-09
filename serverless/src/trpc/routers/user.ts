import { publicProcedure, router } from "../builder";

export const userRouter = router({
  me: publicProcedure.query((_req: any) => "hello, it's me"),
});
