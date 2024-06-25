import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
// import storage from "redux-persist/lib/storage";
import { apiSlice } from "../../features/api/apiSlice";
import authSlice from "../../features/auth/authSlice";
import storageSession from "redux-persist/lib/storage/session";

const reducers = combineReducers({
	auth: authSlice,
	api: apiSlice.reducer, // Add the apiSlice.reducer here
});

const persistedConfig = {
	key: "root",
	version: 1,
	storage: storageSession,
	blacklist: [],
};

const persistedReducer = persistReducer(persistedConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(apiSlice.middleware),
	devTools: true,
});

export default store;
