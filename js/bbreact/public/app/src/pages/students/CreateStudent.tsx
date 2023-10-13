import { useAppDispatch, useAppSelector } from "@infra/redux/hook";
import { Typography } from "@material-tailwind/react";
import { StudentForm } from "@modules/course/components/students";
import type { Student } from "@modules/course/models/Student";
import { fetchStudents, selectStudentsFetchStatus } from "@modules/course/redux/studentSlice";
import { useEffect, useState } from "react";

export default function CreateStudent() {
	const dispatch = useAppDispatch();
	const studentsFetchStatus = useAppSelector(selectStudentsFetchStatus);

	const [formState, setFormState] = useState<Student>({} satisfies Student);

	const handleSubmit = () => {};

	const handleUpdateFormField = (fieldName: string, val: string) => {
		setFormState((prevState) => ({
			...prevState,
			[fieldName]: val,
		}));
	};

	useEffect(() => {
		if (studentsFetchStatus === "idle") {
			void dispatch(fetchStudents());
		}
	}, [studentsFetchStatus, dispatch]);

	return (
		<div>
			<Typography variant="h3" className="pb-3">
				Create New Students
			</Typography>
			<StudentForm
				updateFormField={handleUpdateFormField}
				fullNameValue={""}
				emailValue={""}
				mobileValue={""}
				guardianMobileValue={""}
				guardianNameValue={""}
				onSubmit={handleSubmit}
			/>
		</div>
	);
}
