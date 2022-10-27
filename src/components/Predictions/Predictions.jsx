import { useState, useEffect } from 'react';
import findTeam from '../../utils/findTeam';
import { useSelector, useDispatch } from "react-redux";
import { predictionsServices } from "../../services/predctions";

const Predictions = (props) => {

    const [predictions, setPredictions] = useState({
        homeName: '',
        awayName: '',
        text: '',
        predictionsOne: '',
        predictionsTwo: '',
    })

 useEffect(() => {
    const getPredictions = async () => {
        const onlineBookmaker = await predictionsServices.getOnlineBookmaker()
        console.log(onlineBookmaker)
        onlineBookmaker.data.predicitons.forEach(el => {
            if(findTeam(el.nameHome, props.homeName) && findTeam(el.nameAway, props.awayName)) {
                setPredictions(el)
            }
            else {
                setPredictions({
                    text: '...',
                    predictionsOne: 'Нет прогнозов',
                    predictionsTwo: '',
                })
            }
        })
    }

    getPredictions()
 }, [])


    return (
        <>
        <div>
                <h2 className="text-center py-3 font-serif text-2xl font-bold text-slate-600">Прогнозы</h2>
                <ul className="h-96 mb-36 lg:px-60">
                <li  className="p-3 border-2 border-blue-100 border-double my-4 rounded-lg shadow-lg shadow-cyan-50">
                <h2 className="text-center text-lg font-semibold my-3">
                    <span className="bg-lime-300 p-2 mr-2">{predictions.predictionsOne}</span>
                    :
                    <span className="bg-lime-300 p-2 ml-2">{predictions.predictionsTwo}</span>
                </h2>
                <p className="font-sans text-zinc-600 font-medium">{predictions.text}</p>
            </li>
                </ul>
            </div>
        </>
    )
}

export default Predictions;