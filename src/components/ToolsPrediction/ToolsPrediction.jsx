import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from 'react-bootstrap';
import { arbworldServices } from "../../services/arbworld";
import { calcCorrectScore } from "../../utils/calcCorrectScore";
import Predictions from "../Predictions/Predictions";
import { Modal } from 'antd';
import findTeam from "../../utils/findTeam";
import { calcBigPercent } from "../../utils/calcBigPercent";
import { percentObj } from "../../utils/percentObj";

const errorModal = (message) => {
    Modal.error({
        title: message
    });
};

const ToolsPrediction = (props) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [elementsPropobility, setElementsPropobility] = useState([{
        outcomes: '',
        odds: 0,
        percent: 0
    }])
    const matchOdds = {
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
    }
    const { percentPoison, percentMatches, percentWithScore, correctScore, homeName, awayName } = props;

    useEffect(() => {
        const odds = state.odds.filter(el => {
            if (el.team1_rus && el.team2_rus) {
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
                    return objOdds
                 
                }
            }
        })

        console.log(odds)

        const correctScoreMatch = correctScore.filter(item => findTeam(item.homeName, state.homeNameEng) && findTeam(item.awayName, state.awayNameEng))

        console.log(correctScoreMatch)

        // Вычисляем самые большие вероятности
        const outcomesBigPercent = calcBigPercent(percentPoison, percentMatches, percentWithScore,
            correctScoreMatch.length !== 0 ? correctScoreMatch[0].percentOutcomes : percentObj, odds.length !== 0 ? odds[0] : matchOdds)

        setElementsPropobility(outcomesBigPercent)
    }, [state.odds])

    const green = 'bg-green-200 flex justify-center font-mono';
    const rose = 'bg-rose-200 flex justify-center font-mono';
    const blue = 'bg-sky-200 flex justify-center font-mono';

    const elements = elementsPropobility.map((el, i) => {
        return (
            <tr key={i}>
                <td><p className="font-medium font-sans text-orange-900">{el.outcomes}</p></td>
                <td><p className={el.percent >= 65 ? green : el.percent < 65 && el.percent >= 50 ? blue : rose}>{el.percent.toFixed(0)}</p></td>
                <td><p className="font-medium font-sans text-orange-900">{`${el.odds.toFixed(2)} (${(100 / +el.odds).toFixed(0)}%)`}</p></td>
            </tr>
        )
    })

    return (
        <>
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Ставка</th>
                            <th>Вероятн. %</th>
                            <th>Кэф/%</th>
                        </tr>
                    </thead>
                    <tbody>
                        {elements}
                    </tbody>
                </Table>
                <Predictions homeName={props.homeName} awayName={props.awayName} />
            </div>
        </>
    )
}

export default ToolsPrediction;