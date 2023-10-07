import { Table } from "@component/Table";
import { Student } from "@modules/course/models/Student";

interface StudentsProps {
  students: Student[];
}

const Students: React.FC<StudentsProps> = (props) => {
  const { students } = props;
  // const dispatch = useAppDispatch();
  // const students = useAppSelector(selectStudents);
  // const studentsFetchStatus = useAppSelector(selectStudentsFetchStatus);

  return (
    <>
      <Table
        className="mt-5 text-lg"
        keys={["Name", "Email", "House Address", "Mobile", ""]}
      >
        {students.map((student) => (
          <tr
            key={student.id}
            className="border-b cursor-pointer hover:bg-gray-100"
          >
            <td>{student.fullName}</td>
            <td>{student.email}</td>
            <td>{student.guardianName}</td>
            <td>{student.guardianMobile}</td>
            <td></td>
          </tr>
        ))}
      </Table>
    </>
  );
};

export default Students;
