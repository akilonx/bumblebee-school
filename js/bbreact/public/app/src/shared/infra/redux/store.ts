import studentFormSlice from '@modules/course/redux/studentFormSlice';
import studentReducer from '@modules/course/redux/studentsSlice';
import type { PreloadedState } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

// Create the root reducer independently to obtain the RootState type
export const rootReducer = combineReducers({
	student: studentReducer,
	studentForm: studentFormSlice,
});
export function setupStore(
	preloadedState?: PreloadedState<RootState>
): ReturnType<typeof configureStore> {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
	});
}
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
