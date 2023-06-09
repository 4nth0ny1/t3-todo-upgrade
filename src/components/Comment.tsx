import dayjs from "dayjs";
import type { Comment } from "../types";
import { useSession } from "next-auth/react";
import relativeTime from "dayjs/plugin/relativeTime";

type CommentProps = {
  comment: Comment;
};

dayjs.extend(relativeTime);

export function Comment({ comment }: CommentProps) {
  const { message } = comment;
  const { data: sessionData } = useSession();

  return (
    <div className="border-b p-4">
      <div className="flex flex-row justify-end">
        <p>{sessionData?.user.name}</p>
        <span className="font-thin">{` · ${dayjs(
          comment.createdAt
        ).fromNow()}`}</span>
      </div>
      {message ? (
        <div className="flex">
          <p className="pr-1">{message}</p>
        </div>
      ) : (
        "No Comments Yet"
      )}
    </div>
  );
}
