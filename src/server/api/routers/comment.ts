import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,

} from "~/server/api/trpc";
import {getAllComments} from '../../../types'

export const commentRouter = createTRPCRouter({

  getAllComments: publicProcedure
  .input(getAllComments)
  .query(async ({ ctx, input }) => {
    const comments = await ctx.prisma.comment.findMany({
        where: {
            todo: {
                id: input.todoId
            }
        }, 
        orderBy: [{ createdAt: "desc" }],
    });
    return comments
  }),

  createComment: protectedProcedure
  .input(z.object({
    message: z.string(),
    todoId: z.string(),
  }))
  .mutation(({ctx, input}) => {
    
    return ctx.prisma.comment.create({
      data: {
        message: input.message,
        user: {
          connect: {
            id: ctx.session.user.id
          }
        }, 
        todo: {
          connect: {
            id: input.todoId
          }
        }
      }
    })
  })

});