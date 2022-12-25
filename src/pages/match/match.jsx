import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Header from "../../components/header/Header";
import { Progress, Spin, BackTop, Modal } from 'antd';
import Bets from "../../components/Bets/Bets";
import Form from "../../components/Form/Form";
import LastMatches from "../../components/lastMatches/LastMatches";
import { Soccer365Services } from "../../services/soccer365";
import Analitics from '../../components/Analitics/Analitics';
import { nbbetServices } from '../../services/nbbet';
import findTeam from '../../utils/findTeam';

const errorModal = (message) => {
    Modal.error({
        title: message
    });
};

const Match = () => {
    const [data, setData] = useState({});
    const [form, setForm] = useState('');
    const [info, setInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const state = useSelector(state => state);

    useEffect(() => {

        const getInfo = async () => {
            try {
                const matchesInfo = await Soccer365Services.getMatchInfo();
                console.log(matchesInfo.data)
                const posHome = matchesInfo.data.match[0].percentOutcomes.home ? matchesInfo.data.match[0].percentOutcomes.home.indexOf('%') : 0;
                const posDraw = matchesInfo.data.match[0].percentOutcomes.draw ? matchesInfo.data.match[0].percentOutcomes.draw.indexOf('%') : 0;
                const posAway = matchesInfo.data.match[0].percentOutcomes.away ? matchesInfo.data.match[0].percentOutcomes.away.indexOf('%') : 0;

                matchesInfo.data.match[0].percentOutcomes.home = matchesInfo.data.match[0].percentOutcomes.home ?
                    matchesInfo.data.match[0].percentOutcomes.home.slice(0, posHome) : 0;
                matchesInfo.data.match[0].percentOutcomes.draw = matchesInfo.data.match[0].percentOutcomes.draw ?
                    matchesInfo.data.match[0].percentOutcomes.draw.slice(0, posDraw) : 0;
                matchesInfo.data.match[0].percentOutcomes.away = matchesInfo.data.match[0].percentOutcomes.away ?
                    matchesInfo.data.match[0].percentOutcomes.away.slice(0, posAway) : 0;

                setData(matchesInfo.data.match[0]);
                const matchesForm = await Soccer365Services.getForm();
                console.log(matchesForm.data);
                setForm(matchesForm.data.form[0]);
                const matchesLineups = await Soccer365Services.getLineups();
                console.log(matchesLineups.data);

                let matchNbbet;

                state.allMatches.forEach(item => {
                    const match = item[4].filter(el => findTeam(matchesInfo.data.match[0].homeTeam, el[7]) && findTeam(matchesInfo.data.match[0].awayTeam, el[15]));
                    if (match.length !== 0) {
                        matchNbbet = match[0]
                    }
                })

                console.log(matchNbbet)
                sessionStorage.setItem('link', matchNbbet[3]);
                const matchesInfoNbbet = await nbbetServices.getMatchInfo();
                console.log(matchesInfoNbbet)
                setInfo(matchesInfoNbbet.data.match.data.match)

                setTimeout(() => {
                    setIsLoading(true);
                }, 1000);
            }
            catch (error) {
                console.log(error)
                errorModal(error.message)
            }
        }

        getInfo()

    }, []);

    return (
        <div>
            <Header />
            <BackTop />
            {isLoading ?
                <div className="container lg:px-80 mt-16">
                    <div className="flex justify-center mb-8 bg-neutral-50 p-3">
                        <h1 className='text-slate-700 font-mono text-xl text-center'>{data.title.slice(0, -5)}</h1>
                    </div>

                    <div className="flex justify-evenly item-center">
                        <div className="flex flex-col items-center w-5/12">
                            <img src={data.homeLogo} alt="логотип" />
                            <span className="py-3 text-center font-mono text-clip text-lg font-medium text-teal-900">{data.homeTeam}</span>
                        </div>
                        <div className="flex justify-center items-center w-2/12">
                            <span className='text-2xl'>{data.homeGoal}:{data.awayGoal}</span>
                        </div>
                        <div className="flex flex-col items-center w-5/12 ">
                            <img src={data.awayLogo} alt="логотип" />
                            <span className="py-3 text-center font-mono text-lg font-medium text-teal-900">{data.awayTeam}</span>
                        </div>
                    </div>
                    {data.odds ?
                        <div className="flex flex-wrap justify-center">
                            <div className="flex px-3 border-2 border-slate-400 border-solid m-2 items-center">
                                <span className="pr-2">П1</span>
                                <span className="text-pink-500">{data.odds.oddHomeWin}</span>
                            </div>
                            <div className="flex px-3 border-2 border-slate-400 border-solid m-2 items-center">
                                <span className="pr-2">Х</span>
                                <span className="text-pink-500">{data.odds.oddDraw}</span>
                            </div>
                            <div className="flex px-3 border-2 border-slate-400 border-solid m-2 items-center">
                                <span className="pr-2">П2</span>
                                <span className="text-pink-500">{data.odds.oddAwayWin}</span>
                            </div>
                            <div className="flex px-3 border-2 border-slate-400 border-solid m-2 items-center">
                                <span className="pr-2">ТБ2.5</span>
                                <span className="text-pink-500">{data.odds.oddTotalO25}</span>
                            </div>
                            <div className="flex px-3 border-2 border-slate-400 border-solid m-2 items-center">
                                <span className="pr-2">ТМ2.5</span>
                                <span className="text-pink-500">{data.odds.oddTotalU25}</span>
                            </div>
                            <div className="flex px-3 border-2 border-slate-400 border-solid m-2 items-center">
                                <span className="pr-2">ОЗ ДА</span>
                                <span className="text-pink-500">{data.odds.oddBtsYes}</span>
                            </div>
                            <div className="flex px-3 border-2 border-slate-400 border-solid m-2 items-center">
                                <span className="pr-2">ОЗ Нет</span>
                                <span className="text-pink-500">{data.odds.oddBtsNo}</span>
                            </div>
                        </div>
                        :
                        null}

                    <div className="flex w-full justify-around items-center mt-3 z-0">
                        <div className={`flex flex-col justify-center items-center`}>
                            <span className="p-3 text-xl font-mono">П1</span>
                            <Progress type="circle" percent={+data.percentOutcomes.home} width={100} />
                        </div>
                        <div className={`flex flex-col justify-center items-center`}>
                            <span className="p-3 text-xl font-mono">Х</span>
                            <Progress type="circle" percent={+data.percentOutcomes.draw} width={100} />
                        </div>
                        <div className={`flex flex-col justify-center items-center`}>
                            <span className="p-3 text-xl font-mono">П2</span>
                            <Progress type="circle" percent={+data.percentOutcomes.away} width={100} />
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
                                className={info.additional_info.temperature.slice(0, 1) === '+' ? +info.additional_info.temperature.slice(1, 1) >= 10 ?
                                    'text-orange-500 text-center font-bold' : 'text-cyan-600 text-center font-bold' : 'text-sky-400 text-center font-bold'
                                }>
                                {info.additional_info.temperature ? info.additional_info.temperature : 'Нет информации'}
                            </span>
                            <span className='text-teal-900 text-end font-mono pl-3'>
                                {info.additional_info.weather ? info.additional_info.weather : 'Нет информации'}
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
                                title={<p className='p-2 border-2 shadow-lg shadow-cyan-200 border-cyan-600 border-double rounded-md font-mono font-medium text-indigo-900'>Статистика</p>}>
                                <Form data={form} homeName={data.homeTeam} awayName={data.awayTeam} />
                                <LastMatches data={form} homeName={data.homeTeam} awayName={data.awayTeam} />
                            </Tab>
                            <Tab
                                eventKey="bets"
                                title={<p className='p-2 border-2 shadow-lg shadow-cyan-200 border-orange-600 border-double rounded-md font-mono  font-medium text-indigo-900'>Ставки</p>}>
                                <Bets
                                    data={data.predictions}
                                    form={form}
                                    info={info}
                                    homeName={data.homeTeam}
                                    awayName={data.awayTeam} />
                            </Tab>
                            <Tab
                                eventKey="analitic"
                                title={<p className='p-2 border-2 shadow-lg shadow-cyan-200 border-orange-600 border-double rounded-md font-mono  font-medium text-indigo-900'>Аналитика</p>}>
                                <Analitics
                                    data={data.predictions}
                                    form={form}
                                    info={info}
                                    homeName={data.homeTeam}
                                    awayName={data.awayTeam}
                                />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
                :
                <div className="h-screen flex flex-col justify-center items-center">
                    <div className="mb-4">
                        <span className="font-mono text-xl font-medium text-sky-600">Собираем информацию</span>
                    </div>
                    <Spin size="large" />
                </div>
            }
        </div>
    )
}

export default Match