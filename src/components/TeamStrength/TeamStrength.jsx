import ProgressBar from "react-bootstrap/ProgressBar";

const TeamStrength = ({ relevanceTeam: { percentHome, percentAway } }) => (
    <>
        <div className="text-center mb-3">
            <h2 className="font-serif text-xl font-bold text-slate-600">
                Соотношение силы команд
            </h2>
        </div>
        <ProgressBar>
            <ProgressBar
                animated
                variant="success"
                label={`${percentHome.toFixed(0)}%`}
                now={percentHome.toFixed(0)}
                key={1}
            />
            <ProgressBar
                animated
                label={`${percentAway.toFixed(0)}%`}
                now={percentAway.toFixed(0)}
                key={2}
            />
        </ProgressBar>
    </>
);

export default TeamStrength;
