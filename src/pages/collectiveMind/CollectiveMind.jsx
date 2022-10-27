import Header from "../../components/header/Header";
import { arbworldServices } from "../../services/arbworld";
import { calcCorrectScore } from "../../utils/calcCorrectScore";
import MoneyWay from "../../components/MoneyWay/MoneyWay";
import findTeam from "../../utils/findTeam";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Collapse, Progress, Spin } from 'antd';
import { Table } from 'react-bootstrap';

const { Panel } = Collapse;

const CollectiveMind = () => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useNavigate();
    const [correctScore, setCorrectScore] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const correctScore = await arbworldServices.getcorrectScore()
                const moneyWay1x2 = await arbworldServices.getMoneyWay1x2()
                const moneyWayOverUnder = await arbworldServices.getMoneyWayUnderOver()

                console.log(moneyWay1x2)
                console.log(moneyWayOverUnder)

                const correctScoreFilter = correctScore.data.moneyWay.map(el => {
                    const pos = el.teamName.indexOf('vs')
                    const homeName = el.teamName.slice(0, pos)
                    const awayName = el.teamName.slice(pos + 2)

                    const scores = el.scores.map(item => {
                        const elements = ['score0_0', 'score0_1', 'score0_2', 'score0_3', 'score1_0', 'score1_1', 'score1_2', 'score1_3',
                            'score2_0', 'score2_1', 'score2_2', 'score2_3', 'score3_0', 'score3_1', 'score3_2', 'score3_3',]

                        elements.forEach(element => {
                            if (item[element]) {
                                const pos = item[element].indexOf('%')
                                item[element] = +item[element].slice(0, pos)
                            }
                        })

                        return item
                    })

                    const percentOutcomes = calcCorrectScore(el.scores)

                    return {
                        homeName: homeName,
                        awayName: awayName,
                        scores: scores,
                        date: el.date,
                        league: el.leagueName,
                        percentOutcomes: percentOutcomes,
                    }
                })

                console.log(correctScoreFilter)

                const elements = correctScoreFilter.map((el, i) => {
                    return (
                        <div key={i} onClick={() => {
                            dispatch({
                                type: 'MATCH',
                                payload: {
                                    homeName: el.homeName,
                                    awayName: el.awayName,
                                    scores: el.scores,
                                    percent: el.percentOutcomes
                                }
                            });
                            history('/collectiveMindMatch');
                        }
                        } className="hover:bg-gray-300 w-full h-16 bg-slate-50 flex justify-around items-center mb-2.5 p-2 border-1 rounded-3xl border-solid border-slate-300">
                            <div className="flex items-center w-4/12">
                                <span className="p-2 text-sm lg:text-base">{el.homeName}</span>
                            </div>
                            <div className="flex items-center w-4/12">
                                <span className="p-2 text-sm lg:text-base">{el.awayName}</span>
                            </div>
                            <span className="w-1/5 text-sm lg:text-base text-center">{el.date}</span>
                        </div>
                    )
                        
                    
                })
                setCorrectScore(elements)
                setIsLoading(true)
            }
            catch (error) {
                console.log(error)
                setIsLoading(true);
            }
        }

        getData()

    }, [])

    return (
        <>
            <Header />
            {isLoading ?
                <div className="container">
                    {correctScore}
                </div>
                :
                <div className="h-screen flex flex-col justify-center items-center">
                    <div className="mb-4">
                        <span className="font-mono text-xl font-medium text-sky-600">Собираем информацию</span>
                    </div>
                    <Spin size="large" />
                </div>}
        </>
    )
}

export default CollectiveMind