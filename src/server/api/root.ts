import { exampleRouter } from "~/server/api/routers/example";
import { todoRouter } from "~/server/api/routers/todo";
import { commentRouter } from "~/server/api/routers/comment";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  todo: todoRouter,
  comment: commentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
