import studentFormReducer from '@modules/course/redux/studentFormSlice';
import studentsReducer from '@modules/course/redux/studentsSlice';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
	studentsReducer,
	studentFormReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
