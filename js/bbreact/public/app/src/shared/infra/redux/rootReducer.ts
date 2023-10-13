import studentsReducer from "@modules/course/redux/studentSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
	studentsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
