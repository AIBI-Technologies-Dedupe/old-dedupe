import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: { token: null },
	reducers: {
		setCredentials: (state, action) => {
			const { accessToken, user } = action.payload;
			state.token = accessToken;
			state.user = user;
		},
		logOut: (state, _) => {
			state.token = null;
		},
	},
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
