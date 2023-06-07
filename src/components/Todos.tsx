import { api } from "../utils/api";
import { Todo } from "./Todo";

export const Todos = () => {
  const { data: todos, isLoading, isError } = api.todo.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong...</div>;

  return (
    <div className="text-white">
      <h2 className="text-3xl">todos</h2>
      {todos?.map((todo) => {
        return <Todo key={todo.id} todo={todo} />;
      })}
    </div>
  );
};
