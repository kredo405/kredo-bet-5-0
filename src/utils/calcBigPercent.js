export const calcBigPercent = (percentPoison, percentWithScore, matchOdds) => {

    const calcPercent = (percentPoison, percentWithScore) => {
        if (percentPoison !== 0  && percentWithScore !== 0) {
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

    let btsNo = calcPercent(percentPoison.btsNo,  percentWithScore.btsNo)
    let btsYes = calcPercent(percentPoison.btsYes,  percentWithScore.btsYes)
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

    for (let key in matchOdds.markets) {
        if (key === 'win1' && +matchOdds.markets[key].v >= 1.3 || key === 'win1' && +matchOdds.markets[key].v === 0) {
            const obj = {
                outcomes: 'Победа 1',
                percent: winnerHome,
                odds: matchOdds.markets[key].v
            }
            arrOutcomes.push(obj)
        }
        if (key === 'winX' && +matchOdds.markets[key].v >= 1.3 || key === 'winX' && +matchOdds.markets[key].v === 0) {
            const obj = {
                outcomes: 'Ничья',
                percent: draw,
                odds: matchOdds.markets[key].v
            }
            arrOutcomes.push(obj)
        }
        if (key === 'win2' && +matchOdds.markets[key].v >= 1.3 || key === 'win2' && +matchOdds.markets[key].v === 0) {
            const obj = {
                outcomes: 'Победа 2',
                percent: winnerAway,
                odds: matchOdds.markets[key].v
            }
            arrOutcomes.push(obj)
        }
        if (key === 'win1X' && +matchOdds.markets[key].v >= 1.3 || key === 'win1X' && +matchOdds.markets[key].v === 0) {
            const obj = {
                outcomes: '1X',
                percent: winOrDrawHome,
                odds: matchOdds.markets[key].v
            }
            arrOutcomes.push(obj)
        }
        if (key === 'winX2' && +matchOdds.markets[key].v >= 1.3 || key === 'winX2' && +matchOdds.markets[key].v === 0) {
            const obj = {
                outcomes: '2X',
                percent: winOrdrawAway,
                odds: matchOdds.markets[key].v
            }
            arrOutcomes.push(obj)
        }
        if (key === 'handicaps1') {
            matchOdds.markets[key].forEach(el => {
                if(el.type === -1.5 && +el.v >= 1.3) {
                    const obj = {
                        outcomes: 'Фора 1 -1.5',
                        percent: foraHomeMinus15,
                        odds: el.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 1.5 && +el.v >= 1.3) {
                    const obj = {
                        outcomes: 'Фора 1 +1.5',
                        percent: foraHomePlus15,
                        odds: el.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === -1.5 && +el.v === 0) {
                    const obj = {
                        outcomes: 'Фора 1 -1.5',
                        percent: foraHomeMinus15,
                        odds: el.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 1.5 && +el.v === 0) {
                    const obj = {
                        outcomes: 'Фора 1 +1.5',
                        percent: foraHomePlus15,
                        odds: el.v
                    }
                    arrOutcomes.push(obj)
                }
            })
        }
        if (key === 'handicaps2') {
            matchOdds.markets[key].forEach(el => {
                if(el.type === -1.5 && +el.v >= 1.3) {
                    const obj = {
                        outcomes: 'Фора 2 -1.5',
                        percent: foraAwayMinus15,
                        odds: el.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 1.5 && +el.v >= 1.3) {
                    const obj = {
                        outcomes: 'Фора 2 +1.5',
                        percent: foraAwayPlus15,
                        odds: el.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === -1.5 && +el.v === 0) {
                    const obj = {
                        outcomes: 'Фора 2 -1.5',
                        percent: foraAwayPlus15,
                        odds: el.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 1.5 && +el.v === 0) {
                    const obj = {
                        outcomes: 'Фора 2 +1.5',
                        percent: foraAwayPlus15,
                        odds: el.v
                    }
                    arrOutcomes.push(obj)
                }
            })
            
        }
        if (key === 'totals') {
            matchOdds.markets[key].forEach(el => {
                if(el.type === 1.5 && +el.over.v >= 1.3) {
                    const obj = {
                        outcomes: 'Тотал больше 1.5',
                        percent: to15,
                        odds: el.over.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 1.5 && +el.under.v >= 1.3) {
                    const obj = {
                        outcomes: 'Тотал меньше 1.5',
                        percent: tu15,
                        odds: el.under.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 2.5 && +el.over.v >= 1.3) {
                    const obj = {
                        outcomes: 'Тотал больше 2.5',
                        percent: to25,
                        odds: el.over.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 2.5 && +el.under.v >= 1.3) {
                    const obj = {
                        outcomes: 'Тотал меньше 2.5',
                        percent: tu25,
                        odds: el.under.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 3.5 && +el.over.v >= 1.3) {
                    const obj = {
                        outcomes: 'Тотал больше 3.5',
                        percent: to35,
                        odds: el.over.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 3.5 && +el.under.v >= 1.3) {
                    const obj = {
                        outcomes: 'Тотал меньше 3.5',
                        percent: tu35,
                        odds: el.under.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 1.5 && +el.over.v === 0) {
                    const obj = {
                        outcomes: 'Тотал больше 1.5',
                        percent: to15,
                        odds: el.over.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 1.5 && +el.under.v === 0) {
                    const obj = {
                        outcomes: 'Тотал меньше 1.5',
                        percent: tu15,
                        odds: el.under.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 2.5 && +el.over.v === 0) {
                    const obj = {
                        outcomes: 'Тотал больше 2.5',
                        percent: to25,
                        odds: el.over.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 2.5 && +el.under.v === 0) {
                    const obj = {
                        outcomes: 'Тотал меньше 2.5',
                        percent: tu25,
                        odds: el.under.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 3.5 && +el.over.v === 0) {
                    const obj = {
                        outcomes: 'Тотал больше 3.5',
                        percent: to35,
                        odds: el.over.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 3.5 && +el.under.v === 0) {
                    const obj = {
                        outcomes: 'Тотал меньше 3.5',
                        percent: tu35,
                        odds: el.under.v
                    }
                    arrOutcomes.push(obj)
                }
            }) 
        }
        if (key === 'bothToScore' && +matchOdds.markets[key].yes.v >= 1.3 || key === 'bothToScore' && +matchOdds.markets[key].yes.v === 0) {
            const obj = {
                outcomes: 'Обе забьют ДА',
                percent: btsYes,
                odds: matchOdds.markets[key].yes.v
            }
            arrOutcomes.push(obj)
        }
        if (key === 'bothToScore' && +matchOdds.markets[key].no.v >= 1.3 || key === 'bothToScore' && +matchOdds.markets[key].no.v === 0) {
            const obj = {
                outcomes: 'Обе забьют Нет',
                percent: btsNo,
                odds: matchOdds.markets[key].no.v
            }
            arrOutcomes.push(obj)
        }
        if (key === 'totals1') {
            matchOdds.markets[key].forEach(el => {
                if(el.type === 0.5 && +el.over.v >= 1.3) {
                    const obj = {
                        outcomes: 'Команда 1 забьет',
                        percent: it1O05,
                        odds: el.over.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 1.5 && +el.over.v >= 1.3) {
                    const obj = {
                        outcomes: 'Ит1 больше 1.5',
                        percent: it1O15,
                        odds: el.over.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 2.5 && +el.over.v >= 1.3) {
                    const obj = {
                        outcomes: 'Ит1 больше 2.5',
                        percent: it1O25,
                        odds: el.over.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 0.5 && +el.under.v >= 1.3) {
                    const obj = {
                        outcomes: 'Команда 1 не забьет',
                        percent: it1U05,
                        odds: el.under.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 1.5 && +el.under.v >= 1.3) {
                    const obj = {
                        outcomes: 'Ит1 меньше 1.5',
                        percent: it1U15,
                        odds: el.under.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 2.5 && +el.under >= 1.3) {
                    const obj = {
                        outcomes: 'Ит1 меньше 2.5',
                        percent: it1U25,
                        odds: el.under.v
                    }
                    arrOutcomes.push(obj)
                }
        
                if(el.type === 0.5 && +el.over.v === 0) {
                    const obj = {
                        outcomes: 'Команда 1 забьет',
                        percent: it1O05,
                        odds: el.over.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 1.5 && +el.over.v === 0) {
                    const obj = {
                        outcomes: 'Ит1 больше 1.5',
                        percent: it1O15,
                        odds: el.over.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 2.5 && +el.over.v === 0) {
                    const obj = {
                        outcomes: 'Ит1 больше 2.5',
                        percent: it1O25,
                        odds: el.over.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 0.5 && +el.under.v === 0) {
                    const obj = {
                        outcomes: 'Команда 1 не забьет',
                        percent: it1U05,
                        odds: el.under.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 1.5 && +el.under.v === 0) {
                    const obj = {
                        outcomes: 'Ит1 меньше 1.5',
                        percent: it1U15,
                        odds: el.under.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 2.5 && +el.under === 0) {
                    const obj = {
                        outcomes: 'Ит1 меньше 2.5',
                        percent: it1U25,
                        odds: el.under.v
                    }
                    arrOutcomes.push(obj)
                }
            })
        }
        if (key === 'totals2') {
            matchOdds.markets[key].forEach(el => {
                if(el.type === 0.5 && +el.over.v >= 1.3) {
                    const obj = {
                        outcomes: 'Команда 2 забьет',
                        percent: it2O05,
                        odds: el.over.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 1.5 && +el.over.v >= 1.3) {
                    const obj = {
                        outcomes: 'Ит2 больше 1.5',
                        percent: it2O15,
                        odds: el.over.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 2.5 && +el.over.v >= 1.3) {
                    const obj = {
                        outcomes: 'Ит2 больше 2.5',
                        percent: it2O25,
                        odds: el.over.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 0.5 && +el.under.v >= 1.3) {
                    const obj = {
                        outcomes: 'Команда 2 не забьет',
                        percent: it2U05,
                        odds: el.under.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 1.5 && +el.under.v >= 1.3) {
                    const obj = {
                        outcomes: 'Ит2 меньше 1.5',
                        percent: it2U15,
                        odds: el.under.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 2.5 && +el.under >= 1.3) {
                    const obj = {
                        outcomes: 'Ит2 меньше 2.5',
                        percent: it2U25,
                        odds: el.under.v
                    }
                    arrOutcomes.push(obj)
                }
        
                if(el.type === 0.5 && +el.over.v === 0) {
                    const obj = {
                        outcomes: 'Команда 2 забьет',
                        percent: it2O05,
                        odds: el.over.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 1.5 && +el.over.v === 0) {
                    const obj = {
                        outcomes: 'Ит2 больше 1.5',
                        percent: it2O15,
                        odds: el.over.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 2.5 && +el.over.v === 0) {
                    const obj = {
                        outcomes: 'Ит2 больше 2.5',
                        percent: it2O25,
                        odds: el.over.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 0.5 && +el.under.v === 0) {
                    const obj = {
                        outcomes: 'Команда 2 не забьет',
                        percent: it2U05,
                        odds: el.under.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 1.5 && +el.under.v === 0) {
                    const obj = {
                        outcomes: 'Ит2 меньше 1.5',
                        percent: it2U15,
                        odds: el.under.v
                    }
                    arrOutcomes.push(obj)
                }
                if(el.type === 2.5 && +el.under === 0) {
                    const obj = {
                        outcomes: 'Ит2 меньше 2.5',
                        percent: it2U25,
                        odds: el.under.v
                    }
                    arrOutcomes.push(obj)
                }
            })
        }
    }

    const getMaxOfArray = (numArray) => {
        const max = Math.max(...numArray.map(obj => obj.percent))

        return max
    }

    const max1 = getMaxOfArray(arrOutcomes)
    const arrOutcomes1 = arrOutcomes.filter(el => el.percent !== max1)
    const max2 = getMaxOfArray(arrOutcomes1)
    const arrOutcomes2 = arrOutcomes1.filter(el => el.percent !== max2)
    const max3 = getMaxOfArray(arrOutcomes2)
    const arrOutcomes3 = arrOutcomes2.filter(el => el.percent !== max3)
    const max4 = getMaxOfArray(arrOutcomes3)
    const arrOutcomes4 = arrOutcomes3.filter(el => el.percent !== max4)
    const max5 = getMaxOfArray(arrOutcomes4)
    const arrOutcomes5 = arrOutcomes4.filter(el => el.percent !== max5)
    const max6 = getMaxOfArray(arrOutcomes5)
    const arrOutcomes6 = arrOutcomes5.filter(el => el.percent !== max6)
    const max7 = getMaxOfArray(arrOutcomes6)
    const arrOutcomes7 = arrOutcomes6.filter(el => el.percent !== max7)
    const max8 = getMaxOfArray(arrOutcomes7)
    const arrOutcomes8 = arrOutcomes7.filter(el => el.percent !== max8)
    const max9 = getMaxOfArray(arrOutcomes8)
    const arrOutcomes9 = arrOutcomes8.filter(el => el.percent !== max9)
    const max10 = getMaxOfArray(arrOutcomes9)

    const arrMaxNumber = [max1, max2, max3, max4, max5, max6, max7, max8, max9, max10]

    const result = arrMaxNumber.map(el => {
        const res = arrOutcomes.filter(item => item.percent === el)
        return res[0]
    })

    const resultFilter = result.filter(el => el)

    console.log(resultFilter)

    return resultFilter

}