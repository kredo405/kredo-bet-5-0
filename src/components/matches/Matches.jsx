import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Soccer365Services } from "../../services/soccer365";
import { Empty, BackTop, Spin, Modal, Button } from 'antd';

const errorModal = (message) => {
    Modal.error({
        title: message
    });
};

const Matches = () => {
    const [arrMatches, setArrayMatches] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const state = useSelector(state => state);
    const history = useNavigate();

    const onClick = () => {
        history('/live')
    }

    useEffect(() => {
        if (state.token === '') {
            history('/')
        }

        const getData = async () => {
            const leagues = [{ league: 'Высшая лига', country: 'Belarus' }, { league: 'Премьер-Лига', country: 'England' }, { league: 'Лига Чемпионов', country: '' },
            { league: 'Лига конференций', country: '' }, { league: 'Премьер-Лига', country: 'Russian Federation' }, { league: 'Серия А', country: 'Italy' },
            { league: 'Примера', country: 'Spain' }, { league: 'Лига Европы', country: '' }, { league: 'Бундеслига', country: 'Germany' },
            { league: 'Лига наций УЕФА', country: '' }, { league: 'Лига 1', country: 'France' }, { league: 'Чемпионшип', country: 'England' },
            { league: 'Кубок Англии', country: 'England' }, { league: 'Эредивизи', country: 'Netherlands' }, { league: 'Примейра Лига', country: 'Portugal' },
            { league: 'Чемпионат мира', country: '' }, { league: 'Кубок России', country: 'Russian%20Federation' },
            { league: 'Кубок Лиги', country: 'England' }, { league: 'Серия B', country: 'Italy' }, { league: 'Суперлига', country: 'Turkey' },
            { league: 'Бундеслига 2', country: 'Germany' }, { league: 'Премьер-Лига', country: 'Ukraine' }, { league: 'Сегунда', country: 'Spain' },
            { league: 'Чемпионат Европы', country: '' }, { league: 'Кубок Испании', country: 'Spain' }, { league: 'Кубок Италии', country: 'Italy' },
            { league: 'Первая лига', country: 'England' }, { league: 'Про-Лига', country: 'Belgium' }, { league: 'Экстракласса', country: 'Poland' },
            { league: 'Серия A', country: 'Brazil' }, { league: 'Лига 2', country: 'France' }, { league: 'Кубок Германии', country: 'Germany' },
            { league: 'Кубок Франции', country: 'France' }, { league: 'МЛС', country: 'United States of America' }, { league: 'Премьершип', country: 'Scotland' },
            { league: 'Суперкубок', country: 'Belarus' }, { league: 'Вторая лига', country: 'England' }, { league: 'Элитсерия', country: 'Norway' },
            { league: 'Суперлига', country: 'Switzerland' }, { league: 'Суперлига', country: 'Greece' }, { league: 'Аллсвенскан', country: 'Sweden' },
            { league: 'Суперлига', country: 'Denmark' }, { league: 'Суперкубок', country: 'England' }, { league: 'Суперкубок УЕФА', country: '' },
            { league: 'Суперлига', country: 'Serbia' }, { league: 'Бундеслига', country: 'Austria' }, { league: 'Премьер-Лига', country: 'Kazakhstan' },
            { league: 'ПФГ А', country: 'Bulgaria' }, { league: 'Суперлига', country: 'China' }, { league: 'Высшая лига', country: 'Georgia' },
            { league: 'Лига I', country: 'Romania' }, { league: 'Премьер-Лига', country: 'Israel' }, { league: 'J1 Лига', country: 'Japan' },
            { league: 'НБ I', country: 'Hungary' }, { league: 'Премьер-Лига', country: 'Azerbaijan' }, { league: 'Высшая лига', country: 'Latvia' },
            { league: 'Премьер-Лига', country: 'Egypt' }, { league: 'Серия B', country: 'Brazil' }, { league: 'Индийская суперлига', country: 'India' },
            { league: '1. ХФЛ', country: 'Croatia' }, { league: 'Высший дивизион', country: 'Ireland' }, { league: 'Эрстедивизи', country: 'Netherlands' },
            { league: 'Премьер-Лига', country: 'Armenia' }, { league: 'Лига МХ', country: 'Mexico' }, { league: 'Примера А', country: 'Colombia' },
            { league: 'Примера Дивизион', country: 'Uruguay' }, { league: 'Вейккауслиига', country: 'Finland' }, { league: 'Премьершип', country: 'Northern%20Ireland' },
            { league: 'Премьер-Лига', country: 'Saudi%20Arabia' }, { league: 'Премьер-Лига', country: 'Saudi%20Arabia' },]

            try {
                const matches = await Soccer365Services.getAllMatches()
                console.log(matches)
                const matchesFilter = []

                matches.data.matches.forEach(el => {
                    leagues.forEach(item => {
                        if (el.leagueName === item.league && el.country === item.country) {
                            matchesFilter.push(el) 
                        }
                    })

                })
                setArrayMatches(matchesFilter)
                setIsLoading(true)
            }
            catch (error) {
                console.error(error)
                errorModal(error.message)
            }
        }

        getData()

    }, []);

    let elements

    if (arrMatches.length !== 0) {
        elements = arrMatches.map((el, i) => {
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
                <div key={i}>
                    {matchElements.length !== 0 ?
                        <div className="mb-2 p-2">
                            <div className="w-full h-14 flex justify-between items-center bg-slate-50 mb-2">
                                <div className="flex items-center ml-2 w-full">
                                    <img className="w-[22px] lg:w-[32px]" src={el.leagueLogo} alt="логотип лиги" />
                                    <span className="p-2 font-medium font-mono text-lg text-gray-600">{el.leagueName}</span>
                                </div>
                            </div>
                            <div>
                                {matchElements}
                            </div>
                        </div>
                        :
                        null
                    }
                </div>
            )
        })
    }
    else {
        elements = <div className="h-screen flex justify-center items-center">
            <Empty
                description={
                    <span className="font-mono text-lg font-medium text-gray-700">
                        На данный момент нет матчей
                    </span>
                }
            >
                <button
                    onClick={onClick}
                    className="p-2 bg-cyan-400 border-solid border-cyan-500 border-2 rounded-md text-white font-serif font-semibold">
                    Перейти в Live
                </button>
            </Empty>
        </div>

    }



    return (
        <div className="container lg:px-44 mt-20">
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
