import { useAppSelector } from "@infra/redux/hook";
import { Layout } from "@layout/index";
import { Students } from "@modules/course/components/students";
import { selectStudents } from "@modules/course/redux/studentSlice";

export default function Student() {
  const students = useAppSelector(selectStudents);

  return (
    <Layout>
      <h1 className="text-2xl text-bold">Student</h1>
      <Students students={students} />
    </Layout>
  );
}
