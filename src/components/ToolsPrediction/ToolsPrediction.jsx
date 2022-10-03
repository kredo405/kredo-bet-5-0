import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Collapse } from 'antd';
import { Table } from 'react-bootstrap';
import { collectiveMindCalculation } from "../../utils/collectiveMindCalculation";
import axios from 'axios';

const { Panel } = Collapse;

const ToolsPrediction = (props) => {
    const [arbworldData, setArbworldData] = useState({});
    const [percent, setPercent] = useState({
        p1: '',
        f10: '',
        f1Plus1: '',
        k1WillScore: '',
        k2WillScore: '',
        it1O1: '',
        it2O1: '',
        it1O15: '',
        it2O15: '',
        to2: '',
        to25: '',
        to3: '',
        tu2: '',
        tu25: '',
        tu3: '',
        bts: ''
    });
    const [matches, setMatches] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/arbworld',
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            setArbworldData(response.data);
            setMatches(collectiveMindCalculation(response.data.arbworld.correctScore,
                response.data.arbworld.moneyWay1x2,
                response.data.arbworld.moneyWayOverUnder));


        }).catch(function (error) {
            console.error(error);
        });
    }, []);

    const green = 'bg-green-200 flex justify-center';
    const rose = 'bg-rose-200 flex justify-center';
    const blue = 'bg-sky-200 flex justify-center';

    const matchesList = matches.map((el, i) => {
        return (
            <Panel header={`${el.homeName} — ${el.awayName}`} key={i}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Ставка</th>
                            <th>%</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>П1</td>
                            <td><p className={el.p1 >= 55 ? green : el.p1 < 55 && el.p1 >= 40 ? blue : rose}>{el.p1.toFixed(0)}</p></td>
                        </tr>
                        <tr>
                            <td>П2</td>
                            <td><p className={el.p2 >= 55 ? green : el.p2 < 55 && el.p2 >= 40 ? blue : rose}>{el.p2.toFixed(0)}</p></td>
                        </tr>
                        <tr>
                            <td>Ит1Б(1)</td>
                            <td><p className={el.it1O1 >= 60 ? green : el.it1O1 < 60 && el.it1O1 >= 50 ? blue : rose}>{el.it1O1.toFixed(0)}</p></td>
                        </tr>
                        <tr>
                            <td>Ит2Б(1)</td>
                            <td><p className={el.it2O1 >= 60 ? green : el.it2O1 < 60 && el.it2O1 >= 50 ? blue : rose}>{el.it2O1.toFixed(0)}</p></td>
                        </tr>
                        <tr>
                            <td>ТБ 2.5</td>
                            <td><p className={el.to25 >= 60 ? green : el.to25 < 60 && el.to25 >= 50 ? blue : rose}>{el.to25.toFixed(0)}</p></td>
                        </tr>
                        <tr>
                            <td>ТМ 2.5</td>
                            <td><p className={el.tu25 >= 60 ? green : el.tu25 < 60 && el.tu25 >= 50 ? blue : rose}>{el.tu25.toFixed(0)}</p></td>
                        </tr>
                        <tr>
                            <td>ОЗ</td>
                            <td><p className={el.bts >= 60 ? green : el.bts < 60 && el.bts >= 50 ? blue : rose}>{el.bts.toFixed(0)}</p></td>
                        </tr>
                    </tbody>
                </Table>
            </Panel>
        )
    })

    return (
        <>
            <div className="flex justify-center my-3">
                <h1 className="text-slate-800 font-bold text-xl">Коллективный разум</h1>
            </div>
            <div>
                <Collapse defaultActiveKey={['1']}>
                    {matchesList}
                </Collapse>
            </div>
        </>
    )
}

export default ToolsPrediction;