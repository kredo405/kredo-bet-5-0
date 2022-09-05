import { useState, useEffect } from 'react';
import findTeam from '../../utils/findTeam';
import { useSelector, useDispatch } from "react-redux";
import { Collapse } from 'antd';
import axios from 'axios';


const Predictions = (props) => {
    const [predictionsBetzona, setPredictionsBetZona] = useState([]);
    const [predictionsOnlineBookmaker, setPredictionsOnlineBookmaker] = useState([]);
    const { Panel } = Collapse;

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/betzona',
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            setPredictionsBetZona(response.data.betzona);

        }).catch(function (error) {
            console.error(error);
        });

    }, []);

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/onlineBookmaker',
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            setPredictionsOnlineBookmaker(response.data.onlineBookmaker);

        }).catch(function (error) {
            console.error(error);
        });

    }, []);

    let betzona = predictionsBetzona.map((el, i) => {
        return (
            <Panel header={`${el.homeName} - ${el.awayName}(${el.forecast.bet}; ${el.forecast.odd})`} key={i + 1000}>
                <h5 className='text-center font-semibold py-2 text-lg'>{el.homeName}</h5>
                <p className='text-slate-600 font-mono'>{el.homePreview.info}</p>
                <h5 className='text-center font-semibold py-2 text-lg'>{el.awayName}</h5>
                <p className='text-slate-600 font-mono'>{el.awayPreview.info}</p>
                <h5 className='text-center font-semibold py-2 text-lg'>Прогноз</h5>
                <p className='text-slate-600 font-mono'>{el.forecast.text}</p>
            </Panel>
        )
    });

    let onlineBookmaker = predictionsOnlineBookmaker.map((el, i) => {
        return (
            <Panel header={`${el.nameHome} - ${el.nameAway}(1:${el.predictionOne}; 2:${el.predictionTwo})`} key={i + 2000}>
                <h5 className='text-center font-semibold py-2 text-lg'>Прогноз</h5>
                <p className='text-slate-400 font-mono'>{el.text}</p>
                <p className='text-slate-600 italic'>{el.predictionOne}</p>
                <p className='text-slate-600 italic'>{el.predictionTwo}</p>
            </Panel>
        )
    });


    return (
        <>
            <Collapse accordion>
                <Panel header="Online Bookmaker" key="1">
                    <Collapse defaultActiveKey="1">
                        {onlineBookmaker}
                    </Collapse>
                </Panel>
                <Panel header="Betzona" key="2">
                    <Collapse defaultActiveKey="2">
                        {betzona}
                    </Collapse>
                </Panel>
            </Collapse>
        </>
    )
}

export default Predictions;