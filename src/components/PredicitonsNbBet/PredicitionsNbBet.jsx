import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { useEffect } from "react";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);


const PredicitonsNbBet = ({ predictions }) => {
    const [odds, setOdds] = useState({ odds: [{ name: "Победа 1", odd: "1" }] });
    const [elements, setElements] = useState(<>
        <li className="flex justify-around border-y-2 border-gray-100 border-solid py-3">
            <div className="font-semibold flex justify-center w-3/12">
                <p className="text-center">Загрузка...</p>
            </div>
            <div className="font-semibold flex justify-center w-3/12 text-amber-900">
                <p className="text-center">Загрузка...</p>
            </div>
            <div className="font-semibold flex justify-center w-3/12 text-indigo-600">
                <p className="text-center">Загрузка...</p>
            </div>
            <div className="font-semibold flex justify-center w-3/12">
                <p className="text-center">Загрузка...</p>
            </div>
        </li>
    </>);

    useEffect(() => {
        const getDataOdds = async () => {
            const db = getFirestore(app);
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
        const predictionsAndOdds = predictions.reduce((result, el) => {
            const matchedOdd = odds.odds.find(item => +item.odd === el[2]);
            if (matchedOdd) {
                result.push({
                    rank: el[10],
                    predict: matchedOdd.name,
                    odd: el[3],
                    profit: el[6]
                });
            }
            return result;
        }, []);

        console.log(predictionsAndOdds);

        const newArr = getArrLargestValues(predictionsAndOdds, 'profit');

        function getArrLargestValues(target, byValue = 'profit') {
            return target.sort((a, b) => b[byValue] - a[byValue]);
        }

        const elements = newArr.map((el, i) => {
            return (
                <li key={i} className="flex justify-around border-y-2 border-gray-100 border-solid py-3">
                    <div className="font-semibold flex justify-center w-3/12">
                        <p className="text-center">{el.rank}</p>
                    </div>
                    <div className="font-semibold flex justify-center w-3/12 text-amber-900">
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
            <ul className="flex flex-col overflow-y-scroll h-96 px-3">
                {elements}
            </ul>
        </>
    )
}

export default PredicitonsNbBet;