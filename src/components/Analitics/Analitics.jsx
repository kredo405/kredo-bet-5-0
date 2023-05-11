import { relevance } from "../../utils/relevence";
import TeamStrength from '../TeamStrength/TeamStrength';
import Motivation from "../Motivation/Motivation";
import InjuredPlayers from "../InjuredPlyers/InjuredPlayers";
import FieldFactor from "../FieldFactor/FieldFactor";
import Facts from "../Facts/Facts";
import MoneyWay from "../MoneyWay/MoneyWay";
import Standings from "../Standings/Standings";
import PredicitonsNbBet from "../PredicitonsNbBet/PredicitionsNbBet";
import Predict from "../Predict/Predict";
import { TeamRang } from "../../utils/calcTeamRang";

const Analitics = ({ info, predictions, oddsHistory }) => {
    let relevanceTeam = {
        percentHome: 50,
        percentAway: 50
    };
    if(info.teams_form.home) {
       relevanceTeam = relevance(info.teams_form.home.matches, info.teams_form.away.matches)
    }

    // Разделяем команды по рангам
    const teamRang = new TeamRang(info.table[0]);
    const outsiderRange = teamRang.calcOutsiderRange();
    const midleRange = teamRang.calcMidleRange();
    const grandRange = teamRang.calcGrandRange();
    

    return (
        <>
            <div className="container">
                <div className="flex justify-center mb-3">
                    <h1 className='text-center py-3 font-serif text-2xl font-bold text-slate-600'>Аналитика</h1>
                </div>
                <div className="flex justify-evenly">
                    <div className='flex flex-col items-center justify-center'>
                        <img
                            className='w-6/12'
                            src={info.team1_logo} alt="logo"
                        />
                        <p className='font-mono'>{info.team1_name}</p>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <img
                            className='w-6/12'
                            src={info.team2_logo} alt="logo"
                        />
                        <p className='font-mono'>{info.team2_name}</p>
                    </div>
                </div>
                <TeamStrength
                    info={info}
                    relevanceTeam={relevanceTeam}
                />
                <Motivation
                    info={info}
                />
                <InjuredPlayers 
                    info={info}
                />
                <FieldFactor 
                    info={info}
                />
                <Facts
                    info={info}
                />
                <Standings
                    info={info}
                />
                <PredicitonsNbBet 
                    predictions={predictions}
                />
                <MoneyWay />
                <Predict 
                    info={info}
                    predictions={predictions}
                    outsiderRange={outsiderRange}
                    midleRange={midleRange}
                    grandRange={grandRange}
                    oddsHistory={oddsHistory}
                />
            </div>
        </>
    )
}

export default Analitics;