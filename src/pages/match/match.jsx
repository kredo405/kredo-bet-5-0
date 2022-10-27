import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useEffect, useState } from 'react';
import Header from "../../components/header/Header";
import { Progress, Spin, BackTop, Empty, message } from 'antd';
import Comment from "../../components/Comment/Comment";
import Bets from "../../components/Bets/Bets";
import Form from "../../components/Form/Form";
import LastMatches from "../../components/lastMatches/LastMatches";
import { Soccer365Services } from "../../services/soccer365";

const ErrorMessage = (error) => {
    message.error(error);
  };

const Match = () => {
    const [data, setData] = useState({});
    const [form, setForm] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const getInfo = async () => {
            try {
                const matchesInfo = await Soccer365Services.getMatchInfo();
                console.log(matchesInfo.data)
                const posHome = matchesInfo.data.match[0].percentOutcomes.home.indexOf('%')
                const posDraw = matchesInfo.data.match[0].percentOutcomes.draw.indexOf('%')
                const posAway = matchesInfo.data.match[0].percentOutcomes.away.indexOf('%')
                matchesInfo.data.match[0].percentOutcomes.home = matchesInfo.data.match[0].percentOutcomes.home.slice(0, posHome)
                matchesInfo.data.match[0].percentOutcomes.draw = matchesInfo.data.match[0].percentOutcomes.draw.slice(0, posDraw)
                matchesInfo.data.match[0].percentOutcomes.away = matchesInfo.data.match[0].percentOutcomes.away.slice(0, posAway)
                setData(matchesInfo.data.match[0]);
                const matchesForm = await Soccer365Services.getForm();
                console.log(matchesForm.data)
                setForm(matchesForm.data.form[0])
                const matchesLineups = await Soccer365Services.getLineups();
                console.log(matchesLineups.data)
                // setLineups(matchesLineups.data.lineups[0])
                setIsLoading(true);
            }
            catch (error) {
                console.log(error)
                ErrorMessage(error.message)
            }
        }

        getInfo()

    }, []);

    return (
        <div>
            <Header />
            <BackTop />
            {isLoading ?
                <div className="container lg:px-80">
                    <div className="flex justify-center mb-8 bg-neutral-50 p-3">
                    <h1 className='text-slate-700 font-mono text-xl text-center'>{data.title}</h1>
                </div>
                <div className="flex justify-evenly item-center">
                    <div className="flex flex-col items-center">
                        <img src={data.homeLogo} alt="логотип" />
                        <span className="py-3 font-mono text-lg font-medium text-teal-900">{data.homeTeam}</span>
                    </div>
                    <div className="flex items-center">
                        <span className='text-2xl'>{data.homeGoal}:{data.awayGoal}</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src={data.awayLogo} alt="логотип" />
                        <span className="py-3 font-mono text-lg font-medium text-teal-900">{data.awayTeam}</span>
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
                
                <div className="flex w-full justify-around items-center mt-5">
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

                <div className="mt-5 mb-5">
                    <Tabs
                        defaultActiveKey="predict"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="predict" title="Статистика">
                            <Form data={form} homeName={data.homeTeam} awayName={data.awayTeam} />
                            <LastMatches data={form} homeName={data.homeTeam} awayName={data.awayTeam} />
                        </Tab>
                        <Tab eventKey="bets" title="Ставки и прогнозы">
                            <Bets
                                data={data.predictions}
                                form={form}
                                homeName={data.homeTeam}
                                awayName={data.awayTeam} />
                                <Comment data={data.predictions} />
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