import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { Progress, BackTop, Modal } from "antd";
import Bets from "../../components/Bets/Bets";
import Form from "../../components/Form/Form";
import { Loading } from "../../components/Loading/Loading";
import LastMatches from "../../components/lastMatches/LastMatches";
import { Soccer365Services } from "../../services/soccer365";
import Analitics from "../../components/Analitics/Analitics";
import { nbbetServices } from "../../services/nbbet";
import findTeam from "../../utils/findTeam";

const errorModal = (message) => {
    Modal.error({
        title: message,
    });
};

const MatchHockey = () => {
    const [info, setInfo] = useState({});
    const [predictions, setPredictions] = useState([]);
    const [oddsHistory, setOddsHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getInfo = async () => {
            try {
                // const matchesInfo = await Soccer365Services.getAllMatchesHokey();
                // console.log(matchesInfo.data);

                const [matchesInfoNbbet] = await Promise.all([
                    nbbetServices.getMatchInfoHockey(),
                    // nbbetServices.getMatchPredictions(),
                    // nbbetServices.getOddsHistory()
                ]);

                console.log(matchesInfoNbbet);

                setInfo(matchesInfoNbbet.data.match.data.match);
                // setPredictions(matchesPredictionsNbbet.data.match.data.tips);
                // setOddsHistory(historyOddsNbbet.data.match.data)

                setIsLoading(true);
            } catch (error) {
                console.error(error);
                errorModal(error.message);
            }
        };

        getInfo();
    }, []);

    return (
        <div>
            <Header />
            <BackTop />
            {/* {isLoading ?
                <div className="container lg:px-52 mt-16">
                    <div className="flex justify-center mb-8 bg-neutral-50 p-3">
                        <h1 className='text-slate-700 font-mono text-xl text-center'>{info.tournament_name}</h1>
                    </div>

                    <div className="flex justify-evenly item-center">
                        <div className="flex flex-col items-center w-5/12">
                            <img className='w-6/12' src={info.team1_logo} alt="логотип" />
                            <span className="py-3 text-center font-mono text-clip text-lg font-medium text-teal-900">{info.team1_name}</span>
                        </div>
                        <div className="flex justify-center items-center w-2/12 mb-10">
                            <span className='text-2xl'>{info.goals.lenght > 0 ? info.goals[0] : '-'}:{info.goals.lenght > 0 ? info.goals[1] : '-'}</span>
                        </div>
                        <div className="flex flex-col items-center w-5/12 ">
                            <img className='w-6/12' src={info.team2_logo} alt="логотип" />
                            <span className="py-3 text-center font-mono text-lg font-medium text-teal-900">{info.team2_name}</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center">
                        <div className="flex px-3 border-2 border-slate-400 border-solid m-2 items-center">
                            <span className="pr-2">П1</span>
                            <span className="text-pink-500">{info.current_odds['1']}</span>
                        </div>
                        <div className="flex px-3 border-2 border-slate-400 border-solid m-2 items-center">
                            <span className="pr-2">Х</span>
                            <span className="text-pink-500">{info.current_odds['3']}</span>
                        </div>
                        <div className="flex px-3 border-2 border-slate-400 border-solid m-2 items-center">
                            <span className="pr-2">П2</span>
                            <span className="text-pink-500">{info.current_odds['2']}</span>
                        </div>
                        <div className="flex px-3 border-2 border-slate-400 border-solid m-2 items-center">
                            <span className="pr-2">ТБ2.5</span>
                            <span className="text-pink-500">{info.current_odds['15']}</span>
                        </div>
                        <div className="flex px-3 border-2 border-slate-400 border-solid m-2 items-center">
                            <span className="pr-2">ТМ2.5</span>
                            <span className="text-pink-500">{info.current_odds['16']}</span>
                        </div>
                        <div className="flex px-3 border-2 border-slate-400 border-solid m-2 items-center">
                            <span className="pr-2">ОЗ ДА</span>
                            <span className="text-pink-500">{info.current_odds['99']}</span>
                        </div>
                        <div className="flex px-3 border-2 border-slate-400 border-solid m-2 items-center">
                            <span className="pr-2">ОЗ Нет</span>
                            <span className="text-pink-500">{info.current_odds['100']}</span>
                        </div>
                    </div>
                    <div className="flex w-full justify-around items-center mt-3 z-0">
                        <div className={`flex flex-col justify-center items-center`}>
                            <span className="p-3 text-xl font-mono">П1</span>
                            <Progress type="circle" percent={((100 / (info.current_odds['1'])) - 1).toFixed(0)} width={100} />
                        </div>
                        <div className={`flex flex-col justify-center items-center`}>
                            <span className="p-3 text-xl font-mono">Х</span>
                            <Progress type="circle" percent={((100 / (info.current_odds['3'])) - 1).toFixed(0)} width={100} />
                        </div>
                        <div className={`flex flex-col justify-center items-center`}>
                            <span className="p-3 text-xl font-mono">П2</span>
                            <Progress type="circle" percent={((100 / (info.current_odds['2'])) - 1).toFixed(0)} width={100} />
                        </div>
                    </div>

                    <div className="flex flex-col  my-5">
                        <div>
                            <span className='font-bold mr-3'>Стадион:</span>
                            <span className='text-teal-900 text-start font-mono w-[50%]'>
                                {info.additional_info.stadium_name ? info.additional_info.stadium_name : 'Нет информации'}
                            </span>
                        </div>
                        <div className='w-[50%]'>
                            <span className='font-bold mr-3'>Погода</span>
                            <span
                                className={info.additional_info?.temperature?.slice(0, 1) === '+' ? +info.additional_info?.temperature?.slice(1, 1) >= 10 ?
                                    'text-orange-500 text-center font-bold' : 'text-cyan-600 text-center font-bold' : 'text-sky-400 text-center font-bold'
                                }>
                                {info.additional_info?.temperature ? info.additional_info?.temperature : 'Нет информации'}
                            </span>
                            <span className='text-teal-900 text-end font-mono pl-3'>
                                {info.additional_info?.weather ? info.additional_info?.weather : 'Нет информации'}
                            </span>
                        </div>
                    </div>

                    <div className="mt-5 mb-5">
                        <Tabs
                            defaultActiveKey="predict"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab
                                eventKey="predict"
                                title={<p className='shadow-cyan-200font-mono font-medium text-indigo-900'>Статистика</p>}>
                                <Form data={info} />
                                <LastMatches data={info} />
                            </Tab>
                            <Tab
                                eventKey="bets"
                                title={<p className='font-mono  font-medium text-indigo-900'>Ставки</p>}>
                                <Bets
                                    info={info}
                                />
                            </Tab>
                            <Tab
                                eventKey="analitic"
                                title={<p className='font-mono font-medium text-indigo-900'>Аналитика</p>}>
                                <Analitics
                                    info={info}
                                    predictions={predictions}
                                    oddsHistory={oddsHistory}
                                />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
                :
                <Loading />
            } */}
        </div>
    );
};

export default MatchHockey;
