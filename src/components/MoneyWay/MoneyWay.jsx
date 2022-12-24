import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import findTeam from '../../utils/findTeam';
import { arbworldServices } from '../../services/arbworld';
import { useSelector, useDispatch } from "react-redux";


const MoneyWay = (props) => {

    const state = useSelector(state => state);
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
        const getData = async () => {

            try {
                const moneyWay1X2 = await arbworldServices.getMoneyWay1x2()
                const moneyWayUnderOver = await arbworldServices.getMoneyWayUnderOver()
                const correctScore = await arbworldServices.getcorrectScore()
                const droppingOdds1X2 = await arbworldServices.getDroppingOdds1X2()
                const droppingOddsUnderOver = await arbworldServices.getDroppingOddsUnderOver()

                console.log(moneyWay1X2.data.moneyWay)
                console.log(moneyWayUnderOver.data.moneyWay)
                console.log(correctScore.data.moneyWay)
                console.log(droppingOdds1X2.data.droppingOdds)
                console.log(droppingOddsUnderOver.data.droppingOdds)
       
                
            }
            catch (error) {
                console.log(error)
            }
        }

        getData()

    }, []);


    return (
        <>
            <div className="flex justify-center py-2">
                <h2 className='text-center py-3 font-serif text-2xl font-bold text-slate-600'>Денежные потоки</h2>
            </div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th><p className='text-center'>Ставка</p></th>
                        <th><p className='text-center'>Кэф</p></th>
                        <th><p className='text-center'>%</p></th>
                        <th><p className='text-center'>Деньги</p></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><p className='text-center font-mono font-semibold'>П1</p></td>
                        <td><p className='text-center text-sky-200 font-mono font-semibold'>{moneyWay1X2.oddsHome}</p></td>
                        <td><p className='text-center text-sky-200 font-mono font-semibold'>
                            {moneyWay1X2.percentHome}</p>
                        </td>
                        <td><p className='text-center text-sky-200 font-mono font-semibold'>{moneyWay1X2.moneyHome}</p></td>
                    </tr>
                    <tr>
                        <td><p className='text-center font-mono font-semibold'>Х</p></td>
                        <td><p className='text-center text-sky-200 font-mono font-semibold'>{moneyWay1X2.oddsDraw}</p></td>
                        <td>
                            <p className='text-center text-sky-200 font-mono font-semibold'>
                                {moneyWay1X2.percentDraw}
                            </p>
                        </td>
                        <td><p className='text-center text-sky-200 font-mono font-semibold'>{moneyWay1X2.moneyDraw}</p></td>
                    </tr>
                    <tr>
                        <td><p className='text-center font-mono font-semibold'>П2</p></td>
                        <td><p className='text-center text-sky-200 font-mono font-semibold'>{moneyWay1X2.oddsAway}</p></td>
                        <td>
                            <p className='text-center text-sky-200 font-mono font-semibold'>
                                {moneyWay1X2.percentAway}
                            </p>
                        </td>
                        <td><p className='text-center text-sky-200 font-mono font-semibold'>{moneyWay1X2.moneyAway}</p></td>
                    </tr>
                    <tr>
                        <td><p className='text-center font-mono font-semibold'>ТБ 2.5</p></td>
                        <td><p className='text-center text-sky-200 font-mono font-semibold'>{moneyWayOverUnder.oddsOver}</p></td>
                        <td>
                            <p className='text-center text-sky-200 font-mono font-semibold'>
                                {moneyWayOverUnder.percentOver}
                            </p>
                        </td>
                        <td><p className='text-center text-sky-200 font-mono font-semibold'>{moneyWayOverUnder.moneyOver}</p></td>
                    </tr>
                    <tr>
                        <td><p className='text-center font-mono font-semibold'>ТМ 2.5</p></td>
                        <td><p className='text-center text-sky-200 font-mono font-semibold'>{moneyWayOverUnder.oddsUnder}</p></td>
                        <td>
                            <p className='text-center text-sky-200 font-mono font-semibold'>
                                {moneyWayOverUnder.percentUnder}
                            </p>
                        </td>
                        <td><p className='text-center text-sky-200 font-mono font-semibold'>{moneyWayOverUnder.moneyUnder}</p></td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default MoneyWay;