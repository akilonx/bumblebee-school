import { Button, Card, CardBody, CardFooter, Input } from "@material-tailwind/react";

interface IStudentFormProps {
	updateFormField: (fieldName: string, val: string) => void;
	fullNameValue: string;
	emailValue: string;
	mobileValue: string;
	guardianMobileValue: string;
	guardianNameValue: string;
	onSubmit: () => void;
}

const StudentForm = (props: IStudentFormProps) => (
	<Card className="h-full w-full">
		<form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
			<CardBody className="overflow-scroll px-5">
				<div className="mb-4 flex flex-col gap-6">
					<Input
						size="lg"
						label="Full Name"
						onChange={({ target }) =>
							props.updateFormField("fullNameValue", target.value)
						}
						crossOrigin={null}
					/>
					<Input size="lg" label="Email" crossOrigin={null} />
					<Input type="password" size="lg" label="Password" crossOrigin="" />
				</div>
			</CardBody>
			<CardFooter className="flex">
				<Button className="mt-6" onClick={() => props.onSubmit()}>
					Register
				</Button>
			</CardFooter>
		</form>
	</Card>
);

export default StudentForm;
