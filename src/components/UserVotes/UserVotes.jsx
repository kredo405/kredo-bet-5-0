import ProgressBar from 'react-bootstrap/ProgressBar';

const UserVotes = (props) => {
    return (
        <>
            {props.data.winerHome && props.data.draw && props.data.winerAway && props.data.totlaOver && props.data.totalUnder && props.data.btsYes &&
                props.data.btsNo ?
                <>
                    <h1 className="text-center py-3 font-serif text-2xl font-bold text-slate-600">Голоса игроков</h1>
                    <div>
                        <div className="flex justify-between">
                            <span className="text-center py-3 font-serif font-bold text-green-600">П1</span>
                            <span className="text-center py-3 font-serif font-bold text-amber-400">X</span>
                            <span className="text-center py-3 font-serif font-bold text-sky-600">П2</span>
                        </div>
                        <ProgressBar>
                            <ProgressBar striped variant="success" label={`${+props.data.winerHome}%`} now={+props.data.winerHome} key={+props.data.winerHome} />
                            <ProgressBar striped variant="warning" label={`${+props.data.draw}%`} now={+props.data.draw} key={+props.data.draw} />
                            <ProgressBar striped variant="info" label={`${+props.data.winerAway}%`} now={+props.data.winerAway} key={+props.data.winerAway} />
                        </ProgressBar>
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <span className="text-center py-3 font-serif  font-bold text-green-600">Тотал больше 2.5</span>
                            <span className="text-center py-3 font-serif font-bold text-sky-600">Тотал меньше 2.5</span>
                        </div>
                        <ProgressBar>
                            <ProgressBar striped variant="success" label={`${+props.data.totlaOver}%`} now={+props.data.totlaOver} key={+props.data.totlaOver} />
                            <ProgressBar striped variant="info" label={`${+props.data.totalUnder}%`} now={+props.data.totalUnder} key={+props.data.totalUnder} />
                        </ProgressBar>
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <span className="text-center py-3 font-serif font-bold text-green-600">Обе забьют Да</span>
                            <span className="text-center py-3 font-serif font-bold text-sky-600">Обе забьют Нет</span>
                        </div>
                        <ProgressBar>
                            <ProgressBar striped variant="success" label={`${+props.data.btsYes}%`} now={+props.data.btsYes} key={+props.data.btsYes} />
                            <ProgressBar striped variant="info" label={`${+props.data.btsNo}%`} now={+props.data.btsNo} key={+props.data.btsNo} />
                        </ProgressBar>
                    </div>
                </>
                :
                null
            }
        </>
    )
}

export default UserVotes