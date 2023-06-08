import { useRouter } from "next/router";
import { api } from "../../utils/api";
import { type NextPage } from "next";
import Link from "next/link";
import { Comments } from "../../components/Comments";

const SingleTodoPage: NextPage = () => {
  const router = useRouter();
  const todoId = router.query.todoId as string;

  const { data, isLoading, isError } = api.todo.getOne.useQuery({ todoId });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong ...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="flex flex-col items-center gap-2"></div>
        <p className="text-white">{data?.content}</p>
      </div>
      <Comments todoId={todoId} />
      <Link href="/" className="btn-info btn-sm btn">
        back
      </Link>
    </main>
  );
};

export default SingleTodoPage;
