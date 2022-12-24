import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import findTeam from '../../utils/findTeam';

const DroppingOdds = ({homeName, awayName}) => {
   
    const state = useSelector(state => state);
    const [droppingOddsWinner, setDroppingOddsWinner] = useState(
        {
            oddsHomeStart: 'нет данных',
            oddsHomeEnd: 'нет данных',
            oddsDrawStart: 'нет данных',
            oddsDrawEnd: 'нет данных',
            oddsAwayStart: 'нет данных',
            oddsAwayend: 'нет данных',
            money: 'нет данных'
        }
    )
    const [droppingOddsTotal, setDroppingOddsTotal] = useState(
        {
            oddsUnderStart: 'нет данных',
            oddsUnderEnd: 'нет данных',
            oddsOverStart: 'нет данных',
            oddsOverEnd: 'нет данных',
            money: 'нет данных'
        }
    )

    useEffect(() => {
        const droppingOdds1x2Filter = state.droppingOdds1x2.filter(item => findTeam(item.homeName, state.homeNameEng) && findTeam(item.homeAway, state.awayNameEng))
        const droppingOddsOverUnderFilter = state.droppingOddsOverUnder.filter(item => findTeam(item.homeName, state.homeNameEng) && findTeam(item.homeAway, state.awayNameEng))
    
        console.log(droppingOdds1x2Filter)
        console.log(droppingOddsOverUnderFilter)

        if(droppingOdds1x2Filter.length > 0) {
            setDroppingOddsWinner(droppingOdds1x2Filter[0])
        }
        if(droppingOddsOverUnderFilter.length > 0) {
            setDroppingOddsTotal(droppingOddsOverUnderFilter[0])
        }
    
    }, [])

    
    return (
        <div className='container'>
            <div className="flex justify-center py-2">
                <h2 className='text-center py-3 font-serif text-2xl font-bold text-slate-600'>Движение коэфицентов</h2>
            </div>
            <Table striped bordered hover responsive variant="dark" >
                <thead>
                    <tr>
                        <th>Ставка</th>
                        <th>Нач. кэф</th>
                        <th>Конеч. кэф</th>
                        <th>Деньги</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>П1</td>
                        <td>
                            <p className={+droppingOddsWinner.oddsHomeStart > +droppingOddsWinner.oddsHomeEnd ? 'bg-green-400 text-center' : 'bg-rose-400 text-center'}>
                                {droppingOddsWinner.oddsHomeStart}
                            </p>
                        </td>
                        <td>
                            <p className={+droppingOddsWinner.oddsHomeEnd > +droppingOddsWinner.oddsHomeStart ? 'bg-green-400 text-center' : 'bg-rose-400 text-center'}>
                                {droppingOddsWinner.oddsHomeEnd}
                            </p>
                        </td>
                        <td>
                            <p className='text-center'>
                                {droppingOddsWinner.money} $
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>X</td>
                        <td>
                            <p className={+droppingOddsWinner.oddsDrawStart > +droppingOddsWinner.oddsDrawEnd ? 'bg-green-400 text-center' : 'bg-rose-400 text-center'}>
                                {droppingOddsWinner.oddsDrawStart}
                            </p>
                        </td>
                        <td>
                            <p className={+droppingOddsWinner.oddsDrawEnd > +droppingOddsWinner.oddsDrawStart ? 'bg-green-400 text-center' : 'bg-rose-400 text-center'}>
                                {droppingOddsWinner.oddsDrawEnd}
                            </p>
                        </td>
                        <td>
                            <p className='text-center'>
                                {droppingOddsWinner.money} $
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>П2</td>
                        <td>
                            <p className={+droppingOddsWinner.oddsAwayStart > +droppingOddsWinner.oddsAwayend ? 'bg-green-400 text-center' : 'bg-rose-400 text-center'}>
                                {droppingOddsWinner.oddsAwayStart}
                            </p>
                        </td>
                        <td>
                            <p className={+droppingOddsWinner.oddsAwayend > +droppingOddsWinner.oddsAwayStart ? 'bg-green-400 text-center' : 'bg-rose-400 text-center'}>
                                {droppingOddsWinner.oddsAwayend}
                            </p>
                        </td>
                        <td>
                            <p className='text-center'>
                                {droppingOddsWinner.money} $
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>ТБ 2.5</td>
                        <td>
                            <p className={+droppingOddsTotal.oddsOverStart > +droppingOddsTotal.oddsOverEnd ? 'bg-green-400 text-center' : 'bg-rose-400 text-center'}>
                                {droppingOddsTotal.oddsOverStart}
                            </p>
                        </td>
                        <td>
                            <p className={+droppingOddsTotal.oddsOverEnd > +droppingOddsTotal.oddsOverStart ? 'bg-green-400 text-center' : 'bg-rose-400 text-center'}>
                                {droppingOddsTotal.oddsOverEnd}
                            </p>
                        </td>
                        <td>
                            <p className='text-center'>
                                {droppingOddsTotal.money} $
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>ТМ 2.5</td>
                        <td>
                            <p className={+droppingOddsTotal.oddsUnderStart > +droppingOddsTotal.oddsUnderEnd ? 'bg-green-400 flex text-center' : 'bg-rose-400 text-center'}>
                                {droppingOddsTotal.oddsUnderStart}
                            </p>
                        </td>
                        <td>
                            <p className={+droppingOddsTotal.oddsUnderEnd > +droppingOddsTotal.oddsUnderStart ? 'bg-green-400 text-center' : 'bg-rose-400 text-center'}>
                                {droppingOddsTotal.oddsUnderEnd}
                            </p>
                        </td>
                        <td>
                            <p className='text-center'>
                                {droppingOddsTotal.money} $
                            </p>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default DroppingOdds;