import { createSlice } from "@reduxjs/toolkit";

const initialState = { allMatches: [], outcomes: {} };

const matchSlice = createSlice({
    name: "match",
    initialState,
    reducers: {
        setMatches(state, action) {
            state.allMatches = action.payload;
        },
        setOutcomes(state, action) {
            state.outcomes = action.payload;
        },
    },
});

export const { setMatches, setOutcomes } = matchSlice.actions;
export default matchSlice.reducer;
