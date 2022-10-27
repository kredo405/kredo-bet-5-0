import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from 'react-bootstrap';
import { arbworldServices } from "../../services/arbworld";
import { calcCorrectScore } from "../../utils/calcCorrectScore";
import findTeam from "../../utils/findTeam";

const ToolsPrediction = (props) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [matchOdds, setMatchOdds] = useState({
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
    const [correctScore, setCorrectScore] = useState([])
    const { percentPoison, percentMatches, percentWithScore, homeName, awayName } = props;

    useEffect(() => {
        state.odds.forEach(el => {
            if (findTeam(el.team1_rus, homeName) && findTeam(el.team2_rus, awayName)) {

                const totals = el.markets.totals.filter(bet => bet.type === 1.5 || bet.type === 2.5 || bet.type === 3.5)
                const totals1 = el.markets.totals1.filter(bet => bet.type === 0.5 || bet.type === 1.5 || bet.type === 2.5)
                const totals2 = el.markets.totals2.filter(bet => bet.type === 0.5 || bet.type === 1.5 || bet.type === 2.5)
                const handicap1 = el.markets.handicaps1.filter(bet => bet.type === 1.5 || bet.type === -1.5)
                const handicap2 = el.markets.handicaps2.filter(bet => bet.type === 1.5 || bet.type === -1.5)

                const objOdds = {
                    date_start: el.date_start,
                    team1_rus: el.team1_rus,
                    team2_rus: el.team2_rus,
                    team1: el.team1,
                    team2: el.team2,
                    markets: {
                        bothToScore: el.markets.bothToScore,
                        handicaps1: [
                            handicap1.find(item => item.type === 1.5),
                            handicap1.find(item => item.type === -1.5),
                        ],
                        handicaps2: [
                            handicap2.find(item => item.type === 1.5),
                            handicap2.find(item => item.type === -1.5),
                        ],
                        totals: [
                            totals.find(item => item.type === 1.5),
                            totals.find(item => item.type === 2.5),
                            totals.find(item => item.type === 3.5),
                        ],
                        totals1: [
                            totals1.find(item => item.type === 0.5),
                            totals1.find(item => item.type === 1.5),
                            totals1.find(item => item.type === 2.5),
                        ],
                        totals2: [
                            totals2.find(item => item.type === 0.5),
                            totals2.find(item => item.type === 1.5),
                            totals2.find(item => item.type === 2.5),
                        ],
                        win1: el.markets.win1,
                        win1X: el.markets.win1X,
                        win2: el.markets.win2,
                        winX: el.markets.winX,
                        winX2: el.markets.winX2,
                    }
                }
                dispatch({
                    type: 'HOMENAMEENG',
                    payload: el.team1
                })

                dispatch({
                    type: 'AWAYNAMEENG',
                    payload: el.team2
                })
                console.log(objOdds)
                setMatchOdds(objOdds)
            }
            else {
                console.log('не нашлось')
            }
        })

        const getData = async () => {
            try {
                const correctScore = await arbworldServices.getcorrectScore()
                console.log(correctScore)

                const correctScoreFilter = correctScore.data.moneyWay.map(el => {
                    const pos = el.teamName.indexOf('vs')
                    const homeName = el.teamName.slice(0, pos)
                    const awayName = el.teamName.slice(pos + 2)

                    const scores = el.scores.map(item => {
                        const elements = ['score0_0', 'score0_1', 'score0_2', 'score0_3', 'score1_0', 'score1_1', 'score1_2', 'score1_3',
                            'score2_0', 'score2_1', 'score2_2', 'score2_3', 'score3_0', 'score3_1', 'score3_2', 'score3_3',]

                        elements.forEach(element => {
                            if (item[element]) {
                                const pos = item[element].indexOf('%')
                                item[element] = +item[element].slice(0, pos)
                            }
                        })

                        return item
                    })

                    const percentOutcomes = calcCorrectScore(el.scores)

                    return {
                        homeName: homeName,
                        awayName: awayName,
                        scores: scores,
                        date: el.date,
                        league: el.leagueName,
                        percentOutcomes: percentOutcomes,
                    }
                })

                console.log(correctScoreFilter)

                const correctScoreMatch = correctScoreFilter.filter(item => findTeam(item.homeName, state.homeNameEng) && findTeam(item.awayName, state.awayNameEng))

                console.log(correctScoreMatch)

                setCorrectScore(correctScoreMatch)
            }
            catch (error) {
                console.log(error)
            }
        }

        getData()

    }, [state.odds])


    const green = 'bg-green-200 flex justify-center font-mono';
    const rose = 'bg-rose-200 flex justify-center font-mono';
    const blue = 'bg-sky-200 flex justify-center font-mono';


    return (
        <>
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Ставка</th>
                            <th>РП</th>
                            <th>ПМ</th>
                            <th>СП</th>
                            <th>Кэф</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>П1</td>
                            <td><p className={percentPoison.winnerHome >= 55 ? green : percentPoison.winnerHome < 55 && percentPoison.winnerHome >= 40 ? blue : rose}>{percentPoison.winnerHome.toFixed(0)}</p></td>
                            <td><p className={percentMatches.winnerHome >= 55 ? green : percentMatches.winnerHome < 55 && percentMatches.winnerHome >= 40 ? blue : rose}>{percentMatches.winnerHome.toFixed(0)}</p></td>
                            <td><p className={percentWithScore.winnerHome >= 55 ? green : percentWithScore.winnerHome < 55 && percentWithScore.winnerHome >= 40 ? blue : rose}>{percentWithScore.winnerHome.toFixed(0)}</p></td>
                            <td><p>{matchOdds.markets.win1.v.toFixed(2)}</p></td>
                        </tr>
                        <tr>
                            <td>X</td>
                            <td><p className={percentPoison.draw >= 55 ? green : percentPoison.draw < 55 && percentPoison.draw >= 40 ? blue : rose}>{percentPoison.draw.toFixed(0)}</p></td>
                            <td><p className={percentMatches.draw >= 55 ? green : percentMatches.draw < 55 && percentMatches.draw >= 40 ? blue : rose}>{percentMatches.draw.toFixed(0)}</p></td>
                            <td><p className={percentWithScore.draw >= 55 ? green : percentWithScore.draw < 55 && percentWithScore.draw >= 40 ? blue : rose}>{percentWithScore.draw.toFixed(0)}</p></td>
                            <td><p>{matchOdds.markets.winX.v.toFixed(2)}</p></td>
                        </tr>
                        <tr>
                            <td>П2</td>
                            <td><p className={percentPoison.winnerAway >= 55 ? green : percentPoison.winnerAway < 55 && percentPoison.winnerAway >= 40 ? blue : rose}>{percentPoison.winnerAway.toFixed(0)}</p></td>
                            <td><p className={percentMatches.winnerAway >= 55 ? green : percentMatches.winnerAway < 55 && percentMatches.winnerAway >= 40 ? blue : rose}>{percentMatches.winnerAway.toFixed(0)}</p></td>
                            <td><p className={percentWithScore.winnerAway >= 55 ? green : percentWithScore.winnerAway < 55 && percentWithScore.winnerAway >= 40 ? blue : rose}>{percentWithScore.winnerAway.toFixed(0)}</p></td>
                            <td><p>{matchOdds.markets.win2.v.toFixed(2)}</p></td>
                        </tr>
                        <tr>
                            <td>1X</td>
                            <td><p className={percentPoison.winOrDrawHome >= 55 ? green : percentPoison.winOrDrawHome < 55 && percentPoison.winOrDrawHome >= 40 ? blue : rose}>{percentPoison.winOrDrawHome.toFixed(0)}</p></td>
                            <td><p className={percentMatches.winOrDrawHome >= 55 ? green : percentMatches.winOrDrawHome < 55 && percentMatches.winOrDrawHome >= 40 ? blue : rose}>{percentMatches.winOrDrawHome.toFixed(0)}</p></td>
                            <td><p className={percentWithScore.winOrDrawHome >= 55 ? green : percentWithScore.winOrDrawHome < 55 && percentWithScore.winOrDrawHome >= 40 ? blue : rose}>{percentWithScore.winOrDrawHome.toFixed(0)}</p></td>
                            <td><p>{matchOdds.markets.win1X.v.toFixed(2)}</p></td>
                        </tr>
                        <tr>
                            <td>2X</td>
                            <td><p className={percentPoison.winOrdrawAway >= 55 ? green : percentPoison.winOrdrawAway < 55 && percentPoison.winOrdrawAway >= 40 ? blue : rose}>{percentPoison.winOrdrawAway.toFixed(0)}</p></td>
                            <td><p className={percentMatches.winOrdrawAway >= 55 ? green : percentMatches.winOrdrawAway < 55 && percentMatches.winOrdrawAway >= 40 ? blue : rose}>{percentMatches.winOrdrawAway.toFixed(0)}</p></td>
                            <td><p className={percentWithScore.winOrdrawAway >= 55 ? green : percentWithScore.winOrdrawAway < 55 && percentWithScore.winOrdrawAway >= 40 ? blue : rose}>{percentWithScore.winOrdrawAway.toFixed(0)}</p></td>
                            <td><p>{matchOdds.markets.winX2.v.toFixed(2)}</p></td>
                        </tr>
                        <tr>
                            <td>Ф1-1.5</td>
                            <td><p className={percentPoison.foraHomeMinus15 >= 55 ? green : percentPoison.foraHomeMinus15 < 55 && percentPoison.foraHomeMinus15 >= 40 ? blue : rose}>{percentPoison.foraHomeMinus15.toFixed(0)}</p></td>
                            <td><p className={percentMatches.foraHomeMinus15 >= 55 ? green : percentMatches.foraHomeMinus15 < 55 && percentMatches.foraHomeMinus15 >= 40 ? blue : rose}>{percentMatches.foraHomeMinus15.toFixed(0)}</p></td>
                            <td><p className={percentWithScore.foraHomeMinus15 >= 55 ? green : percentWithScore.foraHomeMinus15 < 55 && percentWithScore.foraHomeMinus15 >= 40 ? blue : rose}>{percentWithScore.foraHomeMinus15.toFixed(0)}</p></td>
                            <td><p>{matchOdds.markets.handicaps1[1].v.toFixed(2)}</p></td>
                        </tr>
                        <tr>
                            <td>Ф2-1.5</td>
                            <td><p className={percentPoison.foraAwayMinus15 >= 55 ? green : percentPoison.foraAwayMinus15 < 55 && percentPoison.foraAwayMinus15 >= 40 ? blue : rose}>{percentPoison.foraAwayMinus15.toFixed(0)}</p></td>
                            <td><p className={percentMatches.foraAwayMinus15 >= 55 ? green : percentMatches.foraAwayMinus15 < 55 && percentMatches.foraAwayMinus15 >= 40 ? blue : rose}>{percentMatches.foraAwayMinus15.toFixed(0)}</p></td>
                            <td><p className={percentWithScore.foraAwayMinus15 >= 55 ? green : percentWithScore.foraAwayMinus15 < 55 && percentWithScore.foraAwayMinus15 >= 40 ? blue : rose}>{percentWithScore.foraAwayMinus15.toFixed(0)}</p></td>
                            <td><p>{matchOdds.markets.handicaps2[1] ? matchOdds.markets.handicaps2[1].v.toFixed(2) : null}</p></td>
                        </tr>
                        <tr>
                            <td>Ф1+1.5</td>
                            <td><p className={percentPoison.foraHomePlus15 >= 65 ? green : percentPoison.foraHomePlus15 < 65 && percentPoison.foraHomePlus15 >= 50 ? blue : rose}>{percentPoison.foraHomePlus15.toFixed(0)}</p></td>
                            <td><p className={percentMatches.foraHomePlus15 >= 65 ? green : percentMatches.foraHomePlus15 < 65 && percentMatches.foraHomePlus15 >= 50 ? blue : rose}>{percentMatches.foraHomePlus15.toFixed(0)}</p></td>
                            <td><p className={percentWithScore.foraHomePlus15 >= 55 ? green : percentWithScore.foraHomePlus15 < 55 && percentWithScore.foraHomePlus15 >= 40 ? blue : rose}>{percentWithScore.foraHomePlus15.toFixed(0)}</p></td>
                            <td><p>{matchOdds.markets.handicaps1[0] ? matchOdds.markets.handicaps1[0].v.toFixed(2) : null}</p></td>
                        </tr>
                        <tr>
                            <td>Ф2+1.5</td>
                            <td><p className={percentPoison.foraAwayPlus15 >= 65 ? green : percentPoison.foraAwayPlus15 < 65 && percentPoison.foraAwayPlus15 >= 50 ? blue : rose}>{percentPoison.foraAwayPlus15.toFixed(0)}</p></td>
                            <td><p className={percentMatches.foraAwayPlus15 >= 65 ? green : percentMatches.foraAwayPlus15 < 65 && percentMatches.foraAwayPlus15 >= 50 ? blue : rose}>{percentMatches.foraAwayPlus15.toFixed(0)}</p></td>
                            <td><p className={percentWithScore.foraAwayPlus15 >= 55 ? green : percentWithScore.foraAwayPlus15 < 55 && percentWithScore.foraAwayPlus15 >= 40 ? blue : rose}>{percentWithScore.foraAwayPlus15.toFixed(0)}</p></td>
                            <td><p>{matchOdds.markets.handicaps2[0].v.toFixed(2)}</p></td>
                        </tr>
                        <tr>
                            <td>ТБ 1.5</td>
                            <td><p className={percentPoison.to15 >= 60 ? green : percentPoison.to15 < 60 && percentPoison.to15 >= 50 ? blue : rose}>{percentPoison.to15.toFixed(0)}</p></td>
                            <td><p className={percentMatches.to15 >= 60 ? green : percentMatches.to15 < 60 && percentMatches.to15 >= 50 ? blue : rose}>{percentMatches.to15.toFixed(0)}</p></td>
                            <td><p className={percentWithScore.to15 >= 55 ? green : percentWithScore.to15 < 55 && percentWithScore.to15 >= 40 ? blue : rose}>{percentWithScore.to15.toFixed(0)}</p></td>
                            <td><p>{matchOdds.markets.totals[0].over.v.toFixed(2)}</p></td>
                        </tr>
                        <tr>
                            <td>ТБ 2.5</td>
                            <td><p className={percentPoison.to25 >= 60 ? green : percentPoison.to25 < 60 && percentPoison.to25 >= 50 ? blue : rose}>{percentPoison.to25.toFixed(0)}</p></td>
                            <td><p className={percentMatches.to25 >= 60 ? green : percentMatches.to25 < 60 && percentMatches.to25 >= 50 ? blue : rose}>{percentMatches.to25.toFixed(0)}</p></td>
                            <td><p className={percentWithScore.to25 >= 55 ? green : percentWithScore.to25 < 55 && percentWithScore.to25 >= 40 ? blue : rose}>{percentWithScore.to25.toFixed(0)}</p></td>
                            <td><p>{matchOdds.markets.totals[1].over.v.toFixed(2)}</p></td>
                        </tr>
                        <tr>
                            <td>ТБ 3.5</td>
                            <td><p className={percentPoison.to35 >= 60 ? green : percentPoison.to35 < 60 && percentPoison.to35 >= 50 ? blue : rose}>{percentPoison.to35.toFixed(0)}</p></td>
                            <td><p className={percentMatches.to35 >= 60 ? green : percentMatches.to35 < 60 && percentMatches.to35 >= 50 ? blue : rose}>{percentMatches.to35.toFixed(0)}</p></td>
                            <td><p className={percentWithScore.to35 >= 55 ? green : percentWithScore.to35 < 55 && percentWithScore.to35 >= 40 ? blue : rose}>{percentWithScore.to35.toFixed(0)}</p></td>
                            <td><p>{matchOdds.markets.totals[2].over.v.toFixed(2)}</p></td>
                        </tr>
                        <tr>
                            <td>ТМ 3.5</td>
                            <td><p className={percentPoison.tu35 >= 60 ? green : percentPoison.tu35 < 60 && percentPoison.tu35 >= 50 ? blue : rose}>{percentPoison.tu35.toFixed(0)}</p></td>
                            <td><p className={percentMatches.tu35 >= 60 ? green : percentMatches.tu35 < 60 && percentMatches.tu35 >= 50 ? blue : rose}>{percentMatches.tu35.toFixed(0)}</p></td>
                            <td><p className={percentWithScore.tu35 >= 55 ? green : percentWithScore.tu35 < 55 && percentWithScore.tu35 >= 40 ? blue : rose}>{percentWithScore.tu35.toFixed(0)}</p></td>
                            <td><p>{matchOdds.markets.totals[2].under.v.toFixed(2)}</p></td>
                        </tr>
                        <tr>
                            <td>ТМ 2.5</td>
                            <td><p className={percentPoison.tu25 >= 60 ? green : percentPoison.tu25 < 60 && percentPoison.tu25 >= 50 ? blue : rose}>{percentPoison.tu25.toFixed(0)}</p></td>
                            <td><p className={percentMatches.tu25 >= 60 ? green : percentMatches.tu25 < 60 && percentMatches.tu25 >= 50 ? blue : rose}>{percentMatches.tu25.toFixed(0)}</p></td>
                            <td><p className={percentWithScore.tu25 >= 55 ? green : percentWithScore.tu25 < 55 && percentWithScore.tu25 >= 40 ? blue : rose}>{percentWithScore.tu25.toFixed(0)}</p></td>
                            <td><p>{matchOdds.markets.totals[1].under.v.toFixed(2)}</p></td>
                        </tr>
                        <tr>
                            <td>ТМ 1.5</td>
                            <td><p className={percentPoison.tu15 >= 60 ? green : percentPoison.tu15 < 60 && percentPoison.tu15 >= 50 ? blue : rose}>{percentPoison.tu15.toFixed(0)}</p></td>
                            <td><p className={percentMatches.tu15 >= 60 ? green : percentMatches.tu15 < 60 && percentMatches.tu15 >= 50 ? blue : rose}>{percentMatches.tu15.toFixed(0)}</p></td>
                            <td><p className={percentWithScore.tu15 >= 55 ? green : percentWithScore.tu15 < 55 && percentWithScore.tu15 >= 40 ? blue : rose}>{percentWithScore.tu15.toFixed(0)}</p></td>
                            <td><p>{matchOdds.markets.totals[0].under.v.toFixed(2)}</p></td>
                        </tr>
                        <tr>
                            <td>ОЗ Да</td>
                            <td><p className={percentPoison.btsYes >= 60 ? green : percentPoison.btsYes < 60 && percentPoison.btsYes >= 50 ? blue : rose}>{percentPoison.btsYes.toFixed(0)}</p></td>
                            <td><p className={percentMatches.btsYes >= 60 ? green : percentMatches.btsYes < 60 && percentMatches.btsYes >= 50 ? blue : rose}>{percentMatches.btsYes.toFixed(0)}</p></td>
                            <td><p className={percentWithScore.btsYes >= 55 ? green : percentWithScore.btsYes < 55 && percentWithScore.btsYes >= 40 ? blue : rose}>{percentWithScore.btsYes.toFixed(0)}</p></td>
                            <td><p>{matchOdds.markets.bothToScore.yes.v.toFixed(2)}</p></td>
                        </tr>
                        <tr>
                            <td>ОЗ Нет</td>
                            <td><p className={percentPoison.btsNo >= 60 ? green : percentPoison.btsNo < 60 && percentPoison.btsNo >= 50 ? blue : rose}>{percentPoison.btsNo.toFixed(0)}</p></td>
                            <td><p className={percentMatches.btsNo >= 60 ? green : percentMatches.btsNo < 60 && percentMatches.btsNo >= 50 ? blue : rose}>{percentMatches.btsNo.toFixed(0)}</p></td>
                            <td><p className={percentWithScore.btsNo >= 55 ? green : percentWithScore.btsNo < 55 && percentWithScore.btsNo >= 40 ? blue : rose}>{percentWithScore.btsNo.toFixed(0)}</p></td>
                            <td><p>{matchOdds.markets.bothToScore.no.v.toFixed(2)}</p></td>
                        </tr>
                        <tr>
                            <td>ИТ1Б0.5</td>
                            <td><p className={percentPoison.it1O05 >= 60 ? green : percentPoison.it1O05 < 60 && percentPoison.it1O05 >= 50 ? blue : rose}>{percentPoison.it1O05.toFixed(0)}</p></td>
                            <td><p className={percentMatches.it1O05 >= 60 ? green : percentMatches.it1O05 < 60 && percentMatches.it1O05 >= 50 ? blue : rose}>{percentMatches.it1O05.toFixed(0)}</p></td>
                            <td><p className={percentWithScore.it1O05 >= 55 ? green : percentWithScore.it1O05 < 55 && percentWithScore.it1O05 >= 40 ? blue : rose}>{percentWithScore.it1O05.toFixed(0)}</p></td>
                            <td><p>{matchOdds.markets.totals1[0].over.v.toFixed(2)}</p></td>
                        </tr>
                        <tr>
                            <td>ИТ1Б1.5</td>
                            <td><p className={percentPoison.it1O15 >= 60 ? green : percentPoison.it1O15 < 60 && percentPoison.it1O15 >= 50 ? blue : rose}>{percentPoison.it1O15.toFixed(0)}</p></td>
                            <td><p className={percentMatches.it1O15 >= 60 ? green : percentMatches.it1O15 < 60 && percentMatches.it1O15 >= 50 ? blue : rose}>{percentMatches.it1O15.toFixed(0)}</p></td>
                            <td><p className={percentWithScore.it1O15 >= 55 ? green : percentWithScore.it1O15 < 55 && percentWithScore.it1O15 >= 40 ? blue : rose}>{percentWithScore.it1O15.toFixed(0)}</p></td>
                            <td><p>{matchOdds.markets.totals1[1].over.v.toFixed(2)}</p></td>
                        </tr>
                        <tr>
                            <td>ИТ1Б2.5</td>
                            <td><p className={percentPoison.it1O25 >= 60 ? green : percentPoison.it1O25 < 60 && percentPoison.it1O25 >= 50 ? blue : rose}>{percentPoison.it1O25.toFixed(0)}</p></td>
                            <td><p className={percentMatches.it1O25 >= 60 ? green : percentMatches.it1O25 < 60 && percentMatches.it1O25 >= 50 ? blue : rose}>{percentMatches.it1O25.toFixed(0)}</p></td>
                            <td><p className={percentWithScore.it1O25 >= 55 ? green : percentWithScore.it1O25 < 55 && percentWithScore.it1O25 >= 40 ? blue : rose}>{percentWithScore.it1O25.toFixed(0)}</p></td>
                            <td><p>{matchOdds.markets.totals1[2].over.v.toFixed(2)}</p></td>
                        </tr>
                        <tr>
                            <td>ИТ1М2.5</td>
                            <td><p className={percentPoison.it1U25 >= 60 ? green : percentPoison.it1U25 < 60 && percentPoison.it1U25 >= 50 ? blue : rose}>{percentPoison.it1U25.toFixed(0)}</p></td>
                            <td><p className={percentMatches.it1U25 >= 60 ? green : percentMatches.it1U25 < 60 && percentMatches.it1U25 >= 50 ? blue : rose}>{percentMatches.it1U25.toFixed(0)}</p></td>
                            <td><p className={percentWithScore.it1U25 >= 55 ? green : percentWithScore.it1U25 < 55 && percentWithScore.it1U25 >= 40 ? blue : rose}>{percentWithScore.it1U25.toFixed(0)}</p></td>
                            <td><p>{matchOdds.markets.totals1[2].under.v.toFixed(2)}</p></td>
                        </tr>
                        <tr>
                            <td>ИТ1М1.5</td>
                            <td><p className={percentPoison.it1U15 >= 60 ? green : percentPoison.it1U15 < 60 && percentPoison.it1U15 >= 50 ? blue : rose}>{percentPoison.it1U15.toFixed(0)}</p></td>
                            <td><p className={percentMatches.it1U15 >= 60 ? green : percentMatches.it1U15 < 60 && percentMatches.it1U15 >= 50 ? blue : rose}>{percentMatches.it1U15.toFixed(0)}</p></td>
                            <td><p className={percentWithScore.it1U15 >= 55 ? green : percentWithScore.it1U15 < 55 && percentWithScore.it1U15 >= 40 ? blue : rose}>{percentWithScore.it1U15.toFixed(0)}</p></td>
                            <td><p>{matchOdds.markets.totals1[1].under.v.toFixed(2)}</p></td>
                        </tr>
                        <tr>
                            <td>ИТ1М0.5</td>
                            <td><p className={percentPoison.it1U05 >= 60 ? green : percentPoison.it1U05 < 60 && percentPoison.it1U05 >= 50 ? blue : rose}>{percentPoison.it1U05.toFixed(0)}</p></td>
                            <td><p className={percentMatches.it1U05 >= 60 ? green : percentMatches.it1U05 < 60 && percentMatches.it1U05 >= 50 ? blue : rose}>{percentMatches.it1U05.toFixed(0)}</p></td>
                            <td><p className={percentWithScore.it1U05 >= 55 ? green : percentWithScore.it1U05 < 55 && percentWithScore.it1U05 >= 40 ? blue : rose}>{percentWithScore.it1U05.toFixed(0)}</p></td>
                            <td><p>{matchOdds.markets.totals1[0].under.v.toFixed(2)}</p></td>
                        </tr>
                        <tr>
                            <td>ИТ2Б0.5</td>
                            <td><p className={percentPoison.it2O05 >= 60 ? green : percentPoison.it2O05 < 60 && percentPoison.it2O05 >= 50 ? blue : rose}>{percentPoison.it2O05.toFixed(0)}</p></td>
                            <td><p className={percentMatches.it2O05 >= 60 ? green : percentMatches.it2O05 < 60 && percentMatches.it2O05 >= 50 ? blue : rose}>{percentMatches.it2O05.toFixed(0)}</p></td>
                            <td><p className={percentWithScore.it1U05 >= 55 ? green : percentWithScore.it1U05 < 55 && percentWithScore.it1U05 >= 40 ? blue : rose}>{percentWithScore.it1U05.toFixed(0)}</p></td>
                            <td><p>{matchOdds.markets.totals2[0].over.v.toFixed(2)}</p></td>
                        </tr>
                        <tr>
                            <td>ИТ2Б1.5</td>
                            <td><p className={percentPoison.it2O15 >= 60 ? green : percentPoison.it2O15 < 60 && percentPoison.it2O15 >= 50 ? blue : rose}>{percentPoison.it2O15.toFixed(0)}</p></td>
                            <td><p className={percentMatches.it2O15 >= 60 ? green : percentMatches.it2O15 < 60 && percentMatches.it2O15 >= 50 ? blue : rose}>{percentMatches.it2O15.toFixed(0)}</p></td>
                            <td><p className={percentWithScore.it2O15 >= 55 ? green : percentWithScore.it2O15 < 55 && percentWithScore.it2O15 >= 40 ? blue : rose}>{percentWithScore.it2O15.toFixed(0)}</p></td>
                            <td><p>{matchOdds.markets.totals2[1].over.v.toFixed(2)}</p></td>
                        </tr>
                        <tr>
                            <td>ИТ2Б2.5</td>
                            <td><p className={percentPoison.it2O25 >= 60 ? green : percentPoison.it2O25 < 60 && percentPoison.it2O25 >= 50 ? blue : rose}>{percentPoison.it2O25.toFixed(0)}</p></td>
                            <td><p className={percentMatches.it2O25 >= 60 ? green : percentMatches.it2O25 < 60 && percentMatches.it2O25 >= 50 ? blue : rose}>{percentMatches.it2O25.toFixed(0)}</p></td>
                            <td><p className={percentWithScore.it2O25 >= 55 ? green : percentWithScore.it2O25 < 55 && percentWithScore.it2O25 >= 40 ? blue : rose}>{percentWithScore.it2O25.toFixed(0)}</p></td>
                            <td><p>{matchOdds.markets.totals2[2] ? matchOdds.markets.totals2[2].over.v.toFixed(2) : null}</p></td>
                        </tr>
                        <tr>
                            <td>ИТ2М2.5</td>
                            <td><p className={percentPoison.it2U25 >= 60 ? green : percentPoison.it2U25 < 60 && percentPoison.it2U25 >= 50 ? blue : rose}>{percentPoison.it2U25.toFixed(0)}</p></td>
                            <td><p className={percentMatches.it2U25 >= 60 ? green : percentMatches.it2U25 < 60 && percentMatches.it2U25 >= 50 ? blue : rose}>{percentMatches.it2U25.toFixed(0)}</p></td>
                            <td><p className={percentWithScore.it2U25 >= 55 ? green : percentWithScore.it2U25 < 55 && percentWithScore.it2U25 >= 40 ? blue : rose}>{percentWithScore.it2U25.toFixed(0)}</p></td>
                            <td><p>{matchOdds.markets.totals2[2] ? matchOdds.markets.totals2[2].under.v.toFixed(2) : null}</p></td>
                        </tr>
                        <tr>
                            <td>ИТ2М1.5</td>
                            <td><p className={percentPoison.it2U15 >= 60 ? green : percentPoison.it2U15 < 60 && percentPoison.it2U15 >= 50 ? blue : rose}>{percentPoison.it2U15.toFixed(0)}</p></td>
                            <td><p className={percentMatches.it2U15 >= 60 ? green : percentMatches.it2U15 < 60 && percentMatches.it2U15 >= 50 ? blue : rose}>{percentMatches.it2U15.toFixed(0)}</p></td>
                            <td><p className={percentWithScore.it2U15 >= 55 ? green : percentWithScore.it2U15 < 55 && percentWithScore.it2U15 >= 40 ? blue : rose}>{percentWithScore.it2U15.toFixed(0)}</p></td>
                            <td><p>{matchOdds.markets.totals2[1].under.v.toFixed(2)}</p></td>
                        </tr>
                        <tr>
                            <td>ИТ2М0.5</td>
                            <td><p className={percentPoison.it2U05 >= 60 ? green : percentPoison.it2U05 < 60 && percentPoison.it2U05 >= 50 ? blue : rose}>{percentPoison.it2U05.toFixed(0)}</p></td>
                            <td><p className={percentMatches.it2U05 >= 60 ? green : percentMatches.it2U05 < 60 && percentMatches.it2U05 >= 50 ? blue : rose}>{percentMatches.it2U05.toFixed(0)}</p></td>
                            <td><p className={percentWithScore.it2U05 >= 55 ? green : percentWithScore.it2U05 < 55 && percentWithScore.it2U05 >= 40 ? blue : rose}>{percentWithScore.it2U05.toFixed(0)}</p></td>
                            <td><p>{matchOdds.markets.totals2[0].under.v.toFixed(2)}</p></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default ToolsPrediction;