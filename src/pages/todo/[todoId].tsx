import { useRouter } from "next/router";
import { api } from "../../utils/api";
import { type NextPage } from "next";

const SingleTodoPage: NextPage = () => {
  const router = useRouter();
  const todoId = router.query.todoId as string;

  const { data, isLoading, isError } = api.todo.getOne.useQuery({ todoId });

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="flex flex-col items-center gap-2"></div>
        <p className="text-white">{data?.content}</p>
      </div>
    </main>
  );
};

export default SingleTodoPage;
