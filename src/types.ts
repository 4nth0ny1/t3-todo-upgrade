import type { inferRouterOutputs } from "@trpc/server";
import type {AppRouter} from './server/api/root'

type RouterOutputs = inferRouterOutputs<AppRouter>
type allTodosOutput = RouterOutputs['todo']['getAll']

export type Todo = allTodosOutput[number]