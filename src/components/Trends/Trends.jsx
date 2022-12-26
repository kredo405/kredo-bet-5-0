import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Trends = ({ info }) => {
    const state = useSelector(state => state);
    const [odds, setOdds] = useState({ odds: [{ name: "Победа 1", odd: "1" }] });
    const [elements, setElements] = useState(
        <li className="flex justify-between border-y-2 border-gray-400 border-solid ">
                    <div className="font-bold">
                        Тотал больше 2.5
                    </div>
                    <div>
                        <span className="font-bold text-orange-600 pr-5">4/5</span>
                        <span className="font-bold text-orange-600">10/13</span>
                    </div>
                </li>
    );

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
        const trendsHome = [];
        const trendsAway = [];

        const changeTrends = (obj, arr) => {
            for (let key in obj) {
                odds.odds.forEach(el => {
                    if (String(+el.odd - 1) === key) {
                        arr.push({
                            name: el.name,
                            quntity: obj[key]
                        })
                    }
                })
            }
        }

        changeTrends(info.outcomes[0][0], trendsHome);
        changeTrends(info.outcomes[0][1], trendsAway);

        console.log(trendsHome)
        console.log(trendsAway)

        const trends = [];

        trendsHome.forEach(el => {
            trendsAway.forEach(item => {
                if (el.name === item.name) {
                    trends.push({
                        name: el.name,
                        quntityHome: el.quntity,
                        quntityAway: item.quntity,
                    });
                }
            })
        });

        const elements = trends.map(el => {
            return (
                <li className="flex justify-between border-y-2 border-gray-400 border-solid ">
                    <div className="font-bold">
                        {el.name}
                    </div>
                    <div>
                        <span className="text-center font-bold text-orange-600 pr-5">{el.quntityHome}</span>
                        <span className="text-center font-bold text-orange-600">{el.quntityAway}</span>
                    </div>
                </li>
            )
        });

        setElements(elements)
    }, [odds]);


    return (
        <>
            <div className="flex justify-center mb-3">
                <h2 className='text-center py-3 font-serif text-2xl font-bold text-slate-600'>Серии</h2>
            </div>
            <div className="flex justify-between w-full items-center mb-3">
                <div className="font-bold pl-5">
                    Исход
                </div>
                <div className="flex justify-end">
                    <img src={info.team1_logo} alt="logo" className="w-1/12 mr-5" />
                    <img src={info.team2_logo} alt="logo" className="w-1/12 mr-6" />
                </div>
            </div>
            <ul className="overflow-y-scroll h-56 px-3">
                {elements}
            </ul>
        </>
    )
}

export default Trends;