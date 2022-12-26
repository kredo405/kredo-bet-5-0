import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";


const PredicitonsNbBet = ({ predictions }) => {
    const state = useSelector(state => state);
    const [odds, setOdds] = useState({ odds: [{ name: "Победа 1", odd: "1" }] });
    const [elements, setElements] = useState(<>
        <td><p className='text-center font-mono font-semibold'>Загрузка...</p></td>
        <td><p className='text-center font-mono font-semibold'>Загрузка...</p></td>
        <td><p className='text-center font-mono font-semibold'>Загрузка...</p></td>
        <td><p className='text-center font-mono font-semibold'>Загрузка...</p></td>
    </>);


    useEffect(() => {
        const getDataOdds = async () => {
            const db = getFirestore(state.app);
            const docRef = doc(db, "decodingOdds", "odds");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log(docSnap.data());
                setOdds(docSnap.data())
            } else {
                console.log("No such document!");
            }
        }

        getDataOdds();
    }, []);

    useEffect(() => {
        const predictionsAndOdds = [];

        predictions.forEach(el => {
            odds.odds.forEach(item => {
                if (el[2] === +item.odd) {
                    predictionsAndOdds.push({
                        rank: el[10],
                        predict: item.name,
                        odd: el[3],
                        profit: el[6]
                    });
                }
            });
        });

        console.log(predictionsAndOdds);

        const newArr = getArrLargestValues(predictionsAndOdds);

        function getArrLargestValues(target, byValue = 'profit') {
            let result = target;

            result.sort((a, b) => a[byValue] - b[byValue]);
            result = result.reverse();

            return result;
        }

        const elements = newArr.map((el, i) => {
            return (
                <li className="flex justify-around border-y-2 border-gray-100 border-solid py-3">
                    <div className="font-semibold flex justify-center w-3/12">
                        <p className="text-center">{el.rank}</p>
                    </div>
                    <div className="font-semibold flex justify-center w-3/12 text-amber-700">
                        <p className="text-center">{el.predict}</p>
                    </div>
                    <div className="font-semibold flex justify-center w-3/12 text-indigo-600">
                        <p className="text-center">{el.odd}</p>
                    </div>
                    <div className="font-semibold flex justify-center w-3/12">
                        <p className="text-center">+{el.profit}%</p>
                    </div>
                </li>
            )
        });

        setElements(elements)
    }, [odds]);

    return (
        <>
            <div className="flex justify-center mb-3">
                <h2 className='text-center py-3 font-serif text-2xl font-bold text-slate-600'>Прогнозы</h2>
            </div>
            <div className="flex justify-around w-full items-center mb-3 px-4">
                <div className="font-bold w-3/12 text-center">
                    Место
                </div>
                <div className="font-bold w-3/12 text-center">
                    Прогноз
                </div>
                <div className="font-bold w-3/12 text-center">
                    Кэф
                </div>
                <div className="font-bold w-3/12 text-center">
                    Прибыль
                </div>
            </div>
            <ul className="flex flex-col overflow-y-scroll h-56 px-3">
                {elements}
            </ul>
        </>
    )
}

export default PredicitonsNbBet;