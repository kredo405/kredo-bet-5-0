import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import findTeam from '../../utils/findTeam';
import { arbworldServices } from '../../services/arbworld';
import { useSelector, useDispatch } from "react-redux";
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';


const MoneyWay = (props) => {

    const state = useSelector(state => state);
    const [moneyWay1X2, setMoneyWay1X2] = useState([{
        homeAway: "",
        homeName: "",
    }]);
    const [element1X2, setElement1X2] = useState({
        homeAway: "",
        homeName: "",
        money: "Нет данных",
        oddsAway: "Нет данных",
        oddsDraw: "Нет данных",
        oddsHome: "Нет данных",
        percentAway: "Нет данных",
        percentDraw: "Нет данных",
        percentHome: "Нет данных",
    });
    const [elementOverUnder, setElementOverUnder] = useState({
        homeAway: "",
        homeName: "",
        money: "Нет данных",
        oddsOver: "Нет данных",
        oddsUnder: "Нет данных",
        percentOver: "Нет данных",
        percentUnder: "Нет данных",
    });
    const [show1X2, setShow1X2] = useState(false);
    const [showUnderOver, setShowUnderOver] = useState(false);
    const [showScore, setShowScore] = useState(false);
    const [moneyWayOverUnder, setMoneyWayOverUnder] = useState([{
        homeAway: "",
        homeName: "",
    }]);
    const [correctScore, setCorrectScore] = useState([{
        homeName: '',
        awayName: ''
    }]);
    const [elemetnCorrectScore, setElementCorrectScore] = useState({
        homeName: '',
        awayName: '',
        date: '',
        leagueName: '',
        scores: [],
    });


    useEffect(() => {
        const getData = async () => {

            try {
                const moneyWay1X2 = await arbworldServices.getMoneyWay1x2()
                const moneyWayUnderOver = await arbworldServices.getMoneyWayUnderOver()
                const correctScore = await arbworldServices.getcorrectScore()

                console.log(moneyWay1X2.data.moneyWay)
                console.log(moneyWayUnderOver.data.moneyWay)
                console.log(correctScore.data.moneyWay)

                const correctScoreFixTeamName = correctScore.data.moneyWay.map(el => {
                    const pos = el.teamName.indexOf('vs');
                    return {
                        date: el.date,
                        leagueName: el.leagueName,
                        scores: el.scores,
                        homeName: el.teamName.slice(0, pos),
                        awayName: el.teamName.slice(pos + 2),
                    }
                })

                console.log(correctScoreFixTeamName)

                setMoneyWay1X2(moneyWay1X2.data.moneyWay);
                setMoneyWayOverUnder(moneyWayUnderOver.data.moneyWay);
                setCorrectScore(correctScoreFixTeamName)
            }
            catch (error) {
                console.log(error)
            }
        }

        getData()

    }, []);

    const handleClick1X2 = (e) => {
        const element = moneyWay1X2.filter(el => el.homeName === e.target.name);
        setElement1X2(element[0]);
        setShow1X2(true)
    }

    const handleClickUnderOver = (e) => {
        const element = moneyWayOverUnder.filter(el => el.homeName === e.target.name);
        setElementOverUnder(element[0]);
        setShowUnderOver(true)
    }
    const handleClickScores = (e) => {
        const element = correctScore.filter(el => el.homeName === e.target.name);
        setElementCorrectScore(element[0]);
        setShowScore(true)
    }

    const elemets1x2 = moneyWay1X2.map((el, i) => {
        return (
            <Dropdown.Item onClick={handleClick1X2} name={el.homeName} key={el.homeName} eventKey={i}>{el.homeName} - {el.homeAway}</Dropdown.Item>
        )
    });

    const elemetsUnderOver = moneyWayOverUnder.map((el, i) => {
        return (
            <Dropdown.Item onClick={handleClickUnderOver} name={el.homeName} key={el.homeName} eventKey={i}>{el.homeName} - {el.homeAway}</Dropdown.Item>
        )
    });

    const elemetsScore = correctScore.map((el, i) => {
        return (
            <Dropdown.Item onClick={handleClickScores} name={el.homeName} key={el.homeName} eventKey={i}>{el.homeName} - {el.awayName}</Dropdown.Item>
        )
    });

    const correctScoreElementsScores = (elemetnCorrectScore) => {
        const elements = elemetnCorrectScore.scores.map((el, i) => {
            for (let key in el) {
                return (
                    <tr key={key}>
                        <td><p className='text-center'>{key.slice(-3)}</p></td>
                        <td><p className='text-center text-blue-200'>{el[key].odd}</p></td>
                        <td><p className='text-center text-blue-200'>{el[key].percent}</p></td>
                        <td><p className='text-center text-blue-200'>{el[key].money}</p></td>
                    </tr>
                )
            }
        })

        return elements;
    }

    const scores = correctScoreElementsScores(elemetnCorrectScore);


    return (
        <>
            <div className="flex justify-center py-2">
                <h2 className='text-center py-3 font-serif text-2xl font-bold text-slate-600'>Денежные потоки</h2>
            </div>
            <div className='flex justify-center mb-3'>
                <SplitButton
                    id={`dropdown-split-variants-Info`}
                    variant='info'
                    title='Денежные потоки 1Х2'
                >
                    {elemets1x2}
                </SplitButton>
            </div>
            {show1X2 ?
                <Table striped bordered hover variant="dark" className='mt-5'>
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
                            <td><p className='text-center text-sky-200 font-mono font-semibold'>{element1X2.oddsHome}</p></td>
                            <td><p className='text-center text-sky-200 font-mono font-semibold'>
                                {element1X2.percentHome}</p>
                            </td>
                            <td><p className='text-center text-sky-200 font-mono font-semibold'>{element1X2.moneyHome}</p></td>
                        </tr>
                        <tr>
                            <td><p className='text-center font-mono font-semibold'>X</p></td>
                            <td><p className='text-center text-sky-200 font-mono font-semibold'>{element1X2.oddsDraw}</p></td>
                            <td><p className='text-center text-sky-200 font-mono font-semibold'>
                                {element1X2.percentDraw}</p>
                            </td>
                            <td><p className='text-center text-sky-200 font-mono font-semibold'>{element1X2.moneyDraw}</p></td>
                        </tr>
                        <tr>
                            <td><p className='text-center font-mono font-semibold'>П2</p></td>
                            <td><p className='text-center text-sky-200 font-mono font-semibold'>{element1X2.oddsAway}</p></td>
                            <td><p className='text-center text-sky-200 font-mono font-semibold'>
                                {element1X2.percentAway}</p>
                            </td>
                            <td><p className='text-center text-sky-200 font-mono font-semibold'>{element1X2.moneyAway}</p></td>
                        </tr>
                    </tbody>
                </Table>

                :
                null
            }
            <div className='flex justify-center mb-3'>
                <SplitButton
                    id={`dropdown-split-variants-Info`}
                    variant='info'
                    title='Денежные потоки Б/М'
                >
                    {elemetsUnderOver}
                </SplitButton>
            </div>
            {showUnderOver ?
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
                            <td><p className='text-center font-mono font-semibold'>Больше</p></td>
                            <td><p className='text-center text-sky-200 font-mono font-semibold'>{elementOverUnder.oddsOver}</p></td>
                            <td><p className='text-center text-sky-200 font-mono font-semibold'>
                                {elementOverUnder.percentOver}</p>
                            </td>
                            <td><p className='text-center text-sky-200 font-mono font-semibold'>{elementOverUnder.moneyOver}</p></td>
                        </tr>
                        <tr>
                            <td><p className='text-center font-mono font-semibold'>Меньше</p></td>
                            <td><p className='text-center text-sky-200 font-mono font-semibold'>{elementOverUnder.oddsUnder}</p></td>
                            <td><p className='text-center text-sky-200 font-mono font-semibold'>
                                {elementOverUnder.percentUnder}</p>
                            </td>
                            <td><p className='text-center text-sky-200 font-mono font-semibold'>{elementOverUnder.moneyUnder}</p></td>
                        </tr>
                    </tbody>
                </Table>
                :
                null
            }
            <div className='flex justify-center mb-3'>
                <SplitButton
                    id={`dropdown-split-variants-Info`}
                    variant='info'
                    title='Денежные потоки ТС'
                >
                    {elemetsScore}
                </SplitButton>
            </div>

            {showScore ?
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th><p className='text-center'>Счет</p></th>
                            <th><p className='text-center'>Кэф</p></th>
                            <th><p className='text-center'>%</p></th>
                            <th><p className='text-center'>Деньги</p></th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores}
                    </tbody>
                </Table>
                :
                null
            }
        </>
    )
}

export default MoneyWay;