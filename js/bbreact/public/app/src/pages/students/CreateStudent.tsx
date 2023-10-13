import { useAppDispatch, useAppSelector } from "@infra/redux/hook";
import { Typography } from "@material-tailwind/react";
import { StudentForm } from "@modules/course/components/students";
import { fetchStudents, selectStudentsFetchStatus } from "@modules/course/redux/studentSlice";
import { useEffect } from "react";

export default function CreateStudent() {
	const dispatch = useAppDispatch();

	const studentsFetchStatus = useAppSelector(selectStudentsFetchStatus);

	useEffect(() => {
		if (studentsFetchStatus === "idle") {
			void dispatch(fetchStudents());
		}
	}, [studentsFetchStatus, dispatch]);

	return (
		<>
			<Typography variant="h3" className="pb-3">
				Create New Students
			</Typography>
			<StudentForm
				updateFormField={function (_fieldName: string, _val: string): void {
					throw new Error("Function not implemented.");
				}}
				fullNameValue={""}
				emailValue={""}
				mobileValue={""}
				guardianMobileValue={""}
				guardianNameValue={""}
				onSubmit={function (): void {
					throw new Error("Function not implemented.");
				}}
			/>
		</>
	);
}
