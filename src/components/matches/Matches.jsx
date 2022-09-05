import { useSelector, useDispatch } from "react-redux";
import { Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
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
            url: 'http://localhost:8000/matches',
        };

        axios.request(options).then(function (response) {
            console.log(response.data);

            const leaguesId = [128, 188, 218, 144, 71, 72, 265, 169, 239, 119, 40, 41, 42, 62, 79, 323, 136,
                 98, 262, 88, 89, 103, 94, 235, 179, 141, 113, 207, 203, 253, 39, 61, 78, 135, 140];

            let leagues = response.data.data.map(el => {
                return ({
                    logo: el.league.logo,
                    name: el.league.name,
                    country: el.league.country,
                    id: el.league.id,
                    flag: el.league.flag,
                    matches: [],
                });
            });

            let topLeagues = [];

            leagues.forEach((el, i) => {
                leaguesId.forEach(item => {
                    if(item === el.id) {
                        topLeagues.push(el); 
                    }
                })
            })

            response.data.data.forEach(el => {
                topLeagues.forEach(item => {
                    if(el.league.id === item.id) {
                        item.matches.push({
                            fixtureId: el.fixture.id,
                            date: el.fixture.date,
                            status: el.fixture.status,
                            referee: el.fixture.referee,
                            goalsHome: el.goals.home,
                            goalsAway: el.goals.away,
                            idHome: el.teams.home.id,
                            idAway: el.teams.away.id,
                            logoHome: el.teams.home.logo,
                            logoAway: el.teams.away.logo,
                            nameHome: el.teams.home.name,
                            nameAway: el.teams.away.name,
                            logoLeague: el.league.logo,
                            nameLeague: el.league.name,
                            country: el.league.country,
                            leagueId: el.league.id,
                            flag: el.league.flag,
                        })
                    }
                });
            });

            const matches = topLeagues.filter((thing,index) => {
                return index === topLeagues.findIndex(obj => {
                  return JSON.stringify(obj) === JSON.stringify(thing);
                });
              });

            console.log(matches);

            setArrayMatches(matches);
            setIsLoading(true);

        }).catch(function (error) {
            console.error(error);
        });
    }, []);

    let elements = arrMatches.map(el => {
        let matchElements = el.matches.map(item => {
            return (
                <div onClick={() => {
                    dispatch({
                        type: 'MATCH',
                        payload: {
                            id: item.fixtureId,
                            homeLogo: item.logoHome,
                            homeName: item.nameHome,
                            awayLogo: item.logoAway,
                            awayName: item.nameAway,
                            goalsHome: item.goalsHome,
                            goalsAway: item.goalsAway,
                            leagueName: item.nameLeague,
                            leagueLogo: item.logoLeague,
                            leagueId: item.leagueId,
                            country: item.country,
                            flag: item.flag,
                            status: item.status,
                            date: item.date
                        }
                    });
                    history('/match');
                }} className="hover:bg-gray-300 w-full h-16 bg-slate-50 flex justify-around items-center mb-2.5 p-2 border-1 rounded-3xl border-solid border-slate-300" key={item.fixtureId}>
                    <div className="flex items-center w-4/12">
                        <img className="lg:w-1/12 w-2/12" src={item.logoHome} alt="лого" />
                        <span className="p-2 text-sm lg:text-base">{item.nameHome}</span>
                    </div>
                    <span className="w-1/6 text-sm lg:text-base">{item.goalsHome}:{item.goalsAway}</span>
                    <div className="flex items-center w-4/12">
                        <img className="lg:w-1/12 w-2/12" src={item.logoAway} alt="лого" />
                        <span className="p-2 text-sm lg:text-base">{item.nameAway}</span>
                    </div>
                    <span className="w-1/5 text-sm lg:text-base">{item.date.slice(0, 10)}</span>
                </div>
            )
        });
        return (
            <div className="mb-2.5 p-2" key={el.id}>
                <div className="w-full h-14 flex justify-between items-center bg-stone-200 mb-2.5">
                    <div className="flex w-6/12 items-center ml-2">
                        <img className="lg:w-1/12 w-2/12 h-4/5" src={el.logo} alt="лого" />
                        <span className="p-2">{el.name}</span>
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
