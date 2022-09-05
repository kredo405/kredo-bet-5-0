import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import findTeam from '../../utils/findTeam';
import DroppingOdds from '../DroppingOdds/DroppingOdds';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';

const MoneyWay = (props) => {
    const [moneyWay1X2, setMoneyWay1X2] = useState({
        awayName: "",
        homeName: "",
        money: "Нет данных",
        oddsAway: "Нет данных",
        oddsDraw: "Нет данных",
        oddsHome: "Нет данных",
        percentAway: "Нет данных",
        percentDraw: "Нет данных",
        percentHome: "Нет данных",
    });
    const [moneyWayOverUnder, setMoneyWayOverUnder] = useState({
        awayName: "",
        homeName: "",
        money: "Нет данных",
        oddsOver: "Нет данных",
        oddsUnder: "Нет данных",
        percentOver: "Нет данных",
        percentUnder: "Нет данных",
    });
    const [arbworldData, setArbworldData] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/arbworld',
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            dispatch({
                type: 'ARBWORLD',
                payload: response.data.arbworld
            });

            setArbworldData(response.data);

            // Поиск команд 
            response.data.arbworld.moneyWay1x2.forEach(el => {
                if (el.homeName.toLowerCase() === props.homeName.toLowerCase()) {
                    setMoneyWay1X2(el)
                }
                if (el.homeName.toLowerCase() === props.awayName.toLowerCase()) {
                    setMoneyWay1X2(el)
                }
                if (el.awayName.toLowerCase() === props.homeName.toLowerCase()) {
                    setMoneyWay1X2(el)
                }
                if (el.awayName.toLowerCase() === props.awayName.toLowerCase()) {
                    setMoneyWay1X2(el)
                }
            });
            response.data.arbworld.moneyWayOverUnder.forEach(el => {
                if (el.homeName.toLowerCase() === props.homeName.toLowerCase()) {
                    setMoneyWayOverUnder(el)
                }
                if (el.homeName.toLowerCase() === props.awayName.toLowerCase()) {
                    setMoneyWayOverUnder(el)
                }
                if (el.awayName.toLowerCase() === props.homeName.toLowerCase()) {
                    setMoneyWayOverUnder(el)
                }
                if (el.awayName.toLowerCase() === props.awayName.toLowerCase()) {
                    setMoneyWayOverUnder(el)
                }
            });

            if (moneyWay1X2.homeName === "Нет данных") {
                const el = findTeam(response.data.arbworld.moneyWay1x2, props.homeName, 'arb', 'home');
                if (el) {
                    setMoneyWay1X2(el)
                } else {
                    const el = findTeam(response.data.arbworld.moneyWay1x2, props.awayName, 'arb', 'away');
                    if (el) {
                        setMoneyWay1X2(el)
                    }
                }
            } 
            if (moneyWayOverUnder.homeName === "Нет данных") {
                const el = findTeam(response.data.arbworld.moneyWayOverUnder, props.homeName, 'arb', 'home');
                if (el) {
                    setMoneyWayOverUnder(el)
                } else {
                    const el = findTeam(response.data.arbworld.moneyWayOverUnder, props.awayName, 'arb', 'away');
                    if (el) {
                        setMoneyWayOverUnder(el)
                    }
                }
            }


        }).catch(function (error) {
            console.error(error);
        });
    }, []);


    return (
        <>
            <div className="flex justify-center py-2">
                <h2 className='text-xl'>Денежные потоки</h2>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Кэф</th>
                        <th>%</th>
                        <th>Деньги</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>П1</td>
                        <td><p>{moneyWay1X2.oddsHome}</p></td>
                        <td><p
                            className={+moneyWay1X2.percentHome > +moneyWay1X2.percentDraw && +moneyWay1X2.percentHome > +moneyWay1X2.percentAway ? 'bg-green-200 flex justify-center' : +moneyWay1X2.percentHome > +moneyWay1X2.percentDraw && +moneyWay1X2.percentHome < +moneyWay1X2.percentAway ||
                                +moneyWay1X2.percentHome < +moneyWay1X2.percentDraw && +moneyWay1X2.percentHome > +moneyWay1X2.percentAway ? 'bg-yellow-200 flex justify-center' : 'bg-rose-200 flex justify-center'}>
                            {moneyWay1X2.percentHome}%</p>
                        </td>
                        <td><p>{(moneyWay1X2.money * moneyWay1X2.percentHome / 100).toFixed(1)}$</p></td>
                    </tr>
                    <tr>
                        <td>X</td>
                        <td><p>{moneyWay1X2.oddsDraw}</p></td>
                        <td>
                            <p className={+moneyWay1X2.percentDraw > +moneyWay1X2.percentHome && +moneyWay1X2.percentDraw > +moneyWay1X2.percentAway ? 'bg-green-200 flex justify-center' : +moneyWay1X2.percentDraw > +moneyWay1X2.percentHome && +moneyWay1X2.percentDraw < +moneyWay1X2.percentAway ||
                                +moneyWay1X2.percentDraw < +moneyWay1X2.percentHome && +moneyWay1X2.percentDraw > +moneyWay1X2.percentAway ? 'bg-yellow-200 flex justify-center' : 'bg-rose-200 flex justify-center'}>
                                {moneyWay1X2.percentDraw}%
                            </p>
                        </td>
                        <td><p>{(moneyWay1X2.money * moneyWay1X2.percentDraw / 100).toFixed(1)}$</p></td>
                    </tr>
                    <tr>
                        <td>П2</td>
                        <td><p>{moneyWay1X2.oddsAway}</p></td>
                        <td>
                            <p className={+moneyWay1X2.percentAway > +moneyWay1X2.percentHome && +moneyWay1X2.percentAway > +moneyWay1X2.percentDraw ? 'bg-green-200 flex justify-center' : +moneyWay1X2.percentAway > +moneyWay1X2.percentHome && +moneyWay1X2.percentAway < +moneyWay1X2.percentDraw ||
                                +moneyWay1X2.percentAway < +moneyWay1X2.percentHome && +moneyWay1X2.percentAway > +moneyWay1X2.percentDraw ? 'bg-yellow-200 flex justify-center' : 'bg-rose-200 flex justify-center'}>
                                {moneyWay1X2.percentAway}%
                            </p>
                        </td>
                        <td><p>{(moneyWay1X2.money * moneyWay1X2.percentAway / 100).toFixed(1)}$</p></td>
                    </tr>
                    <tr>
                        <td>Больше 2.5</td>
                        <td><p>{moneyWayOverUnder.oddsOver}</p></td>
                        <td>
                            <p className={+moneyWayOverUnder.percentOver > +moneyWayOverUnder.percentUnder ? 'bg-green-200 flex justify-center' : 'bg-rose-200 flex justify-center'}>
                                {moneyWayOverUnder.percentOver}%
                            </p>
                        </td>
                        <td><p>{(moneyWayOverUnder.money * moneyWayOverUnder.percentOver / 100).toFixed(1)}$</p></td>
                    </tr>
                    <tr>
                        <td>Меньше 2.5</td>
                        <td><p>{moneyWayOverUnder.oddsUnder}</p></td>
                        <td>
                            <p className={+moneyWayOverUnder.percentUnder > +moneyWayOverUnder.percentOver ? 'bg-green-200 flex justify-center' : 'bg-rose-200 flex justify-center'}>
                                {moneyWayOverUnder.percentUnder}%
                            </p>
                        </td>
                        <td><p>{(moneyWayOverUnder.money * moneyWayOverUnder.percentUnder / 100).toFixed(1)}$</p></td>
                    </tr>
                </tbody>
            </Table>
            <DroppingOdds data={arbworldData} homeName={props.homeName} awayName={props.awayName}/>
        </>
    )
}

export default MoneyWay;