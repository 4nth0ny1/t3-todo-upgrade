import { useState } from "react";
import { api } from "../utils/api";
import { useRouter } from "next/router";

export function CreateComment() {
  const [input, setInput] = useState("");
  const router = useRouter();
  const todoId = router.query.todoId as string;

  const ctx = api.useContext();

  const { mutate } = api.comment.createComment.useMutation({
    onSettled: async () => {
      await ctx.comment.getAllComments.invalidate();
      setInput("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // const payload = { input, todoId };
        mutate({ message: input, todoId: todoId });
      }}
      className="flex flex-row gap-4 pt-10"
    >
      <input
        type="text"
        placeholder="Write a comment"
        className="input-bordered input w-full max-w-xs text-black"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="btn-primary btn rounded-xl">Create</button>
    </form>
  );
}
