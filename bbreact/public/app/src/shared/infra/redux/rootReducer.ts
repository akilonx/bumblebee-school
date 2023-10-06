import { combineReducers } from "@reduxjs/toolkit";

import studentsReducer from "@modules/course/redux/studentSlice";
const rootReducer = combineReducers({
  studentsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
