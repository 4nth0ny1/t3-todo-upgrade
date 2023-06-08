import { z } from "zod";
import {
  createTRPCRouter,
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
        // include: {
        //     user: true,
        //     todo: {
        //         select: {
        //             userId: true,
        //             content: true
        //         }
        //     }
        // }
    });
    return comments
  }),


});