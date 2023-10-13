import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardBody, CardFooter, Input } from '@material-tailwind/react';
import type { StudentFormData } from '@modules/course/redux/studentFormSlice';
import type { UpdateFormField } from '@pages/students/CreateStudent';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

type IStudentFormProps = {
	updateFormField: UpdateFormField;
	fullNameValue: string;
	emailValue: string;
	mobileValue: string;
	guardianMobileValue: string;
	guardianNameValue: string;
	onSubmit: (data: StudentFormData) => void;
};

const schema = Yup.object().shape({
	fullName: Yup.string().required('Field is required'),
	email: Yup.string().required('Field is required'),
	mobile: Yup.string().required('Field is required'),
	guardianName: Yup.string().required('Field is required'),
	guardianMobile: Yup.string().required('Field is required'),
});
const StudentForm = (props: IStudentFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<StudentFormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			fullName: props.fullNameValue,
			email: props.emailValue,
			mobile: props.mobileValue,
			guardianName: props.guardianNameValue,
			guardianMobile: props.guardianMobileValue,
		},
	});
	return (
		<Card className="h-full w-full">
			<form
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onSubmit={handleSubmit(props.onSubmit)}
				className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
			>
				<CardBody className="overflow-scroll px-5">
					<div className="mb-4 flex flex-col gap-6">
						<Input
							size="lg"
							label="Full Name"
							{...register('fullName')}
							crossOrigin=""
							error={errors.fullName != null}
						/>
						<Input
							size="lg"
							label="Email"
							{...register('email')}
							crossOrigin=""
							error={errors.email != null}
						/>
						<Input
							size="lg"
							label="Mobile"
							{...register('mobile')}
							crossOrigin=""
							error={errors.mobile != null}
						/>
						<Input
							size="lg"
							label="Guardian Name"
							{...register('guardianName')}
							crossOrigin=""
							error={errors.guardianName != null}
						/>
						<Input
							size="lg"
							label="Guardian Mobile"
							{...register('guardianMobile')}
							crossOrigin=""
							error={errors.guardianMobile != null}
						/>
					</div>
				</CardBody>
				<CardFooter className="flex">
					<Button className="mt-6" type="submit">
						Register
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
};

export default StudentForm;
