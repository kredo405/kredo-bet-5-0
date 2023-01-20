import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { Table } from 'react-bootstrap';
import Predictions from "../Predictions/Predictions";
import { calcBigPercent } from "../../utils/calcBigPercent";


const ToolsPrediction = ({ percentPoison, percentWithScore, info }) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [odds, setOdds] = useState({ odds: [{ name: "Победа 1", odd: "1" }] });
    const [elementsPropobility, setElementsPropobility] = useState([{
        outcomes: '',
        odds: 0,
        percent: 0
    }]);
    

    useEffect(() => {
        const getDataOdds = async () => {
            const db = getFirestore(state.app);
            const docRef = doc(db, "decodingOdds", "odds");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log(docSnap.data());
                setOdds(docSnap.data());
            } else {
                console.log("No such document!");
            }
        }

        getDataOdds();
    }, [])

    useEffect(() => {
     
        const outcomesBigPercent = calcBigPercent(percentPoison, percentWithScore, odds.odds, info.current_odds);

        dispatch({
            type: 'OUTCOMES',
            payload: outcomesBigPercent.arrOutcomesForPredictions
        })
        setElementsPropobility(outcomesBigPercent.arrOutcomes);
    }, []);

    const green = 'bg-green-200 flex justify-center font-mono';
    const rose = 'bg-rose-200 flex justify-center font-mono';
    const blue = 'bg-sky-200 flex justify-center font-mono';

    const elements = elementsPropobility.map((el, i) => {
        return (
            <tr key={i}>
                <td><p className="font-medium font-sans text-orange-900">{el.outcomes}</p></td>
                <td><p className={el.percent >= 65 ? green : el.percent < 65 && el.percent >= 50 ? blue : rose}>{el.percent.toFixed(0)}%</p></td>
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
                <Predictions homeName={info.team1_name} awayName={info.team2_name} />
            </div>
        </>
    )
}

export default ToolsPrediction;