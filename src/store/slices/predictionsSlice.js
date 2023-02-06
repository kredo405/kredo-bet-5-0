import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    betzona: [{ link: '', homeName: '', awayName: '' }],
    euroFootball: [{ link: '', homeName: '', awayName: '' }],
    sportAndBets: [{ link: '', homeName: '', awayName: '' }],
    legalbet: [{ link: '', homeName: '', awayName: '' }],
    liveresult: [{ link: '', homeName: '', awayName: '' }],
    stavkiprognozy: [{ link: '', homeName: '', awayName: '' }],
    oddsRu: [{ link: '', homeName: '', awayName: '' }],
}

const predictionsSlice = createSlice({
    name: 'predictions',
    initialState,
    reducers: {
        setBetzona(state, action) {
            state.betzona = action.payload;
        },
        setLegalbet(state, action) {
            state.legalbet = action.payload;
        },
        setLiveresult(state, action) {
            state.liveresult = action.payload;
        },
        setStavkiprognozy(state, action) {
            state.stavkiprognozy = action.payload;
        },
        setOddsRu(state, action) {
            state.oddsRu = action.payload;
        },
    }
})

export const { setBetzona, setLegalbet, setLiveresult, setStavkiprognozy, setOddsRu } = predictionsSlice.actions;
export default predictionsSlice.reducer;