import { useAppDispatch, useAppSelector } from '@infra/redux/hook';
import { Typography } from '@material-tailwind/react';
import { StudentList } from '@modules/course/components/students';
import { selectStudents, selectStudentsFetchStatus } from '@modules/course/redux/studentsSlice';
import { useEffect } from 'react';

export default function Students() {
	const dispatch = useAppDispatch();

	const students = useAppSelector(selectStudents);
	const studentsFetchStatus = useAppSelector(selectStudentsFetchStatus);

	useEffect(() => {
		if (studentsFetchStatus === 'idle') {
			// void dispatch(fetchStudents());
		}
	}, [studentsFetchStatus, dispatch]);

	return (
		<div>
			<Typography variant="h3" className="pb-3">
				Students
			</Typography>
			<StudentList students={students} />
		</div>
	);
}
