import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { calcPredictions } from "../../utils/calcPredictions";
import { Spin } from 'antd';

const Predict = ({ info, predictions }) => {
    const state = useSelector(state => state);
    const [predictionsElements, setPredictionsElements] = useState(null);
    const [outcomes, setOutcomes] = useState({});
    const [moneyWay1x2, setMoneyWay1x2] = useState({});
    const [moneyWayOverUnder, setMoneyWayOverUnder] = useState({});
    const [correctScore, setCorrectScore] = useState({});

    const handleClick = () => {
        const predictArr = calcPredictions(
            info,
            predictions,
            outcomes,
            moneyWay1x2,
            moneyWayOverUnder,
            correctScore,
        );
        setPredictionsElements(<Spin className="my-3" size="large" />)

        const elements = predictArr.map((el, i) => {
            return (
                <div key={i} className="flex justify-center border-2 rounded-lg border-slate-200 border-solid mb-3 py-2 px-2 md:px-5 shadow shadow-gray-200">
                    <span className="font-semibold text-xl ml-5 w-[200px] md:w-[300px] lg:w-[400px]">{el.outcomes}</span>
                    <span className="font-semibold text-xl text-amber-900 w-[50px]">{el.odds}</span>
                </div>
            )
        });

        setTimeout(() => {
            setPredictionsElements(
                <div>
                    {elements}
                </div>
            )
        }, 1500);
    }

    useEffect(() => {
        setOutcomes(state.outcomes);
        setMoneyWay1x2(state.moneyWay1x2);
        setMoneyWayOverUnder(state.moneyWayOverUnder);
        setCorrectScore(state.correctScore);
    }, [state.outcomes, state.moneyWay1x2, state.moneyWayOverUnder, state.correctScore]);

    return (
        <>
            <div className="flex justify-center mb-3">
                <h2 className='text-center py-3 font-serif text-2xl font-bold text-slate-600'>Прогноз</h2>
            </div>
            <div className="flex justify-center my-5">
                <button
                    className="px-5 py-2 bg-emerald-500 text-lg text-gray-50 border-emerald-500 rounded-lg border-2 border-solid"
                    onClick={handleClick}
                >
                    Рассчитать прогноз
                </button>
            </div>
            <div className="flex justify-center">
                {predictionsElements}
            </div>
        </>
    )
}

export default Predict;