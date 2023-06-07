import { useState } from "react";
import { api } from "../utils/api";

export function CreateTodo() {
  const [input, setInput] = useState("");

  const ctx = api.useContext();

  const { mutate } = api.todo.create.useMutation({
    onSettled: async () => {
      await ctx.todo.getAll.invalidate();
      setInput("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate(input);
      }}
      className="flex flex-row gap-4 pt-10"
    >
      <input
        type="text"
        placeholder="Create a todo"
        className="input-bordered input w-full max-w-xs"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="btn-primary btn rounded-xl">Create</button>
    </form>
  );
}
