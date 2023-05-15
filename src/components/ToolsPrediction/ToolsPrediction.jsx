import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { Table } from "react-bootstrap";
import { setOutcomes } from "../../store/slices/matchSlice";
import Predictions from "../Predictions/Predictions";
import { calcBigPercent } from "../../utils/calcBigPercent";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const ToolsPrediction = ({ percentPoison, info }) => {
    const dispatch = useDispatch();
    const [odds, setOdds] = useState({
        odds: [{ name: "Победа 1", odd: "1" }],
    });
    const [elementsPropobility, setElementsPropobility] = useState([
        {
            outcomes: "",
            odds: 0,
            percent: 0,
        },
    ]);

    useEffect(() => {
        const getDataOdds = async () => {
            const db = getFirestore(app);
            const docRef = doc(db, "decodingOdds", "odds");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log(docSnap.data());
                setOdds(docSnap.data());
            } else {
                console.log("No such document!");
            }
        };

        getDataOdds();
    }, []);

    useEffect(() => {
        const getPercent = async () => {
            const res = await percentPoison;
            const outcomesBigPercent = calcBigPercent(
                res,
                odds.odds,
                info.current_odds
            );
            dispatch(setOutcomes(outcomesBigPercent.arrOutcomesForPredictions));
            setElementsPropobility(outcomesBigPercent.arrOutcomes);
        };

        getPercent();
    }, []);

    const green = "bg-green-200 flex justify-center font-mono";
    const rose = "bg-rose-200 flex justify-center font-mono";
    const blue = "bg-sky-200 flex justify-center font-mono";

    const elements = elementsPropobility.map((el, i) => {
        return (
            <tr key={i}>
                <td>
                    <p className="font-medium font-sans text-orange-900">
                        {el.outcomes}
                    </p>
                </td>
                <td>
                    <p
                        className={
                            el.percent >= 65
                                ? green
                                : el.percent < 65 && el.percent >= 50
                                ? blue
                                : rose
                        }
                    >
                        {el.percent.toFixed(0)}%
                    </p>
                </td>
                <td>
                    <p
                        className={100 / +el.odds < el.percent ? green : rose}
                    >{`${el.odds.toFixed(2)} (${
                        el.odds ? (100 / +el.odds).toFixed(0) : 0
                    }%)`}</p>
                </td>
            </tr>
        );
    });

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
                    <tbody>{elements}</tbody>
                </Table>
            </div>
        </>
    );
};

export default ToolsPrediction;
