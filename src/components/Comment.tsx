import dayjs from "dayjs";
import type { Comment } from "../types";
import { useSession } from "next-auth/react";
import relativeTime from "dayjs/plugin/relativeTime";
import { api } from "../utils/api";

type CommentProps = {
  comment: Comment;
};

dayjs.extend(relativeTime);

export function Comment({ comment }: CommentProps) {
  const { id, message } = comment;
  const { data: sessionData } = useSession();

  const ctx = api.useContext();

  const { mutate: deleteCommentMutation } =
    api.comment.deleteComment.useMutation({
      onSettled: async () => {
        await ctx.comment.getAllComments.invalidate();
      },
    });

  return (
    <div className="border-b p-4">
      <div className="flex flex-row justify-end pb-2">
        <p className="pr-1 font-bold italic">{sessionData?.user.name}</p>
        <span className="font-thin italic">{` · ${dayjs(
          comment.createdAt
        ).fromNow()}`}</span>
      </div>
      <div className="flex flex-row justify-between">
        <p className="pr-4">{message}</p>
        <button
          onClick={() => deleteCommentMutation(id)}
          className="btn-accent btn-sm btn w-[70px]"
          type="button"
        >
          delete
        </button>
      </div>
    </div>
  );
}
