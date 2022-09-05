import { useSelector, useDispatch } from "react-redux";
import { getFirestore } from "firebase/firestore";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Statistics from '../../components/Statistics/Statistics'
import MoneyWay from "../../components/MoneyWay/MoneyWay";
import Predictions from "../../components/Predictions/Predictions";
import axios from 'axios';

const { TabPane } = Tabs;

const onChange = (key) => {
    console.log(key);
};

const Match = () => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const app = state.app;
    const db = getFirestore(app);

    const { match } = state;

    return (
        <div>
            <Header />
            <div className="container">
                <div className="w-full h-14 flex justify-between items-center bg-stone-200 mb-2.5">
                    <div className="flex w-6/12 items-center ml-2">
                        <img className="lg:w-1/12 w-2/12 h-4/5" src={match.leagueLogo} alt="лого" />
                        <span className="p-2">{match.leagueName}</span>
                    </div>
                    <div className="flex w-6/12 justify-end items-center">
                        <img className="lg:w-1/12 w-2/12 h-4/5" src={match.flag} alt="флаг" />
                        <span className="p-2">{match.country}</span>
                    </div>
                </div>
                <div className="flex justify-center">
                    <span>{match.homeName} - {match.awayName}</span>
                </div>
                <div className="flex mt-5 items-center">
                    <div className="flex justify-center w-2/5">
                        <img className="w-6/12" src={match.logoHome} alt="Лого" />
                    </div>
                    <span className="w-1/5 text-center">
                        {match.status.short === "NS" ? match.date.slice(11, 16) : `${match.goalsHome} : ${match.goalsAway}`}
                    </span>
                    <div className="flex justify-center w-2/5">
                        <img className="w-6/12" src={match.logoAway} alt="Лого" />
                    </div>
                </div>
                <div className="mt-5 mb-5">
                    <Tabs
                        defaultActiveKey="stat"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="stat" title="Статистика">
                            <Statistics id={match.leagueId} homeName={match.homeName} awayName={match.awayName}/>
                            <MoneyWay id={match.leagueId} homeName={match.homeName} awayName={match.awayName}/>
                        </Tab>
                        <Tab eventKey="prediction" title="Прогнозы">
                            <Predictions id={match.leagueId} homeName={match.homeName} awayName={match.awayName}/>
                        </Tab>
                        <Tab eventKey="prediction-kredo-bet" title="Прогноз Kredo-bet">
                            
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default Match