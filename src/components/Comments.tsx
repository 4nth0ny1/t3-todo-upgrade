import { Comment } from "./Comment";
import { api } from "../utils/api";

type DataIdProps = {
  todoId: string;
};

export function Comments({ todoId }: DataIdProps) {
  const { data, isLoading, isError } = api.comment.getAllComments.useQuery({
    todoId,
  });
  console.log(data);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;
  return (
    <div className="text-white">
      {data?.map((comment) => {
        return <Comment key={comment.id} comment={comment} />;
      })}
    </div>
  );
}
