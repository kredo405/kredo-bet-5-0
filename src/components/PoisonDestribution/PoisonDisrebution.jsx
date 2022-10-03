import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Avatar, List } from 'antd';
import axios from 'axios';

const determineComposition = (dataHome, dataAway) => {

    const playerHomeFilter = [];
    const playerAwayFilter = [];

    while (playerHomeFilter.length < 11) {
        dataHome.forEach((el, i, arr) => {
            let maxGamesPlayersHome = Math.max(...arr.map(obj => +obj.games));
            if (maxGamesPlayersHome === +el.games && playerHomeFilter.length < 11) {
                arr.splice(i, 1);
                playerHomeFilter.push(el);
            }
        })
    }

    while (playerAwayFilter.length < 11) {
        dataAway.forEach((el, i, arr) => {
            let maxGamesPlayerAway = Math.max(...arr.map(obj => +obj.games));
            if (maxGamesPlayerAway === +el.games && playerAwayFilter.length < 11) {
                arr.splice(i, 1);
                playerAwayFilter.push(el);
            }
        })
    }

    console.log(playerHomeFilter)
    console.log(playerAwayFilter)
}

const getPlayerStats = (standartStats, shootingStats) => {
    const playerStats = standartStats.map(item => {
        const playerStatsShooting = shootingStats.find(elem => elem.player === item.player);
        if (playerStatsShooting) {
            return {
                assists: item.assists,
                games: item.games,
                games_starts: item.games_starts,
                goals: item.goals,
                goals_per90: item.goals_per90,
                minutes: item.minutes,
                player: item.player,
                position: item.position,
                xg: item.xg,
                xg_per90: item.xg_per90,
                goals_per_shot: playerStatsShooting.goals_per_shot,
                goals_per_shot_on_target: playerStatsShooting.goals_per_shot_on_target,
                shots_on_target_per90: playerStatsShooting.shots_on_target_per90,
                shots_total_per90: playerStatsShooting.shots_total_per90,
            }
        }
    })

    return playerStats;
}


const PoisonDestribution = (props) => {
    const state = useSelector((state) => state);
    const [dataHome, setDataHome] = useState([{
        assists:"0",
        games:"5",
        games_starts:"4",
        goals:"0",
        goals_per90:"0.00",
        minutes:"351",
        player:"Daniel Amartey",
        position:"DF",
        xg:"0.0",
        xg_per90:"0.00",
        goals_per_shot:"0.00",
        goals_per_shot_on_target:"",
        shots_on_target_per90:"0.00",
        shots_total_per90:"0.26",
    }]);
    const [dataAway, setDataAway] = useState([{
        assists:"0",
        games:"5",
        games_starts:"4",
        goals:"0",
        goals_per90:"0.00",
        minutes:"351",
        player:"Daniel Amartey",
        position:"DF",
        xg:"0.0",
        xg_per90:"0.00",
        goals_per_shot:"0.00",
        goals_per_shot_on_target:"",
        shots_on_target_per90:"0.00",
        shots_total_per90:"0.26",
    }]);

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/statistics',
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            response.data.stats.forEach(el => {
                if (el.leagueId === props.id) {
                    const standartStatsHome = el.standartStatsPlayers.filter(item => {
                        if (props.homeName === item.team) {
                            return item;
                        }
                    })
                    const standartStatsAway = el.standartStatsPlayers.filter(item => {
                        if (props.awayName === item.team) {
                            return item;
                        }
                    });
                    const shootingStatsHome = el.shootingStatsPlayers.filter(item => {
                        if (props.homeName === item.team) {
                            return item;
                        }
                    })
                    const shootingStatsAway = el.shootingStatsPlayers.filter(item => {
                        if (props.awayName === item.team) {
                            return item;
                        }
                    });

                    const playerStatsHome = getPlayerStats(standartStatsHome, shootingStatsHome);
                    const playerStatsAway = getPlayerStats(standartStatsAway, shootingStatsAway);

                    setDataHome(playerStatsHome);
                    setDataAway(playerStatsAway);

                }
            });

        }).catch(function (error) {
            console.error(error);
        });
    }, []);

    const deletePlayerHome = (e) => {
        const dataHomeFilter = dataHome.filter(el => e.target.name !== el.player);
        setDataHome(dataHomeFilter);
    }

    const deletePlayerAway = (e) => {
        const dataAwayFilter = dataAway.filter(el => e.target.name !== el.player);
        setDataAway(dataAwayFilter);
    }

    const calcPoison = () => {
        if(dataHome.length >= 11 && dataHome.length >= 11) {
            determineComposition(dataHome, dataAway);
        }
    }

    const listHome = dataHome.map((el, i) => {
        return (
            <li key={i} className='flex justify-between w-full mt-2'>
                <div className='flex'>
                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                    <p className='px-3'>{el.player}</p>
                </div>
                <button className='text-red-600' name={el.player} onClick={deletePlayerHome}>Травмирован</button>
            </li>
        )
    })

    const listAway = dataAway.map((el, i) => {
        return (
            <li key={i} className='flex justify-between w-full mt-2'>
                <div className='flex'>
                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                    <p className='px-3'>{el.player}</p>
                </div>
                <button className='text-red-600' name={el.player} onClick={deletePlayerAway}>Травмирован</button>
            </li>
        )
    })



    return (
        <div className='container'>
            <div className="flex justify-center py-2">
                <h2 className='text-xl'>Выберите травмированных игроков {props.homeName}</h2>
            </div>
            <ul>
                {listHome}
            </ul>
            <div className="flex justify-center py-2">
                <h2 className='text-xl'>Выберите травмированных игроков {props.awayName}</h2>
            </div>
            <ul>
                {listAway}
            </ul>   
            <div className="flex justify-center py-2 mb-5 ">
                <button
                    className='text-xl bg-cyan-600 text-white px-10 py-3 rounded-lg border-2 border-cyan-600 border-solid'
                    onClick={calcPoison}
                >
                    Рассчитать
                </button>
            </div>
        </div>
    )
}

export default PoisonDestribution;