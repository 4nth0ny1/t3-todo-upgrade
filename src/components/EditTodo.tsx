import type { Todo } from "../types";

type TodoProps = {
  todo: Todo;
};

export function EditTodo({ todo }: TodoProps) {
  return (
    <form className="flex flex-row gap-4 pt-10">
      <input
        type="text"
        className="input-bordered input w-full max-w-xs"
        placeholder={todo.content}
      />
      <button className="btn-primary btn rounded-xl">Confirm Change</button>
    </form>
  );
}
