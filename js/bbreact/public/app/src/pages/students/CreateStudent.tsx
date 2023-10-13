import { useAppDispatch } from '@infra/redux/hook';
import { Typography } from '@material-tailwind/react';
import { StudentForm } from '@modules/course/components/students';
import { submitForm, updateField } from '@modules/course/redux/studentFormSlice';

export default function CreateStudent() {
	const dispatch = useAppDispatch();
	// const studentsFetchStatus = useAppSelector(selectStudentsFetchStatus);

	const handleSubmit = () => {
		dispatch(submitForm());
	};

	const handleUpdateFormField = (field: string, value: string): void => {
		dispatch(updateField({ field, value }));
	};

	// useEffect(() => {
	// 	if (studentsFetchStatus === "idle") {
	// 		void dispatch(updateField());
	// 	}
	// }, [studentsFetchStatus, dispatch]);

	return (
		<div>
			<Typography variant="h3" className="pb-3">
				Create New Students
			</Typography>
			<StudentForm
				updateFormField={handleUpdateFormField}
				fullNameValue={''}
				emailValue={''}
				mobileValue={''}
				guardianMobileValue={''}
				guardianNameValue={''}
				onSubmit={handleSubmit}
			/>
		</div>
	);
}
