export const calcPoisonDestribution = (data) => {

    let expectedGoalsHome = 0;
    let expectedGoalsAway = 0;

    if(data.summary[0][0]['71'] !== '0' && data.summary[0][1]['71'] !== '0') {

    // Рассчитываем владение мячом
    const posessionHome = (data.summary[0][0]['71'] + data.summary[0][1]['72']) / 2;
    const possesionAway = (data.summary[0][1]['71'] + data.summary[0][0]['72']) / 2;

    // Рассчитываем Удары Взависимости от владения
    const shotsHome = posessionHome * data.summary[0][0]['32'] / data.summary[0][0]['71'] ;
    const shotsVsHome = posessionHome * data.summary[0][0]['33'] / data.summary[0][0]['71'];
    const shotsAway = possesionAway * data.summary[0][1]['32'] / data.summary[0][1]['71'] ;
    const shotsVsAway = possesionAway * data.summary[0][1]['33'] / data.summary[0][1]['71'];
    const goalsHome = possesionAway * data.summary[0][0]['8'] / data.summary[0][0]['71'];
    const goalsVsHome = possesionAway * data.summary[0][0]['9'] /data.summary[0][0]['71']; 
    const goalsAway = possesionAway * data.summary[0][1]['8'] / data.summary[0][1]['71']; 
    const goalsVsAway = possesionAway * data.summary[0][1]['9'] / data.summary[0][1]['71']; 

    // Рассчитываем индивидуальный тотал команд
    const expectedShotsHome = (shotsHome + shotsVsAway) / 2;
    const expectedShotsAway = (shotsAway + shotsVsHome) / 2;
    const goalsPerShotsHome = data.summary[0][0]['8'] / data.summary[0][0]['32'];
    const goalsPerShotsAway = data.summary[0][1]['8'] / data.summary[0][1]['32'];
    expectedGoalsHome = (((expectedShotsHome * goalsPerShotsHome) + ((goalsHome + goalsVsAway) / 2)) / 2) + 0.2;
    expectedGoalsAway = ((expectedShotsAway * goalsPerShotsAway) + ((goalsAway + goalsVsHome) / 2)) / 2;

    } else {

    // Рассчитываем индивидуальный тотал команд
    const expectedShotsHome = (data.summary[0][0]['32'] + data.summary[0][1]['33']) / 2;
    const expectedShotsAway = (data.summary[0][1]['32'] + data.summary[0][0]['33']) / 2;
    const goalsPerShotsHome = data.summary[0][0]['8'] / data.summary[0][0]['32'];
    const goalsPerShotsAway = data.summary[0][1]['8'] / data.summary[0][1]['32'];
    expectedGoalsHome = (((expectedShotsHome * goalsPerShotsHome) + ((+data.goalsForAvgHome + +data.goalsAgainstAvgAway) / 2)) / 2) + 0.2;
    expectedGoalsAway = ((expectedShotsAway * goalsPerShotsAway) + ((+data.goalsForAvgAway + +data.goalsAgainstAvgHome) / 2)) / 2;
    }


    // рассчиываем распределение паусона все матчи
    const poissonGoals = (expectedGoals, goals, number) => {
        return (
            ((expectedGoals ** goals * 2.71828 ** -expectedGoals) / number) * 100
        );
    }

    const poisonGoals0Home = poissonGoals(expectedGoalsHome, 0, 1);
    const poisonGoals0Away = poissonGoals(expectedGoalsAway, 0, 1);
    const poisonGoals1Home = poissonGoals(expectedGoalsHome, 1, 1);
    const poisonGoals1Away = poissonGoals(expectedGoalsAway, 1, 1);
    const poisonGoals2Home = poissonGoals(expectedGoalsHome, 2, 2);
    const poisonGoals2Away = poissonGoals(expectedGoalsAway, 2, 2);
    const poisonGoals3Home = poissonGoals(expectedGoalsHome, 3, 6);
    const poisonGoals3Away = poissonGoals(expectedGoalsAway, 3, 6);
    const poisonGoals4Home = poissonGoals(expectedGoalsHome, 4, 24);
    const poisonGoals4Away = poissonGoals(expectedGoalsAway, 4, 24);
    const poisonGoals5Home = poissonGoals(expectedGoalsHome, 5, 120);
    const poisonGoals5Away = poissonGoals(expectedGoalsAway, 5, 120);

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
    console.log(percentOutcomes)

    return percentOutcomes;
}
