import { RootState } from "@infra/redux/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Student } from "../models/Student";
import { studentService } from "../services";

export const getAllStudents = createAsyncThunk(
  "student/getAllStudents",
  async () => {
    return await studentService.getAllStudents();
  }
);

interface StudentState {
  students: Student[];
  status: "idle" | "loading" | "complete";
}

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllStudents.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getAllStudents.fulfilled, (state, action) => {
      state.status = "complete";
      state.students = action.payload.isRight()
        ? action.payload.value.getValue()
        : [];
    });
  },
});

export const selectStudents = (state: RootState): Student[] =>
  state.student.students;
export const selectStudentsFetchStatus = (state: RootState): string =>
  state.student.status;

export default studentSlice.reducer;
