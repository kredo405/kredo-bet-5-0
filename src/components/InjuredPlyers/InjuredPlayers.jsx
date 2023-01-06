import Table from 'react-bootstrap/Table';

const InjuredPlayers = (props) => {
    const playersHome = props.info.squads[0][2].map(el => {
        return (
            <tr key={el[2]}>
                <td><p className='text-center font-bold text-sky-700'>{el[2]}</p></td>
                <td><p className='text-center font-bold text-orange-900'>{el[3]}</p></td>
                <td><p className='text-center font-bold text-orange-900'>{el[1]}</p></td>
                <td><p className='text-center font-bold text-orange-900'>{el[5]}</p></td>
            </tr>
        )
    });

    const playersAway = props.info.squads[1][2].map(el => {
        return (
            <tr key={el[2]}>
                <td><p className='text-center font-bold text-sky-700'>{el[2]}</p></td>
                <td><p className='text-center font-bold text-orange-900'>{el[3]}</p></td>
                <td><p className='text-center font-bold text-orange-900'>{el[1]}</p></td>
                <td><p className='text-center font-bold text-orange-900'>{el[5]}</p></td>
            </tr>
        )
    });

    return (
        <>
            <div className="flex justify-center mt-2 mb-3">
                <h2 className='text-center py-3 font-serif text-xl font-bold text-slate-600'>Травмированные игроки</h2>
            </div>
            <div className="flex justify-evenly flex-wrap">
                <div>
                    <h2 className='text-center py-2 font-semibold'>{props.info.team1_name}</h2>
                    <Table striped bordered hover className='h-60'>
                        <thead>
                            <tr>
                                <th>Игрок</th>
                                <th>Позиция</th>
                                <th>Матчи</th>
                                <th>Голы</th>
                            </tr>
                        </thead>
                        <tbody>
                            {playersHome}
                        </tbody>
                    </Table>
                </div>
                <div>
                    <h2 className='text-center py-2 font-semibold'>{props.info.team2_name}</h2>
                    <Table striped bordered hover className='h-60'>
                        <thead>
                            <tr>
                                <th>Игрок</th>
                                <th>Позиция</th>
                                <th>Матчи</th>
                                <th>Голы</th>
                            </tr>
                        </thead>
                        <tbody>
                            {playersAway}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default InjuredPlayers;