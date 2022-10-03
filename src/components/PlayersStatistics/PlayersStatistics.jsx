import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import findTeam from '../../utils/findTeam';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';

const getPlayerStats = (standartStats, shootingStats, dispatch, type) => {
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
    dispatch({
        type: type,
        payload: playerStats
    })

    return playerStats;
}

const getTablePlayer = (stats) => {
    const tablePlayer = stats.map((el, i) => {
        return (
            <tr key={i}>
                <td>{el.player}</td>
                <td><p
                    className='flex justify-center'>
                    {el.position}
                </p></td>
                <td><p
                    className='flex justify-center'>
                    {el.games}
                </p></td>
                <td><p
                    className='flex justify-center'>
                    {el.goals}
                </p></td>
                <td><p
                    className='flex justify-center'>
                    {el.goals_per90}
                </p></td>
                <td><p
                    className='flex justify-center'>
                    {el.xg}
                </p></td>
                <td><p
                    className='flex justify-center'>
                    {el.xg_per90}
                </p></td>
            </tr>
        )
    })

    return tablePlayer;
}

const PlayersStatistics = (props) => {
    const [statsHome, setStatsHome] = useState([]);
    const [statsAway, setStatsAway] = useState([]);
    const dispatch = useDispatch();

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

                    const playerStatsHome = getPlayerStats(standartStatsHome, shootingStatsHome, dispatch, 'PLAYERHOME');
                    const playerStatsAway = getPlayerStats(standartStatsAway, shootingStatsAway, dispatch, 'PLAYERAWAY');

                    const tablePlayerHome = getTablePlayer(playerStatsHome);
                    const tablePlayerAway = getTablePlayer(playerStatsAway);

                    console.log(playerStatsAway)

                    setStatsHome(tablePlayerHome);
                    setStatsAway(tablePlayerAway);

                }
            });

        }).catch(function (error) {
            console.error(error);
        });
    }, []);

    return (
        <div className='container'>
            <div className="flex justify-center py-2">
                <h2 className='text-xl'>Статистика игроков {props.homeName}</h2>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className='text-center'>#</th>
                        <th className='text-center'>Поз</th>
                        <th className='text-center'>М</th>
                        <th className='text-center'>Г</th>
                        <th className='text-center'>Г ср.</th>
                        <th className='text-center'>XG</th>
                        <th className='text-center'>XG/90</th>
                    </tr>
                </thead>
                <tbody>
                    {statsHome}
                </tbody>
            </Table>
            <div className="flex justify-center py-2">
                <h2 className='text-xl'>Статистика игроков {props.awayName}</h2>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className='text-center'>#</th>
                        <th className='text-center'>Поз</th>
                        <th className='text-center'>М</th>
                        <th className='text-center'>Г</th>
                        <th className='text-center'>Г ср.</th>
                        <th className='text-center'>XG</th>
                        <th className='text-center'>XG/90</th>
                    </tr>
                </thead>
                <tbody>
                    {statsAway}
                </tbody>
            </Table>
        </div>
    )
}

export default PlayersStatistics;