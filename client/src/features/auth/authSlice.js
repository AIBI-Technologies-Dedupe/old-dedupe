import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		token: null,
		user: { id: null, name: null, role: null }, // Ensure role is defined
	},
	reducers: {
		setCredentials: (state, action) => {
			const { accessToken, user } = action.payload;
			state.token = accessToken;
			state.user = user;
		},
		logOut: (state) => {
			state.token = null;
			state.user = { id: null, name: null, role: null }; // Reset user state
		},
	},
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
