import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {getSingleTodo, updateTodo} from '../../../types'

export const todoRouter = createTRPCRouter({
  getAll: publicProcedure
  .query(async ({ ctx }) => {
    return await ctx.prisma.todo.findMany();
  }),

  getOne: publicProcedure
  .input(getSingleTodo)
  .query(async({ctx, input}) => {
    return await ctx.prisma.todo.findUnique({
      where: {
        id: input.todoId
      }
    })
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
  }), 

  toggle: protectedProcedure
  .input(z.object({
    id: z.string(),
    done: z.boolean()
  }))
  .mutation(({ ctx, input}) => {
    const { id, done } = input;
    return ctx.prisma.todo.update({
      where: {
        id,
      },
      data: {
        done
      }
    })
  }), 

  update: protectedProcedure
  .input(updateTodo)
  .mutation(async ({ ctx, input}) => {
    const todo = await ctx.prisma.todo.update({
      where: {
        id: input.todoId
      },
      data: {
        content: input.content
      }
    })
    return todo
  })

});
