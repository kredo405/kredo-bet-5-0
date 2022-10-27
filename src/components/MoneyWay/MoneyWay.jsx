import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import findTeam from '../../utils/findTeam';
import DroppingOdds from '../DroppingOdds/DroppingOdds';
import { useSelector, useDispatch } from "react-redux";
import { arbworldServices } from '../../services/arbworld';

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


    useEffect(() => {

        try {
            const getData = async () => {
                const moneyWay1x2 = await arbworldServices.getMoneyWay1x2()
                const moneyWayOverUnder = await arbworldServices.getMoneyWayUnderOver()

                console.log(props)

                const moneyWay1X2Element = moneyWay1x2.data.moneyWay.find(el => el.homeName.toLowerCase() === props.homeName.toLowerCase() && el.homeAway.toLowerCase() === props.awayName.toLowerCase())
                const moneyWayOverUnderElement = moneyWayOverUnder.data.moneyWay.find(el => el.homeName.toLowerCase() === props.homeName.toLowerCase() && el.homeAway.toLowerCase() === props.awayName.toLowerCase())

                const posPercentOver = moneyWayOverUnderElement.percentOver.indexOf('%')
                const posPercentUnder = moneyWayOverUnderElement.percentUnder.indexOf('%')
                const posPercentHome = moneyWay1X2Element.percentHome.indexOf('%')
                const posPercentDraw = moneyWay1X2Element.percentDraw.indexOf('%')
                const posPercentAway = moneyWay1X2Element.percentAway.indexOf('%')

                moneyWay1X2Element.percentHome = +moneyWay1X2Element.percentHome.slice(0, posPercentHome)
                moneyWay1X2Element.percentDraw = +moneyWay1X2Element.percentDraw.slice(0, posPercentDraw)
                moneyWay1X2Element.percentAway = +moneyWay1X2Element.percentAway.slice(0, posPercentAway)
                moneyWayOverUnderElement.percentOver = +moneyWayOverUnderElement.percentOver.slice(0, posPercentOver)
                moneyWayOverUnderElement.percentUnder = +moneyWayOverUnderElement.percentUnder.slice(0, posPercentUnder)

                setMoneyWay1X2(moneyWay1X2Element)
                setMoneyWayOverUnder(moneyWayOverUnderElement)
            }

            getData()
        }
        catch (error) {
            console.log(error)
        }



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
                        <td><p className='text-center text-sky-900 font-mono font-semibold'>П1</p></td>
                        <td><p className='text-center text-sky-600 font-mono font-semibold'>{moneyWay1X2.oddsHome}</p></td>
                        <td><p className='text-center text-sky-600 font-mono font-semibold'>
                            {moneyWay1X2.percentHome}</p>
                        </td>
                        <td><p className='text-center text-sky-600 font-mono font-semibold'>{+moneyWay1X2.money * +moneyWay1X2.percentHome / 100}$</p></td>
                    </tr>
                    <tr>
                        <td>X</td>
                        <td><p className='text-center text-sky-600 font-mono font-semibold'>{moneyWay1X2.oddsDraw}</p></td>
                        <td>
                            <p className='text-center text-sky-600 font-mono font-semibold'>
                                {moneyWay1X2.percentDraw}
                            </p>
                        </td>
                        <td><p className='text-center text-sky-600 font-mono font-semibold'>{+moneyWay1X2.money * moneyWay1X2.percentDraw / 100}$</p></td>
                    </tr>
                    <tr>
                        <td>П2</td>
                        <td><p className='text-center text-sky-600 font-mono font-semibold'>{moneyWay1X2.oddsAway}</p></td>
                        <td>
                            <p className='text-center text-sky-600 font-mono font-semibold'>
                                {moneyWay1X2.percentAway}
                            </p>
                        </td>
                        <td><p className='text-center text-sky-600 font-mono font-semibold'>{+moneyWay1X2.money * moneyWay1X2.percentAway / 100}$</p></td>
                    </tr>
                    <tr>
                        <td>Больше 2.5</td>
                        <td><p className='text-center text-sky-600 font-mono font-semibold'>{moneyWayOverUnder.oddsOver}</p></td>
                        <td>
                            <p className='text-center text-sky-600 font-mono font-semibold'>
                                {moneyWayOverUnder.percentOver}
                            </p>
                        </td>
                        <td><p className='text-center text-sky-600 font-mono font-semibold'>{+moneyWayOverUnder.money * +moneyWayOverUnder.percentOver / 100}$</p></td>
                    </tr>
                    <tr>
                        <td>Меньше 2.5</td>
                        <td><p className='text-center text-sky-600 font-mono font-semibold'>{moneyWayOverUnder.oddsUnder}</p></td>
                        <td>
                            <p className='text-center text-sky-600 font-mono font-semibold'>
                                {moneyWayOverUnder.percentUnder}
                            </p>
                        </td>
                        <td><p className='text-center text-sky-600 font-mono font-semibold'>{+moneyWayOverUnder.money * +moneyWayOverUnder.percentUnder / 100}$</p></td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default MoneyWay;