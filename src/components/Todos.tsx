import { api } from "../utils/api";
import { Todo } from "./Todo";

export function Todos() {
  const { data: todos, isLoading, isError } = api.todo.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong...</div>;

  return (
    <div className="w-1/2 p-10 text-white">
      <h2 className="border-b pb-4 text-center text-3xl">todos</h2>

      {todos.length ? (
        todos?.map((todo) => {
          return <Todo key={todo.id} todo={todo} />;
        })
      ) : (
        <div className="py-4 text-center text-xl">Create your first todo</div>
      )}
    </div>
  );
}
