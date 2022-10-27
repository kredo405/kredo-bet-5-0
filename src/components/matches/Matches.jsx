import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Soccer365Services } from "../../services/soccer365";
import { Empty, BackTop, Spin, message } from 'antd';

const ErrorMessage = (error) => {
    message.error(error);
  };

const Matches = (props) => {
    const [arrMatches, setArrayMatches] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const history = useNavigate();

    useEffect(() => {
        if (state.token === '') {
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
        const matchElementFilter = el.matches.filter(item => item.date.length > 4 && item.date !== 'Завершен' && item.date !== 'Перерыв')
        let matchElements = matchElementFilter.map((item, i) => {
            return (
                <div key={item.id} onClick={() => {
                    history('/match');
                    sessionStorage.setItem('id', item.id);
                }
                } className="hover:bg-gray-300 w-full h-16 bg-slate-50 flex justify-around items-center mb-2.5 px-2 border-1 rounded-xl border-solid border-slate-300">
                    <div className="flex pr-2 items-center w-6/12 lg:w-5/12">
                        <img className="w-[20px]" src={item.homeLogo} alt="logo" />
                        <span className="px-3 font-mono text-slate-700 text-sm lg:text-xl">{item.homeTeam}</span>
                    </div>
                    <span className="hidden lg:flex justify-center lg:w-2/6 text-sm lg:text-base">{item.homeGoals}:{item.awayGoals}</span>
                    <div className="flex pl-2 items-center w-6/12 lg:w-5/12">
                        <img className="w-[20px]" src={item.awayLogo} alt="logo" />
                        <span className="px-3 font-mono text-slate-700 text-sm lg:text-xl">{item.awayTeam}</span>
                    </div>
                </div>
            )
        });
        return (
            <div className="mb-2 p-2" key={i}>
                <div className="w-full h-14 flex justify-between items-center bg-slate-50 mb-2">
                    <div className="flex items-center ml-2 w-full">
                        <img className="w-[22px] lg:w-[32px]" src={el.leagueLogo} alt="логотип лиги" />
                        <span className="p-2 font-medium font-mono text-lg text-gray-600">{el.leagueName}</span>
                    </div>
                </div>
                <div>
                    {matchElements.length === 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : matchElements}
                </div>
            </div>
        )
    })

    return (
        <div className="container lg:px-44 mt-4">
            <BackTop />
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

export default Matches;
