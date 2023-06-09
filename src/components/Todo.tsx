import type { Todo } from "../types";
import { api } from "../utils/api";
import Link from "next/link";
import { Fragment, useState } from "react";
import { EditTodo } from "./EditTodo";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

type TodoProps = {
  todo: Todo;
};

dayjs.extend(relativeTime);

export function Todo({ todo }: TodoProps) {
  const { id, content, done, comments, createdAt } = todo;
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
            <div className="gap-4 pr-4">
              <span className="font-thin italic">{`${dayjs(
                createdAt
              ).fromNow()}`}</span>
            </div>
            <div className="flex flex-col justify-center">
              <input
                type="checkbox"
                checked={done}
                className="checkbox-secondary checkbox"
                onChange={(e) => doneMutation({ id, done: e.target.checked })}
              />
            </div>
            <label className="label min-w-[300px] cursor-pointer gap-4">
              <span className="label-text block truncate text-lg text-white">
                {done ? (
                  <Link href={`/todo/${id}`}>
                    <span className="line-through">{content}</span>
                  </Link>
                ) : (
                  <Link href={`/todo/${id}`}>
                    <span>{content}</span>
                  </Link>
                )}
              </span>
            </label>
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
