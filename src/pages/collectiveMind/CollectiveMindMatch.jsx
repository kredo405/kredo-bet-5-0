import Header from "../../components/header/Header"
import MoneyWay from "../../components/MoneyWay/MoneyWay"
import findTeam from "../../utils/findTeam"
import { useSelector, useDispatch } from "react-redux"
import { Table } from 'react-bootstrap'

const CollectiveMindMatch = () => {
    const state = useSelector(state => state)
    const percent = state.match.percent
    const green = 'bg-green-200 flex justify-center'
    const rose = 'bg-rose-200 flex justify-center'
    const blue = 'bg-sky-200 flex justify-center'
    const odds = state.odds.filter(el => findTeam(el.team1, state.match.homeName) && findTeam(el.team2, state.match.awayName))
    let oddsFilter = []

    if (odds.length === 0) {
        oddsFilter.push({
            date_start: '',
            team1_rus: '',
            team2_rus: '',
            markets: {
                bothToScore: {
                    no: { v: 0 },
                    yes: { v: 0 },
                },
                handicaps1: [{ type: -1.5, v: 0 }, { type: 1.5, v: 0 }],
                handicaps2: [{ type: -1.5, v: 0 }, { type: 1.5, v: 0 }],
                totals: [
                    { over: { v: 0 }, type: 1.5, under: { v: 0 } },
                    { over: { v: 0 }, type: 2.5, under: { v: 0 } },
                    { over: { v: 0 }, type: 3.5, under: { v: 0 } },
                ],
                totals1: [
                    { type: 0.5, over: { v: 0 }, under: { v: 0 } },
                    { type: 1.5, over: { v: 0 }, under: { v: 0 } },
                    { type: 2.5, over: { v: 0 }, under: { v: 0 } },
                ],
                totals2: [
                    { type: 0.5, over: { v: 0 }, under: { v: 0 } },
                    { type: 1.5, over: { v: 0 }, under: { v: 0 } },
                    { type: 2.5, over: { v: 0 }, under: { v: 0 } },
                ],
                win1: { v: 0 },
                win1X: { v: 0 },
                win2: { v: 0 },
                winX: { v: 0 },
                winX2: { v: 0 },
            }
        })
    } else {
        oddsFilter = odds.map(el => {

            const totals = el.markets.totals.filter(bet => bet.type === 1.5 || bet.type === 2.5 || bet.type === 3.5)
            const totals1 = el.markets.totals1.filter(bet => bet.type === 0.5 || bet.type === 1.5 || bet.type === 2.5)
            const totals2 = el.markets.totals2.filter(bet => bet.type === 0.5 || bet.type === 1.5 || bet.type === 2.5)
            const handicap1 = el.markets.handicaps1.filter(bet => bet.type === 1.5 || bet.type === -1.5)
            const handicap2 = el.markets.handicaps2.filter(bet => bet.type === 1.5 || bet.type === -1.5)

            return {
                date_start: el.date_start,
                team1_rus: el.team1_rus,
                team2_rus: el.team2_rus,
                markets: {
                    bothToScore: {
                        no: { v: el.markets.bothToScore.no.v },
                        yes: { v: el.markets.bothToScore.yes.v },
                    },
                    handicaps1: handicap1,
                    handicaps2: handicap2,
                    totals: totals,
                    totals1: totals1,
                    totals2: totals2,
                    win1: { v: el.markets.win1.v },
                    win1X: { v: el.markets.win1X.v },
                    win2: { v: el.markets.win2.v },
                    winX: { v: el.markets.winX.v },
                    winX2: { v: el.markets.winX2.v },
                }
            }
        })
    }

    return (
        <>
            <Header />
            <div>
                <h2>Вероятность</h2>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Ставка</th>
                        <th>%</th>
                        <th>Кэф</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>П1</td>
                        <td><p className={percent.winnerHome >= 55 ? green : percent.winnerHome < 55 && percent.winnerHome >= 40 ? blue : rose}>{percent.winnerHome.toFixed(0)}</p></td>
                        <td><p className={+oddsFilter[0].markets.win1.v >= 1.4 && +oddsFilter[0].markets.win1.v <= 6 ? green : rose}>{oddsFilter[0].markets.win1.v.toFixed(2)}</p></td>
                    </tr>
                    <tr>
                        <td>X</td>
                        <td><p className={percent.draw >= 55 ? green : percent.draw < 55 && percent.draw >= 40 ? blue : rose}>{percent.draw.toFixed(0)}</p></td>
                        <td><p className={+oddsFilter[0].markets.winX.v >= 1.4 && +oddsFilter[0].markets.winX.v <= 6 ? green : rose}>{oddsFilter[0].markets.winX.v.toFixed(2)}</p></td>
                    </tr>
                    <tr>
                        <td>П2</td>
                        <td><p className={percent.winnerAway >= 55 ? green : percent.winnerAway < 55 && percent.winnerAway >= 40 ? blue : rose}>{percent.winnerAway.toFixed(0)}</p></td>
                        <td><p className={+oddsFilter[0].markets.win2.v >= 1.4 && +oddsFilter[0].markets.win2.v <= 6 ? green : rose}>{oddsFilter[0].markets.win2.v.toFixed(2)}</p></td>
                    </tr>
                    <tr>
                        <td>1X</td>
                        <td><p className={percent.winOrDrawHome >= 55 ? green : percent.winOrDrawHome < 55 && percent.winOrDrawHome >= 40 ? blue : rose}>{percent.winOrDrawHome.toFixed(0)}</p></td>
                        <td><p className={+oddsFilter[0].markets.win1X.v >= 1.4 && +oddsFilter[0].markets.win1X.v <= 6 ? green : rose}>{oddsFilter[0].markets.win1X.v.toFixed(2)}</p></td>
                    </tr>
                    <tr>
                        <td>2X</td>
                        <td><p className={percent.winOrdrawAway >= 55 ? green : percent.winOrdrawAway < 55 && percent.winOrdrawAway >= 40 ? blue : rose}>{percent.winOrdrawAway.toFixed(0)}</p></td>
                        <td><p className={+oddsFilter[0].markets.winX2.v >= 1.4 && +oddsFilter[0].markets.winX2.v <= 6 ? green : rose}>{oddsFilter[0].markets.winX2.v.toFixed(2)}</p></td>
                    </tr>
                    <tr>
                        <td>Ф1-1.5</td>
                        <td><p className={percent.foraHomeMinus15 >= 55 ? green : percent.foraHomeMinus15 < 55 && percent.foraHomeMinus15 >= 40 ? blue : rose}>{percent.foraHomeMinus15.toFixed(0)}</p></td>
                        <td><p className={+oddsFilter[0].markets.handicaps1[0].v >= 1.4 && +oddsFilter[0].markets.handicaps1[0].v <= 6 ? green : rose}>{oddsFilter[0].markets.handicaps1[0].v.toFixed(2)}</p></td>
                    </tr>
                    <tr>
                        <td>Ф2-1.5</td>
                        <td><p className={percent.foraAwayMinus15 >= 55 ? green : percent.foraAwayMinus15 < 55 && percent.foraAwayMinus15 >= 40 ? blue : rose}>{percent.foraAwayMinus15.toFixed(0)}</p></td>
                        <td><p className={+oddsFilter[0].markets.handicaps2[1].v >= 1.4 && +oddsFilter[0].markets.handicaps2[1].v <= 6 ? green : rose}>{oddsFilter[0].markets.handicaps2[1].v.toFixed(2)}</p></td>
                    </tr>
                    <tr>
                        <td>Ф1+1.5</td>
                        <td><p className={percent.foraHomePlus15 >= 65 ? green : percent.foraHomePlus15 < 65 && percent.foraHomePlus15 >= 50 ? blue : rose}>{percent.foraHomePlus15.toFixed(0)}</p></td>
                        <td><p className={+oddsFilter[0].markets.handicaps1[1].v >= 1.4 && +oddsFilter[0].markets.handicaps1[1].v <= 6 ? green : rose}>{oddsFilter[0].markets.handicaps1[1].v.toFixed(2)}</p></td>
                    </tr>
                    <tr>
                        <td>Ф2+1.5</td>
                        <td><p className={percent.foraAwayPlus15 >= 65 ? green : percent.foraAwayPlus15 < 65 && percent.foraAwayPlus15 >= 50 ? blue : rose}>{percent.foraAwayPlus15.toFixed(0)}</p></td>
                        <td><p className={+oddsFilter[0].markets.handicaps2[0].v >= 1.4 && +oddsFilter[0].markets.handicaps2[0].v <= 6 ? green : rose}>{oddsFilter[0].markets.handicaps2[0].v.toFixed(2)}</p></td>
                    </tr>
                    <tr>
                        <td>ТБ 1.5</td>
                        <td><p className={percent.to15 >= 60 ? green : percent.to15 < 60 && percent.to15 >= 50 ? blue : rose}>{percent.to15.toFixed(0)}</p></td>
                        <td><p className={+oddsFilter[0].markets.totals[0].over.v >= 1.4 && +oddsFilter[0].markets.totals[0].over.v <= 6 ? green : rose}>{oddsFilter[0].markets.totals[0].over.v.toFixed(2)}</p></td>
                    </tr>
                    <tr>
                        <td>ТБ 2.5</td>
                        <td><p className={percent.to25 >= 60 ? green : percent.to25 < 60 && percent.to25 >= 50 ? blue : rose}>{percent.to25.toFixed(0)}</p></td>
                        <td><p className={+oddsFilter[0].markets.totals[1].over.v >= 1.4 && +oddsFilter[0].markets.totals[1].over.v <= 6 ? green : rose}>{oddsFilter[0].markets.totals[1].over.v.toFixed(2)}</p></td>
                    </tr>
                    <tr>
                        <td>ТБ 3.5</td>
                        <td><p className={percent.to35 >= 60 ? green : percent.to35 < 60 && percent.to35 >= 50 ? blue : rose}>{percent.to35.toFixed(0)}</p></td>
                        <td><p className={+oddsFilter[0].markets.totals[2].over.v >= 1.4 && +oddsFilter[0].markets.totals[2].over.v <= 6 ? green : rose}>{oddsFilter[0].markets.totals[2].over.v.toFixed(2)}</p></td>
                    </tr>
                    <tr>
                        <td>ТМ 3.5</td>
                        <td><p className={percent.tu35 >= 60 ? green : percent.tu35 < 60 && percent.tu35 >= 50 ? blue : rose}>{percent.tu35.toFixed(0)}</p></td>
                        <td><p className={+oddsFilter[0].markets.totals[2].under.v >= 1.4 && +oddsFilter[0].markets.totals[2].under.v <= 6 ? green : rose}>{oddsFilter[0].markets.totals[2].under.v.toFixed(2)}</p></td>
                    </tr>
                    <tr>
                        <td>ТМ 2.5</td>
                        <td><p className={percent.tu25 >= 60 ? green : percent.tu25 < 60 && percent.tu25 >= 50 ? blue : rose}>{percent.tu25.toFixed(0)}</p></td>
                        <td><p className={+oddsFilter[0].markets.totals[1].under.v >= 1.4 && +oddsFilter[0].markets.totals[1].under.v <= 6 ? green : rose}>{oddsFilter[0].markets.totals[1].under.v.toFixed(2)}</p></td>
                    </tr>
                    <tr>
                        <td>ТМ 1.5</td>
                        <td><p className={percent.tu15 >= 60 ? green : percent.tu15 < 60 && percent.tu15 >= 50 ? blue : rose}>{percent.tu15.toFixed(0)}</p></td>
                        <td><p className={+oddsFilter[0].markets.totals[0].under.v >= 1.4 && +oddsFilter[0].markets.totals[0].under.v <= 6 ? green : rose}>{oddsFilter[0].markets.totals[0].under.v.toFixed(2)}</p></td>
                    </tr>
                    <tr>
                        <td>ОЗ Да</td>
                        <td><p className={percent.btsYes >= 60 ? green : percent.btsYes < 60 && percent.btsYes >= 50 ? blue : rose}>{percent.btsYes.toFixed(0)}</p></td>
                        <td><p className={+oddsFilter[0].markets.bothToScore.yes.v >= 1.4 && +oddsFilter[0].markets.bothToScore.yes.v <= 6 ? green : rose}>{oddsFilter[0].markets.bothToScore.yes.v.toFixed(2)}</p></td>
                    </tr>
                    <tr>
                        <td>ОЗ Нет</td>
                        <td><p className={percent.btsNo >= 60 ? green : percent.btsNo < 60 && percent.btsNo >= 50 ? blue : rose}>{percent.btsNo.toFixed(0)}</p></td>
                        <td><p className={+oddsFilter[0].markets.bothToScore.no.v >= 1.4 && +oddsFilter[0].markets.bothToScore.no.v <= 6 ? green : rose}>{oddsFilter[0].markets.bothToScore.no.v.toFixed(2)}</p></td>
                    </tr>
                    <tr>
                        <td>ИТ1Б0.5</td>
                        <td><p className={percent.it1O05 >= 60 ? green : percent.it1O05 < 60 && percent.it1O05 >= 50 ? blue : rose}>{percent.it1O05.toFixed(0)}</p></td>
                        <td><p className={+oddsFilter[0].markets.totals1[0].over.v >= 1.4 && +oddsFilter[0].markets.totals1[0].over.v <= 6 ? green : rose}>{oddsFilter[0].markets.totals1[0].over.v.toFixed(2)}</p></td>
                    </tr>
                    <tr>
                        <td>ИТ1Б1.5</td>
                        <td><p className={percent.it1O15 >= 60 ? green : percent.it1O15 < 60 && percent.it1O15 >= 50 ? blue : rose}>{percent.it1O15.toFixed(0)}</p></td>
                        <td><p className={+oddsFilter[0].markets.totals1[1].over.v >= 1.4 && +oddsFilter[0].markets.totals1[1].over.v <= 6 ? green : rose}>{oddsFilter[0].markets.totals1[1].over.v.toFixed(2)}</p></td>
                    </tr>
                    <tr>
                        <td>ИТ1Б2.5</td>
                        <td><p className={percent.it1O25 >= 60 ? green : percent.it1O25 < 60 && percent.it1O25 >= 50 ? blue : rose}>{percent.it1O25.toFixed(0)}</p></td>
                        <td><p className={+oddsFilter[0].markets.totals1[2].over.v >= 1.4 && +oddsFilter[0].markets.totals1[2].over.v <= 6 ? green : rose}>{oddsFilter[0].markets.totals1[2].over.v.toFixed(2)}</p></td>
                    </tr>
                    <tr>
                        <td>ИТ1М2.5</td>
                        <td><p className={percent.it1U25 >= 60 ? green : percent.it1U25 < 60 && percent.it1U25 >= 50 ? blue : rose}>{percent.it1U25.toFixed(0)}</p></td>
                        <td><p className={+oddsFilter[0].markets.totals1[2].under.v >= 1.4 && +oddsFilter[0].markets.totals1[2].under.v <= 6 ? green : rose}>{oddsFilter[0].markets.totals1[2].under.v.toFixed(2)}</p></td>
                    </tr>
                    <tr>
                        <td>ИТ1М1.5</td>
                        <td><p className={percent.it1U15 >= 60 ? green : percent.it1U15 < 60 && percent.it1U15 >= 50 ? blue : rose}>{percent.it1U15.toFixed(0)}</p></td>
                        <td><p className={+oddsFilter[0].markets.totals1[1].under.v >= 1.4 && +oddsFilter[0].markets.totals1[1].under.v <= 6 ? green : rose}>{oddsFilter[0].markets.totals1[1].under.v.toFixed(2)}</p></td>
                    </tr>
                    <tr>
                        <td>ИТ1М0.5</td>
                        <td><p className={percent.it1U05 >= 60 ? green : percent.it1U05 < 60 && percent.it1U05 >= 50 ? blue : rose}>{percent.it1U05.toFixed(0)}</p></td>
                        <td><p className={+oddsFilter[0].markets.totals1[0].under.v >= 1.4 && +oddsFilter[0].markets.totals1[0].under.v <= 6 ? green : rose}>{oddsFilter[0].markets.totals1[0].under.v.toFixed(2)}</p></td>
                    </tr>
                    <tr>
                        <td>ИТ2Б0.5</td>
                        <td><p className={percent.it2O05 >= 60 ? green : percent.it2O05 < 60 && percent.it2O05 >= 50 ? blue : rose}>{percent.it2O05.toFixed(0)}</p></td>
                        <td><p className={+oddsFilter[0].markets.totals2[0].over.v >= 1.4 && +oddsFilter[0].markets.totals2[0].over.v <= 6 ? green : rose}>{oddsFilter[0].markets.totals2[0].over.v.toFixed(2)}</p></td>
                    </tr>
                    <tr>
                        <td>ИТ2Б1.5</td>
                        <td><p className={percent.it2O15 >= 60 ? green : percent.it2O15 < 60 && percent.it2O15 >= 50 ? blue : rose}>{percent.it2O15.toFixed(0)}</p></td>
                        <td><p className={+oddsFilter[0].markets.totals2[1].over.v >= 1.4 && +oddsFilter[0].markets.totals2[1].over.v <= 6 ? green : rose}>{oddsFilter[0].markets.totals2[1].over.v.toFixed(2)}</p></td>
                    </tr>
                    <tr>
                        <td>ИТ2Б2.5</td>
                        <td><p className={percent.it2O25 >= 60 ? green : percent.it2O25 < 60 && percent.it2O25 >= 50 ? blue : rose}>{percent.it2O25.toFixed(0)}</p></td>
                        <td><p className={+oddsFilter[0].markets.totals2[2].over.v >= 1.4 && +oddsFilter[0].markets.totals2[2].over.v <= 6 ? green : rose}>{oddsFilter[0].markets.totals2[2].over.v.toFixed(2)}</p></td>
                    </tr>
                    <tr>
                        <td>ИТ2М2.5</td>
                        <td><p className={percent.it2U25 >= 60 ? green : percent.it2U25 < 60 && percent.it2U25 >= 50 ? blue : rose}>{percent.it2U25.toFixed(0)}</p></td>
                        <td><p className={+oddsFilter[0].markets.totals2[2].under.v >= 1.4 && +oddsFilter[0].markets.totals2[2].under.v <= 6 ? green : rose}>{oddsFilter[0].markets.totals2[2].under.v.toFixed(2)}</p></td>
                    </tr>
                    <tr>
                        <td>ИТ2М1.5</td>
                        <td><p className={percent.it2U15 >= 60 ? green : percent.it2U15 < 60 && percent.it2U15 >= 50 ? blue : rose}>{percent.it2U15.toFixed(0)}</p></td>
                        <td><p className={+oddsFilter[0].markets.totals2[1].under.v >= 1.4 && +oddsFilter[0].markets.totals2[1].under.v <= 6 ? green : rose}>{oddsFilter[0].markets.totals2[1].under.v.toFixed(2)}</p></td>
                    </tr>
                    <tr>
                        <td>ИТ2М0.5</td>
                        <td><p className={percent.it2U05 >= 60 ? green : percent.it2U05 < 60 && percent.it2U05 >= 50 ? blue : rose}>{percent.it2U05.toFixed(0)}</p></td>
                        <td><p className={+oddsFilter[0].markets.totals2[0].under.v >= 1.4 && +oddsFilter[0].markets.totals2[0].under.v <= 6 ? green : rose}>{oddsFilter[0].markets.totals2[0].under.v.toFixed(2)}</p></td>
                    </tr>
                </tbody>
            </Table>
            <MoneyWay homeName={state.match.homeName} awayName={state.match.awayName} />
        </>
    )
}

export default CollectiveMindMatch