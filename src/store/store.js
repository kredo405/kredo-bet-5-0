import { configureStore } from "@reduxjs/toolkit";
import firebaseSlice from "./slices/firebaseSlice";
import predictionsSlice from "./slices/predictionsSlice";
import moneyWaySlice from "./slices/moneyWaySlice";
import matchSlice from "./slices/matchSlice";
import matchHockeySlice from "./slices/matchHockeySlice";

export const store = configureStore({
    reducer: {
        firebaseSlice,
        predictionsSlice,
        moneyWaySlice,
        matchSlice,
        matchHockeySlice
    },
    devTools: true
});