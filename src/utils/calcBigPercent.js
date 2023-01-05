export const calcBigPercent = (percentPoison, percentWithScore, matchOdds, odds) => {

    const calcPercent = (percentPoison, percentWithScore) => {
        if (percentPoison !== 0 && percentWithScore !== 0) {
            let result = (percentPoison + percentWithScore) / 2
            return result
        }
        if (percentPoison !== 0 && percentWithScore === 0) {
            let result = percentPoison
            return result
        }
        if (percentPoison === 0 && percentWithScore !== 0) {
            let result = percentWithScore
            return result
        }

        return 0
    }

    let btsNo = calcPercent(percentPoison.btsNo, percentWithScore.btsNo)
    let btsYes = calcPercent(percentPoison.btsYes, percentWithScore.btsYes)
    let draw = calcPercent(percentPoison.draw, percentWithScore.draw)
    let foraAwayMinus15 = calcPercent(percentPoison.foraAwayMinus15, percentWithScore.foraAwayMinus15)
    let foraAwayPlus15 = calcPercent(percentPoison.foraAwayPlus15, percentWithScore.foraAwayPlus15)
    let foraHomeMinus15 = calcPercent(percentPoison.foraHomeMinus15, percentWithScore.foraHomeMinus15)
    let foraHomePlus15 = calcPercent(percentPoison.foraHomePlus15, percentWithScore.foraHomePlus15)
    let it1O05 = calcPercent(percentPoison.it1O05, percentWithScore.it1O05)
    let it1O15 = calcPercent(percentPoison.it1O15, percentWithScore.it1O15)
    let it1O25 = calcPercent(percentPoison.it1O25, percentWithScore.it1O25)
    let it1U05 = calcPercent(percentPoison.it1U05, percentWithScore.it1U05)
    let it1U15 = calcPercent(percentPoison.it1U15, percentWithScore.it1U15)
    let it1U25 = calcPercent(percentPoison.it1U25, percentWithScore.it1U25)
    let it2O05 = calcPercent(percentPoison.it2O05, percentWithScore.it2O05)
    let it2O15 = calcPercent(percentPoison.it2O15, percentWithScore.it2O15)
    let it2O25 = calcPercent(percentPoison.it2O25, percentWithScore.it2O25)
    let it2U05 = calcPercent(percentPoison.it2U05, percentWithScore.it2U05)
    let it2U15 = calcPercent(percentPoison.it2U15, percentWithScore.it2U15)
    let it2U25 = calcPercent(percentPoison.it2U25, percentWithScore.it2U25)
    let to15 = calcPercent(percentPoison.to15, percentWithScore.to15)
    let to25 = calcPercent(percentPoison.to25, percentWithScore.to25)
    let to35 = calcPercent(percentPoison.to35, percentWithScore.to35)
    let tu15 = calcPercent(percentPoison.tu15, percentWithScore.tu15)
    let tu25 = calcPercent(percentPoison.tu25, percentWithScore.tu25)
    let tu35 = calcPercent(percentPoison.tu35, percentWithScore.tu35)
    let winOrDrawHome = calcPercent(percentPoison.winOrDrawHome, percentWithScore.winOrDrawHome)
    let winOrdrawAway = calcPercent(percentPoison.winOrdrawAway, percentWithScore.winOrdrawAway)
    let winnerAway = calcPercent(percentPoison.winnerAway, percentWithScore.winnerAway)
    let winnerHome = calcPercent(percentPoison.winnerHome, percentWithScore.winnerHome)

    const arrOutcomes = []
    const arrOutcomesForPredictions = {
        winnerHome: {
            outcomes: 'Победа 1',
            percent: winnerHome,
            odds: odds['1'],
            num: 1,
            bets: ['1', '4', '29', '33', '37', '76', '77']
        },
        winnerAway: {
            outcomes: 'Победа 2',
            percent: winnerAway,
            odds: odds['2'],
            num: 2,
            bets: ['2', '5', '51', '55', '59', '89', '90']
        },
        draw: {
            outcomes: 'Ничья',
            percent: draw,
            odds: odds['3'],
            num: 3,
            bets: ['3', '4', '5']
        },
        winOrDrawHome: {
            outcomes: '1X',
            percent: winOrDrawHome,
            odds: odds['4'],
            num: 4,
            bets: ['4', '3']
        },
        winOrdrawAway: {
            outcomes: '2X',
            percent: winOrdrawAway,
            odds: odds['5'],
            num: 5,
            bets: ['5', '3']
        },
        foraHomeMinus15: {
            outcomes: 'Фора 1 -1.5',
            percent: foraHomeMinus15,
            odds: odds['77'],
            num: 77,
            bets: ['77', '1', '4', '29', '33', '37', '76']
        },
        foraHomePlus15: {
            outcomes: 'Фора 1 +1.5',
            percent: foraHomePlus15,
            odds: odds['76'],
            num: 76,
            bets: ['76']
        },
        foraAwayMinus15: {
            outcomes: 'Фора 2 -1.5',
            percent: foraAwayMinus15,
            odds: odds['90'],
            num: 90,
            bets: ['90', '2', '5', '51', '55', '59', '89']
        },
        foraAwayPlus15: {
            outcomes: 'Фора 2 +1.5',
            percent: foraAwayPlus15,
            odds: odds['89'],
            num: 89,
            bets: ['89']
        },
        to15: {
            outcomes: 'Тотал больше 1.5',
            percent: to15,
            odds: odds['11'],
            num: 11,
            bets: ['11']
        },
        tu15: {
            outcomes: 'Тотал меньше 1.5',
            percent: tu15,
            odds: odds['12'],
            num: 12,
            bets: ['12', '16', '20']
        },
        to25: {
            outcomes: 'Тотал больше 2.5',
            percent: to25,
            odds: odds['15'],
            num: 15,
            bets: ['15', '11']
        },
        tu25: {
            outcomes: 'Тотал меньше 2.5',
            percent: tu25,
            odds: odds['16'],
            num: 16,
            bets: ['16', '20']
        },
        to35: {
            outcomes: 'Тотал больше 3.5',
            percent: to35,
            odds: odds['19'],
            num: 19,
            bets: ['19', '15', '11']
        },
        tu35: {
            outcomes: 'Тотал меньше 3.5',
            percent: tu35,
            odds: odds['20'],
            num: 20, 
            bets: ['20']
        },
        btsYes: {
            outcomes: 'Обе забьют ДА',
            percent: btsYes,
            odds: odds['99'],
            num: 99,
            bets: ['99', '11']
        },
        btsNo: {
            outcomes: 'Обе забьют Нет',
            percent: btsNo,
            odds: odds['100'],
            num: 100,
            bets: ['100']
        },
        it1O05: {
            outcomes: 'Команда 1 забьет',
            percent: it1O05,
            odds: odds['29'],
            num: 29,
            bets: ['29']
        },
        it1O15: {
            outcomes: 'Ит1 больше 1.5',
            percent: it1O15,
            odds: odds['33'],
            num: 33,
            bets: ['33', '29']
        },
        it1O25: {
            outcomes: 'Ит1 больше 2.5',
            percent: it1O25,
            odds: odds['37'],
            num: 37,
            bets: ['37', '33', '29']
        },
        it1U05: {
            outcomes: 'Команда 1 не забьет',
            percent: it1U05,
            odds: odds['30'],
            num: 30,
            bets: ['30', '34', '38']
        },
        it1U15: {
            outcomes: 'Ит1 меньше 1.5',
            percent: it1U15,
            odds: odds['34'],
            num: 34, 
            bets: ['34', '38']
        },
        it1U25: {
            outcomes: 'Ит1 меньше 2.5',
            percent: it1U25,
            odds: odds['38'],
            num: 38,
            bets: ['38']
        },
        it2O05: {
            outcomes: 'Команда 2 забьет',
            percent: it2O05,
            odds: odds['51'],
            num: 51,
            bets: ['51']
        },
        it2O15: {
            outcomes: 'Ит2 больше 1.5',
            percent: it2O15,
            odds: odds['55'],
            num: 55,
            bets: ['55', '51']
        },
        it2O25: {
            outcomes: 'Ит2 больше 2.5',
            percent: it2O25,
            odds: odds['59'],
            num: 59,
            bets: ['59', '55', '51']
        },
        it2U05: {
            outcomes: 'Команда 2 не забьет',
            percent: it2U05,
            odds: odds['52'],
            num: 52,
            bets: ['52', '56', '60']
        },
        it2U15: {
            outcomes: 'Ит2 меньше 1.5',
            percent: it2U15,
            odds: odds['56'],
            num: 56,
            bets: ['56', '60']
        },
        it2U25: {
            outcomes: 'Ит2 меньше 2.5',
            percent: it2U25,
            odds: odds['60'],
            num: 60,
            bets: ['60']
        },
    }

    if (odds['1'] >= 1.45) {
        const obj = {
            outcomes: 'Победа 1',
            percent: winnerHome,
            odds: odds['1']
        }
        arrOutcomes.push(obj)
    }
    if (odds['3'] >= 1.45) {
        const obj = {
            outcomes: 'Ничья',
            percent: draw,
            odds: odds['3']
        }
        arrOutcomes.push(obj)
    }
    if (odds['2'] >= 1.45) {
        const obj = {
            outcomes: 'Победа 2',
            percent: winnerAway,
            odds: odds['2']
        }
        arrOutcomes.push(obj)
    }
    if (odds['4'] >= 1.45) {
        const obj = {
            outcomes: '1X',
            percent: winOrDrawHome,
            odds: odds['4']
        }
        arrOutcomes.push(obj)
    }
    if (odds['5'] >= 1.45) {
        const obj = {
            outcomes: '2X',
            percent: winOrdrawAway,
            odds: odds['5']
        }
        arrOutcomes.push(obj)
    }
    if (odds['77'] >= 1.45) {
        const obj = {
            outcomes: 'Фора 1 -1.5',
            percent: foraHomeMinus15,
            odds: odds['77']
        }
        arrOutcomes.push(obj)
    }
    if (odds['76'] >= 1.45) {
        const obj = {
            outcomes: 'Фора 1 +1.5',
            percent: foraHomePlus15,
            odds: odds['76']
        }
        arrOutcomes.push(obj)
    }
    if (odds['90'] >= 1.45) {
        const obj = {
            outcomes: 'Фора 2 -1.5',
            percent: foraAwayMinus15,
            odds: odds['90']
        }
        arrOutcomes.push(obj)
    }
    if (odds['89'] >= 1.45) {
        const obj = {
            outcomes: 'Фора 2 +1.5',
            percent: foraAwayPlus15,
            odds: odds['89']
        }
        arrOutcomes.push(obj)
    }
    if (odds['11'] >= 1.45) {
        const obj = {
            outcomes: 'Тотал больше 1.5',
            percent: to15,
            odds: odds['11']
        }
        arrOutcomes.push(obj)
    }
    if (odds['12'] >= 1.45) {
        const obj = {
            outcomes: 'Тотал меньше 1.5',
            percent: tu15,
            odds: odds['12']
        }
        arrOutcomes.push(obj)
    }
    if (odds['15'] >= 1.45) {
        const obj = {
            outcomes: 'Тотал больше 2.5',
            percent: to25,
            odds: odds['15']
        }
        arrOutcomes.push(obj)
    }
    if (odds['16'] >= 1.45) {
        const obj = {
            outcomes: 'Тотал меньше 2.5',
            percent: tu25,
            odds: odds['16']
        }
        arrOutcomes.push(obj)
    }
    if (odds['19'] >= 1.45) {
        const obj = {
            outcomes: 'Тотал больше 3.5',
            percent: to35,
            odds: odds['19']
        }
        arrOutcomes.push(obj)
    }
    if (odds['20'] >= 1.45) {
        const obj = {
            outcomes: 'Тотал меньше 3.5',
            percent: tu35,
            odds: odds['20']
        }
        arrOutcomes.push(obj)
    }
    if (odds['99'] >= 1.45) {
        const obj = {
            outcomes: 'Обе забьют ДА',
            percent: btsYes,
            odds: odds['99']
        }
        arrOutcomes.push(obj)
    }
    if (odds['100'] >= 1.45) {
        const obj = {
            outcomes: 'Обе забьют Нет',
            percent: btsNo,
            odds: odds['100']
        }
        arrOutcomes.push(obj)
    }
    if (odds['29'] >= 1.45) {
        const obj = {
            outcomes: 'Команда 1 забьет',
            percent: it1O05,
            odds: odds['29']
        }
        arrOutcomes.push(obj)
    }
    if (odds['33'] >= 1.45) {
        const obj = {
            outcomes: 'Ит1 больше 1.5',
            percent: it1O15,
            odds: odds['33']
        }
        arrOutcomes.push(obj)
    }
    if (odds['37'] >= 1.45) {
        const obj = {
            outcomes: 'Ит1 больше 2.5',
            percent: it1O25,
            odds: odds['37']
        }
        arrOutcomes.push(obj)
    }
    if (odds['30'] >= 1.45) {
        const obj = {
            outcomes: 'Команда 1 не забьет',
            percent: it1U05,
            odds: odds['30']
        }
        arrOutcomes.push(obj)
    }
    if (odds['34'] >= 1.45) {
        const obj = {
            outcomes: 'Ит1 меньше 1.5',
            percent: it1U15,
            odds: odds['34']
        }
        arrOutcomes.push(obj)
    }
    if (odds['38'] >= 1.45) {
        const obj = {
            outcomes: 'Ит1 меньше 2.5',
            percent: it1U25,
            odds: odds['38']
        }
        arrOutcomes.push(obj)
    }
    if (odds['51'] >= 1.45) {
        const obj = {
            outcomes: 'Команда 2 забьет',
            percent: it2O05,
            odds: odds['51']
        }
        arrOutcomes.push(obj)
    }
    if (odds['55'] >= 1.45) {
        const obj = {
            outcomes: 'Ит2 больше 1.5',
            percent: it2O15,
            odds: odds['55']
        }
        arrOutcomes.push(obj)
    }
    if (odds['59'] >= 1.45) {
        const obj = {
            outcomes: 'Ит2 больше 2.5',
            percent: it2O25,
            odds: odds['59']
        }
        arrOutcomes.push(obj)
    }
    if (odds['52'] >= 1.45) {
        const obj = {
            outcomes: 'Команда 2 не забьет',
            percent: it2U05,
            odds: odds['52']
        }
        arrOutcomes.push(obj)
    }
    if (odds['56'] >= 1.45) {
        const obj = {
            outcomes: 'Ит2 меньше 1.5',
            percent: it2U15,
            odds: odds['56']
        }
        arrOutcomes.push(obj)
    }
    if (odds['60'] >= 1.45) {
        const obj = {
            outcomes: 'Ит2 меньше 2.5',
            percent: it2U25,
            odds: odds['60']
        }
        arrOutcomes.push(obj)
    }

    return {
        arrOutcomesForPredictions,
        arrOutcomes
    };
}