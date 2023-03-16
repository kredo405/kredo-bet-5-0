import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { calcPredictions } from "../../utils/calcPredictions";
import Table from 'react-bootstrap/Table';
import { Spin } from 'antd';
import * as Scroll from 'react-scroll';

const Predict = ({ info, predictions, outsiderRange, midleRange, pretendersRange, grandRange }) => {
    const state = useSelector(state => state);
    const [predictionsElements, setPredictionsElements] = useState(null);
    const [outcomes, setOutcomes] = useState({});
    const [moneyWay1x2, setMoneyWay1x2] = useState({});
    const [moneyWayOverUnder, setMoneyWayOverUnder] = useState({});
    const [correctScore, setCorrectScore] = useState({});
    const [odd, setOdd] = useState('1.5');

    const handleChange = (e) => {
        setOdd(e.target.value);
    }

    const handleClick = () => {
        const predictArr = calcPredictions(
            info,
            predictions,
            outcomes,
            moneyWay1x2,
            moneyWayOverUnder,
            correctScore,
            odd,
            outsiderRange,
            midleRange,
            pretendersRange,
            grandRange
        );

        setPredictionsElements(<Spin className="my-3 py-10" size="large" />);


        const elements = predictArr.bets.map((el, i) => {
            return (
                <div key={i} className="flex justify-center border-2 rounded-lg border-slate-200 border-solid mb-3 py-2 px-2 md:px-5 shadow shadow-gray-200">
                    <span className="font-semibold text-xl ml-5 w-[200px] md:w-[300px] lg:w-[400px]">{el.outcomesFinish}</span>
                    <span className="font-semibold text-xl text-amber-900 w-[50px]">{el.oddFinish}</span>
                </div>
            )
        });

        const tableValue = {
            winnerHome: {
                percentageRank: predictArr.outcomes.winnerHome.percentageRank * 100 / predictArr.outcomes.countMatchesRankHome,
                percentagleH2h: predictArr.outcomes.winnerHome.percentagleH2h * 100 / predictArr.outcomes.countMatchesH2hHome,
                percentagleMatches: predictArr.outcomes.winnerHome.percentagleMatches * 100 / predictArr.outcomes.countMatchesHome,
                percentaglePredictions: predictArr.outcomes.winnerHome.percentaglePredictions,
            },
            winnerAway: {
                percentageRank: predictArr.outcomes.winnerAway.percentageRank * 100 / predictArr.outcomes.countMatchesRankAway,
                percentagleH2h: predictArr.outcomes.winnerAway.percentagleH2h * 100 / predictArr.outcomes.countMatchesH2hAway,
                percentagleMatches: predictArr.outcomes.winnerAway.percentagleMatches * 100 / predictArr.outcomes.countMatchesAway,
                percentaglePredictions: predictArr.outcomes.winnerAway.percentaglePredictions,
            },
            draw: {
                percentageRank: predictArr.outcomes.draw.percentageRank * 100 / (predictArr.outcomes.countMatchesRankAway + predictArr.outcomes.countMatchesRankHome),
                percentagleH2h: predictArr.outcomes.draw.percentagleH2h * 100 / (predictArr.outcomes.countMatchesH2hAway + predictArr.outcomes.countMatchesH2hHome),
                percentagleMatches: predictArr.outcomes.draw.percentagleMatches * 100 / (predictArr.outcomes.countMatchesAway + predictArr.outcomes.countMatchesHome),
                percentaglePredictions: predictArr.outcomes.draw.percentaglePredictions,
            },
            winOrDrawHome: {
                percentageRank: predictArr.outcomes.winOrDrawHome.percentageRank * 100 / predictArr.outcomes.countMatchesRankHome,
                percentagleH2h: predictArr.outcomes.winOrDrawHome.percentagleH2h * 100 / predictArr.outcomes.countMatchesH2hHome,
                percentagleMatches: predictArr.outcomes.winOrDrawHome.percentagleMatches * 100 / predictArr.outcomes.countMatchesHome,
                percentaglePredictions: predictArr.outcomes.winOrDrawHome.percentaglePredictions,
            },
            winOrdrawAway: {
                percentageRank: predictArr.outcomes.winOrdrawAway.percentageRank * 100 / predictArr.outcomes.countMatchesRankAway,
                percentagleH2h: predictArr.outcomes.winOrdrawAway.percentagleH2h * 100 / predictArr.outcomes.countMatchesH2hAway,
                percentagleMatches: predictArr.outcomes.winOrdrawAway.percentagleMatches * 100 / predictArr.outcomes.countMatchesAway,
                percentaglePredictions: predictArr.outcomes.winOrdrawAway.percentaglePredictions,
            },
            foraHomeMinus15: {
                percentageRank: predictArr.outcomes.foraHomeMinus15.percentageRank * 100 / predictArr.outcomes.countMatchesRankHome,
                percentagleH2h: predictArr.outcomes.foraHomeMinus15.percentagleH2h * 100 / predictArr.outcomes.countMatchesH2hHome,
                percentagleMatches: predictArr.outcomes.foraHomeMinus15.percentagleMatches * 100 / predictArr.outcomes.countMatchesHome,
                percentaglePredictions: predictArr.outcomes.foraHomeMinus15.percentaglePredictions,
            },
            foraHomePlus15: {
                percentageRank: predictArr.outcomes.foraHomePlus15.percentageRank * 100 / predictArr.outcomes.countMatchesRankHome,
                percentagleH2h: predictArr.outcomes.foraHomePlus15.percentagleH2h * 100 / predictArr.outcomes.countMatchesH2hHome,
                percentagleMatches: predictArr.outcomes.foraHomePlus15.percentagleMatches * 100 / predictArr.outcomes.countMatchesHome,
                percentaglePredictions: predictArr.outcomes.foraHomePlus15.percentaglePredictions,
            },
            foraAwayMinus15: {
                percentageRank: predictArr.outcomes.foraAwayMinus15.percentageRank * 100 / predictArr.outcomes.countMatchesRankAway,
                percentagleH2h: predictArr.outcomes.foraAwayMinus15.percentagleH2h * 100 / predictArr.outcomes.countMatchesH2hAway,
                percentagleMatches: predictArr.outcomes.foraAwayMinus15.percentagleMatches * 100 / predictArr.outcomes.countMatchesAway,
                percentaglePredictions: predictArr.outcomes.foraAwayMinus15.percentaglePredictions,
            },
            foraAwayPlus15: {
                percentageRank: predictArr.outcomes.foraAwayPlus15.percentageRank * 100 / predictArr.outcomes.countMatchesRankAway,
                percentagleH2h: predictArr.outcomes.foraAwayPlus15.percentagleH2h * 100 / predictArr.outcomes.countMatchesH2hAway,
                percentagleMatches: predictArr.outcomes.foraAwayPlus15.percentagleMatches * 100 / predictArr.outcomes.countMatchesAway,
                percentaglePredictions: predictArr.outcomes.foraAwayPlus15.percentaglePredictions,
            },
            to15: {
                percentageRank: predictArr.outcomes.to15.percentageRank * 100 / (predictArr.outcomes.countMatchesRankAway + predictArr.outcomes.countMatchesRankHome),
                percentagleH2h: predictArr.outcomes.to15.percentagleH2h * 100 / (predictArr.outcomes.countMatchesH2hAway + predictArr.outcomes.countMatchesH2hHome),
                percentagleMatches: predictArr.outcomes.to15.percentagleMatches * 100 / (predictArr.outcomes.countMatchesAway + predictArr.outcomes.countMatchesHome),
                percentaglePredictions: predictArr.outcomes.to15.percentaglePredictions,
            },
            tu15: {
                percentageRank: predictArr.outcomes.tu15.percentageRank * 100 / (predictArr.outcomes.countMatchesRankAway + predictArr.outcomes.countMatchesRankHome),
                percentagleH2h: predictArr.outcomes.tu15.percentagleH2h * 100 / (predictArr.outcomes.countMatchesH2hAway + predictArr.outcomes.countMatchesH2hHome),
                percentagleMatches: predictArr.outcomes.tu15.percentagleMatches * 100 / (predictArr.outcomes.countMatchesAway + predictArr.outcomes.countMatchesHome),
                percentaglePredictions: predictArr.outcomes.tu15.percentaglePredictions,
            },
            to25: {
                percentageRank: predictArr.outcomes.to25.percentageRank * 100 / (predictArr.outcomes.countMatchesRankAway + predictArr.outcomes.countMatchesRankHome),
                percentagleH2h: predictArr.outcomes.to25.percentagleH2h * 100 / (predictArr.outcomes.countMatchesH2hAway + predictArr.outcomes.countMatchesH2hHome),
                percentagleMatches: predictArr.outcomes.to25.percentagleMatches * 100 / (predictArr.outcomes.countMatchesAway + predictArr.outcomes.countMatchesHome),
                percentaglePredictions: predictArr.outcomes.to25.percentaglePredictions,
            },
            tu25: {
                percentageRank: predictArr.outcomes.tu25.percentageRank * 100 / (predictArr.outcomes.countMatchesRankAway + predictArr.outcomes.countMatchesRankHome),
                percentagleH2h: predictArr.outcomes.tu25.percentagleH2h * 100 / (predictArr.outcomes.countMatchesH2hAway + predictArr.outcomes.countMatchesH2hHome),
                percentagleMatches: predictArr.outcomes.tu25.percentagleMatches * 100 / (predictArr.outcomes.countMatchesAway + predictArr.outcomes.countMatchesHome),
                percentaglePredictions: predictArr.outcomes.tu25.percentaglePredictions,
            },
            to35: {
                percentageRank: predictArr.outcomes.to35.percentageRank * 100 / (predictArr.outcomes.countMatchesRankAway + predictArr.outcomes.countMatchesRankHome),
                percentagleH2h: predictArr.outcomes.to35.percentagleH2h * 100 / (predictArr.outcomes.countMatchesH2hAway + predictArr.outcomes.countMatchesH2hHome),
                percentagleMatches: predictArr.outcomes.to35.percentagleMatches * 100 / (predictArr.outcomes.countMatchesAway + predictArr.outcomes.countMatchesHome),
                percentaglePredictions: predictArr.outcomes.to35.percentaglePredictions,
            },
            tu35: {
                percentageRank: predictArr.outcomes.tu35.percentageRank * 100 / (predictArr.outcomes.countMatchesRankAway + predictArr.outcomes.countMatchesRankHome),
                percentagleH2h: predictArr.outcomes.tu35.percentagleH2h * 100 / (predictArr.outcomes.countMatchesH2hAway + predictArr.outcomes.countMatchesH2hHome),
                percentagleMatches: predictArr.outcomes.tu35.percentagleMatches * 100 / (predictArr.outcomes.countMatchesAway + predictArr.outcomes.countMatchesHome),
                percentaglePredictions: predictArr.outcomes.tu35.percentaglePredictions,
            },
            btsYes: {
                percentageRank: predictArr.outcomes.btsYes.percentageRank * 100 / (predictArr.outcomes.countMatchesRankAway + predictArr.outcomes.countMatchesRankHome),
                percentagleH2h: predictArr.outcomes.btsYes.percentagleH2h * 100 / (predictArr.outcomes.countMatchesH2hAway + predictArr.outcomes.countMatchesH2hHome),
                percentagleMatches: predictArr.outcomes.btsYes.percentagleMatches * 100 / (predictArr.outcomes.countMatchesAway + predictArr.outcomes.countMatchesHome),
                percentaglePredictions: predictArr.outcomes.btsYes.percentaglePredictions,
            },
            btsNo: {
                percentageRank: predictArr.outcomes.btsNo.percentageRank * 100 / (predictArr.outcomes.countMatchesRankAway + predictArr.outcomes.countMatchesRankHome),
                percentagleH2h: predictArr.outcomes.btsNo.percentagleH2h * 100 / (predictArr.outcomes.countMatchesH2hAway + predictArr.outcomes.countMatchesH2hHome),
                percentagleMatches: predictArr.outcomes.btsNo.percentagleMatches * 100 / (predictArr.outcomes.countMatchesAway + predictArr.outcomes.countMatchesHome),
                percentaglePredictions: predictArr.outcomes.btsNo.percentaglePredictions,
            },
            it1O05: {
                percentageRank: predictArr.outcomes.it1O05.percentageRank * 100 / predictArr.outcomes.countMatchesRankHome,
                percentagleH2h: predictArr.outcomes.it1O05.percentagleH2h * 100 / predictArr.outcomes.countMatchesH2hHome,
                percentagleMatches: predictArr.outcomes.it1O05.percentagleMatches * 100 / predictArr.outcomes.countMatchesHome,
                percentaglePredictions: predictArr.outcomes.it1O05.percentaglePredictions,
            },
            it1O15: {
                percentageRank: predictArr.outcomes.it1O15.percentageRank * 100 / predictArr.outcomes.countMatchesRankHome,
                percentagleH2h: predictArr.outcomes.it1O15.percentagleH2h * 100 / predictArr.outcomes.countMatchesH2hHome,
                percentagleMatches: predictArr.outcomes.it1O15.percentagleMatches * 100 / predictArr.outcomes.countMatchesHome,
                percentaglePredictions: predictArr.outcomes.it1O15.percentaglePredictions,
            },
            it1O25: {
                percentageRank: predictArr.outcomes.it1O25.percentageRank * 100 / predictArr.outcomes.countMatchesRankHome,
                percentagleH2h: predictArr.outcomes.it1O25.percentagleH2h * 100 / predictArr.outcomes.countMatchesH2hHome,
                percentagleMatches: predictArr.outcomes.it1O25.percentagleMatches * 100 / predictArr.outcomes.countMatchesHome,
                percentaglePredictions: predictArr.outcomes.it1O25.percentaglePredictions,
            },
            it1U05: {
                percentageRank: predictArr.outcomes.it1U05.percentageRank * 100 / predictArr.outcomes.countMatchesRankHome,
                percentagleH2h: predictArr.outcomes.it1U05.percentagleH2h * 100 / predictArr.outcomes.countMatchesH2hHome,
                percentagleMatches: predictArr.outcomes.it1U05.percentagleMatches * 100 / predictArr.outcomes.countMatchesHome,
                percentaglePredictions: predictArr.outcomes.it1U05.percentaglePredictions,
            },
            it1U15: {
                percentageRank: predictArr.outcomes.it1U15.percentageRank * 100 / predictArr.outcomes.countMatchesRankHome,
                percentagleH2h: predictArr.outcomes.it1U15.percentagleH2h * 100 / predictArr.outcomes.countMatchesH2hHome,
                percentagleMatches: predictArr.outcomes.it1U15.percentagleMatches * 100 / predictArr.outcomes.countMatchesHome,
                percentaglePredictions: predictArr.outcomes.it1U15.percentaglePredictions,
            },
            it1U25: {
                percentageRank: predictArr.outcomes.it1U25.percentageRank * 100 / predictArr.outcomes.countMatchesRankHome,
                percentagleH2h: predictArr.outcomes.it1U25.percentagleH2h * 100 / predictArr.outcomes.countMatchesH2hHome,
                percentagleMatches: predictArr.outcomes.it1U25.percentagleMatches * 100 / predictArr.outcomes.countMatchesHome,
                percentaglePredictions: predictArr.outcomes.it1U25.percentaglePredictions,
            },
            it2O05: {
                percentageRank: predictArr.outcomes.it2O05.percentageRank * 100 / predictArr.outcomes.countMatchesRankAway,
                percentagleH2h: predictArr.outcomes.it2O05.percentagleH2h * 100 / predictArr.outcomes.countMatchesH2hAway,
                percentagleMatches: predictArr.outcomes.it2O05.percentagleMatches * 100 / predictArr.outcomes.countMatchesAway,
                percentaglePredictions: predictArr.outcomes.it2O05.percentaglePredictions,
            },
            it2O15: {
                percentageRank: predictArr.outcomes.it2O15.percentageRank * 100 / predictArr.outcomes.countMatchesRankAway,
                percentagleH2h: predictArr.outcomes.it2O15.percentagleH2h * 100 / predictArr.outcomes.countMatchesH2hAway,
                percentagleMatches: predictArr.outcomes.it2O15.percentagleMatches * 100 / predictArr.outcomes.countMatchesAway,
                percentaglePredictions: predictArr.outcomes.it2O15.percentaglePredictions,
            },
            it2O25: {
                percentageRank: predictArr.outcomes.it2O25.percentageRank * 100 / predictArr.outcomes.countMatchesRankAway,
                percentagleH2h: predictArr.outcomes.it2O25.percentagleH2h * 100 / predictArr.outcomes.countMatchesH2hAway,
                percentagleMatches: predictArr.outcomes.it2O25.percentagleMatches * 100 / predictArr.outcomes.countMatchesAway,
                percentaglePredictions: predictArr.outcomes.it2O25.percentaglePredictions,
            },
            it2U05: {
                percentageRank: predictArr.outcomes.it2U05.percentageRank * 100 / predictArr.outcomes.countMatchesRankAway,
                percentagleH2h: predictArr.outcomes.it2U05.percentagleH2h * 100 / predictArr.outcomes.countMatchesH2hAway,
                percentagleMatches: predictArr.outcomes.it2U05.percentagleMatches * 100 / predictArr.outcomes.countMatchesAway,
                percentaglePredictions: predictArr.outcomes.it2U05.percentaglePredictions,
            },
            it2U15: {
                percentageRank: predictArr.outcomes.it2U15.percentageRank * 100 / predictArr.outcomes.countMatchesRankAway,
                percentagleH2h: predictArr.outcomes.it2U15.percentagleH2h * 100 / predictArr.outcomes.countMatchesH2hAway,
                percentagleMatches: predictArr.outcomes.it2U15.percentagleMatches * 100 / predictArr.outcomes.countMatchesAway,
                percentaglePredictions: predictArr.outcomes.it2U15.percentaglePredictions,
            },
            it2U25: {
                percentageRank: predictArr.outcomes.it2U25.percentageRank * 100 / predictArr.outcomes.countMatchesRankAway,
                percentagleH2h: predictArr.outcomes.it2U25.percentagleH2h * 100 / predictArr.outcomes.countMatchesH2hAway,
                percentagleMatches: predictArr.outcomes.it2U25.percentagleMatches * 100 / predictArr.outcomes.countMatchesAway,
                percentaglePredictions: predictArr.outcomes.it2U25.percentaglePredictions,
            },
        }

        console.log(tableValue)

        setTimeout(() => {
            setPredictionsElements(
                <>
                    <div>
                        {elements}
                    </div>
                    <div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Ставка</th>
                                    <th>Пох%</th>
                                    <th>H2H%</th>
                                    <th>Все%</th>
                                    <th>Прогн</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><p className="text-center">П1</p></td>
                                    <td><p className={tableValue.winnerHome.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.winnerHome.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.winnerHome.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.winnerHome.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.winnerHome.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.winnerHome.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.winnerHome.percentaglePredictions}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-center">П2</p></td>
                                    <td><p className={tableValue.winnerAway.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.winnerAway.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.winnerAway.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.winnerAway.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.winnerAway.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.winnerAway.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.winnerAway.percentaglePredictions}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-center">X</p></td>
                                    <td><p className={tableValue.draw.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.draw.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.draw.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.draw.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.draw.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.draw.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.draw.percentaglePredictions}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-center">1X</p></td>
                                    <td><p className={tableValue.winOrDrawHome.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.winOrDrawHome.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.winOrDrawHome.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.winOrDrawHome.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.winOrDrawHome.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.winOrDrawHome.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.winOrDrawHome.percentaglePredictions}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-center">2X</p></td>
                                    <td><p className={tableValue.winOrdrawAway.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.winOrdrawAway.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.winOrdrawAway.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.winOrdrawAway.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.winOrdrawAway.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.winOrdrawAway.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.winOrdrawAway.percentaglePredictions}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-center">Ф1-1.5</p></td>
                                    <td><p className={tableValue.foraHomeMinus15.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.foraHomeMinus15.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.foraHomeMinus15.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.foraHomeMinus15.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.foraHomeMinus15.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.foraHomeMinus15.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.foraHomeMinus15.percentaglePredictions}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-center">Ф1+1.5</p></td>
                                    <td><p className={tableValue.foraHomePlus15.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.foraHomePlus15.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.foraHomePlus15.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.foraHomePlus15.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.foraHomePlus15.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.foraHomePlus15.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.foraHomePlus15.percentaglePredictions}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-center">Ф2-1.5</p></td>
                                    <td><p className={tableValue.foraAwayMinus15.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.foraAwayMinus15.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.foraAwayMinus15.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.foraAwayMinus15.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.foraAwayMinus15.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.foraAwayMinus15.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.foraAwayMinus15.percentaglePredictions}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-center">Ф2+1.5</p></td>
                                    <td><p className={tableValue.foraAwayPlus15.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.foraAwayPlus15.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.foraAwayPlus15.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.foraAwayPlus15.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.foraAwayPlus15.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.foraAwayPlus15.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.foraAwayPlus15.percentaglePredictions}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-center">ТБ1.5</p></td>
                                    <td><p className={tableValue.to15.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.to15.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.to15.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.to15.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.to15.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.to15.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.to15.percentaglePredictions}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-center">ТМ1.5</p></td>
                                    <td><p className={tableValue.tu15.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.tu15.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.tu15.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.tu15.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.tu15.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.tu15.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.tu15.percentaglePredictions}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-center">ТБ2.5</p></td>
                                    <td><p className={tableValue.to25.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.to25.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.to25.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.to25.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.to25.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.to25.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.to25.percentaglePredictions}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-center">ТМ2.5</p></td>
                                    <td><p className={tableValue.tu25.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.tu25.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.tu25.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.tu25.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.tu25.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.tu25.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.tu25.percentaglePredictions}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-center">ТБ3.5</p></td>
                                    <td><p className={tableValue.to35.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.to35.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.to35.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.to35.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.to35.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.to35.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.to35.percentaglePredictions}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-center">ТМ3.5</p></td>
                                    <td><p className={tableValue.tu35.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.tu35.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.tu35.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.tu35.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.tu35.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.tu35.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.tu35.percentaglePredictions}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-center">ОЗ ДА</p></td>
                                    <td><p className={tableValue.btsYes.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.btsYes.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.btsYes.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.btsYes.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.btsYes.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.btsYes.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.btsYes.percentaglePredictions}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-center">ОЗ Нет</p></td>
                                    <td><p className={tableValue.btsNo.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.btsNo.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.btsNo.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.btsNo.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.btsNo.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.btsNo.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.btsNo.percentaglePredictions}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-center">ИТ1Б0.5</p></td>
                                    <td><p className={tableValue.it1O05.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it1O05.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.it1O05.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it1O05.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.it1O05.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it1O05.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.it1O05.percentaglePredictions}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-center">ИТ1Б1.5</p></td>
                                    <td><p className={tableValue.it1O15.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it1O15.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.it1O15.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it1O15.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.it1O15.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it1O15.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.it1O15.percentaglePredictions}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-center">ИТ1Б2.5</p></td>
                                    <td><p className={tableValue.it1O25.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it1O25.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.it1O25.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it1O25.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.it1O25.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it1O25.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.it1O25.percentaglePredictions}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-center">ИТ1М0.5</p></td>
                                    <td><p className={tableValue.it1U05.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it1U05.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.it1U05.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it1U05.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.it1U05.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it1U05.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.it1U05.percentaglePredictions}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-center">ИТ1М1.5</p></td>
                                    <td><p className={tableValue.it1U15.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it1U15.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.it1U15.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it1U15.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.it1U15.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it1U15.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.it1U15.percentaglePredictions}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-center">ИТ1М2.5</p></td>
                                    <td><p className={tableValue.it1U25.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it1U25.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.it1U25.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it1U25.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.it1U25.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it1U25.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.it1U25.percentaglePredictions}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-center">ИТ1М2.5</p></td>
                                    <td><p className={tableValue.it1U25.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it1U25.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.it1U25.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it1U25.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.it1U25.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it1U25.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.it1U25.percentaglePredictions}</p></td>
                                </tr>

                                <tr>
                                    <td><p className="text-center">ИТ2Б0.5</p></td>
                                    <td><p className={tableValue.it2O05.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it2O05.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.it2O05.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it2O05.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.it2O05.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it2O05.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.it2O05.percentaglePredictions}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-center">ИТ2Б1.5</p></td>
                                    <td><p className={tableValue.it2O15.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it2O15.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.it2O15.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it2O15.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.it2O15.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it2O15.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.it2O15.percentaglePredictions}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-center">ИТ2Б2.5</p></td>
                                    <td><p className={tableValue.it2O25.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it2O25.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.it2O25.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it2O25.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.it2O25.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it2O25.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.it2O25.percentaglePredictions}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-center">ИТ2М0.5</p></td>
                                    <td><p className={tableValue.it2U05.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it2U05.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.it2U05.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it2U05.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.it2U05.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it2U05.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.it2U05.percentaglePredictions}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-center">ИТ2М1.5</p></td>
                                    <td><p className={tableValue.it2U15.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it2U15.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.it2U15.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it2U15.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.it2U15.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it2U15.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.it2U15.percentaglePredictions}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-center">ИТ2М2.5</p></td>
                                    <td><p className={tableValue.it2U25.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it2U25.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.it2U25.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it2U25.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.it2U25.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it2U25.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.it2U25.percentaglePredictions}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-center">ИТ2М2.5</p></td>
                                    <td><p className={tableValue.it2U25.percentageRank > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it2U25.percentageRank.toFixed(0)}</p></td>
                                    <td><p className={tableValue.it2U25.percentagleH2h > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it2U25.percentagleH2h.toFixed(0)}</p></td>
                                    <td><p className={tableValue.it2U25.percentagleMatches > 50 ? 'text-green-500 text-center' : 'text-orange-700 text-center'}>{tableValue.it2U25.percentagleMatches.toFixed(0)}</p></td>
                                    <td><p className="text-center">{tableValue.it2U25.percentaglePredictions}</p></td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </>
            );
            Scroll.animateScroll.scrollToBottom();
        }, 2500);

        Scroll.animateScroll.scrollToBottom();
    }

    useEffect(() => {
        setOutcomes(state.matchSlice.outcomes);
        setMoneyWay1x2(state.moneyWaySlice.moneyWay1x2);
        setMoneyWayOverUnder(state.moneyWaySlice.moneyWayOverUnder);
        setCorrectScore(state.moneyWaySlice.correctScore);
    }, [state.matchSlice.outcomes, state.moneyWaySlice.moneyWay1x2, state.moneyWaySlice.moneyWayOverUnder, state.moneyWaySlice.correctScore]);

    return (
        <>
            <div className="flex justify-center mb-3">
                <h2 className='text-center py-3 font-serif text-2xl font-bold text-slate-600'>Прогноз</h2>
            </div>
            <div className="flex justify-center mb-3">
                <h3 className='text-center py-2 font-serif font-bold text-slate-600'>Выберите минимальный коэфицент прогноза</h3>
            </div>
            <div className="flex justify-center flex-col items-center">
                <input onChange={handleChange} className='w-8/12' type="range" id="odds" name="odds" min="1.1" max="3" value={odd} step={0.05} />
                <label className="text-2xl py-3 text-yellow-600 font-bold" htmlFor="odds">{odd}</label>
            </div>
            <div className="flex justify-center my-5">
                <button
                    className="px-5 py-2 bg-emerald-500 text-lg text-gray-50 border-emerald-500 rounded-lg border-2 border-solid"
                    onClick={handleClick}
                >
                    Рассчитать прогноз
                </button>
            </div>
            <div className="flex flex-col justify-center items-center">
                {predictionsElements}
            </div>
        </>
    )
}

export default Predict;