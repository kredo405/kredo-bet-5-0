import { createSlice } from "@reduxjs/toolkit";

const initialState = { token: "" };

const firebaseSlice = createSlice({
    name: "firebase",
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
        },
    },
});

export const { setToken } = firebaseSlice.actions;
export default firebaseSlice.reducer;
