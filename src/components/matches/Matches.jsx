import { useSelector, useDispatch } from "react-redux";
import { Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Matches = (props) => {
    const [arrMatches, setArrayMatches] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const history = useNavigate();

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/statistics',
        };

        axios.request(options).then(function (response) {
            console.log(response.data)
            setArrayMatches(response.data.stats) 
            setIsLoading(true)
        }).catch(function (error) {
            console.error(error)
        });
    }, []);


    let elements = arrMatches.map((el, i) => {
        let matchElements = el.matches.map((item, i) => {

            if (moment().format('YYYY-MM-DD') === item.date) {
                return (
                    <div key={i} onClick={() => {
                        dispatch({
                            type: 'MATCH',
                            payload: {
                                id: i,
                                homeName: item.homeTeam,
                                awayName: item.awayTeam,
                                goalsHome: item.score.slice(0, 1),
                                goalsAway: item.score.slice(2),
                                leagueName: el.leagueName,
                                leagueLogo: el.logo,
                                leagueId: el.leagueId,
                                country: el.country,
                                flag: el.flag,
                                date: item.date,
                                time: item.time,
                            }
                        });
                        history('/match');
                    }} className="hover:bg-gray-300 w-full h-16 bg-slate-50 flex justify-around items-center mb-2.5 p-2 border-1 rounded-3xl border-solid border-slate-300" key={item.fixtureId}>
                        <div className="flex items-center w-4/12">
                            <span className="p-2 text-sm lg:text-base">{item.homeTeam}</span>
                        </div>
                        <span className="w-1/6 text-sm lg:text-base">{item.score}</span>
                        <div className="flex items-center w-4/12">
                            <span className="p-2 text-sm lg:text-base">{item.awayTeam}</span>
                        </div>
                        <span className="w-1/5 text-sm lg:text-base">{item.date}</span>
                        <span className="w-1/5 text-sm lg:text-base">{item.time}</span>
                    </div>
                )
            }
        });
        return (
            <div className="mb-2.5 p-2" key={i}>
                <div className="w-full h-14 flex justify-between items-center bg-stone-200 mb-2.5">
                    <div className="flex w-6/12 items-center ml-2">
                        <img className="lg:w-1/12 w-2/12 h-4/5" src={el.logo} alt="лого" />
                        <span className="p-2">{el.leagueName}</span>
                    </div>
                    <div className="flex w-6/12 justify-end items-center">
                        <img className="lg:w-1/12 w-2/12 h-4/5" src={el.flag} alt="флаг" />
                        <span className="p-2">{el.country}</span>
                    </div>
                </div>
                <div>
                    {matchElements}
                </div>
            </div>
        )
    })

    return (
        <div className="container mx-auto mt-4">
            {isLoading ? 
            elements:          
             <div className="flex justify-center items-center h-screen">
                 <Spinner animation="border" variant="secondary" size="lg" />
             </div>          
             }
        </div>
    )
}

export default Matches;
