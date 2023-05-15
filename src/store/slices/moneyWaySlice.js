import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    correctScore: [],
    moneyWay1x2: {},
    moneyWayOverUnder: {},
};

const moneyWaySlice = createSlice({
    name: "moneyWay",
    initialState,
    reducers: {
        setScore(state, action) {
            state.correctScore = action.payload;
        },
        setMoney1x2(state, action) {
            state.moneyWay1x2 = action.payload;
        },
        setMoneyOverUnder(state, action) {
            state.moneyWayOverUnder = action.payload;
        },
    },
});

export const { setScore, setMoney1x2, setMoneyOverUnder } =
    moneyWaySlice.actions;
export default moneyWaySlice.reducer;
