export const collectiveMindCalculation = (correctScore, moneyWay1x2, moneyWayOverUnder) => {
    // ищем одинаковые матчи
    const matches = correctScore.map(el => {

        let match1x2 = moneyWay1x2.find(item => el.teamHome === item.homeName);
        let matchUnderOver = moneyWayOverUnder.find(item => el.teamHome === item.homeName);

        if (match1x2 && matchUnderOver) {
            return {
                correctScore: el,
                match1x2: match1x2,
                matchUnderOver: matchUnderOver,
            }
        }
    });

    const matchesFilters = matches.filter(el => el !== undefined);

    console.log(matchesFilters)

    // Считаем процент прохода по точному счёту

    const outcomes = matchesFilters.map(el => {
        const scores = el.correctScore.scores;
        const winOrDraw = el.match1x2;
        const underOver = el.matchUnderOver;
        const scoresMoneyWay = {
            score1_0: ((+winOrDraw.percentHome / 6) + (+underOver.percentUnder / 6)) / 2,
            score2_0: ((+winOrDraw.percentHome / 6) + (+underOver.percentUnder / 6)) / 2,
            score2_1: ((+winOrDraw.percentHome / 6) + (+underOver.percentOver / 10)) / 2,
            score3_0: ((+winOrDraw.percentHome / 6) + (+underOver.percentOver / 10)) / 2,
            score3_1: ((+winOrDraw.percentHome / 6) + (+underOver.percentOver / 10)) / 2,
            score3_2: ((+winOrDraw.percentHome / 6) + (+underOver.percentOver / 10)) / 2,
            score0_1: ((+winOrDraw.percentAway / 6) + (+underOver.percentUnder / 6)) / 2,
            score0_2: ((+winOrDraw.percentAway / 6) + (+underOver.percentUnder / 6)) / 2,
            score1_2: ((+winOrDraw.percentAway / 6) + (+underOver.percentOver / 10)) / 2,
            score0_3: ((+winOrDraw.percentAway / 6) + (+underOver.percentOver / 10)) / 2,
            score1_3: ((+winOrDraw.percentAway / 6) + (+underOver.percentOver / 10)) / 2,
            score2_3: ((+winOrDraw.percentAway / 6) + (+underOver.percentOver / 10)) / 2,
            score0_0: ((+winOrDraw.percentDraw / 4) + (+underOver.percentUnder / 6)) / 2,
            score1_1: ((+winOrDraw.percentDraw / 4) + (+underOver.percentUnder / 6)) / 2,
            score2_2: ((+winOrDraw.percentDraw / 4) + (+underOver.percentOver / 10)) / 2,
            score3_3: ((+winOrDraw.percentDraw / 4) + (+underOver.percentOver / 10)) / 2,
        }

        // Рассчитываем распределениие паусона по денежным потокам поставленным на счета
        const poisonGoals = {
            home0: +scores[0].score0_0 + +scores[1].score0_1 + +scores[2].score0_2 + +scores[3].score0_3,
            home1: +scores[4].score1_0 + +scores[5].score1_1 + +scores[6].score1_2 + +scores[7].score1_3,
            home2: +scores[8].score2_0 + +scores[9].score2_1 + +scores[10].score2_2 + +scores[11].score2_3,
            home3: +scores[12].score3_0 + +scores[13].score3_1 + +scores[14].score3_2 + +scores[15].score3_3,
            away0: +scores[0].score0_0 + +scores[4].score1_0 + +scores[8].score2_0 + +scores[12].score3_0,
            away1: +scores[1].score0_1 + +scores[5].score1_1 + +scores[9].score2_1 + +scores[13].score3_1,
            away2: +scores[2].score0_2 + +scores[6].score1_2 + +scores[10].score2_2 + +scores[14].score3_2,
            away3: +scores[3].score0_3 + +scores[7].score1_3 + +scores[15].score3_3 + +scores[11].score2_3,
        }

        const goalsHome = ((1 * poisonGoals.home1) + (2 * poisonGoals.home2) + (3 * poisonGoals.home3)) / 100
        const goalsAway = ((1 * poisonGoals.away1) + (2 * poisonGoals.away2) + (3 * poisonGoals.away3)) / 100

        const poissonGoals = (expectedGoals, goals, number) => {
            return (
                ((expectedGoals ** goals * 2.71828 ** -expectedGoals) / number) * 100
            );
        }
        let poisonGoals0Home = poissonGoals(goalsHome, 0, 1);
        let poisonGoals0Away = poissonGoals(goalsAway, 0, 1);
        let poisonGoals1Home = poissonGoals(goalsHome, 1, 1);
        let poisonGoals1Away = poissonGoals(goalsAway, 1, 1);
        let poisonGoals2Home = poissonGoals(goalsHome, 2, 2);
        let poisonGoals2Away = poissonGoals(goalsAway, 2, 2);
        let poisonGoals3Home = poissonGoals(goalsHome, 3, 6);
        let poisonGoals3Away = poissonGoals(goalsAway, 3, 6);
        let poisonGoals4Home = poissonGoals(goalsHome, 4, 24);
        let poisonGoals4Away = poissonGoals(goalsAway, 4, 24);
        let poisonGoals5Home = poissonGoals(goalsHome, 5, 120);
        let poisonGoals5Away = poissonGoals(goalsAway, 5, 120);

        const poisonResult = {
            p1: (poisonGoals1Home * poisonGoals0Away) / 100 +
                (poisonGoals2Home * poisonGoals0Away) / 100 +
                (poisonGoals3Home * poisonGoals0Away) / 100 +
                (poisonGoals4Home * poisonGoals0Away) / 100 +
                (poisonGoals5Home * poisonGoals0Away) / 100 +
                (poisonGoals2Home * poisonGoals1Away) / 100 +
                (poisonGoals3Home * poisonGoals1Away) / 100 +
                (poisonGoals4Home * poisonGoals1Away) / 100 +
                (poisonGoals5Home * poisonGoals1Away) / 100 +
                (poisonGoals3Home * poisonGoals2Away) / 100 +
                (poisonGoals4Home * poisonGoals2Away) / 100 +
                (poisonGoals5Home * poisonGoals2Away) / 100 +
                (poisonGoals4Home * poisonGoals3Away) / 100 +
                (poisonGoals5Home * poisonGoals3Away) / 100 +
                (poisonGoals5Home * poisonGoals4Away) / 100,
            p2: (poisonGoals0Home * poisonGoals1Away) / 100 +
                (poisonGoals0Home * poisonGoals2Away) / 100 +
                (poisonGoals0Home * poisonGoals3Away) / 100 +
                (poisonGoals0Home * poisonGoals4Away) / 100 +
                (poisonGoals0Home * poisonGoals5Away) / 100 +
                (poisonGoals1Home * poisonGoals2Away) / 100 +
                (poisonGoals1Home * poisonGoals3Away) / 100 +
                (poisonGoals1Home * poisonGoals4Away) / 100 +
                (poisonGoals1Home * poisonGoals5Away) / 100 +
                (poisonGoals2Home * poisonGoals3Away) / 100 +
                (poisonGoals2Home * poisonGoals4Away) / 100 +
                (poisonGoals2Home * poisonGoals5Away) / 100 +
                (poisonGoals3Home * poisonGoals4Away) / 100 +
                (poisonGoals3Home * poisonGoals5Away) / 100 +
                (poisonGoals4Home * poisonGoals5Away) / 100,
            tm25: (poisonGoals0Home * poisonGoals0Away) / 100 +
                (poisonGoals1Home * poisonGoals0Away) / 100 +
                (poisonGoals0Home * poisonGoals1Away) / 100 +
                (poisonGoals1Home * poisonGoals1Away) / 100 +
                (poisonGoals2Home * poisonGoals0Away) / 100 +
                (poisonGoals0Home * poisonGoals2Away) / 100,
            tb25: 100 -((poisonGoals0Home * poisonGoals0Away) / 100 +
                (poisonGoals1Home * poisonGoals0Away) / 100 +
                (poisonGoals0Home * poisonGoals1Away) / 100 +
                (poisonGoals1Home * poisonGoals1Away) / 100 +
                (poisonGoals2Home * poisonGoals0Away) / 100 +
                (poisonGoals0Home * poisonGoals2Away) / 100),
            bts: 100 - ((poisonGoals0Home * poisonGoals0Away) / 100 +
                (poisonGoals1Home * poisonGoals0Away) / 100 +
                (poisonGoals2Home * poisonGoals0Away) / 100 +
                (poisonGoals3Home * poisonGoals0Away) / 100 +
                (poisonGoals4Home * poisonGoals0Away) / 100 +
                (poisonGoals5Home * poisonGoals0Away) / 100 +
                (poisonGoals0Home * poisonGoals1Away) / 100 +
                (poisonGoals0Home * poisonGoals2Away) / 100 +
                (poisonGoals0Home * poisonGoals3Away) / 100 +
                (poisonGoals0Home * poisonGoals4Away) / 100 +
                (poisonGoals0Home * poisonGoals5Away) / 100),
            it1O1: poisonGoals2Home + poisonGoals3Home + poisonGoals4Home + poisonGoals5Home,
            it2O1: poisonGoals2Away + poisonGoals3Away + poisonGoals4Away + poisonGoals5Away,
        }

        // Возвращаем объект с результами рассчеиов
        return {
            p1: ((+scores[4].score1_0 + +scores[8].score2_0 + +scores[9].score2_1 + +scores[12].score3_0 + +scores[13].score3_1 + +scores[14].score3_2) +
                (+scoresMoneyWay.score1_0 + +scoresMoneyWay.score2_0 + +scoresMoneyWay.score2_1 + +scoresMoneyWay.score3_0 + +scoresMoneyWay.score3_1 + +scoresMoneyWay.score3_2) + poisonResult.p1) / 3,
            p2: ((+scores[1].score0_1 + +scores[2].score0_2 + +scores[6].score1_2 + +scores[3].score0_3 + +scores[7].score1_3 + +scores[11].score2_3) +
                (+scoresMoneyWay.score0_1 + +scoresMoneyWay.score0_2 + +scoresMoneyWay.score1_2 + +scoresMoneyWay.score0_3 + +scoresMoneyWay.score1_3 + +scoresMoneyWay.score2_3) + poisonResult.p2) / 3,
            it1O1: ((+scores[8].score2_0 + +scores[9].score2_1 + +scores[12].score3_0 + +scores[13].score3_1 + +scores[14].score3_2 +
                +scores[10].score2_2 + +scores[15].score3_3 + +scores[11].score2_3) +
                (+scoresMoneyWay.score2_0 + +scoresMoneyWay.score2_1 + +scoresMoneyWay.score3_0 + +scoresMoneyWay.score3_1 + +scoresMoneyWay.score3_2 +
                    +scoresMoneyWay.score2_2 + +scoresMoneyWay.score3_3 + +scoresMoneyWay.score2_3) + poisonResult.it1O1) / 3,
            it2O1: ((+scores[1].score0_1 + +scores[2].score0_2 + +scores[6].score1_2 + +scores[3].score0_3 + +scores[7].score1_3 + +scores[11].score2_3 +
                +scores[10].score2_2 + +scores[15].score3_3 + +scores[14].score3_2) +
                (+scoresMoneyWay.score0_1 + +scoresMoneyWay.score0_2 + +scoresMoneyWay.score1_2 + +scoresMoneyWay.score0_3 + +scoresMoneyWay.score1_3 + +scoresMoneyWay.score2_3 +
                    +scoresMoneyWay.score2_2 + +scoresMoneyWay.score3_3 + +scoresMoneyWay.score3_2) + poisonResult.it2O1) / 3,
            to25: ((+scores[9].score2_1 + +scores[12].score3_0 + +scores[13].score3_1 + +scores[14].score3_2 + +scores[6].score1_2 + +scores[3].score0_3 +
                +scores[7].score1_3 + +scores[11].score2_3 + +scores[10].score2_2 + +scores[15].score3_3) +
                (+scoresMoneyWay.score2_1 + +scoresMoneyWay.score3_0 + +scoresMoneyWay.score3_1 + +scoresMoneyWay.score3_2 + +scoresMoneyWay.score1_2 + +scoresMoneyWay.score0_3 +
                    +scoresMoneyWay.score1_3 + +scoresMoneyWay.score2_3 + +scoresMoneyWay.score2_2 + +scoresMoneyWay.score3_3) + poisonResult.tb25) / 3,
            tu25: ((+scores[4].score1_0 + +scores[8].score2_0 + +scores[1].score0_1 + +scores[2].score0_2 + +scores[0].score0_0 + +scores[5].score1_1) +
                (+scoresMoneyWay.score1_0 + +scoresMoneyWay.score2_0 + +scoresMoneyWay.score0_1 + +scoresMoneyWay.score0_2 + +scoresMoneyWay.score0_0 + +scoresMoneyWay.score1_1) + poisonResult.tm25) / 3,
            bts: ((+scores[9].score2_1 + +scores[13].score3_1 + +scores[14].score3_2 + +scores[6].score1_2 + +scores[7].score1_3 + +scores[11].score2_3 +
                +scores[5].score1_1 + +scores[10].score2_2 + +scores[15].score3_3) +
                (+scoresMoneyWay.score2_1 + +scoresMoneyWay.score3_1 + +scoresMoneyWay.score3_2 + +scoresMoneyWay.score1_2 + +scoresMoneyWay.score1_3 + +scoresMoneyWay.score2_3 +
                    +scoresMoneyWay.score1_1 + +scoresMoneyWay.score2_2 + +scoresMoneyWay.score3_3) + poisonResult.bts) / 3,
            homeName: el.correctScore.teamHome,
            awayName: el.correctScore.teamAway,
            date: el.correctScore.date,
            leagueName: el.correctScore.leagueName,
        }
    })
    console.log(outcomes)
    return outcomes;

}