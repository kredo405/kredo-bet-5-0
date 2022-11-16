export const calcBigPercent = (percentPoison, percentMatches, percentWithScore, correctScore, matchOdds) => {

    const calcPercent = (percentPoison, percentMatches, percentWithScore, correctScore) => {
        if (percentPoison !== 0 && percentMatches !== 0 && percentWithScore !== 0 && correctScore !== 0) {
            let result = (percentPoison + percentMatches + percentWithScore + correctScore) / 4
            return result
        }
        if (percentPoison !== 0 && percentMatches === 0 && percentWithScore === 0 && correctScore === 0) {
            let result = (percentPoison + percentMatches + percentWithScore + correctScore) / 4
            return result
        }
        if (percentPoison !== 0 && percentMatches === 0 && percentWithScore === 0 && correctScore !== 0) {
            let result = (percentPoison + percentMatches + percentWithScore + correctScore) / 4
            return result
        }
        if (percentPoison !== 0 && percentMatches === 0 && percentWithScore !== 0 && correctScore === 0) {
            let result = (percentPoison + percentMatches + percentWithScore + correctScore) / 4
            return result
        }
        if (percentPoison !== 0 && percentMatches !== 0 && percentWithScore !== 0 && correctScore === 0) {
            let result = (percentPoison + percentMatches + percentWithScore) / 3
            return result
        }
        if (percentPoison !== 0 && percentMatches !== 0 && percentWithScore === 0 && correctScore === 0) {
            let result = (percentPoison + percentMatches) / 2
            return result
        }
        if (percentPoison !== 0 && percentMatches === 0 && percentWithScore !== 0 && correctScore !== 0) {
            let result = (percentPoison + percentWithScore + correctScore) / 3
            return result
        }
        if (percentPoison !== 0 && percentMatches === 0 && percentWithScore === 0 && correctScore !== 0) {
            let result = (percentPoison + correctScore) / 2
            return result
        }
        if (percentPoison !== 0 && percentMatches === 0 && percentWithScore !== 0 && correctScore === 0) {
            let result = (percentPoison + percentWithScore) / 2
            return result
        }
        if (percentPoison !== 0 && percentMatches !== 0 && percentWithScore === 0 && correctScore !== 0) {
            let result = (percentPoison + percentMatches + correctScore) / 3
            return result
        }
        return 0
    }

    let btsNo = calcPercent(percentPoison.btsNo, percentMatches.btsNo, percentWithScore.btsNo, correctScore.btsNo)
    let btsYes = calcPercent(percentPoison.btsYes, percentMatches.btsYes, percentWithScore.btsYes, correctScore.btsYes)
    let draw = calcPercent(percentPoison.draw, percentMatches.draw, percentWithScore.draw, correctScore.draw)
    let foraAwayMinus15 = calcPercent(percentPoison.foraAwayMinus15, percentMatches.foraAwayMinus15, percentWithScore.foraAwayMinus15, correctScore.foraAwayMinus15)
    let foraAwayPlus15 = calcPercent(percentPoison.foraAwayPlus15, percentMatches.foraAwayPlus15, percentWithScore.foraAwayPlus15, correctScore.foraAwayPlus15)
    let foraHomeMinus15 = calcPercent(percentPoison.foraHomeMinus15, percentMatches.foraHomeMinus15, percentWithScore.foraHomeMinus15, correctScore.foraHomeMinus15)
    let foraHomePlus15 = calcPercent(percentPoison.foraHomePlus15, percentMatches.foraHomePlus15, percentWithScore.foraHomePlus15, correctScore.foraHomePlus15)
    let it1O05 = calcPercent(percentPoison.it1O05, percentMatches.it1O05, percentWithScore.it1O05, correctScore.it1O05)
    let it1O15 = calcPercent(percentPoison.it1O15, percentMatches.it1O15, percentWithScore.it1O15, correctScore.it1O15)
    let it1O25 = calcPercent(percentPoison.it1O25, percentMatches.it1O25, percentWithScore.it1O25, correctScore.it1O25)
    let it1U05 = calcPercent(percentPoison.it1U05, percentMatches.it1U05, percentWithScore.it1U05, correctScore.it1U05)
    let it1U15 = calcPercent(percentPoison.it1U15, percentMatches.it1U15, percentWithScore.it1U15, correctScore.it1U15)
    let it1U25 = calcPercent(percentPoison.it1U25, percentMatches.it1U25, percentWithScore.it1U25, correctScore.it1U25)
    let it2O05 = calcPercent(percentPoison.it2O05, percentMatches.it2O05, percentWithScore.it2O05, correctScore.it2O05)
    let it2O15 = calcPercent(percentPoison.it2O15, percentMatches.it2O15, percentWithScore.it2O15, correctScore.it2O15)
    let it2O25 = calcPercent(percentPoison.it2O25, percentMatches.it2O25, percentWithScore.it2O25, correctScore.it2O25)
    let it2U05 = calcPercent(percentPoison.it2U05, percentMatches.it2U05, percentWithScore.it2U05, correctScore.it2U05)
    let it2U15 = calcPercent(percentPoison.it2U15, percentMatches.it2U15, percentWithScore.it2U15, correctScore.it2U15)
    let it2U25 = calcPercent(percentPoison.it2U25, percentMatches.it2U25, percentWithScore.it2U25, correctScore.it2U25)
    let to15 = calcPercent(percentPoison.to15, percentMatches.to15, percentWithScore.to15, correctScore.to15)
    let to25 = calcPercent(percentPoison.to25, percentMatches.to25, percentWithScore.to25, correctScore.to25)
    let to35 = calcPercent(percentPoison.to35, percentMatches.to35, percentWithScore.to35, correctScore.to35)
    let tu15 = calcPercent(percentPoison.tu15, percentMatches.tu15, percentWithScore.tu15, correctScore.tu15)
    let tu25 = calcPercent(percentPoison.tu25, percentMatches.tu25, percentWithScore.tu25, correctScore.tu25)
    let tu35 = calcPercent(percentPoison.tu35, percentMatches.tu35, percentWithScore.tu35, correctScore.tu35)
    let winOrDrawHome = calcPercent(percentPoison.winOrDrawHome, percentMatches.winOrDrawHome, percentWithScore.winOrDrawHome, correctScore.winOrDrawHome)
    let winOrdrawAway = calcPercent(percentPoison.winOrdrawAway, percentMatches.winOrdrawAway, percentWithScore.winOrdrawAway, correctScore.winOrdrawAway)
    let winnerAway = calcPercent(percentPoison.winnerAway, percentMatches.winnerAway, percentWithScore.winnerAway, correctScore.winnerAway)
    let winnerHome = calcPercent(percentPoison.winnerHome, percentMatches.winnerHome, percentWithScore.winnerHome, correctScore.winnerHome)

    const arrOutcomes = []

    for (let key in matchOdds.markets) {
        if (key === 'win1' && +matchOdds.markets[key].v >= 1.3 || key === 'win1' && +matchOdds.markets[key].v === 0) {
            arrOutcomes.push(winnerHome)
        }
        if (key === 'winX' && +matchOdds.markets[key].v >= 1.3 || key === 'winX' && +matchOdds.markets[key].v === 0) {
            arrOutcomes.push(draw)
        }
        if (key === 'win2' && +matchOdds.markets[key].v >= 1.3 || key === 'win2' && +matchOdds.markets[key].v === 0) {
            arrOutcomes.push(winnerAway)
        }
        if (key === 'win1X' && +matchOdds.markets[key].v >= 1.3 || key === 'win1X' && +matchOdds.markets[key].v === 0) {
            arrOutcomes.push(winOrDrawHome)
        }
        if (key === 'winX2' && +matchOdds.markets[key].v >= 1.3 || key === 'winX2' && +matchOdds.markets[key].v === 0) {
            arrOutcomes.push(winOrdrawAway)
        }
        if (key === 'handicaps1' && +matchOdds.markets[key][1].v >= 1.3 || key === 'handicaps1' && +matchOdds.markets[key][1].v === 0) {
            arrOutcomes.push(foraHomeMinus15)
        }
        if (key === 'handicaps2' && +matchOdds.markets[key][1].v >= 1.3 || key === 'handicaps2' && +matchOdds.markets[key][1].v === 0) {
            arrOutcomes.push(foraAwayMinus15)
        }
        if (key === 'handicaps1' && matchOdds.markets[key][0] && +matchOdds.markets[key][0].v >= 1.3 || key === 'handicaps1' && matchOdds.markets[key][0] && +matchOdds.markets[key][0].v === 0) {
            arrOutcomes.push(foraHomePlus15)
        }
        if (key === 'handicaps2' && matchOdds.markets[key][0] && +matchOdds.markets[key][0].v >= 1.3 || key === 'handicaps2' && matchOdds.markets[key][0] && +matchOdds.markets[key][0].v === 0) {
            arrOutcomes.push(foraAwayPlus15)
        }
        if (key === 'totals' && +matchOdds.markets[key][0].over.v >= 1.3 || key === 'totals' && +matchOdds.markets[key][0].over.v === 0) {
            arrOutcomes.push(to15)
        }
        if (key === 'totals' && +matchOdds.markets[key][1].over.v >= 1.3 || key === 'totals' && +matchOdds.markets[key][1].over.v === 0) {
            arrOutcomes.push(to25)
        }
        if (key === 'totals' && +matchOdds.markets[key][2].over.v >= 1.3 || key === 'totals' && +matchOdds.markets[key][2].over.v === 0) {
            arrOutcomes.push(to35)
        }
        if (key === 'totals' && +matchOdds.markets[key][0].under.v >= 1.3 || key === 'totals' && +matchOdds.markets[key][0].under.v === 0) {
            arrOutcomes.push(tu15)
        }
        if (key === 'totals' && +matchOdds.markets[key][1].under.v >= 1.3 || key === 'totals' && +matchOdds.markets[key][1].under.v === 0) {
            arrOutcomes.push(tu25)
        }
        if (key === 'totals' && +matchOdds.markets[key][2].under.v >= 1.3 || key === 'totals' && +matchOdds.markets[key][2].under.v === 0) {
            arrOutcomes.push(tu35)
        }
        if (key === 'bothToScore' && +matchOdds.markets[key].yes.v >= 1.3 || key === 'bothToScore' && +matchOdds.markets[key].yes.v === 0) {
            arrOutcomes.push(btsYes)
        }
        if (key === 'bothToScore' && +matchOdds.markets[key].no.v >= 1.3 || key === 'bothToScore' && +matchOdds.markets[key].no.v === 0) {
            arrOutcomes.push(btsNo)
        }
        if (key === 'totals1' && +matchOdds.markets[key][0].over.v >= 1.3 || key === 'totals1' && +matchOdds.markets[key][0].over.v === 0) {
            arrOutcomes.push(it1O05)
        }
        if (key === 'totals1' && +matchOdds.markets[key][1].over.v >= 1.3 || key === 'totals1' && +matchOdds.markets[key][1].over.v === 0) {
            arrOutcomes.push(it1O15)
        }
        if (key === 'totals1' && matchOdds.markets[key][2] && +matchOdds.markets[key][2].over.v >= 1.3 || key === 'totals1' && matchOdds.markets[key][2] && +matchOdds.markets[key][2].over.v === 0) {
            arrOutcomes.push(it1O25)
        }
        if (key === 'totals1' && +matchOdds.markets[key][0].under.v >= 1.3 || key === 'totals1' && +matchOdds.markets[key][0].under.v === 0) {
            arrOutcomes.push(it1U05)
        }
        if (key === 'totals1' && +matchOdds.markets[key][1].under.v >= 1.3 || key === 'totals1' && +matchOdds.markets[key][1].under.v === 0) {
            arrOutcomes.push(it1U15)
        }
        if (key === 'totals1' && matchOdds.markets[key][2] && +matchOdds.markets[key][2].under.v >= 1.3 || key === 'totals1' && matchOdds.markets[key][2] && +matchOdds.markets[key][2].under.v === 0) {
            arrOutcomes.push(it1U25)
        }
        if (key === 'totals2' && +matchOdds.markets[key][0].over.v >= 1.3 || key === 'totals2' && +matchOdds.markets[key][0].over.v === 0) {
            arrOutcomes.push(it2O05)
        }
        if (key === 'totals2' && +matchOdds.markets[key][1].over.v >= 1.3 || key === 'totals2' && +matchOdds.markets[key][1].over.v === 0) {
            arrOutcomes.push(it2O15)
        }
        if (key === 'totals2' && matchOdds.markets[key][2] && +matchOdds.markets[key][2].over.v >= 1.3 || key === 'totals2' && matchOdds.markets[key][2] && +matchOdds.markets[key][2].over.v === 0) {
            arrOutcomes.push(it2O25)
        }
        if (key === 'totals2' && +matchOdds.markets[key][0].under.v >= 1.3 || key === 'totals2' && +matchOdds.markets[key][0].under.v === 0) {
            arrOutcomes.push(it2U05)
        }
        if (key === 'totals2' && +matchOdds.markets[key][1].under.v >= 1.3 || key === 'totals2' && +matchOdds.markets[key][1].under.v === 0) {
            arrOutcomes.push(it2U15)
        }
        if (key === 'totals2' && matchOdds.markets[key][2] && +matchOdds.markets[key][2].under.v >= 1.3 || key === 'totals2' && matchOdds.markets[key][2] && +matchOdds.markets[key][2].under.v === 0) {
            arrOutcomes.push(it2U25)
        }
    }

    const getMaxOfArray = (numArray) => {
        const max = Math.max.apply(null, numArray)

        return max
    }

    const max1 = getMaxOfArray(arrOutcomes)
    const arrOutcomes1 = arrOutcomes.filter(el => el !== max1)
    const max2 = getMaxOfArray(arrOutcomes1)
    const arrOutcomes2 = arrOutcomes1.filter(el => el !== max2)
    const max3 = getMaxOfArray(arrOutcomes2)
    const arrOutcomes3 = arrOutcomes2.filter(el => el !== max3)
    const max4 = getMaxOfArray(arrOutcomes3)
    const arrOutcomes4 = arrOutcomes3.filter(el => el !== max4)
    const max5 = getMaxOfArray(arrOutcomes4)
    const arrOutcomes5 = arrOutcomes4.filter(el => el !== max5)
    const max6 = getMaxOfArray(arrOutcomes5)
    const arrOutcomes6 = arrOutcomes5.filter(el => el !== max6)
    const max7 = getMaxOfArray(arrOutcomes6)
    const arrOutcomes7 = arrOutcomes6.filter(el => el !== max7)
    const max8 = getMaxOfArray(arrOutcomes7)
    const arrOutcomes8 = arrOutcomes7.filter(el => el !== max8)
    const max9 = getMaxOfArray(arrOutcomes8)
    const arrOutcomes9 = arrOutcomes8.filter(el => el !== max9)
    const max10 = getMaxOfArray(arrOutcomes9)

    //поиск по числу названиz исхода
    const findOutcomes = (el) => {
        if(el === btsNo) {
            return {
                outcomes: 'Обе забьют Нет',
                odds: matchOdds.markets.bothToScore.no.v,
                percent: btsNo
            }
        }
        if(el === btsNo) {
            return {
                outcomes: 'Обе забьют Да',
                odds: matchOdds.markets.bothToScore.yes.v,
                percent: btsYes
            }
        }
        if(el === draw) {
            return {
                outcomes: 'Ничья',
                odds: matchOdds.markets.winX.v,
                percent: draw
            }
        }
        if(el === foraAwayMinus15) {
            return {
                outcomes: 'Ф2-1.5',
                odds:  matchOdds.markets.handicaps2[1] ? matchOdds.markets.handicaps2[1].v : 0,
                percent: foraAwayMinus15
            }
        }
        if(el === foraAwayPlus15) {
            return {
                outcomes: 'Ф2+1.5',
                odds: matchOdds.markets.handicaps2[0] ? matchOdds.markets.handicaps2[0].v : 0,
                percent: foraAwayPlus15
            }
        }
        if(el === foraHomeMinus15) {
            return {
                outcomes: 'Ф1-1.5',
                odds: matchOdds.markets.handicaps1[1] ? matchOdds.markets.handicaps1[1].v : 0,
                percent: foraHomeMinus15
            }
        }
        if(el === foraHomePlus15) {
            return {
                outcomes: 'Ф1+1.5',
                odds: matchOdds.markets.handicaps1[0] ? matchOdds.markets.handicaps1[0].v : 0,
                percent: foraHomePlus15
            }
        }
        if(el === it1O05) {
            return {
                outcomes: 'Команда 1 забьет',
                odds: matchOdds.markets.totals1[0] ? matchOdds.markets.totals1[0].over.v : 0,
                percent: it1O05
            }
        }
        if(el === it1O15) {
            return {
                outcomes: 'Ит1 Больше 1.5',
                odds: matchOdds.markets.totals1[1] ? matchOdds.markets.totals1[1].over.v : 0,
                percent: it1O15
            }
        }
        if(el === it1O25) {
            return {
                outcomes: 'Ит1 Больше 2.5',
                odds: matchOdds.markets.totals1[2] ? matchOdds.markets.totals1[2].over.v : 0,
                percent: it1O25
            }
        }
        if(el === it1U05) {
            return {
                outcomes: 'Команда 1 не забьет',
                odds: matchOdds.markets.totals1[0] ? matchOdds.markets.totals1[0].under.v : 0,
                percent: it1U05
            }
        }
        if(el === it1U15) {
            return {
                outcomes: 'Ит1 меньше 1.5',
                odds: matchOdds.markets.totals1[1] ? matchOdds.markets.totals1[1].under.v : 0,
                percent: it1U15
            }
        }
        if(el === it1U25) {
            return {
                outcomes: 'Ит1 меньше 2.5',
                odds: matchOdds.markets.totals1[2] ? matchOdds.markets.totals1[2].under.v : 0,
                percent: it1U25
            }
        }

        if(el === it2O05) {
            return {
                outcomes: 'Команда 2 забьет',
                odds: matchOdds.markets.totals2[0] ? matchOdds.markets.totals2[0].over.v : 0,
                percent: it2O05
            }
        }
        if(el === it2O15) {
            return {
                outcomes: 'Ит2 Больше 1.5',
                odds: matchOdds.markets.totals2[1] ? matchOdds.markets.totals2[1].over.v : 0,
                percent: it2O15
            }
        }
        if(el === it2O25) {
            return {
                outcomes: 'Ит2 Больше 2.5',
                odds: matchOdds.markets.totals2[2] ? matchOdds.markets.totals2[2].over.v : 0,
                percent: it2O25
            }
        }
        if(el === it2U05) {
            return {
                outcomes: 'Команда 2 не забьет',
                odds: matchOdds.markets.totals2[0] ? matchOdds.markets.totals2[0].under.v : 0,
                percent: it2U05
            }
        }
        if(el === it2U15) {
            return {
                outcomes: 'Ит2 меньше 1.5',
                odds: matchOdds.markets.totals2[1] ? matchOdds.markets.totals2[1].under.v : 0,
                percent: it2U15
            }
        }
        if(el === it2U25) {
            return {
                outcomes: 'Ит2 меньше 2.5',
                odds: matchOdds.markets.totals2[2] ? matchOdds.markets.totals2[2].under.v : 0,
                percent: it2U25
            }
        }
        if(el === to15) {
            return {
                outcomes: 'Тотал больше 1.5',
                odds: matchOdds.markets.totals[0] ? matchOdds.markets.totals[0].over.v : 0,
                percent: to15
            }
        }
        if(el === to25) {
            return {
                outcomes: 'Тотал больше 2.5',
                odds: matchOdds.markets.totals[1] ? matchOdds.markets.totals[1].over.v : 0,
                percent: to25
            }
        }
        if(el === to35) {
            return {
                outcomes: 'Тотал больше 3.5',
                odds: matchOdds.markets.totals[2] ? matchOdds.markets.totals[2].over.v : 0,
                percent: to35
            }
        }
        if(el === tu15) {
            return {
                outcomes: 'Тотал меньше 1.5',
                odds: matchOdds.markets.totals[0] ? matchOdds.markets.totals[0].under.v : 0,
                percent: tu15
            }
        }
        if(el === tu25) {
            return {
                outcomes: 'Тотал меньше 2.5',
                odds: matchOdds.markets.totals[1] ? matchOdds.markets.totals[1].under.v : 0,
                percent: tu25
            }
        }
        if(el === tu35) {
            return {
                outcomes: 'Тотал меньше 3.5',
                odds: matchOdds.markets.totals[2] ? matchOdds.markets.totals[2].under.v : 0,
                percent: tu35
            }
        }
        if(el === winOrDrawHome) {
            return {
                outcomes: '1X',
                odds: matchOdds.markets.win1X.v,
                percent: winOrDrawHome
            }
        }
        if(el === winOrdrawAway) {
            return {
                outcomes: '2X',
                odds: matchOdds.markets.winX2.v,
                percent: winOrdrawAway
            }
        }
        if(el === winnerAway) {
            return {
                outcomes: 'Победа 2',
                odds: matchOdds.markets.win2.v,
                percent: winnerAway
            }
        }
        if(el === winnerHome) {
            return {
                outcomes: 'Победа 1',
                odds: matchOdds.markets.win1.v,
                percent: winnerHome
            }
        }
    }

    const arrMaxNumber = [max1, max2, max3, max4, max5, max6, max7, max8, max9, max10]

    const result = arrMaxNumber.map(el => {
        const res = findOutcomes(el)
        return res
    })

    const resultFilter = result.filter(el => el)

    console.log(resultFilter)

    return resultFilter

}