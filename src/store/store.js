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
        status: '',
        date: '',
    },
    defaultShootingHome: {
        goals: "Нет данных",
        goals_per_shot: "Нет данных",
        goals_per_shot_on_target: "Нет данных",
        minutes_90s: "Нет данных",
        npxg: "Нет данных",
        npxg_net: "Нет данных",
        npxg_per_shot: "Нет данных",
        players_used: "Нет данных",
        shots_on_target: "Нет данных",
        shots_on_target_pct: "Нет данных",
        shots_on_target_per90: "Нет данных",
        shots_total: "Нет данных",
        shots_total_per90: "Нет данных",
        team: null,
        xg: "Нет данных",
        xg_net: "-Нет данных",
    },
    defaultShootingAway: {
        goals: "Нет данных",
        goals_per_shot: "Нет данных",
        goals_per_shot_on_target: "Нет данных",
        minutes_90s: "Нет данных",
        npxg: "Нет данных",
        npxg_net: "Нет данных",
        npxg_per_shot: "Нет данных",
        players_used: "Нет данных",
        shots_on_target: "Нет данных",
        shots_on_target_pct: "Нет данных",
        shots_on_target_per90: "Нет данных",
        shots_total: "Нет данных",
        shots_total_per90: "Нет данных",
        team: null,
        xg: "Нет данных",
        xg_net: "-Нет данных",
    },
    defaultStandartHome: {
        assists_per90: "Нет данных",
        goals_per90: "Нет данных",
        npxg: "Нет данных",
        npxg_per90: "Нет данных",
        npxg_xa: "Нет данных",
        npxg_xa_per90: "Нет данных",
        possession: "Нет данных",
        xa: "Нет данных",
        xa_per90: "Нет данных",
        xg: "Нет данных",
        xg_per90: "Нет данных",
        xg_xa_per90: "Нет данных",
        team: null,
    },
    defaultStandartAway: {
        assists_per90: "Нет данных",
        goals_per90: "Нет данных",
        npxg: "Нет данных",
        npxg_per90: "Нет данных",
        npxg_xa: "Нет данных",
        npxg_xa_per90: "Нет данных",
        possession: "Нет данных",
        xa: "Нет данных",
        xa_per90: "Нет данных",
        xg: "Нет данных",
        xg_per90: "Нет данных",
        xg_xa_per90: "Нет данных",
        team: null,
    },
    arbworld: {
        droppingOdds1x2: [],
        droppingOddsOverUnder: [],
        moneyWay1x2: [],
        moneyWayOverUnder: [],
    }
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
                    status: action.payload.status,
                    date: action.payload.date,
                }
            };
        case 'DEFAULTSHOOTING':
            return {
                ...state,
                defaultShootingStatistics: action.payload
            };
        case 'DEFAULTSTANDARTSTATISTICS':
            return {
                ...state,
                defaultStandartStatistics: action.payload
            };
        case 'SHOOTINGHOME':
            return {
                ...state,
                defaultShootingHome: action.payload
            };
        case 'SHOOTINGAWAY':
            return {
                ...state,
                defaultShootingAway: action.payload
            };
        case 'STANDARTHOME':
            return {
                ...state,
                defaultStandartHome: action.payload
            };
        case 'STANDARTAWAY':
            return {
                ...state,
                defaultStandartAway: action.payload
            };
        case 'ARBWORLD':
            return {
                ...state,
                arbworld: action.payload
            };
        default:
            return state;
    }
}

export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());