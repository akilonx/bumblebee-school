import { useAppDispatch, useAppSelector } from "@infra/redux/hook";
import { Layout } from "@layout/index";
import { Typography } from "@material-tailwind/react";
import { Students } from "@modules/course/components/students";
import {
  fetchStudents,
  selectStudents,
  selectStudentsFetchStatus,
} from "@modules/course/redux/studentSlice";
import { useEffect } from "react";

export default function Student() {
  const dispatch = useAppDispatch();

  const students = useAppSelector(selectStudents);
  const studentsFetchStatus = useAppSelector(selectStudentsFetchStatus);

  useEffect(() => {
    if (studentsFetchStatus === "idle") {
      dispatch(fetchStudents());
    }
  }, [studentsFetchStatus, dispatch]);

  return (
    <Layout>
      <Typography variant="h3" className="pb-3">
        Students
      </Typography>
      <Students students={students} />
    </Layout>
  );
}
