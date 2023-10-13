import type { RootState } from "@infra/redux/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { Student } from "../models/Student";

type IObjectKeys = Record<string, string | number>;

type FormState = {
	fullName: string;
	email: string;
	mobile: string;
	guardianMobile: string;
	guardianName: string;
	status: "idle" | "loading" | "complete";
} & IObjectKeys;

// export const saveStudent = createAsyncThunk("student/fetchStudentById", async () => {
// 	return studentService;
// });

const initialState: FormState = {
	fullName: "",
	email: "",
	mobile: "",
	guardianName: "",
	guardianMobile: "",
	status: "idle",
};

const studentFormSlice = createSlice({
	name: "student",
	initialState,
	reducers: {
		updateField: (state, action: PayloadAction<{ field: string; value: string }>) => {
			const { field, value } = action.payload;
			state[field] = value;
		},
	},
	extraReducers: (_builder) => {
		// builder.addCase(saveStudent.pending, (state) => { state.status = "loading";
		// });
		// builder.addCase(saveStudent.fulfilled, (state, _action) => {
		// 	state.status = "complete";
		// });
	},
});

export const selectStudents = (state: RootState): Student[] => state.student.students;
export const selectStudentsFetchStatus = (state: RootState): string => state.student.status;

export default studentFormSlice.reducer;
