import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type IObjectKeys = Record<string, string | number>;

type FormState = {
	fullName: string;
	email: string;
	mobile: string;
	guardianMobile: string;
	guardianName: string;
	status: 'idle' | 'loading' | 'complete';
} & IObjectKeys;

// export const saveStudent = createAsyncThunk("student/fetchStudentById", async () => {
// 	return studentService;
// });

const initialState: FormState = {
	fullName: '',
	email: '',
	mobile: '',
	guardianName: '',
	guardianMobile: '',
	status: 'idle',
};

const studentFormSlice = createSlice({
	name: 'studentForm',
	initialState,
	reducers: {
		updateField: (state, action: PayloadAction<{ field: string; value: string }>) => {
			const { field, value } = action.payload;
			state[field] = value;
		},
		submitForm: (state) => {
			state.status = 'loading';
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

export const { updateField, submitForm } = studentFormSlice.actions;
export const selectForm = (state: { studentForm: FormState }): FormState => state.studentForm;
export default studentFormSlice.reducer;
