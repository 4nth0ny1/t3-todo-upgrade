import { useRouter } from "next/router";
import { api } from "../../utils/api";
import { type NextPage } from "next";

const SingleTodoPage: NextPage = () => {
  const router = useRouter();
  const todoId = router.query.todoId as string;

  const { data, isLoading, isError } = api.todo.getOne.useQuery({ todoId });

  return <div>Single Page {data?.content}</div>;
};

export default SingleTodoPage;
