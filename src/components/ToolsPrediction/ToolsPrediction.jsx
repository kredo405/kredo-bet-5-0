import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from 'react-bootstrap';
import Predictions from "../Predictions/Predictions";
import { Modal } from 'antd';
import findTeam from "../../utils/findTeam";
import { calcBigPercent } from "../../utils/calcBigPercent";
import { percentObj } from "../../utils/percentObj";
import Scores from "../scores/Scores";

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
    // const [correctScoreMatch, setCorrectScoreMatch] = useState([
    //     {score0_0: 0}, {score0_1: 0}, {score0_2: 0}, 
    //     {score0_3: 0}, {score1_0: 0}, {score1_1: 0},
    //     {score1_2: 0}, {score1_3: 0}, {score2_0: 0}, 
    //     {score2_1: 0}, {score2_2: 0}, {score2_3: 0},
    //     {score3_0: 0}, {score3_1: 0}, {score3_2: 0},  
    //     {score3_3: 0}
    // ])
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
     
        // Вычисляем самые большие вероятности

        const outcomesBigPercent = calcBigPercent(percentPoison, percentWithScore, matchOdds)

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
                <td><p className="font-medium font-sans text-orange-900">{`${el.odds.toFixed(2)} (${el.odds ? (100 / +el.odds).toFixed(0) : 0}%)`}</p></td>
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
                {/* <Scores homeName={props.homeName} awayName={props.awayName} correctScoreMatch={correctScoreMatch}/> */}
            </div>
        </>
    )
}

export default ToolsPrediction;