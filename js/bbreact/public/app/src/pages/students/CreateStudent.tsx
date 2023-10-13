import { useAppDispatch, useAppSelector } from '@infra/redux/hook';
import { Typography } from '@material-tailwind/react';
import { StudentForm } from '@modules/course/components/students';
import type { StudentFormData, ValueOf } from '@modules/course/redux/studentFormSlice';
import { studentFormState, submitForm, updateField } from '@modules/course/redux/studentFormSlice';
import type { SubmitHandler } from 'react-hook-form';

export type UpdateFormField = (
	field: keyof StudentFormData,
	value: ValueOf<StudentFormData>
) => void;

export default function CreateStudent() {
	const dispatch = useAppDispatch();
	const formState = useAppSelector(studentFormState);

	const handleSubmit: SubmitHandler<StudentFormData> = (data: StudentFormData) => {
		dispatch(submitForm(data));
	};

	const handleUpdateFormField: UpdateFormField = (field, value): void => {
		dispatch(updateField({ field, value }));
	};

	return (
		<div>
			<Typography variant="h3" className="pb-3">
				Create New Students here {formState.student.fullName}
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
			<div>{JSON.stringify(formState)}</div>
		</div>
	);
}
