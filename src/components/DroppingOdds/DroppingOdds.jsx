import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import findTeam from '../../utils/findTeam';

const DroppingOdds = (props) => {
    const [droppingOdds1x2, setDroppingOdds1x2] = useState({
        awayName: "Нет данных",
        homeName: "Нет данных",
        oddsAway: [],
        oddsDraw: [],
        oddsHome: [],
    })
    const [droppingOddsOverUnder, setDroppingOddsOverUnder] = useState({
        awayName: "Нет данных",
        homeName: "Нет данных",
        oddsOver: [],
        oddsUnder: [],
    });
    const state = useSelector(state => state);

    useEffect(() => {
        // Поиск команд 
        state.arbworld.droppingOdds1x2.forEach(el => {
            if (el.homeName.toLowerCase() === props.homeName.toLowerCase()) {
                setDroppingOdds1x2(el)
            }
            if (el.homeName.toLowerCase() === props.awayName.toLowerCase()) {
                setDroppingOdds1x2(el)
            }
            if (el.awayName.toLowerCase() === props.homeName.toLowerCase()) {
                setDroppingOdds1x2(el)
            }
            if (el.awayName.toLowerCase() === props.awayName.toLowerCase()) {
                setDroppingOdds1x2(el)
            }
        });
        state.arbworld.droppingOddsOverUnder.forEach(el => {
            if (el.homeName.toLowerCase() === props.homeName.toLowerCase()) {
                setDroppingOddsOverUnder(el)
            }
            if (el.homeName.toLowerCase() === props.awayName.toLowerCase()) {
                setDroppingOddsOverUnder(el)
            }
            if (el.awayName.toLowerCase() === props.homeName.toLowerCase()) {
                setDroppingOddsOverUnder(el)
            }
            if (el.awayName.toLowerCase() === props.awayName.toLowerCase()) {
                setDroppingOddsOverUnder(el)
            }
        });

        if (droppingOdds1x2.homeName === "Нет данных") {
            const el = findTeam(state.arbworld.droppingOdds1x2, props.homeName, 'arb', 'home');
            if (el) {
                setDroppingOdds1x2(el)
            }
        } else {
            const el = findTeam(state.arbworld.droppingOdds1x2, props.awayName, 'arb', 'away');
            if (el) {
                setDroppingOdds1x2(el)
            }
        }
        if (droppingOddsOverUnder.homeName === "Нет данных") {
            const el = findTeam(state.arbworld.droppingOddsOverUnder, props.homeName, 'arb', 'home');
            if (el) {
                setDroppingOddsOverUnder(el)
            }
        } else {
            const el = findTeam(state.arbworld.droppingOddsOverUnder, props.awayName, 'arb', 'away');
            if (el) {
                setDroppingOddsOverUnder(el)
            }
        }
    }, [state])


    return (
        <>
            <div className="flex justify-center py-2">
                <h2 className='text-xl'>Движение коэфицентов</h2>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Начальный кэф</th>
                        <th>Конечный кэф</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>П1</td>
                        <td>
                            <p className={+droppingOdds1x2.oddsHome[0] > +droppingOdds1x2.oddsHome[1] ? 'bg-green-200 flex justify-center' : 'bg-rose-200 flex justify-center'}>
                                {droppingOdds1x2.oddsHome[0]}
                            </p>
                        </td>
                        <td>
                            <p className={+droppingOdds1x2.oddsHome[1] > +droppingOdds1x2.oddsHome[0] ? 'bg-green-200 flex justify-center' : 'bg-rose-200 flex justify-center'}>
                                {droppingOdds1x2.oddsHome[1]}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>X</td>
                        <td>
                            <p className={+droppingOdds1x2.oddsDraw[0] > +droppingOdds1x2.oddsDraw[1] ? 'bg-green-200 flex justify-center' : 'bg-rose-200 flex justify-center'}>
                                {droppingOdds1x2.oddsDraw[0]}
                            </p>
                        </td>
                        <td>
                            <p className={+droppingOdds1x2.oddsDraw[1] > +droppingOdds1x2.oddsDraw[0] ? 'bg-green-200 flex justify-center' : 'bg-rose-200 flex justify-center'}>
                                {droppingOdds1x2.oddsDraw[1]}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>П2</td>
                        <td>
                            <p className={+droppingOdds1x2.oddsAway[0] > +droppingOdds1x2.oddsAway[1] ? 'bg-green-200 flex justify-center' : 'bg-rose-200 flex justify-center'}>
                                {droppingOdds1x2.oddsAway[0]}
                            </p>
                        </td>
                        <td>
                            <p className={+droppingOdds1x2.oddsAway[1] > +droppingOdds1x2.oddsAway[0] ? 'bg-green-200 flex justify-center' : 'bg-rose-200 flex justify-center'}>
                                {droppingOdds1x2.oddsAway[1]}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>Больше 2.5</td>
                        <td>
                            <p className={+droppingOddsOverUnder.oddsOver[0] > +droppingOddsOverUnder.oddsOver[1] ? 'bg-green-200 flex justify-center' : 'bg-rose-200 flex justify-center'}>
                                {droppingOddsOverUnder.oddsOver[0]}
                            </p>
                        </td>
                        <td>
                            <p className={+droppingOddsOverUnder.oddsOver[1] > +droppingOddsOverUnder.oddsOver[0] ? 'bg-green-200 flex justify-center' : 'bg-rose-200 flex justify-center'}>
                                {droppingOddsOverUnder.oddsOver[1]}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>Меньше 2.5</td>
                        <td>
                            <p className={+droppingOddsOverUnder.oddsUnder[0] > +droppingOddsOverUnder.oddsUnder[1] ? 'bg-green-200 flex justify-center' : 'bg-rose-200 flex justify-center'}>
                                {droppingOddsOverUnder.oddsUnder[0]}
                            </p>
                        </td>
                        <td>
                            <p className={+droppingOddsOverUnder.oddsUnder[1] > +droppingOddsOverUnder.oddsUnder[0] ? 'bg-green-200 flex justify-center' : 'bg-rose-200 flex justify-center'}>
                                {droppingOddsOverUnder.oddsUnder[1]}
                            </p>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default DroppingOdds;