import { configureStore } from "@reduxjs/toolkit";
import firebaseSlice from "./slices/firebaseSlice";
import matchSlice from "./slices/matchSlice";

export const store = configureStore({
    reducer: {
        firebaseSlice,
        matchSlice,
    },
    devTools: true,
});
