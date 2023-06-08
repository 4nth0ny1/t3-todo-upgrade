import type { inferRouterOutputs } from '@trpc/server'
import { z } from 'zod'
import type {AppRouter} from './server/api/root'

type RouterOutputs = inferRouterOutputs<AppRouter>;
type allTodosOutput = RouterOutputs['todo']['getAll']

export type Todo = allTodosOutput[number]

export const getSingleTodo = z.object({
    todoId: z.string().cuid()
  })
  
export const updateTodo = z.object({
  todoId: z.string().cuid(),
  content: z.string()
})

type allCommentsOutput = RouterOutputs['comment']['getAllComments']
export type Comment = allCommentsOutput[number]

export const getAllComments = z.object({
  todoId: z.string().cuid()
})