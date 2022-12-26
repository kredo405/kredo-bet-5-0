import { relevance } from "../../utils/relevence";
import TeamStrength from '../TeamStrength/TeamStrength';
import Motivation from "../Motivation/Motivation";
import InjuredPlayers from "../InjuredPlyers/InjuredPlayers";
import FieldFactor from "../FieldFactor/FieldFactor";
import Calendar from "../Calendar/Calendar";
import Facts from "../Facts/Facts";
import Trends from "../Trends/Trends";
import MoneyWay from "../MoneyWay/MoneyWay";
import Standings from "../Standings/Standings";
import PredicitonsNbBet from "../PredicitonsNbBet/PredicitionsNbBet";

const Analitics = (props) => {
    const { data, form, info, predictions, homeName, awayName } = props;
    let relevanceTeam = {
        percentHome: 50,
        percentAway: 50
    };
    if(info.teams_form.home) {
       relevanceTeam = relevance(info.teams_form.home.matches, info.teams_form.away.matches)
    }
    

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
                <Calendar
                    form={form}
                    info={info}
                />
                <Facts
                    info={info}
                />
                <Standings
                    info={info}
                />
                <Trends
                    info={info}
                />
                <PredicitonsNbBet 
                    predictions={predictions}
                />
                <MoneyWay />
            </div>
        </>
    )
}

export default Analitics;