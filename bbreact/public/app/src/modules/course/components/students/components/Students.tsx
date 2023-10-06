import { useAppSelector } from "@infra/redux/hook";
import { Layout } from "@layout/index";
import { selectStudents } from "@modules/course/redux/studentSlice";

export default function Students() {
  // const dispatch = useAppDispatch();
  const students = useAppSelector(selectStudents);
  // const studentsFetchStatus = useAppSelector(selectStudentsFetchStatus);

  return (
    <Layout>
      <h1>Students</h1>
      <div>
        <ul>
          {students.map((student) => (
            <li key={student.id}>{student.fullName}</li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
