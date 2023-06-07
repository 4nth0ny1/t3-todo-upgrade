import type { Todo } from "../types";

type TodoProps = {
  todo: Todo;
};

export const Todo = ({ todo }: TodoProps) => {
  const { id, content, done } = todo;

  return <div>{content}</div>;
};
