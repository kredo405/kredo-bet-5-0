import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Soccer365Services } from "../../services/soccer365";
import { nbbetServices } from "../../services/nbbet";
import { Empty, BackTop, Spin, Modal } from 'antd';

const errorModal = (message) => {
    Modal.error({
        title: message
    });
};

const Matches = () => {
    const [arrMatches, setArrayMatches] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useNavigate();

    const onClick = () => {
        history('/live');
    }

    useEffect(() => {
        if (state.token === '') {
            history('/');
        }

        const getData = async () => {
            const leagues = [{ league: 'Высшая лига', country: 'Belarus' }, { league: 'Премьер-Лига', country: 'England' }, { league: 'Лига Чемпионов', country: '' },
            { league: 'Лига конференций', country: '' }, { league: 'Премьер-Лига', country: 'Russian Federation' }, { league: 'Серия А', country: 'Italy' },
            { league: 'Примера', country: 'Spain' }, { league: 'Лига Европы', country: '' }, { league: 'Бундеслига', country: 'Germany' },
            { league: 'Лига наций УЕФА', country: '' }, { league: 'Лига 1', country: 'France' }, { league: 'Чемпионшип', country: 'England' },
            { league: 'Эредивизи', country: 'Netherlands' }, { league: 'Примейра Лига', country: 'Portugal' },
            { league: 'Чемпионат мира', country: '' }, { league: 'Серия B', country: 'Italy' }, { league: 'Суперлига', country: 'Turkey' },
            { league: 'Бундеслига 2', country: 'Germany' }, { league: 'Премьер-Лига', country: 'Ukraine' }, { league: 'Сегунда', country: 'Spain' },
            { league: 'Чемпионат Европы', country: '' }, { league: 'Первая лига', country: 'England' }, { league: 'Про-Лига', country: 'Belgium' },
            { league: 'Лига 2', country: 'France' }, { league: 'Премьершип', country: 'Scotland' }, { league: 'Элитсерия', country: 'Norway' },
            { league: 'Суперлига', country: 'Switzerland' }, { league: 'Суперлига', country: 'Greece' }, { league: 'Аллсвенскан', country: 'Sweden' },
            { league: 'Суперлига', country: 'Denmark' }, { league: 'Суперкубок УЕФА', country: '' },
            { league: 'Суперлига', country: 'Serbia' }, { league: 'Бундеслига', country: 'Austria' }, { league: 'ПФГ А', country: 'Bulgaria' },
            { league: 'Лига I', country: 'Romania' }, { league: 'НБ I', country: 'Hungary' }, { league: '1. ХФЛ', country: 'Croatia' },
            { league: 'Высший дивизион', country: 'Ireland' }, { league: 'Эрстедивизи', country: 'Netherlands' }, { league: 'Премьершип', country: 'Northern%20Ireland' }];

            try {
                const matches = await Soccer365Services.getAllMatches();
                console.log(matches);
                const matchesFilter = [];

                matches.data.matches.forEach(el => {
                    leagues.forEach(item => {
                        if (el.leagueName === item.league && el.country === item.country) {
                            matchesFilter.push(el);
                        }
                        if (el.leagueName === item.league && item.country === '') {
                            matchesFilter.push(el);
                        }
                    })

                });

                const matchElementFilter = matchesFilter.filter(item => {
                    const matches = item.matches.filter(el => el.date.length > 4 && el.date !== 'Перерыв' && el.date !== 'Завершен');

                    if (matches.length !== 0) {
                        return {
                            country: item.country,
                            leagueLogo: item.leagueLogo,
                            leagueName: item.leagueName,
                            matches: matches
                        }
                    }

                });

                setArrayMatches(matchElementFilter);

                const allMatches = await nbbetServices.getAllMatches();

                dispatch({
                    type: 'ALLMATCHES',
                    payload: allMatches.data.matches.data.leagues
                });

                setIsLoading(true);
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
            let matchElements = el.matches.map((item, i) => {
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
