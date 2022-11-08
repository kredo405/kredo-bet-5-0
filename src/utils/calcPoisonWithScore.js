export const calcPoisonWithScore = (data) => {
    if (data.length >= 2) {
        const individualTotalHome = (data.reduce((acc, el) => acc + +el.scoreHome, 0)) / data.length
        const individualTotalAway = (data.reduce((acc, el) => acc + +el.scoreAway, 0)) / data.length

        // рассчиываем распределение паусона все матчи
        const poissonGoals = (expectedGoals, goals, number) => {
            return (
                ((expectedGoals ** goals * 2.71828 ** -expectedGoals) / number) * 100
            );
        }

        const poisonGoals0Home = poissonGoals(individualTotalHome, 0, 1);
        const poisonGoals0Away = poissonGoals(individualTotalAway, 0, 1);
        const poisonGoals1Home = poissonGoals(individualTotalHome, 1, 1);
        const poisonGoals1Away = poissonGoals(individualTotalAway, 1, 1);
        const poisonGoals2Home = poissonGoals(individualTotalHome, 2, 2);
        const poisonGoals2Away = poissonGoals(individualTotalAway, 2, 2);
        const poisonGoals3Home = poissonGoals(individualTotalHome, 3, 6);
        const poisonGoals3Away = poissonGoals(individualTotalAway, 3, 6);
        const poisonGoals4Home = poissonGoals(individualTotalHome, 4, 24);
        const poisonGoals4Away = poissonGoals(individualTotalAway, 4, 24);
        const poisonGoals5Home = poissonGoals(individualTotalHome, 5, 120);
        const poisonGoals5Away = poissonGoals(individualTotalAway, 5, 120);

        // рассчитываем вероятности прохода ставки по распределению паусона
        const percentOutcomes = {
            winnerHome: (poisonGoals1Home * poisonGoals0Away) / 100 +
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
            draw: (poisonGoals0Home * poisonGoals0Away) / 100 +
                (poisonGoals1Home * poisonGoals1Away) / 100 +
                (poisonGoals2Home * poisonGoals2Away) / 100 +
                (poisonGoals3Home * poisonGoals3Away) / 100 +
                (poisonGoals4Home * poisonGoals4Away) / 100 +
                (poisonGoals5Home * poisonGoals5Away) / 100,
            winnerAway: (poisonGoals0Home * poisonGoals1Away) / 100 +
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
            foraHomeMinus15: (poisonGoals2Home * poisonGoals0Away) / 100 +
                (poisonGoals3Home * poisonGoals0Away) / 100 +
                (poisonGoals4Home * poisonGoals0Away) / 100 +
                (poisonGoals5Home * poisonGoals0Away) / 100 +
                (poisonGoals3Home * poisonGoals1Away) / 100 +
                (poisonGoals4Home * poisonGoals1Away) / 100 +
                (poisonGoals5Home * poisonGoals1Away) / 100 +
                (poisonGoals4Home * poisonGoals2Away) / 100 +
                (poisonGoals5Home * poisonGoals2Away) / 100 +
                (poisonGoals5Home * poisonGoals3Away) / 100,
            foraAwayMinus15: (poisonGoals0Home * poisonGoals2Away) / 100 +
                (poisonGoals0Home * poisonGoals3Away) / 100 +
                (poisonGoals0Home * poisonGoals4Away) / 100 +
                (poisonGoals0Home * poisonGoals5Away) / 100 +
                (poisonGoals1Home * poisonGoals3Away) / 100 +
                (poisonGoals1Home * poisonGoals4Away) / 100 +
                (poisonGoals1Home * poisonGoals5Away) / 100 +
                (poisonGoals2Home * poisonGoals4Away) / 100 +
                (poisonGoals2Home * poisonGoals5Away) / 100 +
                (poisonGoals3Home * poisonGoals5Away) / 100,
            foraHomePlus15: (poisonGoals1Home * poisonGoals0Away) / 100 +
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
                (poisonGoals5Home * poisonGoals4Away) / 100 +
                (poisonGoals0Home * poisonGoals0Away) / 100 +
                (poisonGoals1Home * poisonGoals1Away) / 100 +
                (poisonGoals2Home * poisonGoals2Away) / 100 +
                (poisonGoals3Home * poisonGoals3Away) / 100 +
                (poisonGoals4Home * poisonGoals4Away) / 100 +
                (poisonGoals5Home * poisonGoals5Away) / 100 +
                (poisonGoals0Home * poisonGoals1Away) / 100 +
                (poisonGoals1Home * poisonGoals2Away) / 100 +
                (poisonGoals2Home * poisonGoals3Away) / 100 +
                (poisonGoals3Home * poisonGoals4Away) / 100 +
                (poisonGoals4Home * poisonGoals5Away) / 100,
            foraAwayPlus15: (poisonGoals0Home * poisonGoals1Away) / 100 +
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
                (poisonGoals4Home * poisonGoals5Away) / 100 +
                (poisonGoals0Home * poisonGoals0Away) / 100 +
                (poisonGoals1Home * poisonGoals1Away) / 100 +
                (poisonGoals2Home * poisonGoals2Away) / 100 +
                (poisonGoals3Home * poisonGoals3Away) / 100 +
                (poisonGoals4Home * poisonGoals4Away) / 100 +
                (poisonGoals5Home * poisonGoals5Away) / 100 +
                (poisonGoals1Home * poisonGoals0Away) / 100 +
                (poisonGoals2Home * poisonGoals1Away) / 100 +
                (poisonGoals3Home * poisonGoals2Away) / 100 +
                (poisonGoals4Home * poisonGoals3Away) / 100 +
                (poisonGoals5Home * poisonGoals4Away) / 100,
            winOrDrawHome: (poisonGoals1Home * poisonGoals0Away) / 100 +
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
                (poisonGoals5Home * poisonGoals4Away) / 100 +
                (poisonGoals0Home * poisonGoals0Away) / 100 +
                (poisonGoals1Home * poisonGoals1Away) / 100 +
                (poisonGoals2Home * poisonGoals2Away) / 100 +
                (poisonGoals3Home * poisonGoals3Away) / 100 +
                (poisonGoals4Home * poisonGoals4Away) / 100 +
                (poisonGoals5Home * poisonGoals5Away) / 100,
            winOrdrawAway: (poisonGoals0Home * poisonGoals1Away) / 100 +
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
                (poisonGoals4Home * poisonGoals5Away) / 100 +
                (poisonGoals0Home * poisonGoals0Away) / 100 +
                (poisonGoals1Home * poisonGoals1Away) / 100 +
                (poisonGoals2Home * poisonGoals2Away) / 100 +
                (poisonGoals3Home * poisonGoals3Away) / 100 +
                (poisonGoals4Home * poisonGoals4Away) / 100 +
                (poisonGoals5Home * poisonGoals5Away) / 100,
            tu15: (poisonGoals0Home * poisonGoals0Away) / 100 +
                (poisonGoals1Home * poisonGoals0Away) / 100 +
                (poisonGoals0Home * poisonGoals1Away) / 100,
            to15: 100 - ((poisonGoals0Home * poisonGoals0Away) / 100 +
                (poisonGoals1Home * poisonGoals0Away) / 100 +
                (poisonGoals0Home * poisonGoals1Away) / 100),
            tu25: (poisonGoals0Home * poisonGoals0Away) / 100 +
                (poisonGoals1Home * poisonGoals0Away) / 100 +
                (poisonGoals0Home * poisonGoals1Away) / 100 +
                (poisonGoals1Home * poisonGoals1Away) / 100 +
                (poisonGoals2Home * poisonGoals0Away) / 100 +
                (poisonGoals0Home * poisonGoals2Away) / 100,
            to25: 100 - ((poisonGoals0Home * poisonGoals0Away) / 100 +
                (poisonGoals1Home * poisonGoals0Away) / 100 +
                (poisonGoals0Home * poisonGoals1Away) / 100 +
                (poisonGoals1Home * poisonGoals1Away) / 100 +
                (poisonGoals2Home * poisonGoals0Away) / 100 +
                (poisonGoals0Home * poisonGoals2Away) / 100),
            tu35: (poisonGoals0Home * poisonGoals0Away) / 100 +
                (poisonGoals1Home * poisonGoals0Away) / 100 +
                (poisonGoals0Home * poisonGoals1Away) / 100 +
                (poisonGoals1Home * poisonGoals1Away) / 100 +
                (poisonGoals2Home * poisonGoals0Away) / 100 +
                (poisonGoals0Home * poisonGoals2Away) / 100 +
                (poisonGoals2Home * poisonGoals1Away) / 100 +
                (poisonGoals1Home * poisonGoals2Away) / 100,
            to35: 100 - ((poisonGoals0Home * poisonGoals0Away) / 100 +
                (poisonGoals1Home * poisonGoals0Away) / 100 +
                (poisonGoals0Home * poisonGoals1Away) / 100 +
                (poisonGoals1Home * poisonGoals1Away) / 100 +
                (poisonGoals2Home * poisonGoals0Away) / 100 +
                (poisonGoals0Home * poisonGoals2Away) / 100 +
                (poisonGoals2Home * poisonGoals1Away) / 100 +
                (poisonGoals1Home * poisonGoals2Away) / 100),
            btsYes: 100 - ((poisonGoals0Home * poisonGoals0Away) / 100 +
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
            btsNo: ((poisonGoals0Home * poisonGoals0Away) / 100 +
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
            it1O05: poisonGoals1Home + poisonGoals2Home + poisonGoals3Home + poisonGoals4Home + poisonGoals5Home,
            it2O05: poisonGoals1Away + poisonGoals2Away + poisonGoals3Away + poisonGoals4Away + poisonGoals5Away,
            it1O15: poisonGoals2Home + poisonGoals3Home + poisonGoals4Home + poisonGoals5Home,
            it2O15: poisonGoals2Away + poisonGoals3Away + poisonGoals4Away + poisonGoals5Away,
            it1O25: poisonGoals3Home + poisonGoals4Home + poisonGoals5Home,
            it2O25: poisonGoals3Away + poisonGoals4Away + poisonGoals5Away,
            it1U05: poisonGoals0Home,
            it2U05: poisonGoals0Away,
            it1U15: poisonGoals0Home + poisonGoals1Home,
            it2U15: poisonGoals0Away + poisonGoals1Away,
            it1U25: poisonGoals0Home + poisonGoals1Home + poisonGoals2Home,
            it2U25: poisonGoals0Away + poisonGoals1Away + poisonGoals2Away,
        }

        return percentOutcomes;
    }
    else {
        return {
            btsNo: 0,
            btsYes: 0,
            draw: 0,
            foraAwayMinus15: 0,
            foraAwayPlus15: 0,
            foraHomeMinus15: 0,
            foraHomePlus15: 0,
            it1O05: 0,
            it1O15: 0,
            it1O25: 0,
            it1U05: 0,
            it1U15: 0,
            it1U25: 0,
            it2O05: 0,
            it2O15: 0,
            it2O25: 0,
            it2U05: 0,
            it2U15: 0,
            it2U25: 0,
            to15: 0,
            to25: 0,
            to35: 0,
            tu15: 0,
            tu25: 0,
            tu35: 0,
            winOrDrawHome: 0,
            winOrdrawAway: 0,
            winnerAway: 0,
            winnerHome: 0,
            draw: 0,
            draw: 0,
        }
    }
}