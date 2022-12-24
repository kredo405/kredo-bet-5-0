import ProgressBar from 'react-bootstrap/ProgressBar';

const TeamStrength = (props) => {
    return (
        <>
            <div className="flex justify-center mb-3">
                <h2 className='text-center py-3 font-serif text-xl font-bold text-slate-600'>Соотношение силы команд</h2>
            </div>
            <div>
                <ProgressBar>
                    <ProgressBar
                        animated 
                        variant="success"
                        label={`${props.relevanceTeam.percentHome.toFixed(0)}%`}
                        now={props.relevanceTeam.percentHome.toFixed(0)}
                        key={1}
                    />
                    <ProgressBar
                        animated 
                        label={`${props.relevanceTeam.percentAway.toFixed(0)}%`}
                        now={props.relevanceTeam.percentAway.toFixed(0)}
                        key={2}
                    />
                </ProgressBar>
            </div>
        </>
    )
}

export default TeamStrength;