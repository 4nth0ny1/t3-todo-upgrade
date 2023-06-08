import type { Comment } from "../types";

type CommentProps = {
  comment: Comment;
};

export function Comment({ comment }: CommentProps) {
  const { message } = comment;
  return <div>{message}</div>;
}
