import { nbbetServices } from "../services/nbbet";

export const calcIndividualTotalWithXg = async (data) => {
    const arrGrands = data.table[0].filter(el => el['10'] - el['11'] > 6);
    const arrMiddlePeasant = data.table[0].filter(el => el['10'] - el['11'] <= 6 && el['10'] - el['11'] > - 6);
    const arrOutsiders = data.table[0].filter(el => el['10'] - el['11'] <= -6);

    let arrMatchesHome = data.matches[0];
    let arrMatchesAway = data.matches[1];

    const filterMatches = (arr) => {
        const arrMatches = arr.filter(el => {
            let isHome = false;
            let isAway = false;

            data.table[0].map(item => {
                if (el.team1_name === item['2']) {
                    isHome = true;
                }
                if (el.team2_name === item['2']) {
                    isAway = true;
                }
            });

            if (isHome && isAway) {
                return el;
            }
        });

        return arrMatches;
    }

    let matchesHomeFilter = filterMatches(arrMatchesHome);
    let matchesAwayFilter = filterMatches(arrMatchesAway);

    matchesHomeFilter.length = 6;
    matchesAwayFilter.length = 6;

    const calcScore = (matches, teamName) => {
        let score = 0;
        matches.forEach(el => {
            if (teamName === el.team1_name) {
                const resGrands = arrGrands.find(item => item['2'] === el.team2_name);
                const resMidle = arrMiddlePeasant.find(item => item['2'] === el.team2_name);
                const resOutsider = arrOutsiders.find(item => item['2'] === el.team2_name);

                if (resGrands) {
                    score += (el.score[0] * 1.5);
                }
                if (resMidle) {
                    score += (el.score[0] * 1);
                }
                if (resOutsider) {
                    score += (el.score[0] * 0.5);
                }
            }
            if (teamName === el.team2_name) {
                const resGrands = arrGrands.find(item => item['2'] === el.team1_name);
                const resMidle = arrMiddlePeasant.find(item => item['2'] === el.team1_name);
                const resOutsider = arrOutsiders.find(item => item['2'] === el.team1_name);

                if (resGrands) {
                    score += (el.score[1] * 1.5);
                }
                if (resMidle) {
                    score += (el.score[1] * 1);
                }
                if (resOutsider) {
                    score += (el.score[1] * 0.5);
                }
            }
        });

        return score;
    }

    const calcScoreVs = (matches, teamName) => {
        let score = 0;
        matches.forEach(el => {
            if (teamName === el.team1_name) {
                const resGrands = arrGrands.find(item => item['2'] === el.team2_name);
                const resMidle = arrMiddlePeasant.find(item => item['2'] === el.team2_name);
                const resOutsider = arrOutsiders.find(item => item['2'] === el.team2_name);

                if (resGrands) {
                    score += (el.score[1] * 0.5);
                }
                if (resMidle) {
                    score += (el.score[1] * 1);
                }
                if (resOutsider) {
                    score += (el.score[2] * 1.5);
                }
            }
            if (teamName === el.team2_name) {
                const resGrands = arrGrands.find(item => item['2'] === el.team1_name);
                const resMidle = arrMiddlePeasant.find(item => item['2'] === el.team1_name);
                const resOutsider = arrOutsiders.find(item => item['2'] === el.team1_name);

                if (resGrands) {
                    score += (el.score[0] * 0.5);
                }
                if (resMidle) {
                    score += (el.score[0] * 1);
                }
                if (resOutsider) {
                    score += (el.score[0] * 1.5);
                }
            }
        });

        return score;
    }

    const scoreHome = (calcScore(matchesHomeFilter, data.team1_name) + 1) / 6;
    const scoreAway = calcScore(matchesAwayFilter, data.team2_name) / 6;
    const scoreHomeVs = calcScoreVs(matchesHomeFilter, data.team1_name) / 6;
    const scoreAwayVs = (calcScoreVs(matchesAwayFilter, data.team2_name) + 1) / 6;

    const expectedGoalsHome = (scoreHome + scoreAwayVs) / 2;
    const expectedGoalsAway = (scoreAway + scoreHomeVs) / 2;


    // Получаем информацию о предыдущих матчах 
    const getDataLastMatches = async (matches) => {
        const arrMatches = await Promise.all(matches.map(async (el) => {
            const res = await nbbetServices.getLastMatchInfo(el.link);
            return res.data.match.data.match;
        }));
        return arrMatches;
    }
    
    const resHome = await getDataLastMatches(matchesHomeFilter)
        .then(res => {
            console.log(res);

            let xg = 0;
            let xgVs = 0;
            let matchesCount = 0;
            res.forEach(el => {
                if(el.stats[0]['21']) {
                    xg += el.stats[0]['21'][0];
                    xgVs += el.stats[0]['21'][1];
                    matchesCount++;
                }
            });
            xg = xg / matchesCount;
            xgVs = xgVs / matchesCount;
            
            return {
                xg,
                xgVs
            }
            
        })
        .catch(err => console.error(err));

    const resAway = await getDataLastMatches(matchesAwayFilter)
    .then(res => {
        console.log(res);

        let xg = 0;
        let xgVs = 0;
        let matchesCount = 0;
        res.forEach(el => {
            if(el.stats[0]['21']) {
                xg += el.stats[0]['21'][0];
                xgVs += el.stats[0]['21'][1];
                matchesCount++;
            }
        });
        xg = xg / matchesCount;
        xgVs = xgVs / matchesCount;
        
        return {
            xg,
            xgVs
        }
        
    })
    .catch(err => console.error(err)); 

    let individualTotalHome;
    let individualTotalAway;

    if(resHome.xg > 0 && resAway.xgVs > 0 && resAway.xg > 0 && resHome.xgVs > 0) {
        individualTotalHome = (((resHome.xg + resAway.xgVs) / 2) + expectedGoalsHome) / 2;
        individualTotalAway = (((resAway.xg + resHome.xgVs) / 2) + expectedGoalsAway) / 2;
    }
    else {
        individualTotalHome = expectedGoalsHome;
        individualTotalAway = expectedGoalsAway;
    }

    return {
        individualTotalHome,
        individualTotalAway
    }
}