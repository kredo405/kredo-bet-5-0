export const calPercentForMatches = (matchesHome, matchesAway, homeName, awayName) => {
    const outcomes = {
        'Match Winner': {
            home: 0,
            away: 0,
        },
        'Draw': {
            home: 0,
            away: 0,
        },
        'Asian Handicap': {
            'handicap -1.5': {
                home: 0,
                away: 0,
            },
            'handicap +1.5': {
                home: 0,
                away: 0,
            },
        },
        'Goals Over/Under': {
            'Over 1.5': {
                home: 0,
                away: 0,
            },
            'Over 2.5': {
                away: 0,
                home: 0,
            },
            'Over 3.5': {
                home: 0,
                away: 0,
            },
            'Under 1.5': {
                away: 0,
                home: 0,
            },
            'Under 2.5': {
                away: 0,
                home: 0,
            },
            'Under 3.5': {
                away: 0,
                home: 0,
            },
        },
        'Both Teams Score': {
            Yes: {
                home: 0,
                away: 0,
            },
            No: {
                home: 0,
                away: 0,
            },
        },
        'individualTotal': {
            'Over 0.5': {
                home: 0,
                away: 0,
            },
            'Over 1.5': {
                home: 0,
                away: 0,
            },
            'Over 2.5': {
                home: 0,
                away: 0,
            },
            'Under 0.5': {
                home: 0,
                away: 0,
            },
            'Under 1.5': {
                home: 0,
                away: 0,
            },
            'Under 2.5': {
                home: 0,
                away: 0,
            },
        },
    }

    let quntityMatchesHome = 0
    let quntityMatchesAway = 0

    matchesHome.forEach(el => {
        if (el.team1_name.toLowerCase() === homeName.toLowerCase()) {

            quntityMatchesHome++

            if (el[0] + el[2] > el[1] + el[3]) {
                outcomes['Match Winner'].home++;
            }
            if (el[0] + el[2] === el[1] + el[3]) {
                outcomes['Draw'].home++;
            }
            if (el[0] + el[2] - el[1] + el[3] > 1) {
                outcomes['Asian Handicap']['handicap -1.5'].home++;
            }
            if (el[0] + el[2] - el[1] + el[3] >= 0) {
                outcomes['Asian Handicap']['handicap +1.5'].home++;
            }
            if (el[0] + el[2] + el[1] + el[3] > 1.5) {
                outcomes['Goals Over/Under']['Over 1.5'].home++;
            }
            if (el[0] + el[2] + el[1] + el[3] > 2.5) {
                outcomes['Goals Over/Under']['Over 2.5'].home++;
            }
            if (el[0] + el[2] + el[1] + el[3] > 3.5) {
                outcomes['Goals Over/Under']['Over 3.5'].home++;
            }
            if (el[0] + el[2] + el[1] + el[3] < 1.5) {
                outcomes['Goals Over/Under']['Under 1.5'].home++;
            }
            if (el[0] + el[2] + el[1] + el[3] < 2.5) {
                outcomes['Goals Over/Under']['Under 2.5'].home++;
            }
            if (el[0] + el[2] + el[1] + el[3] < 3.5) {
                outcomes['Goals Over/Under']['Under 3.5'].home++;
            }

            if (el[0] + el[2] > 0 && el[1] + el[3] > 0) {
                outcomes['Both Teams Score'].Yes.home++;
            }
            if (
                (el[0] + el[2] === 0 && el[1] + el[3] >= 0) ||
                (el[0] + el[2] >= 0 && el[1] + el[3] === 0) ||
                (el[0] + el[2] === 0 && el[1] + el[3] === 0)
            ) {
                outcomes['Both Teams Score'].No.home++;
            }
            if (el[0] + el[2] > 0.5) {
                outcomes['individualTotal']['Over 0.5'].home++;
            }
            if (el[0] + el[2] > 1.5) {
                outcomes['individualTotal']['Over 1.5'].home++;
            }
            if (el[0] + el[2] > 2.5) {
                outcomes['individualTotal']['Over 2.5'].home++;
            }
            if (el[0] + el[2] < 0.5) {
                outcomes['individualTotal']['Under 0.5'].home++;
            } if (+el[0] + el[2] < 1.5) {
                outcomes['individualTotal']['Under 1.5'].home++;
            }
            if (el[0] + el[2] < 2.5) {
                outcomes['individualTotal']['Under 2.5'].home++;
            }
        }
    })

    matchesAway.forEach(el => {
        if (el.team2_name.toLowerCase() === awayName.toLowerCase()) {

            quntityMatchesAway++

            if (el[1] + el[3] > el[0] + el[2]) {
                outcomes['Match Winner'].away++;
            }
            if (el[0] + el[2] === el[1] + el[3]) {
                outcomes['Draw'].away++;
            }
            if (el[1] + el[3] - el[0] + el[2] > 1) {
                outcomes['Asian Handicap']['handicap -1.5'].away++;
            }
            if (el[1] + el[3] - el[0] + el[2] >= 0) {
                outcomes['Asian Handicap']['handicap +1.5'].away++;
            }
            if (el[1] + el[3] + el[0] + el[2] > 1.5) {
                outcomes['Goals Over/Under']['Over 1.5'].away++;
            }
            if (el[1] + el[3] + el[0] + el[2] > 2.5) {
                outcomes['Goals Over/Under']['Over 2.5'].away++;
            }
            if (el[1] + el[3] + el[0] + el[2] > 3.5) {
                outcomes['Goals Over/Under']['Over 3.5'].away++;
            }
            if (el[1] + el[3] + el[0] + el[2] < 1.5) {
                outcomes['Goals Over/Under']['Under 1.5'].away++;
            }
            if (el[1] + el[3] + el[0] + el[2] < 2.5) {
                outcomes['Goals Over/Under']['Under 2.5'].away++;
            }
            if (el[1] + el[3] + el[0] + el[2] < 3.5) {
                outcomes['Goals Over/Under']['Under 3.5'].away++;
            }

            if (+el[1] + el[3] > 0 && +el[0] + el[2] > 0) {
                outcomes['Both Teams Score'].Yes.away++;
            }
            if (
                (el[1] + el[3] === 0 && el[0] + el[2] >= 0) ||
                (el[1] + el[3] >= 0 && el[0] + el[2] === 0) ||
                (el[1] + el[3] === 0 && el[0] + el[2] === 0)
            ) {
                outcomes['Both Teams Score'].No.away++;
            }
            if (el[1] + el[3] > 0.5) {
                outcomes['individualTotal']['Over 0.5'].away++;
            }
            if (el[1] + el[3] > 1.5) {
                outcomes['individualTotal']['Over 1.5'].away++;
            }
            if (el[1] + el[3] > 2.5) {
                outcomes['individualTotal']['Over 2.5'].away++;
            }
            if (el[1] + el[3] < 0.5) {
                outcomes['individualTotal']['Under 0.5'].away++;
            } if (el[1] + el[3] < 1.5) {
                outcomes['individualTotal']['Under 1.5'].away++;
            }
            if (el[1] + el[3] < 2.5) {
                outcomes['individualTotal']['Under 2.5'].away++;
            }
        }
    })

    outcomes['Match Winner'].home = outcomes['Match Winner'].home * 100 / quntityMatchesHome
    outcomes['Match Winner'].away = outcomes['Match Winner'].away * 100 / quntityMatchesAway
    outcomes['Draw'].home = outcomes['Draw'].home * 100 / quntityMatchesHome
    outcomes['Draw'].away = outcomes['Draw'].away * 100 / quntityMatchesAway
    outcomes['Asian Handicap']['handicap -1.5'].home = outcomes['Asian Handicap']['handicap -1.5'].home * 100 / quntityMatchesHome
    outcomes['Asian Handicap']['handicap -1.5'].away = outcomes['Asian Handicap']['handicap -1.5'].away * 100 / quntityMatchesAway
    outcomes['Asian Handicap']['handicap +1.5'].home = outcomes['Asian Handicap']['handicap +1.5'].home * 100 / quntityMatchesHome
    outcomes['Asian Handicap']['handicap +1.5'].away = outcomes['Asian Handicap']['handicap +1.5'].away * 100 / quntityMatchesAway
    outcomes['Goals Over/Under']['Over 1.5'].home = outcomes['Goals Over/Under']['Over 1.5'].home * 100 / quntityMatchesHome
    outcomes['Goals Over/Under']['Over 1.5'].away = outcomes['Goals Over/Under']['Over 1.5'].away * 100 / quntityMatchesAway
    outcomes['Goals Over/Under']['Over 2.5'].home = outcomes['Goals Over/Under']['Over 2.5'].home * 100 / quntityMatchesHome
    outcomes['Goals Over/Under']['Over 2.5'].away = outcomes['Goals Over/Under']['Over 2.5'].away * 100 / quntityMatchesAway
    outcomes['Goals Over/Under']['Over 3.5'].home = outcomes['Goals Over/Under']['Over 3.5'].home * 100 / quntityMatchesHome
    outcomes['Goals Over/Under']['Over 3.5'].away = outcomes['Goals Over/Under']['Over 3.5'].away * 100 / quntityMatchesAway
    outcomes['Goals Over/Under']['Under 3.5'].home = outcomes['Goals Over/Under']['Under 3.5'].home * 100 / quntityMatchesHome
    outcomes['Goals Over/Under']['Under 3.5'].away = outcomes['Goals Over/Under']['Under 3.5'].away * 100 / quntityMatchesAway
    outcomes['Goals Over/Under']['Under 2.5'].home = outcomes['Goals Over/Under']['Under 2.5'].home * 100 / quntityMatchesHome
    outcomes['Goals Over/Under']['Under 2.5'].away = outcomes['Goals Over/Under']['Under 2.5'].away * 100 / quntityMatchesAway
    outcomes['Goals Over/Under']['Under 1.5'].home = outcomes['Goals Over/Under']['Under 1.5'].home * 100 / quntityMatchesHome
    outcomes['Goals Over/Under']['Under 1.5'].away = outcomes['Goals Over/Under']['Under 1.5'].away * 100 / quntityMatchesAway
    outcomes['Both Teams Score'].Yes.home = outcomes['Both Teams Score'].Yes.home * 100 / quntityMatchesHome
    outcomes['Both Teams Score'].Yes.away = outcomes['Both Teams Score'].Yes.away * 100 / quntityMatchesAway
    outcomes['Both Teams Score'].No.home = outcomes['Both Teams Score'].No.home * 100 / quntityMatchesHome
    outcomes['Both Teams Score'].No.away = outcomes['Both Teams Score'].No.away * 100 / quntityMatchesAway
    outcomes['individualTotal']['Over 0.5'].home = outcomes['individualTotal']['Over 0.5'].home * 100 / quntityMatchesHome
    outcomes['individualTotal']['Over 0.5'].away = outcomes['individualTotal']['Over 0.5'].away * 100 / quntityMatchesAway
    outcomes['individualTotal']['Over 1.5'].home = outcomes['individualTotal']['Over 1.5'].home * 100 / quntityMatchesHome
    outcomes['individualTotal']['Over 1.5'].away = outcomes['individualTotal']['Over 1.5'].away * 100 / quntityMatchesAway
    outcomes['individualTotal']['Over 2.5'].home = outcomes['individualTotal']['Over 2.5'].home * 100 / quntityMatchesHome
    outcomes['individualTotal']['Over 2.5'].away = outcomes['individualTotal']['Over 2.5'].away * 100 / quntityMatchesAway
    outcomes['individualTotal']['Under 0.5'].home = outcomes['individualTotal']['Under 0.5'].home * 100 / quntityMatchesHome
    outcomes['individualTotal']['Under 0.5'].away = outcomes['individualTotal']['Under 0.5'].away * 100 / quntityMatchesAway
    outcomes['individualTotal']['Under 1.5'].home = outcomes['individualTotal']['Under 1.5'].home * 100 / quntityMatchesHome
    outcomes['individualTotal']['Under 1.5'].away = outcomes['individualTotal']['Under 1.5'].away * 100 / quntityMatchesAway
    outcomes['individualTotal']['Under 2.5'].home = outcomes['individualTotal']['Under 2.5'].home * 100 / quntityMatchesHome
    outcomes['individualTotal']['Under 2.5'].away = outcomes['individualTotal']['Under 2.5'].away * 100 / quntityMatchesAway

    const matchesPercent = {
        btsNo: (outcomes['Both Teams Score'].No.home + outcomes['Both Teams Score'].No.away) / 2,
        btsYes: (outcomes['Both Teams Score'].Yes.home + outcomes['Both Teams Score'].Yes.away) / 2,
        draw: (outcomes['Draw'].home + outcomes['Draw'].away) / 2,
        foraAwayMinus15: outcomes['Asian Handicap']['handicap -1.5'].away,
        foraAwayPlus15: outcomes['Asian Handicap']['handicap +1.5'].away,
        foraHomeMinus15: outcomes['Asian Handicap']['handicap -1.5'].home,
        foraHomePlus15: outcomes['Asian Handicap']['handicap +1.5'].home,
        it1O05: outcomes['individualTotal']['Over 0.5'].home,
        it1O15: outcomes['individualTotal']['Over 1.5'].home,
        it1O25: outcomes['individualTotal']['Over 2.5'].home,
        it1U05: outcomes['individualTotal']['Under 0.5'].home,
        it1U15: outcomes['individualTotal']['Under 1.5'].home,
        it1U25: outcomes['individualTotal']['Under 2.5'].home,
        it2O05: outcomes['individualTotal']['Over 0.5'].away,
        it2O15: outcomes['individualTotal']['Over 1.5'].away,
        it2O25: outcomes['individualTotal']['Over 2.5'].away,
        it2U05: outcomes['individualTotal']['Under 0.5'].away,
        it2U15: outcomes['individualTotal']['Under 1.5'].away,
        it2U25: outcomes['individualTotal']['Under 2.5'].away,
        to15: (outcomes['Goals Over/Under']['Over 1.5'].home + outcomes['Goals Over/Under']['Over 1.5'].away) / 2,
        to25: (outcomes['Goals Over/Under']['Over 2.5'].home + outcomes['Goals Over/Under']['Over 2.5'].away) / 2,
        to35: (outcomes['Goals Over/Under']['Over 3.5'].home + outcomes['Goals Over/Under']['Over 3.5'].away) / 2,
        tu15: (outcomes['Goals Over/Under']['Under 1.5'].home + outcomes['Goals Over/Under']['Under 1.5'].away) / 2,
        tu25: (outcomes['Goals Over/Under']['Under 2.5'].home + outcomes['Goals Over/Under']['Under 2.5'].away) / 2,
        tu35: (outcomes['Goals Over/Under']['Under 3.5'].home + outcomes['Goals Over/Under']['Under 3.5'].away) / 2,
        winOrDrawHome: outcomes['Match Winner'].home + outcomes['Draw'].home,
        winOrdrawAway: outcomes['Match Winner'].away + outcomes['Draw'].away,
        winnerAway: outcomes['Match Winner'].away,
        winnerHome: outcomes['Match Winner'].home,
    }

    return matchesPercent
}

