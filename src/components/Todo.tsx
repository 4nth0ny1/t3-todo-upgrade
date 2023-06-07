import type { Todo } from "../types";

type TodoProps = {
  todo: Todo;
};

export function Todo({ todo }: TodoProps) {
  const { id, content, done } = todo;

  return (
    <div>
      <div className="form-control flex flex-row justify-between gap-4 border-b p-4">
        <label className="label cursor-pointer gap-4">
          <input
            type="checkbox"
            checked="checked"
            className="checkbox-secondary checkbox"
          />
          <span className="label-text text-lg text-white">{content}</span>
        </label>
        <button className="btn-accent btn-sm btn">delete</button>
      </div>
    </div>
  );
}
