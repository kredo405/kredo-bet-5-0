import { createStore } from 'redux';
const initialState = {
    match: {
        fixture_id: '',
        logoHome: '',
        homeName: '',
        logoAway: '',
        awayName: '',
        goalsHome: '',
        goalsAway: '',
        leagueName: '',
        leagueLogo: '',
        leagueId: '',
        country: '',
        flag: '',
    },
    arrMatchesToday: [],
    date: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MATCH':
            return {
                ...state,
                match: {
                    fixture_id: action.payload.id,
                    logoHome: action.payload.homeLogo,
                    homeName: action.payload.homeName,
                    logoAway: action.payload.awayLogo,
                    awayName: action.payload.awayName,
                    goalsHome: action.payload.goalsHome,
                    goalsAway: action.payload.goalsAway,
                    leagueName: action.payload.leagueName,
                    leagueLogo: action.payload.leagueLogo,
                    leagueId: action.payload.leagueId,
                    country: action.payload.country,
                    flag: action.payload.flag,
                }
            };
        case 'MATCHES':
            return {
                ...state,
                arrMatchesToday: [
                    ...action.payload.matches
                ],
                date: action.payload.date 
            };
        default:
            return state;
    }
}

export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());