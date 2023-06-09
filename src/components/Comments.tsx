import { Comment } from "./Comment";
import { api } from "../utils/api";
import { CreateComment } from "./CreateComment";

type DataIdProps = {
  todoId: string;
};

export function Comments({ todoId }: DataIdProps) {
  const { data, isLoading, isError } = api.comment.getAllComments.useQuery({
    todoId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;
  return (
    <div className="mb-4 w-1/2 rounded-xl bg-purple-700 p-4 text-white">
      <h2 className="text-center text-2xl">Comments: {data.length}</h2>
      <div className="flex flex-row justify-center">
        <CreateComment />
      </div>
      {data?.map((comment) => {
        return <Comment key={comment.id} comment={comment} />;
      })}
    </div>
  );
}
