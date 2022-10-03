import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Progress } from 'antd';
import axios from 'axios';

const determineComposition = (dataHome, dataAway) => {

    const playerHomeFilter = [];
    const playerAwayFilter = [];

    while (playerHomeFilter.length < 11) {
        dataHome.forEach((el, i, arr) => {
            let maxGamesPlayersHome = Math.max(...arr.map(obj => +obj.games_starts));
            if (maxGamesPlayersHome === +el.games_starts && playerHomeFilter.length < 11) {
                arr.splice(i, 1);
                playerHomeFilter.push(el);
            }
        })
    }

    while (playerAwayFilter.length < 11) {
        dataAway.forEach((el, i, arr) => {
            let maxGamesPlayerAway = Math.max(...arr.map(obj => +obj.games_starts));
            if (maxGamesPlayerAway === +el.games_starts && playerAwayFilter.length < 11) {
                arr.splice(i, 1);
                playerAwayFilter.push(el);
            }
        })
    }

    return {
        compositionHome: playerHomeFilter,
        compositionAway: playerAwayFilter,
    }
}

const calcIndividualTotal = (composition, shootingOpponentHome, shootingOpponentAway, shootingStatsHome,
    shootingStatsAway) => {
    let shotsHome = 0;
    let shotsAway = 0;
    let shotsHomeWithOpponent = 0;
    let shotsAwayWithOpponent = 0;
    let goalsHome = 0;
    let goalsAway = 0;

    composition.compositionHome.forEach(el => {
        if (el.goals_per_shot !== '' && el.shots_total_per90 !== '') {
            shotsHome += +el.shots_total_per90;
        }
    })

    composition.compositionAway.forEach(el => {
        if (el.goals_per_shot !== '' && el.shots_total_per90 !== '') {
            shotsAway += +el.shots_total_per90;
        }
    })

    shotsHomeWithOpponent = (+shootingOpponentAway[0].shots_total_per90 + shotsHome) / 2
    shotsAwayWithOpponent = (+shootingOpponentHome[0].shots_total_per90 + shotsAway) / 2

    goalsHome = shotsHomeWithOpponent * +shootingStatsHome[0].goals_per_shot
    goalsAway = shotsAwayWithOpponent * +shootingStatsAway[0].goals_per_shot

    console.log(goalsHome)
    console.log(goalsAway)

    return {
        goalsHome: goalsHome,
        goalsAway: goalsAway,
    }
}

const calcPoisonDestribution = (golals) => {
    // рассчиываем распределение паусона все матчи
    function poissonGoals(expectedGoals, goals, number) {
        return (
            ((expectedGoals ** goals * 2.71828 ** -expectedGoals) / number) * 100
        );
    }
    let poisonGoals0Home = poissonGoals(golals.goalsHome, 0, 1);
    let poisonGoals0Away = poissonGoals(golals.goalsAway, 0, 1);
    let poisonGoals1Home = poissonGoals(golals.goalsHome, 1, 1);
    let poisonGoals1Away = poissonGoals(golals.goalsAway, 1, 1);
    let poisonGoals2Home = poissonGoals(golals.goalsHome, 2, 2);
    let poisonGoals2Away = poissonGoals(golals.goalsAway, 2, 2);
    let poisonGoals3Home = poissonGoals(golals.goalsHome, 3, 6);
    let poisonGoals3Away = poissonGoals(golals.goalsAway, 3, 6);
    let poisonGoals4Home = poissonGoals(golals.goalsHome, 4, 24);
    let poisonGoals4Away = poissonGoals(golals.goalsAway, 4, 24);
    let poisonGoals5Home = poissonGoals(golals.goalsHome, 5, 120);
    let poisonGoals5Away = poissonGoals(golals.goalsAway, 5, 120);

    // рассчитываем вероятности прохода ставки по распределению паусона
    const percentOutcomes = {
        p1: (poisonGoals1Home * poisonGoals0Away) / 100 +
            (poisonGoals2Home * poisonGoals0Away) / 100 +
            (poisonGoals3Home * poisonGoals0Away) / 100 +
            (poisonGoals4Home * poisonGoals0Away) / 100 +
            (poisonGoals5Home * poisonGoals0Away) / 100 +
            (poisonGoals2Home * poisonGoals1Away) / 100 +
            (poisonGoals3Home * poisonGoals1Away) / 100 +
            (poisonGoals4Home * poisonGoals1Away) / 100 +
            (poisonGoals5Home * poisonGoals1Away) / 100 +
            (poisonGoals3Home * poisonGoals2Away) / 100 +
            (poisonGoals4Home * poisonGoals2Away) / 100 +
            (poisonGoals5Home * poisonGoals2Away) / 100 +
            (poisonGoals4Home * poisonGoals3Away) / 100 +
            (poisonGoals5Home * poisonGoals3Away) / 100 +
            (poisonGoals5Home * poisonGoals4Away) / 100,
        p2: (poisonGoals0Home * poisonGoals1Away) / 100 +
            (poisonGoals0Home * poisonGoals2Away) / 100 +
            (poisonGoals0Home * poisonGoals3Away) / 100 +
            (poisonGoals0Home * poisonGoals4Away) / 100 +
            (poisonGoals0Home * poisonGoals5Away) / 100 +
            (poisonGoals1Home * poisonGoals2Away) / 100 +
            (poisonGoals1Home * poisonGoals3Away) / 100 +
            (poisonGoals1Home * poisonGoals4Away) / 100 +
            (poisonGoals1Home * poisonGoals5Away) / 100 +
            (poisonGoals2Home * poisonGoals3Away) / 100 +
            (poisonGoals2Home * poisonGoals4Away) / 100 +
            (poisonGoals2Home * poisonGoals5Away) / 100 +
            (poisonGoals3Home * poisonGoals4Away) / 100 +
            (poisonGoals3Home * poisonGoals5Away) / 100 +
            (poisonGoals4Home * poisonGoals5Away) / 100,
        tu25: (poisonGoals0Home * poisonGoals0Away) / 100 +
            (poisonGoals1Home * poisonGoals0Away) / 100 +
            (poisonGoals0Home * poisonGoals1Away) / 100 +
            (poisonGoals1Home * poisonGoals1Away) / 100 +
            (poisonGoals2Home * poisonGoals0Away) / 100 +
            (poisonGoals0Home * poisonGoals2Away) / 100,
        to25: 100 - ((poisonGoals0Home * poisonGoals0Away) / 100 +
            (poisonGoals1Home * poisonGoals0Away) / 100 +
            (poisonGoals0Home * poisonGoals1Away) / 100 +
            (poisonGoals1Home * poisonGoals1Away) / 100 +
            (poisonGoals2Home * poisonGoals0Away) / 100 +
            (poisonGoals0Home * poisonGoals2Away) / 100),
        bts: 100 - ((poisonGoals0Home * poisonGoals0Away) / 100 +
            (poisonGoals1Home * poisonGoals0Away) / 100 +
            (poisonGoals2Home * poisonGoals0Away) / 100 +
            (poisonGoals3Home * poisonGoals0Away) / 100 +
            (poisonGoals4Home * poisonGoals0Away) / 100 +
            (poisonGoals5Home * poisonGoals0Away) / 100 +
            (poisonGoals0Home * poisonGoals1Away) / 100 +
            (poisonGoals0Home * poisonGoals2Away) / 100 +
            (poisonGoals0Home * poisonGoals3Away) / 100 +
            (poisonGoals0Home * poisonGoals4Away) / 100 +
            (poisonGoals0Home * poisonGoals5Away) / 100),
        it1O1: poisonGoals2Home + poisonGoals3Home + poisonGoals4Home + poisonGoals5Home,
        it2O1: poisonGoals2Away + poisonGoals3Away + poisonGoals4Away + poisonGoals5Away
    }

    return percentOutcomes;
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
    const [dataHome, setDataHome] = useState([{ player: "" }]);
    const [dataAway, setDataAway] = useState([{ player: "" }]);
    const [shootingOpponentHome, setShootingOpponentHome] = useState([]);
    const [shootingOpponentAway, setShootingOpponentAway] = useState([]);
    const [shootingStatsHome, setShootingStatsHome] = useState([]);
    const [shootingStatsAway, setShootingStatsAway] = useState([]);
    const [poisonTable, setPoisonTable] = useState('');
    const [result, setResult] = useState(false);

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
                        if (props.homeName.replace("-", " ") === item.team.replace("-", " ")) {
                            return item;
                        }
                    })
                    const standartStatsAway = el.standartStatsPlayers.filter(item => {
                        if (props.awayName.replace("-", " ") === item.team.replace("-", " ")) {
                            return item;
                        }
                    });
                    const shootingStatsHome = el.shootingStatsPlayers.filter(item => {
                        if (props.homeName.replace("-", " ") === item.team.replace("-", " ")) {
                            return item;
                        }
                    })
                    const shootingStatsAway = el.shootingStatsPlayers.filter(item => {
                        if (props.awayName.replace("-", " ") === item.team.replace("-", " ")) {
                            return item;
                        }
                    });

                    const shootingStatsHomeOpponent = el.shootingStatsOpponent.filter(item => {
                        if (props.homeName.replace("-", " ") === item.team.replace("-", " ")) {
                            return item;
                        }
                    })
                    const shootingStatsAwayOpponent = el.shootingStatsOpponent.filter(item => {
                        if (props.awayName.replace("-", " ") === item.team.replace("-", " ")) {
                            return item;
                        }
                    });

                    const shootingHome = el.shootingStats.filter(item => {
                        if (props.homeName.replace("-", " ") === item.team.replace("-", " ")) {
                            return item;
                        }
                    })
                    const shootingAway = el.shootingStats.filter(item => {
                        if (props.awayName.replace("-", " ") === item.team.replace("-", " ")) {
                            return item;
                        }
                    });

                    const playerStatsHome = getPlayerStats(standartStatsHome, shootingStatsHome);
                    const playerStatsAway = getPlayerStats(standartStatsAway, shootingStatsAway);

                    setDataHome(playerStatsHome);
                    setDataAway(playerStatsAway);
                    setShootingOpponentHome(shootingStatsHomeOpponent);
                    setShootingOpponentAway(shootingStatsAwayOpponent);
                    setShootingStatsHome(shootingHome);
                    setShootingStatsAway(shootingAway);
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

        let compositions;

        if (dataHome.length >= 11 && dataAway.length >= 11) {
            compositions = determineComposition(dataHome, dataAway);
        }

        const individualTotals = calcIndividualTotal(compositions, shootingOpponentHome, shootingOpponentAway, shootingStatsHome,
            shootingStatsAway)

        const percentOutcomes = calcPoisonDestribution(individualTotals)

        const result =
            <div>
                <div className='flex border-b-2 border-solid justify-between items-center py-3'>
                    <h5 className='text-cyan-800 text-2xl w-6/12'>Победа 1</h5>
                    <Progress type="circle" percent={percentOutcomes.p1.toFixed(0)} />
                    <p className='text-rose-600 text-2xl'>{(100 / percentOutcomes.p1).toFixed(2)}</p>
                </div>
                <div className='flex border-b-2 border-solid justify-between items-center py-3'>
                    <h5 className='text-cyan-800 text-2xl w-6/12'>Победа 2</h5>
                    <Progress type="circle" percent={percentOutcomes.p2.toFixed(0)} />
                    <p className='text-rose-600 text-2xl'>{(100 / percentOutcomes.p2).toFixed(2)}</p>
                </div>
                <div className='flex border-b-2 border-solid justify-between items-center py-3'>
                    <h5 className='text-cyan-800 text-2xl w-6/12'>Тотал больше 2.5</h5>
                    <Progress type="circle" percent={percentOutcomes.to25.toFixed(0)} />
                    <p className='text-rose-600 text-2xl'>{(100 / percentOutcomes.to25).toFixed(2)}</p>
                </div>
                <div className='flex border-b-2 border-solid justify-between items-center py-3'>
                    <h5 className='text-cyan-800 text-2xl w-6/12'>Тотал меньше 2.5</h5>
                    <Progress type="circle" percent={percentOutcomes.tu25.toFixed(0)} />
                    <p className='text-rose-600 text-2xl'>{(100 / percentOutcomes.tu25).toFixed(2)}</p>
                </div>
                <div className='flex border-b-2 border-solid justify-between items-center py-3'>
                    <h5 className='text-cyan-800 text-2xl w-6/12'>Обе забьют</h5>
                    <Progress type="circle" percent={percentOutcomes.bts.toFixed(0)} />
                    <p className='text-rose-600 text-2xl'>{(100 / percentOutcomes.bts).toFixed(2)}</p>
                </div>
                <div className='flex border-b-2 border-solid justify-between items-center py-3'>
                    <h5 className='text-cyan-800 text-2xl w-6/12'>ИТ1 больше 1.5</h5>
                    <Progress type="circle" percent={percentOutcomes.it1O1.toFixed(0)} />
                    <p className='text-rose-600 text-2xl'>{(100 / percentOutcomes.it1O1).toFixed(2)}</p>
                </div>
                <div className='flex border-b-2 border-solid justify-between items-center py-3'>
                    <h5 className='text-cyan-800 text-2xl w-6/12'>ИТ2 больше 1.5</h5>
                    <Progress type="circle" percent={percentOutcomes.it2O1.toFixed(0)} />
                    <p className='text-rose-600 text-2xl'>{(100 / percentOutcomes.it2O1).toFixed(2)}</p>
                </div>
            </div>

        setPoisonTable(result)
        setResult(true)

        console.log(percentOutcomes)
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
            {result ?
                <>
                    {poisonTable}
                </>
                :
                <>
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
                </>
            }
        </div>
    )
}

export default PoisonDestribution;