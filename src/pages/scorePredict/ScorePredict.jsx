import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { arbworldServices } from "../../services/arbworld";
import { calcCorrectScore } from "../../utils/calcCorrectScore";
import { Table } from "react-bootstrap";

const ScorePredict = () => {
    const [elemetnCorrectScore, setElementCorrectScore] = useState([
        {
            homeName: "",
            awayName: "",
            date: "",
            leagueName: "",
            scores: {
                btsNo: 0,
                btsYes: 0,
                draw: 0,
                foraAwayMinus15: 0,
                foraAwayPlus15: 0,
                foraHomeMinus15: 0,
                foraHomePlus15: 0,
                it1O05: 0,
                it1O15: 0,
                it1O25: 0,
                it1U05: 0,
                it1U15: 0,
                it1U25: 0,
                it2O05: 0,
                it2O15: 0,
                it2O25: 0,
                it2U05: 0,
                it2U15: 0,
                it2U25: 0,
                to15: 0,
                to25: 0,
                to35: 0,
                tu15: 0,
                tu25: 0,
                tu35: 0,
                winOrDrawHome: 0,
                winOrdrawAway: 0,
                winnerAway: 0,
                winnerHome: 0,
            },
        },
    ]);

    const getScoreMoneyWay = async () => {
        try {
            const res = await arbworldServices.getcorrectScore();
            const correctScoreFixTeamName = res.data.moneyWay.map((el) => {
                const pos = el.teamName.indexOf("vs");
                return {
                    date: el.date,
                    leagueName: el.leagueName,
                    scores: el.scores,
                    homeName: el.teamName.slice(0, pos),
                    awayName: el.teamName.slice(pos + 2),
                };
            });

            console.log(correctScoreFixTeamName);

            const predictionsElements = correctScoreFixTeamName.map((el) => {
                const percentScores = calcCorrectScore(el.scores);

                return {
                    awayName: el.awayName,
                    date: el.date,
                    homeName: el.homeName,
                    leagueName: el.leagueName,
                    scores: percentScores,
                };
            });

            setElementCorrectScore(predictionsElements);
        } catch (error) {
            console.log(error);
        }
    };

    const green = "bg-green-200 flex justify-center font-mono";
    const rose = "bg-rose-200 flex justify-center font-mono";
    const blue = "bg-sky-200 flex justify-center font-mono";

    const elements = elemetnCorrectScore.map((el) => {
        const scoreElemnts = Object.entries(el.scores).map((item, i) => {
            return (
                <tr key={i}>
                    <td>
                        <p className="font-medium font-sans text-orange-900">
                            {item[0]}
                        </p>
                    </td>
                    <td>
                        <p
                            className={
                                item[1] >= 65
                                    ? green
                                    : item[1] < 65 && item[1] >= 50
                                    ? blue
                                    : rose
                            }
                        >
                            {item[1].toFixed(1)}%
                        </p>
                    </td>
                </tr>
            );
        });
        return (
            <div>
                <div>
                    <div className="text-center py-3 bg-cyan-400 font-bold text-lg text-neutral-100">
                        {el.leagueName}
                    </div>
                    <div className="flex justify-between py-3 bg-orange-200">
                        <span className="w-5/12 text-lg font-mono font-bold px-2">
                            {el.date.slice(0, -3)}
                        </span>
                        <div className="w-7/12 flex justify-evenly text-lg font-mono font-bold px-2">
                            <span>{el.homeName}</span>
                            <span>-</span>
                            <span>{el.awayName}</span>
                        </div>
                    </div>
                    <div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Ставка</th>
                                    <th>Вероятн. %</th>
                                </tr>
                            </thead>
                            <tbody>{scoreElemnts}</tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    });

    useEffect(() => {
        getScoreMoneyWay();
    }, []);
    return (
        <>
            <Header />
            <div className="lg:px-32 px-3">{elements}</div>
        </>
    );
};

export default ScorePredict;
