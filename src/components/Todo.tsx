import type { Todo } from "../types";
import { api } from "../utils/api";
import Link from "next/link";
import { Fragment, useState } from "react";
import { EditTodo } from "./EditTodo";
import { useSession } from "next-auth/react";

type TodoProps = {
  todo: Todo;
};

export function Todo({ todo }: TodoProps) {
  const { id, content, done, comments } = todo;
  const [editing, setEditing] = useState(false);
  const { data: sessionData } = useSession();

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
    <Fragment>
      {editing ? (
        <EditTodo todo={todo} onEdit={() => setEditing(!editing)} />
      ) : (
        <div>
          <div className="form-control flex flex-row justify-between gap-4 p-4">
            <label className="label min-w-[300px] cursor-pointer gap-4">
              <input
                type="checkbox"
                checked={done}
                className="checkbox-secondary checkbox"
                onChange={(e) => doneMutation({ id, done: e.target.checked })}
              />
              <span className="label-text block truncate text-lg text-white">
                {content}
              </span>
            </label>
            <div className="flex flex-col justify-center">
              <Link href={`/todo/${id}`}>
                <button className="btn-sm btn" type="button">
                  show
                </button>
              </Link>
            </div>
            {sessionData?.user && (
              <div className="flex flex-col justify-center">
                <button
                  className="btn-warning btn-sm btn"
                  type="button"
                  onClick={() => setEditing(!editing)}
                >
                  edit
                </button>
              </div>
            )}
            {sessionData?.user && (
              <div className="flex flex-col justify-center">
                <button
                  onClick={() => deleteMutation(id)}
                  className="btn-accent btn-sm btn"
                  type="button"
                >
                  delete
                </button>
              </div>
            )}
            {sessionData?.user && (
              <div className="flex flex-row items-center justify-center">
                <Link href={`/todo/${id}`}>
                  <button className="btn-error btn-sm btn" type="button">
                    <span>Comments {comments.length}</span>
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
}
