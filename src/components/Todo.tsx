import type { Todo } from "../types";
import { api } from "../utils/api";

type TodoProps = {
  todo: Todo;
};

export function Todo({ todo }: TodoProps) {
  const { id, content, done } = todo;

  const ctx = api.useContext();

  const { mutate: deleteMutation } = api.todo.delete.useMutation({
    onSettled: async () => {
      await ctx.todo.getAll.invalidate();
    },
  });

  const { mutate: doneMutation } = api.todo.toggle.useMutation({
    onSettled: async () => {
      await ctx.todo.getAll.invalidate();
    },
  });

  return (
    <div>
      <div className="form-control flex flex-row justify-between gap-4 border-b p-4">
        <label className="label cursor-pointer gap-4">
          <input
            type="checkbox"
            checked={done}
            className="checkbox-secondary checkbox"
            onChange={(e) => doneMutation({ id, done: e.target.checked })}
          />
          <span className="label-text text-lg text-white">{content}</span>
        </label>
        <div className="flex flex-col justify-center">
          <button
            onClick={() => deleteMutation(id)}
            className="btn-accent btn-sm btn"
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
}
