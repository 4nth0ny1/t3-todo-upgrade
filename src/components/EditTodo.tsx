import type { Todo } from "../types";
import { api } from "../utils/api";
import { useState } from "react";

type TodoProps = {
  todo: Todo;
  // isEditing: boolean;
  // onEdit: any;
};

export function EditTodo({ todo }: TodoProps) {
  const { id, content } = todo;
  const ctx = api.useContext();
  const [updatedContent, setUpdatedContent] = useState({
    todoId: id,
    content: content,
  });

  const { mutate: updateMutation } = api.todo.update.useMutation({
    onSettled: async () => {
      await ctx.todo.getAll.invalidate();
      setUpdatedContent({ todoId: "", content: "" });
    },
  });

  return (
    <form
      className="flex flex-row gap-4 pt-10"
      onSubmit={(e) => {
        e.preventDefault();
        updateMutation(updatedContent);
      }}
    >
      <input
        type="text"
        className="input-bordered input w-full max-w-xs text-black"
        placeholder={content}
        onChange={(e) =>
          setUpdatedContent({ todoId: id, content: e.target.value })
        }
      />

      <button
        // onClick={setEditing(!editing)}
        className="btn-primary btn rounded-xl"
      >
        Confirm Change
      </button>
    </form>
  );
}
