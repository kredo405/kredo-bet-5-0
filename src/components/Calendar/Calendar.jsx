const Calendar = ({ info }) => {

    const posHome = info.motivation[0].next_match.text.indexOf('через');
    const posAway = info.motivation[1].next_match.text.indexOf('через');

    return (
        <>
            <div className="flex justify-center mb-3">
                <h2 className='text-center py-3 font-serif text-xl font-bold text-slate-600'>Календарь</h2>
            </div>
            <div>
                <div className="flex justify-between mb-2">
                    <span className='font-semibold w-6/12'>{info.motivation[0].next_match.text.slice(posHome)}</span>
                    <span className='font-semibold w-6/12 text-end'>{info.motivation[1].next_match.text.slice(posAway)}</span>
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