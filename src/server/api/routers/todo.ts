import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  getAll: publicProcedure
  .query(async ({ ctx }) => {
    return await ctx.prisma.todo.findMany();
  }),

  delete: protectedProcedure
  .input(z.string())
  .mutation(({ ctx, input}) => {
    return ctx.prisma.todo.delete({
      where: {
        id: input
      }
    })
  }), 

  create: protectedProcedure
  .input(z.string({required_error: "Describe your todo"}).min(1).max(50))
  .mutation(({ ctx, input }) => {
    return ctx.prisma.todo.create({
      data: {
        content: input,
        user: {
          connect: {
            id: ctx.session.user.id,
          },
        },
      },
    })
  })

});
