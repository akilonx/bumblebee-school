/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { RootState } from "@infra/redux/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { Student } from "../models/Student";
import { studentService } from "../services";

export const fetchStudents = createAsyncThunk("student/fetchStudents", async () => {
	return await studentService.fetchStudents();
});

type StudentState = {
	students: Student[];
	status: "idle" | "loading" | "complete";
};

const initialState: StudentState = {
	students: [
		{
			fullName: "test",
			email: "akilonx@gmail.com",
			mobile: "1234567890",
			guardianName: "test",
			guardianMobile: "1234567890",
			id: "1",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	],
	status: "idle",
};

const studentSlice = createSlice({
	name: "student",
	initialState,
	reducers: {
		addStudent: (state, action) => {
			state.students.push(action.payload);
		},
		deleteStudent: (state, action) => {
			state.students = state.students.filter((student) => student.id !== action.payload.id);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchStudents.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchStudents.fulfilled, (state, action) => {
			state.status = "complete";
			state.students = action.payload.isRight() ? action.payload.value.getValue() : [];
		});
	},
});

export const selectStudents = (state: RootState): Student[] => state.student.students;
export const selectStudentsFetchStatus = (state: RootState): string => state.student.status;

export default studentSlice.reducer;
