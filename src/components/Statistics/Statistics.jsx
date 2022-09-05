import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import findTeam from '../../utils/findTeam';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';


const Statistics = (props) => {
    const [leagueTable, setLeagueTable] = useState([]);
    const [shootingStats, setShootingStats] = useState([]);
    const [standartStatistics, setStandartStatistics] = useState([]);
    const [shootingStatsHome, setShootingStatsHome] = useState({
        goals: "Нет данных",
        goals_per_shot: "Нет данных",
        goals_per_shot_on_target: "Нет данных",
        minutes_90s: "Нет данных",
        npxg: "Нет данных",
        npxg_net: "Нет данных",
        npxg_per_shot: "Нет данных",
        players_used: "Нет данных",
        shots_on_target: "Нет данных",
        shots_on_target_pct: "Нет данных",
        shots_on_target_per90: "Нет данных",
        shots_total: "Нет данных",
        shots_total_per90: "Нет данных",
        team: "Нет данных",
        xg: "Нет данных",
        xg_net: "-Нет данных",
    });
    const [shootingStatsAway, setShootingStatsAway] = useState({
        goals: "Нет данных",
        goals_per_shot: "Нет данных",
        goals_per_shot_on_target: "Нет данных",
        minutes_90s: "Нет данных",
        npxg: "Нет данных",
        npxg_net: "Нет данных",
        npxg_per_shot: "Нет данных",
        players_used: "Нет данных",
        shots_on_target: "Нет данных",
        shots_on_target_pct: "Нет данных",
        shots_on_target_per90: "Нет данных",
        shots_total: "Нет данных",
        shots_total_per90: "Нет данных",
        team: "Нет данных",
        xg: "Нет данных",
        xg_net: "-Нет данных",
    });
    const [standartStatisticsHome, setStandartStatisticsHome] = useState({
        assists_per90: "Нет данных",
        goals_per90: "Нет данных",
        npxg: "Нет данных",
        npxg_per90: "Нет данных",
        npxg_xa: "Нет данных",
        npxg_xa_per90: "Нет данных",
        possession: "Нет данных",
        xa: "Нет данных",
        xa_per90: "Нет данных",
        xg: "Нет данных",
        xg_per90: "Нет данных",
        xg_xa_per90: "Нет данных",
        team: "Нет данных",
    });
    const [standartStatisticsAway, setStandartStatisticsAway] = useState({
        assists_per90: "Нет данных",
        goals_per90: "Нет данных",
        npxg: "Нет данных",
        npxg_per90: "Нет данных",
        npxg_xa: "Нет данных",
        npxg_xa_per90: "Нет данных",
        possession: "Нет данных",
        xa: "Нет данных",
        xa_per90: "Нет данных",
        xg: "Нет данных",
        xg_per90: "Нет данных",
        xg_xa_per90: "Нет данных",
        team: "Нет данных",
    });
    const [leagueTableHome, setLeagueTableHome] = useState({
        points_avg: "Нет данных",
        rank: "Нет данных",
        wins: "Нет данных",
        draws: "Нет данных",
        losses: "Нет данных",
        goals_against: "Нет данных",
        xg_for: "Нет данных",
        xg_against: "Нет данных",
        team: "Нет данных",
    });
    const [leagueTableAway, setLeagueTableAway] = useState({
        points_avg: "Нет данных",
        rank: "Нет данных",
        wins: "Нет данных",
        draws: "Нет данных",
        losses: "Нет данных",
        goals_against: "Нет данных",
        xg_for: "Нет данных",
        xg_against: "Нет данных",
        team: "Нет данных",
    });

    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const green = 'bg-green-200 flex justify-center';
    const rose = 'bg-rose-200 flex justify-center';

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/statistics',
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            response.data.stats.forEach(el => {
                if (el.leagueId === props.id) {
                    setLeagueTable(el.leagueStatistics);
                    setShootingStats(el.shootingStats);
                    setStandartStatistics(el.standartStatistics);
                }
            });

        }).catch(function (error) {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        // Поиск команд 
        shootingStats.forEach(el => {
            if (el.team.toLowerCase() === props.homeName.toLowerCase()) {
                setShootingStatsHome(el)
            }
            if (el.team.toLowerCase() === props.awayName.toLowerCase()) {
                setShootingStatsAway(el)
            }
        });
        standartStatistics.forEach(el => {
            if (el.team.toLowerCase() === props.homeName.toLowerCase()) {
                setStandartStatisticsHome(el)
            }
            if (el.team.toLowerCase() === props.awayName.toLowerCase()) {
                setStandartStatisticsAway(el)
            }
        });
        leagueTable.forEach(el => {
            if (el.team.toLowerCase() === props.homeName.toLowerCase()) {
                setLeagueTableHome(el)
            }
            if (el.team.toLowerCase() === props.awayName.toLowerCase()) {
                setLeagueTableAway(el)
            }
        });

        if (shootingStatsHome.team === "Нет данных") {
            const el = findTeam(shootingStats, props.homeName);
            if (el) {
                setShootingStatsHome(el)
            }
        }
        if (shootingStatsAway.team === "Нет данных") {
            const el = findTeam(shootingStats, props.awayName);
            if (el) {
                setShootingStatsAway(el)
            }
        }
        if (standartStatisticsHome.team === "Нет данных") {
            const el = findTeam(standartStatistics, props.homeName);
            if (el) {
                setStandartStatisticsHome(el)
            }
        }
        if (standartStatisticsAway.team === "Нет данных") {
            const el = findTeam(standartStatistics, props.awayName);
            if (el) {
                setStandartStatisticsAway(el)
            }
        }
        if (leagueTableHome.team === "Нет данных") {
            const el = findTeam(leagueTable, props.homeName);
            if (el) {
                setLeagueTableHome(el)
            }
        }
        if (leagueTableAway.team === "Нет данных") {
            const el = findTeam(leagueTable, props.awayName);
            if (el) {
                setLeagueTableAway(el)
            }
        }

    }, [shootingStats, standartStatistics, leagueTable])


    return (
        <>
            <div className="flex justify-center py-2">
                <h2 className='text-xl'>Сравнение</h2>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>{shootingStatsHome.team}</th>
                        <th>{shootingStatsAway.team}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Голы:</td>
                        <td><p
                            className={+shootingStatsHome.goals > +shootingStatsAway.goals ? green : rose}>
                            {shootingStatsHome.goals}
                        </p></td>
                        <td><p
                            className={+shootingStatsAway.goals > +shootingStatsHome.goals ? green : rose}>
                            {shootingStatsAway.goals}
                        </p></td>
                    </tr>
                    <tr>
                        <td>Голы пропущ:</td>
                        <td><p
                            className={+leagueTableHome.goals_against > +leagueTableAway.goals_against ? rose : green}>
                            {leagueTableHome.goals_against}
                        </p></td>
                        <td><p
                            className={+leagueTableAway.goals_against > +leagueTableHome.goals_against ? rose : green}>
                            {leagueTableAway.goals_against}
                        </p></td>
                    </tr>
                    <tr>
                        <td>Победы</td>
                        <td><p
                            className={+leagueTableHome.wins > +leagueTableAway.wins ? green : rose}>
                            {leagueTableHome.wins}
                        </p></td>
                        <td><p
                            className={+leagueTableAway.wins > +leagueTableHome.wins ? green : rose}>
                            {leagueTableAway.wins}
                        </p></td>
                    </tr>
                    <tr>
                        <td>Поражения</td>
                        <td><p
                            className={+leagueTableHome.losses > +leagueTableAway.losses ? rose : green}>
                            {leagueTableHome.losses}
                        </p></td>
                        <td><p
                            className={+leagueTableAway.wins > +leagueTableHome.losses ? rose : green}>
                            {leagueTableAway.losses}
                        </p></td>
                    </tr>
                    <tr>
                        <td>Очки в ср</td>
                        <td><p
                            className={+leagueTableHome.points_avg > +leagueTableAway.points_avg ? green : rose}>
                            {leagueTableHome.points_avg}
                        </p></td>
                        <td><p
                            className={+leagueTableAway.points_avg > +leagueTableHome.points_avg ? green : rose}>
                            {leagueTableAway.points_avg}
                        </p></td>
                    </tr>
                    <tr>
                        <td>Место в табл</td>
                        <td><p
                            className={+leagueTableHome.rank > +leagueTableAway.rank ? rose : green}>
                            {leagueTableHome.rank}
                        </p></td>
                        <td><p
                            className={+leagueTableAway.rank > +leagueTableHome.rank ? rose : green}>
                            {leagueTableAway.rank}
                        </p></td>
                    </tr>
                    <tr>
                        <td>Удары(все)</td>
                        <td><p
                            className={+shootingStatsHome.shots_total > +shootingStatsAway.shots_total ? green : rose}>
                            {shootingStatsHome.shots_total}
                        </p></td>
                        <td><p
                            className={+shootingStatsAway.shots_total > +shootingStatsHome.shots_total ? green : rose}>
                            {shootingStatsAway.shots_total}
                        </p></td>
                    </tr>
                    <tr>
                        <td>Удары в створ:</td>
                        <td><p
                            className={+shootingStatsHome.shots_on_target > +shootingStatsAway.shots_on_target ? green : rose}>
                            {shootingStatsHome.shots_on_target}
                        </p></td>
                        <td><p
                            className={+shootingStatsAway.shots_on_target > +shootingStatsHome.shots_on_target ? green : rose}>
                            {shootingStatsAway.shots_on_target}
                        </p></td>
                    </tr>
                    <tr>
                        <td>% ударов в ств.:</td>
                        <td><p
                            className={+shootingStatsHome.shots_on_target_pct > +shootingStatsAway.shots_on_target_pct ? green : rose}>
                            {shootingStatsHome.shots_on_target_pct}
                        </p></td>
                        <td><p
                            className={+shootingStatsAway.shots_on_target_pct > +shootingStatsHome.shots_on_target_pct ? green : rose}>
                            {shootingStatsAway.shots_on_target_pct}
                        </p></td>
                    </tr>
                    <tr>
                        <td>Удары за матч:</td>
                        <td><p
                            className={+shootingStatsHome.shots_total_per90 > +shootingStatsAway.shots_total_per90 ? green : rose}>
                            {shootingStatsHome.shots_total_per90}
                        </p></td>
                        <td><p
                            className={+shootingStatsAway.shots_total_per90 > +shootingStatsHome.shots_total_per90 ? green : rose}>
                            {shootingStatsAway.shots_total_per90}
                        </p></td>
                    </tr>
                    <tr>
                        <td>Удары в ств. за матч:</td>
                        <td><p
                            className={+shootingStatsHome.shots_on_target_per90 > +shootingStatsAway.shots_on_target_per90 ? green : rose}>
                            {shootingStatsHome.shots_on_target_per90}
                        </p></td>
                        <td><p
                            className={+shootingStatsAway.shots_on_target_per90 > +shootingStatsHome.shots_on_target_per90 ? green : rose}>
                            {shootingStatsAway.shots_on_target_per90}
                        </p></td>
                    </tr>
                    <tr>
                        <td>Голов за удар:</td>
                        <td><p
                            className={+shootingStatsHome.goals_per_shot > +shootingStatsAway.goals_per_shot ? green : rose}>
                            {shootingStatsHome.goals_per_shot}
                        </p></td>
                        <td><p
                            className={+shootingStatsAway.goals_per_shot > +shootingStatsHome.goals_per_shot ? green : rose}>
                            {shootingStatsAway.goals_per_shot}
                        </p></td>
                    </tr>
                    <tr>
                        <td>Голов за удар в cтв.:</td>
                        <td><p
                            className={+shootingStatsHome.goals_per_shot_on_target > +shootingStatsAway.goals_per_shot_on_target ? green : rose}>
                            {shootingStatsHome.goals_per_shot_on_target}
                        </p></td>
                        <td><p
                            className={+shootingStatsAway.goals_per_shot_on_target > +shootingStatsHome.goals_per_shot_on_target ? green : rose}>
                            {shootingStatsAway.goals_per_shot_on_target}
                        </p></td>
                    </tr>
                    <tr>
                        <td>Владение:</td>
                        <td><p
                            className={+standartStatisticsHome.possession > +standartStatisticsAway.possession ? green : rose}>
                            {standartStatisticsHome.possession}
                        </p></td>
                        <td><p
                            className={+standartStatisticsAway.possession > +standartStatisticsHome.possession ? green : rose}>
                            {standartStatisticsAway.possession}
                        </p></td>
                    </tr>
                    <tr>
                        <td>Голы в среднем:</td>
                        <td><p
                            className={+standartStatisticsHome.goals_per90 > +standartStatisticsAway.goals_per90 ? green : rose}>
                            {standartStatisticsHome.goals_per90}
                        </p></td>
                        <td><p
                            className={+standartStatisticsAway.goals_per90 > +standartStatisticsHome.goals_per90 ? green : rose}>
                            {standartStatisticsAway.goals_per90}
                        </p></td>
                    </tr>
                    <tr>
                        <td>Ассисты в стреднем:</td>
                        <td><p
                            className={+standartStatisticsHome.assists_per90 > +standartStatisticsAway.assists_per90 ? green : rose}>
                            {standartStatisticsHome.assists_per90}
                        </p></td>
                        <td><p
                            className={+standartStatisticsAway.assists_per90 > +standartStatisticsHome.assists_per90 ? green : rose}>
                            {standartStatisticsAway.assists_per90}
                        </p></td>
                    </tr>
                    <tr>
                        <td>XG за матч:</td>
                        <td><p
                            className={+standartStatisticsHome.npxg_per90 > +standartStatisticsAway.npxg_per90 ? green : rose}>
                            {standartStatisticsHome.npxg_per90}
                        </p></td>
                        <td><p
                            className={+standartStatisticsAway.npxg_per90 > +standartStatisticsHome.npxg_per90 ? green : rose}>
                            {standartStatisticsAway.npxg_per90}
                        </p></td>
                    </tr>
                    <tr>
                        <td>XA за матч:</td>
                        <td><p
                            className={+standartStatisticsHome.xa_per90 > +standartStatisticsAway.xa_per90 ? green : rose}>
                            {standartStatisticsHome.xa_per90}
                        </p></td>
                        <td><p
                            className={+standartStatisticsAway.xa_per90 > +standartStatisticsHome.xa_per90 ? green : rose}>
                            {standartStatisticsAway.xa_per90}
                        </p></td>
                    </tr>
                    <tr>
                        <td>XG соперников</td>
                        <td><p
                            className={+leagueTableHome.xg_against > +leagueTableAway.xg_against ? rose : green}>
                            {(+leagueTableHome.xg_against / +leagueTableHome.games).toFixed(1)}
                        </p></td>
                        <td><p
                            className={+leagueTableAway.xg_against > +leagueTableHome.xg_against ? rose : green}>
                            {(+leagueTableAway.xg_against / +leagueTableAway.games).toFixed(1)}
                        </p></td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default Statistics;