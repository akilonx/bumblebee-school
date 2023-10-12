import { combineReducers, configureStore, PreloadedState } from "@reduxjs/toolkit";

import studentReducer from "@modules/course/redux/studentSlice";

// Create the root reducer independently to obtain the RootState type
export const rootReducer = combineReducers({
	student: studentReducer,
});
export function setupStore(preloadedState?: PreloadedState<RootState>) {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
	});
}
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
