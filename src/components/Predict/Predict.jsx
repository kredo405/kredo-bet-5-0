import { useState } from "react";
import { useSelector } from "react-redux";
import { calcPredictions } from "../../utils/calcPredictions";

const Predict = ({ form, info, predictions }) => {
    const state = useSelector(state => state);
    const [valueClass, setValueClass] = useState('50');
    const [predictionsElements, setPredictionsElements] = useState(null);

    function onChange(e) {
        setValueClass(e.target.value);
    }

    function handleClick(e) {
        const predictArr = calcPredictions(valueClass, info, form, predictions, state.outcomes);

        const elements = predictArr.map((el, i) => {
            return (
                <div key={i} className="flex justify-center border-2 rounded-lg border-amber-700 border-solid mb-3 px-2 md:px-5">
                    <span className="font-bold text-xl ml-5 w-[200px] md:w-[300px] lg:w-[400px]">{el.outcomes}</span>
                    <span className="font-bold text-xl text-amber-500 w-[50px]">{el.odds}</span>
                </div>
            )
        });
        setPredictionsElements(
            <div>
                {elements}
            </div>
        )
    }

    return (
        <>
            <div className="flex justify-center mb-3">
                <h2 className='text-center py-3 font-serif text-2xl font-bold text-slate-600'>Прогноз</h2>
            </div>
            <div className="flex justify-center">
                <h3 className='text-center py-3 font-serif text-lg font-bold text-slate-600'>Класс команд</h3>
            </div>
            <div className="flex justify-evenly mb-2">
                <span>{info.team1_name}</span>
                <span>{info.team2_name}</span>
            </div>
            <div className="flex justify-center">
                <input className="w-10/12" type="range" name="class" id="class" min="0" max="100" onChange={onChange} value={valueClass} />
                <label className="pl-3 font-semibold text-lg" for="class">{valueClass}/{100 - +valueClass}</label>
            </div>

            <div className="flex justify-center mt-5">
                <button
                    className="px-5 py-2 bg-emerald-500 text-lg text-gray-50 border-emerald-500 rounded-lg border-2 border-solid"
                    onClick={handleClick}
                >
                    Рассчитать прогноз
                </button>
            </div>
            <div className="mt-5 flex justify-center">
                {predictionsElements}
            </div>
        </>
    )
}

export default Predict;