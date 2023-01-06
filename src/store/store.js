import { createStore } from 'redux';
const initialState = {
    app: '',
    allMatches: [
        
    ],
    token: '',
    betzona: [{link:'',homeName:'',awayName:''}],
    euroFootball: [{link:'',homeName:'',awayName:''}],
    sportAndBets: [{link:'',homeName:'',awayName:''}],
    legalbet: [{link:'',homeName:'',awayName:''}],
    liveresult: [{link:'',homeName:'',awayName:''}],
    stavkiprognozy: [{link:'',homeName:'',awayName:''}],
    oddsRu: [{link:'',homeName:'',awayName:''}],
    correctScore: [],
    moneyWay1x2: {},
    moneyWayOverUnder: {},
    outcomes: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OUTCOMES':
            return {
                ...state,
                outcomes: action.payload
            }; 
        case 'ALLMATCHES':
            return {
                ...state,
                allMatches: action.payload
            };
        case 'APP':
            return {
                ...state,
                app: action.payload
            };    
        case 'TOKEN':
            return {
                ...state,
                token: action.payload
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
        case 'ODDSRU':
            return {
                ...state,
                oddsRu: action.payload
            };    
        case 'MONEYWAY1X2':
            return {
                ...state,
                moneyWay1x2: action.payload
            };    
        case 'MONEYWAYOVERUNDER':
            return {
                ...state,
                moneyWayOverUnder: action.payload
            };   
        case 'CORRECTSCORE':
            return {
                ...state,
                correctScore: action.payload
            };                         
        case 'STATISTICS':
            return {
                ...state,
                statistics: action.payload
            };  
        case 'HOMETEAM':
            return {
                ...state,
                homeTeam: action.payload
            };      
        case 'AWAYTEAM':
            return {
                ...state,
                awayTeam: action.payload
            };                           
        default:
            return state;
    }
}

export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());