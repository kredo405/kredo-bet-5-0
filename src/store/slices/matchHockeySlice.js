import { createSlice } from "@reduxjs/toolkit";

const initialState = { allMatches: [], outcomes: {} };

const matchHockeySlice = createSlice({
    name: 'matchHockey',
    initialState,
    reducers: {
        setMatchesHockey(state, action) {
            state.allMatches = action.payload;
        },
        setOutcomesHockey(state, action) {
            state.outcomes = action.payload;
        },
    },
});

export const { setMatchesHockey, setOutcomesHockey } = matchHockeySlice.actions;
export default matchHockeySlice.reducer;

