import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { calcPredictions } from "../../utils/calcPredictions";
import { Spin } from 'antd';
import * as Scroll from 'react-scroll';

const Predict = ({ info, predictions }) => {
    const state = useSelector(state => state);
    const [predictionsElements, setPredictionsElements] = useState(null);
    const [outcomes, setOutcomes] = useState({});
    const [moneyWay1x2, setMoneyWay1x2] = useState({});
    const [moneyWayOverUnder, setMoneyWayOverUnder] = useState({});
    const [correctScore, setCorrectScore] = useState({});
    const [odd, setOdd] = useState('1.5');

    const handleChange = (e) => {
        setOdd(e.target.value);
    }

    const handleClick = () => {
        const predictArr = calcPredictions(
            info,
            predictions,
            outcomes,
            moneyWay1x2,
            moneyWayOverUnder,
            correctScore,
            odd
        );

        setPredictionsElements(<Spin className="my-3 py-10" size="large" />);


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
            );
            Scroll.animateScroll.scrollToBottom();
        }, 2500);

        Scroll.animateScroll.scrollToBottom();
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
            <div className="flex justify-center mb-3">
                <h3 className='text-center py-2 font-serif font-bold text-slate-600'>Выберите минимальный коэфицент прогноза</h3>
            </div>
            <div className="flex justify-center flex-col items-center">
                <input onChange={handleChange} className='w-8/12' type="range" id="odds" name="odds" min="1.1" max="3" value={odd} step={0.05}/>
                <label className="text-2xl py-3 text-yellow-600 font-bold" htmlFor="odds">{odd}</label>
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