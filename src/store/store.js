import { createStore } from 'redux';
const initialState = {
    match: {
        homeName: '',
        awayName: '',
        scores: [],
        percent: {},
    },
    odds: [
        {
            date_start: '',
            team1_rus: '',
            team2_rus: '',
            markets: {
                bothToScore: {
                    no: { v: '...' },
                    yes: { v: '...' },
                },
                handicaps1: [{ type: -1.5, v: '...' }, { type: 1.5, v: '...' }],
                handicaps2: [{ type: -1.5, v: '...' }, { type: 1.5, v: '...' }],
                totals: [
                    { over: { v: '...' }, type: 1.5, under: { v: '...' } },
                    { over: { v: '...' }, type: 2.5, under: { v: '...' } },
                    { over: { v: '...' }, type: 3.5, under: { v: '...' } },
                ],
                totals1: [
                    { type: 0.5, over: { v: '...' }, under: { v: '...' } },
                    { type: 1.5, over: { v: '...' }, under: { v: '...' } },
                    { type: 2.5, over: { v: '...' }, under: { v: '...' } },
                ],
                totals2: [
                    { type: 0.5, over: { v: '...' }, under: { v: '...' } },
                    { type: 1.5, over: { v: '...' }, under: { v: '...' } },
                    { type: 2.5, over: { v: '...' }, under: { v: '...' } },
                ],
                win1: { v: '...' },
                win1X: { v: '...' },
                win2: { v: '...' },
                winX: { v: '...' },
                winX2: { v: '...' },
            }
        }
    ],
    token: '',
    homeNameEng: '',
    awayNameEng: '',
    betzona: [{link:'',homeName:'',awayName:''}],
    euroFootball: [{link:'',homeName:'',awayName:''}],
    sportAndBets: [{link:'',homeName:'',awayName:''}],
    legalbet: [{link:'',homeName:'',awayName:''}],
    liveresult: [{link:'',homeName:'',awayName:''}],
    stavkiprognozy: [{link:'',homeName:'',awayName:''}],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MATCH':
            return {
                ...state,
                match: {
                    homeName: action.payload.homeName,
                    awayName: action.payload.awayName,
                    scores: action.payload.scores,
                    percent: action.payload.percent,
                }
            };
        case 'ODDS':
            return {
                ...state,
                odds: action.payload
            };
        case 'TOKEN':
            return {
                ...state,
                token: action.payload
            };
        case 'HOMENAMEENG':
            return {
                ...state,
                homeNameEng: action.payload
            };
        case 'AWAYNAMEENG':
            return {
                ...state,
                awayNameEng: action.payload
            };
        case 'BETZONA':
            return {
                ...state,
                betzona: action.payload
            };
        case 'EUROFOOTBALL':
            return {
                ...state,
                euroFootball: action.payload
            };
        case 'SPORTANDBETS':
            return {
                ...state,
                sportAndBets: action.payload
            };
        case 'LEGALBET':
            return {
                ...state,
                legalbet: action.payload
            };
        case 'LIVERESULT':
            return {
                ...state,
                liveresult: action.payload
            };
        case 'STAVKIPROGNOZY':
            return {
                ...state,
                stavkiprognozy: action.payload
            };
        default:
            return state;
    }
}

export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());