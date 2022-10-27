import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { message, Spin } from 'antd';
import Header from "../header/Header";
import { Soccer365Services } from "../../services/soccer365";


const ErrorMessage = (error) => {
    message.error(error);
  };

const ListMatchesLive = () => {
    const [arrMatches, setArrayMatches] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const history = useNavigate();

    useEffect(() => {
        if(state.token === '') {
            history('/')
        }
        Soccer365Services.getAllMatches()
            .then(response => {
                console.log(response.data)
                setArrayMatches(response.data.matches)
                setIsLoading(true)
            }).catch(error => {
                console.error(error)
                ErrorMessage(error.message)
            });
    }, []);

    let elements = arrMatches.map((el, i) => {
        const matchElementFilter =  el.matches.filter(item => item.date.length <= 4 && item.date !== 'Завершен')
        let matchElements = matchElementFilter.map((item, i) => {
            return (
                <div key={item.id} onClick={() => {
                    history('/match');
                    sessionStorage.setItem('id', item.id);
                }
                } className="hover:bg-gray-300 w-full h-16 bg-slate-50 flex justify-around items-center mb-2.5 p-2 border-1 rounded-3xl border-solid border-slate-300">
                    <div className="flex items-center w-4/12">
                        <img src={item.homeLogo} alt="logo" />
                        <span className="p-2 text-sm lg:text-base">{item.homeTeam}</span>
                    </div>
                    <span className="w-1/6 text-sm lg:text-base">{item.homeGoals}:{item.awayGoals}</span>
                    <div className="flex items-center w-4/12">
                        <img src={item.awayLogo} alt="logo" />
                        <span className="p-2 text-sm lg:text-base">{item.awayTeam}</span>
                    </div>
                    <span className="w-1/5 text-sm lg:text-base text-center">{item.date}</span>
                </div>
            )
        });
        return (
            <div className="mb-2.5 p-2" key={i}>
                <div className="w-full h-14 flex justify-between items-center bg-stone-200 mb-2.5">
                    <div className="flex w-6/12 items-center ml-2">
                        <img className="lg:w-1/12 w-2/12 h-4/5" src={el.leagueLogo} alt="логотип лиги" />
                        <span className="p-2">{el.leagueName}</span>
                    </div>
                </div>
                <div>
                    {matchElements.length === 0 ? <p className="text-center">Нет матчей</p> : matchElements}
                </div>
            </div>
        )
    })

    return (
        <div className="container lg:px-44 mt-4">
            <Header />
            {isLoading ?
                elements :
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

export default ListMatchesLive;