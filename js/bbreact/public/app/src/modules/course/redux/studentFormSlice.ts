import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type ValueOf<T> = T[keyof T];

export type StudentFormData = {
	fullName: string;
	email: string;
	mobile: string;
	guardianMobile: string;
	guardianName: string;
};

type StudentFormState = {
	student: StudentFormData;
	status: 'idle' | 'loading' | 'complete';
};

export type UpdateFieldPayload = {
	field: keyof StudentFormData;
	value: ValueOf<StudentFormData>;
};

// export const saveStudent = createAsyncThunk("student/fetchStudentById", async () => {
// 	return studentService;
// });

const initialState: StudentFormState = {
	student: {
		fullName: 'test',
		email: '',
		mobile: '',
		guardianName: '',
		guardianMobile: '',
	},
	status: 'idle',
};

const studentFormSlice = createSlice({
	name: 'studentForm',
	initialState,
	reducers: {
		updateField: (state, action: PayloadAction<UpdateFieldPayload>) => {
			Object.assign(state, { [action.payload.field]: action.payload.value });
		},
		submitForm: (state, action: PayloadAction<StudentFormData>) => {
			state.status = 'loading';
			state.student = action.payload;
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

type RootState = {
	studentForm: StudentFormState;
};

export const { updateField, submitForm } = studentFormSlice.actions;

export const studentFormState = (state: RootState): StudentFormState => state.studentForm;
export default studentFormSlice.reducer;
