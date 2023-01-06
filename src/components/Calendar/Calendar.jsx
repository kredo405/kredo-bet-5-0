import ProgressBar from 'react-bootstrap/ProgressBar';

const Calendar = ({ form, info }) => {

    const posHome = info.motivation[0].next_match.text.indexOf('через');
    const posAway = info.motivation[1].next_match.text.indexOf('через');

    const calcTimeRelaxPercent = (timeHome, timeAway) => {
        const sum = +timeHome + +timeAway
        const percentHome = +timeHome * 100 / sum;
        const percentAway = +timeAway * 100 / sum;

        return {
            percentHome,
            percentAway
        }
    }

    const posHome1 = form.relaxationHome.indexOf('(');
    const posHome2 = form.relaxationHome.indexOf(')');
    const posAway1 = form.relaxationAway.indexOf('(');
    const posAway2 = form.relaxationAway.indexOf(')');

    const percent = calcTimeRelaxPercent(form.relaxationHome.slice(posHome1 + 1, posHome2), form.relaxationAway.slice(posAway1 + 1, posAway2))

    return (
        <>
            <div className="flex justify-center mb-3">
                <h2 className='text-center py-3 font-serif text-xl font-bold text-slate-600'>Календарь</h2>
            </div>
            <div>
                <h3 className='text-center font-bold mb-3'>Время отдыха</h3>
                <div className="flex justify-between mb-2">
                    <span>{info.team1_name}</span>
                    <span>{info.team2_name}</span>
                </div>
                <ProgressBar>
                    <ProgressBar
                        animated 
                        variant="success"
                        label={`${percent.percentHome.toFixed(0)}% (${form.relaxationHome.slice(posHome1 + 1, posHome2)}ч)`}
                        now={percent.percentHome}
                        key={1}
                    />
                    <ProgressBar
                        animated 
                        label={`${percent.percentAway.toFixed(0)}% (${form.relaxationAway.slice(posAway1 + 1, posAway2)}ч)`}
                        now={percent.percentAway}
                        key={2} 
                    />
                </ProgressBar>
            </div>
            <div>
                <h3 className='text-center font-bold my-5'>Следующая игра</h3>
                <div className="flex justify-between mb-2">
                    <span className='font-semibold w-6/12'>{info.motivation[0].next_match.text.slice(posHome)}</span>
                    <span className='font-semibold w-6/12'>{info.motivation[1].next_match.text.slice(posAway)}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <div className='flex justify-start'><span className='text-xs text-center'>{`${info.motivation[0].next_match.team1_name}-${info.motivation[0].next_match.team2_name}`}</span></div>
                    <div className='flex justify-start'><span className='text-xs text-center'>{`${info.motivation[1].next_match.team1_name}-${info.motivation[1].next_match.team2_name}`}</span></div>
                </div>
            </div>
        </>
    )
}

export default Calendar;