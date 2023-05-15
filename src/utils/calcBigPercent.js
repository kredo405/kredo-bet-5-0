export const calcBigPercent = (percentPoison, matchOdds, odds) => {
    const calcPercent = (percentPoison) => {
        if (percentPoison !== 0) {
            let result = percentPoison;
            return result;
        }

        return 0;
    };

    let btsNo = calcPercent(percentPoison.btsNo);
    let btsYes = calcPercent(percentPoison.btsYes);
    let draw = calcPercent(percentPoison.draw);
    let foraAwayMinus15 = calcPercent(percentPoison.foraAwayMinus15);
    let foraAwayPlus15 = calcPercent(percentPoison.foraAwayPlus15);
    let foraHomeMinus15 = calcPercent(percentPoison.foraHomeMinus15);
    let foraHomePlus15 = calcPercent(percentPoison.foraHomePlus15);
    let it1O05 = calcPercent(percentPoison.it1O05);
    let it1O15 = calcPercent(percentPoison.it1O15);
    let it1O25 = calcPercent(percentPoison.it1O25);
    let it1U05 = calcPercent(percentPoison.it1U05);
    let it1U15 = calcPercent(percentPoison.it1U15);
    let it1U25 = calcPercent(percentPoison.it1U25);
    let it2O05 = calcPercent(percentPoison.it2O05);
    let it2O15 = calcPercent(percentPoison.it2O15);
    let it2O25 = calcPercent(percentPoison.it2O25);
    let it2U05 = calcPercent(percentPoison.it2U05);
    let it2U15 = calcPercent(percentPoison.it2U15);
    let it2U25 = calcPercent(percentPoison.it2U25);
    let to15 = calcPercent(percentPoison.to15);
    let to25 = calcPercent(percentPoison.to25);
    let to35 = calcPercent(percentPoison.to35);
    let tu15 = calcPercent(percentPoison.tu15);
    let tu25 = calcPercent(percentPoison.tu25);
    let tu35 = calcPercent(percentPoison.tu35);
    let winOrDrawHome = calcPercent(percentPoison.winOrDrawHome);
    let winOrdrawAway = calcPercent(percentPoison.winOrdrawAway);
    let winnerAway = calcPercent(percentPoison.winnerAway);
    let winnerHome = calcPercent(percentPoison.winnerHome);

    const arrOutcomes = [];
    const arrOutcomesForPredictions = {
        countMatchesRankHome: 0,
        countMatchesH2hHome: 0,
        countMatchesHome: 0,
        countPredictionHome: 0,
        countMatchesRankAway: 0,
        countMatchesH2hAway: 0,
        countMatchesAway: 0,
        countPredictionAway: 0,
        winnerHome: {
            outcomes: "Победа 1",
            percent: winnerHome,
            odds: odds["1"],
            num: 1,
            bets: ["1", "4", "79", "77", "75", "81"],
            betsVs: ["2", "3", "5", "90"],
            outcomesFinish: "Ф1-0",
            oddFinish: odds["73"],
            percentageRank: 0,
            percentagleH2h: 0,
            percentagleMatches: 0,
            percentaglePredictions: 0,
        },
        winnerAway: {
            outcomes: "Победа 2",
            percent: winnerAway,
            odds: odds["2"],
            num: 2,
            bets: ["2", "88", "90", "92", "94"],
            betsVs: ["1", "3", "4", "77"],
            outcomesFinish: "Ф2-0",
            oddFinish: odds["86"],
            percentageRank: 0,
            percentagleH2h: 0,
            percentagleMatches: 0,
            percentaglePredictions: 0,
        },
        draw: {
            outcomes: "Ничья",
            percent: draw,
            odds: odds["3"],
            num: 3,
            bets: ["3", "4", "5", "74", "87", "101"],
            betsVs: ["1", "2", "77", "90"],
            outcomesFinish: null,
            oddFinish: null,
            percentageRank: 0,
            percentagleH2h: 0,
            percentagleMatches: 0,
            percentaglePredictions: 0,
        },
        winOrDrawHome: {
            outcomes: "1X",
            percent: winOrDrawHome,
            odds: odds["4"],
            num: 4,
            bets: ["4", "3", "73", "74"],
            betsVs: ["2", "3", "5", "90"],
            outcomesFinish: null,
            oddFinish: null,
            percentageRank: 0,
            percentagleH2h: 0,
            percentagleMatches: 0,
            percentaglePredictions: 0,
        },
        winOrdrawAway: {
            outcomes: "2X",
            percent: winOrdrawAway,
            odds: odds["5"],
            num: 5,
            bets: ["5", "3", "86", "87"],
            betsVs: ["1", "3", "4", "77"],
            outcomesFinish: null,
            oddFinish: null,
            percentageRank: 0,
            percentagleH2h: 0,
            percentagleMatches: 0,
            percentaglePredictions: 0,
        },
        foraHomeMinus15: {
            outcomes: "Фора 1 -1.5",
            percent: foraHomeMinus15,
            odds: odds["77"],
            num: 77,
            bets: ["77", "33", "35", "37", "79", "81"],
            betsVs: ["2", "3", "5", "90", "89"],
            outcomesFinish: "Ф1 -1",
            oddFinish: odds["75"],
            percentageRank: 0,
            percentagleH2h: 0,
            percentagleMatches: 0,
            percentaglePredictions: 0,
        },
        foraHomePlus15: {
            outcomes: "Фора 1 +1.5",
            percent: foraHomePlus15,
            odds: odds["76"],
            num: 76,
            bets: ["76", "1", "4", "78", "80", "82"],
            betsVs: ["90"],
            outcomesFinish: "Ф1 +2",
            oddFinish: odds["78"],
            percentageRank: 0,
            percentagleH2h: 0,
            percentagleMatches: 0,
            percentaglePredictions: 0,
        },
        foraAwayMinus15: {
            outcomes: "Фора 2 -1.5",
            percent: foraAwayMinus15,
            odds: odds["90"],
            num: 90,
            bets: ["90", "55", "57", "59", "92", "94"],
            betsVs: ["1", "3", "4", "77", "76"],
            outcomesFinish: "Ф2 -1",
            oddFinish: odds["88"],
            percentageRank: 0,
            percentagleH2h: 0,
            percentagleMatches: 0,
            percentaglePredictions: 0,
        },
        foraAwayPlus15: {
            outcomes: "Фора 2 +1.5",
            percent: foraAwayPlus15,
            odds: odds["89"],
            num: 89,
            bets: ["89", "2", "5", "91", "93", "95"],
            betsVs: ["77"],
            outcomesFinish: "Ф2 +1",
            oddFinish: odds["91"],
            percentageRank: 0,
            percentagleH2h: 0,
            percentagleMatches: 0,
            percentaglePredictions: 0,
        },
        to15: {
            outcomes: "Тотал больше 1.5",
            percent: to15,
            odds: odds["11"],
            num: 11,
            bets: ["11"],
            betsVs: ["12"],
            outcomesFinish: null,
            oddFinish: null,
            percentageRank: 0,
            percentagleH2h: 0,
            percentagleMatches: 0,
            percentaglePredictions: 0,
        },
        tu15: {
            outcomes: "Тотал меньше 1.5",
            percent: tu15,
            odds: odds["12"],
            num: 12,
            bets: ["12", "14", "16", "18", "20", "22", "24", "26", "28"],
            betsVs: ["11", "15", "19"],
            outcomesFinish: "ТМ 2",
            oddFinish: odds["14"],
            percentageRank: 0,
            percentagleH2h: 0,
            percentagleMatches: 0,
            percentaglePredictions: 0,
        },
        to25: {
            outcomes: "Тотал больше 2.5",
            percent: to25,
            odds: odds["15"],
            num: 15,
            bets: ["15", "11"],
            betsVs: ["16", "12"],
            outcomesFinish: "Тб 2",
            oddFinish: odds["13"],
            percentageRank: 0,
            percentagleH2h: 0,
            percentagleMatches: 0,
            percentaglePredictions: 0,
        },
        tu25: {
            outcomes: "Тотал меньше 2.5",
            percent: tu25,
            odds: odds["16"],
            num: 16,
            bets: ["16", "18", "20", "22", "24", "26", "28"],
            betsVs: ["15", "19"],
            outcomesFinish: "ТМ 3",
            oddFinish: odds["18"],
            percentageRank: 0,
            percentagleH2h: 0,
            percentagleMatches: 0,
            percentaglePredictions: 0,
        },
        to35: {
            outcomes: "Тотал больше 3.5",
            percent: to35,
            odds: odds["19"],
            num: 19,
            bets: ["19", "15", "11"],
            betsVs: ["20", "16", "12"],
            outcomesFinish: "ТБ 2",
            oddFinish: odds["13"],
            percentageRank: 0,
            percentagleH2h: 0,
            percentagleMatches: 0,
            percentaglePredictions: 0,
        },
        tu35: {
            outcomes: "Тотал меньше 3.5",
            percent: tu35,
            odds: odds["20"],
            num: 20,
            bets: ["20", "22", "24", "26", "28"],
            betsVs: ["19"],
            outcomesFinish: "ТМ 4",
            oddFinish: odds["22"],
            percentageRank: 0,
            percentagleH2h: 0,
            percentagleMatches: 0,
            percentaglePredictions: 0,
        },
        btsYes: {
            outcomes: "Обе забьют ДА",
            percent: btsYes,
            odds: odds["99"],
            num: 99,
            bets: ["99", "11"],
            betsVs: ["100", "30", "52"],
            outcomesFinish: "ТБ 2",
            oddFinish: odds["13"],
            percentageRank: 0,
            percentagleH2h: 0,
            percentagleMatches: 0,
            percentaglePredictions: 0,
        },
        btsNo: {
            outcomes: "Обе забьют Нет",
            percent: btsNo,
            odds: odds["100"],
            num: 100,
            bets: ["100", "12", "30", "52"],
            betsVs: ["99", "29", "51"],
            outcomesFinish: null,
            oddFinish: null,
            percentageRank: 0,
            percentagleH2h: 0,
            percentagleMatches: 0,
            percentaglePredictions: 0,
        },
        it1O05: {
            outcomes: "Команда 1 забьет",
            percent: it1O05,
            odds: odds["29"],
            num: 29,
            bets: ["29", "31", "33", "35", "37", "39", "41"],
            betsVs: ["30"],
            outcomesFinish: null,
            oddFinish: null,
            percentageRank: 0,
            percentagleH2h: 0,
            percentagleMatches: 0,
            percentaglePredictions: 0,
        },
        it1O15: {
            outcomes: "Ит1 больше 1.5",
            percent: it1O15,
            odds: odds["33"],
            num: 33,
            bets: ["33", "35", "37", "39", "41"],
            betsVs: ["34", "30"],
            outcomesFinish: "ИТ1 Б1",
            oddFinish: odds["31"],
            percentageRank: 0,
            percentagleH2h: 0,
            percentagleMatches: 0,
            percentaglePredictions: 0,
        },
        it1O25: {
            outcomes: "Ит1 больше 2.5",
            percent: it1O25,
            odds: odds["37"],
            num: 37,
            bets: ["37", "39", "41"],
            betsVs: ["38", "34", "30"],
            outcomesFinish: "ИТ1 Б1",
            oddFinish: odds["31"],
            percentageRank: 0,
            percentagleH2h: 0,
            percentagleMatches: 0,
            percentaglePredictions: 0,
        },
        it1U05: {
            outcomes: "Команда 1 не забьет",
            percent: it1U05,
            odds: odds["30"],
            num: 30,
            bets: ["30", "32", "34", "36", "38", "40", "42"],
            betsVs: ["29", "33", "37"],
            outcomesFinish: "ИТ1 М1",
            oddFinish: odds["32"],
            percentageRank: 0,
            percentagleH2h: 0,
            percentagleMatches: 0,
            percentaglePredictions: 0,
        },
        it1U15: {
            outcomes: "Ит1 меньше 1.5",
            percent: it1U15,
            odds: odds["34"],
            num: 34,
            bets: ["34", "36", "38", "40", "42"],
            betsVs: ["33", "37"],
            outcomesFinish: "ИТ1 М2",
            oddFinish: odds["36"],
            percentageRank: 0,
            percentagleH2h: 0,
            percentagleMatches: 0,
            percentaglePredictions: 0,
        },
        it1U25: {
            outcomes: "Ит1 меньше 2.5",
            percent: it1U25,
            odds: odds["38"],
            num: 38,
            bets: ["38", "40", "42"],
            betsVs: ["37"],
            outcomesFinish: null,
            oddFinish: null,
            percentageRank: 0,
            percentagleH2h: 0,
            percentagleMatches: 0,
            percentaglePredictions: 0,
        },
        it2O05: {
            outcomes: "Команда 2 забьет",
            percent: it2O05,
            odds: odds["51"],
            num: 51,
            bets: ["51", "53", "55", "57", "59", "61", "63"],
            betsVs: ["52"],
            outcomesFinish: null,
            oddFinish: null,
            percentageRank: 0,
            percentagleH2h: 0,
            percentagleMatches: 0,
            percentaglePredictions: 0,
        },
        it2O15: {
            outcomes: "Ит2 больше 1.5",
            percent: it2O15,
            odds: odds["55"],
            num: 55,
            bets: ["55", "57", "59", "61", "63"],
            betsVs: ["52", "56"],
            outcomesFinish: "ИТ2 Б1",
            oddFinish: odds["53"],
            percentageRank: 0,
            percentagleH2h: 0,
            percentagleMatches: 0,
            percentaglePredictions: 0,
        },
        it2O25: {
            outcomes: "Ит2 больше 2.5",
            percent: it2O25,
            odds: odds["59"],
            num: 59,
            bets: ["59", "61", "63"],
            betsVs: ["52", "56", "60"],
            outcomesFinish: "ИТ2 Б1",
            oddFinish: odds["53"],
            percentageRank: 0,
            percentagleH2h: 0,
            percentagleMatches: 0,
            percentaglePredictions: 0,
        },
        it2U05: {
            outcomes: "Команда 2 не забьет",
            percent: it2U05,
            odds: odds["52"],
            num: 52,
            bets: ["52", "54", "56", "58", "60", "62", "64"],
            betsVs: ["51", "55", "59"],
            outcomesFinish: "ИТ2 М1",
            oddFinish: odds["54"],
            percentageRank: 0,
            percentagleH2h: 0,
            percentagleMatches: 0,
            percentaglePredictions: 0,
        },
        it2U15: {
            outcomes: "Ит2 меньше 1.5",
            percent: it2U15,
            odds: odds["56"],
            num: 56,
            bets: ["56", "58", "60", "62", "64"],
            betsVs: ["55", "59"],
            outcomesFinish: "ИТ2 М2",
            oddFinish: odds["58"],
            percentageRank: 0,
            percentagleH2h: 0,
            percentagleMatches: 0,
            percentaglePredictions: 0,
        },
        it2U25: {
            outcomes: "Ит2 меньше 2.5",
            percent: it2U25,
            odds: odds["60"],
            num: 60,
            bets: ["60", "62", "64"],
            betsVs: ["59"],
            outcomesFinish: null,
            oddFinish: null,
            percentageRank: 0,
            percentagleH2h: 0,
            percentagleMatches: 0,
            percentaglePredictions: 0,
        },
    };

    if (odds["1"] >= 1.3) {
        const obj = {
            outcomes: "Победа 1",
            percent: winnerHome,
            odds: odds["1"],
        };
        arrOutcomes.push(obj);
    }
    if (odds["3"] >= 1.3) {
        const obj = {
            outcomes: "Ничья",
            percent: draw,
            odds: odds["3"],
        };
        arrOutcomes.push(obj);
    }
    if (odds["2"] >= 1.3) {
        const obj = {
            outcomes: "Победа 2",
            percent: winnerAway,
            odds: odds["2"],
        };
        arrOutcomes.push(obj);
    }
    if (odds["4"] >= 1.3) {
        const obj = {
            outcomes: "1X",
            percent: winOrDrawHome,
            odds: odds["4"],
        };
        arrOutcomes.push(obj);
    }
    if (odds["5"] >= 1.3) {
        const obj = {
            outcomes: "2X",
            percent: winOrdrawAway,
            odds: odds["5"],
        };
        arrOutcomes.push(obj);
    }
    if (odds["77"] >= 1.3) {
        const obj = {
            outcomes: "Фора 1 -1.5",
            percent: foraHomeMinus15,
            odds: odds["77"],
        };
        arrOutcomes.push(obj);
    }
    if (odds["76"] >= 1.3) {
        const obj = {
            outcomes: "Фора 1 +1.5",
            percent: foraHomePlus15,
            odds: odds["76"],
        };
        arrOutcomes.push(obj);
    }
    if (odds["90"] >= 1.3) {
        const obj = {
            outcomes: "Фора 2 -1.5",
            percent: foraAwayMinus15,
            odds: odds["90"],
        };
        arrOutcomes.push(obj);
    }
    if (odds["89"] >= 1.3) {
        const obj = {
            outcomes: "Фора 2 +1.5",
            percent: foraAwayPlus15,
            odds: odds["89"],
        };
        arrOutcomes.push(obj);
    }
    if (odds["11"] >= 1.3) {
        const obj = {
            outcomes: "Тотал больше 1.5",
            percent: to15,
            odds: odds["11"],
        };
        arrOutcomes.push(obj);
    }
    if (odds["12"] >= 1.3) {
        const obj = {
            outcomes: "Тотал меньше 1.5",
            percent: tu15,
            odds: odds["12"],
        };
        arrOutcomes.push(obj);
    }
    if (odds["15"] >= 1.3) {
        const obj = {
            outcomes: "Тотал больше 2.5",
            percent: to25,
            odds: odds["15"],
        };
        arrOutcomes.push(obj);
    }
    if (odds["16"] >= 1.3) {
        const obj = {
            outcomes: "Тотал меньше 2.5",
            percent: tu25,
            odds: odds["16"],
        };
        arrOutcomes.push(obj);
    }
    if (odds["19"] >= 1.3) {
        const obj = {
            outcomes: "Тотал больше 3.5",
            percent: to35,
            odds: odds["19"],
        };
        arrOutcomes.push(obj);
    }
    if (odds["20"] >= 1.3) {
        const obj = {
            outcomes: "Тотал меньше 3.5",
            percent: tu35,
            odds: odds["20"],
        };
        arrOutcomes.push(obj);
    }
    if (odds["99"] >= 1.3) {
        const obj = {
            outcomes: "Обе забьют ДА",
            percent: btsYes,
            odds: odds["99"],
        };
        arrOutcomes.push(obj);
    }
    if (odds["100"] >= 1.3) {
        const obj = {
            outcomes: "Обе забьют Нет",
            percent: btsNo,
            odds: odds["100"],
        };
        arrOutcomes.push(obj);
    }
    if (odds["29"] >= 1.3) {
        const obj = {
            outcomes: "Команда 1 забьет",
            percent: it1O05,
            odds: odds["29"],
        };
        arrOutcomes.push(obj);
    }
    if (odds["33"] >= 1.3) {
        const obj = {
            outcomes: "Ит1 больше 1.5",
            percent: it1O15,
            odds: odds["33"],
        };
        arrOutcomes.push(obj);
    }
    if (odds["37"] >= 1.3) {
        const obj = {
            outcomes: "Ит1 больше 2.5",
            percent: it1O25,
            odds: odds["37"],
        };
        arrOutcomes.push(obj);
    }
    if (odds["30"] >= 1.3) {
        const obj = {
            outcomes: "Команда 1 не забьет",
            percent: it1U05,
            odds: odds["30"],
        };
        arrOutcomes.push(obj);
    }
    if (odds["34"] >= 1.3) {
        const obj = {
            outcomes: "Ит1 меньше 1.5",
            percent: it1U15,
            odds: odds["34"],
        };
        arrOutcomes.push(obj);
    }
    if (odds["38"] >= 1.3) {
        const obj = {
            outcomes: "Ит1 меньше 2.5",
            percent: it1U25,
            odds: odds["38"],
        };
        arrOutcomes.push(obj);
    }
    if (odds["51"] >= 1.3) {
        const obj = {
            outcomes: "Команда 2 забьет",
            percent: it2O05,
            odds: odds["51"],
        };
        arrOutcomes.push(obj);
    }
    if (odds["55"] >= 1.3) {
        const obj = {
            outcomes: "Ит2 больше 1.5",
            percent: it2O15,
            odds: odds["55"],
        };
        arrOutcomes.push(obj);
    }
    if (odds["59"] >= 1.3) {
        const obj = {
            outcomes: "Ит2 больше 2.5",
            percent: it2O25,
            odds: odds["59"],
        };
        arrOutcomes.push(obj);
    }
    if (odds["52"] >= 1.3) {
        const obj = {
            outcomes: "Команда 2 не забьет",
            percent: it2U05,
            odds: odds["52"],
        };
        arrOutcomes.push(obj);
    }
    if (odds["56"] >= 1.3) {
        const obj = {
            outcomes: "Ит2 меньше 1.5",
            percent: it2U15,
            odds: odds["56"],
        };
        arrOutcomes.push(obj);
    }
    if (odds["60"] >= 1.3) {
        const obj = {
            outcomes: "Ит2 меньше 2.5",
            percent: it2U25,
            odds: odds["60"],
        };
        arrOutcomes.push(obj);
    }

    return {
        arrOutcomesForPredictions,
        arrOutcomes,
    };
};
