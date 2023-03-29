import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        token: false,
        loading: false,
        error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload.user;
            state.token = action.payload.token;
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        logut: (state) => {
            state.currentUser = null;
            state.token = null;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logut } =
    userSlice.actions;
export default userSlice.reducer;
