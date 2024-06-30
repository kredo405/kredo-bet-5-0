import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { BackTop, Modal } from "antd";
import { Loading } from "../../components/Loading/Loading";
import { nbbetServices } from "../../services/nbbet";
import getOdds from "../../utils/getOdds";
import { calcPredictions } from "../../utils/calcPredictions";
import calcPredictionNew from "../../utils/calcPredictionNew";
import filterPredictions from "../../utils/filterPredictions";
import { Empty } from "antd";

const errorModal = (message) => {
    Modal.error({
        title: message,
    });
};

const showInfo = (
    data,
    text,
    textWeight,
    weightedAverageProbability,
    sample,
    dataNew
) => {
    Modal.info({
        title: `Прогноз на матч: ${data.closestBetWeight.name},  ${dataNew.name}`,
        content: (
            <>
                {" "}
                {sample >= 50 ? (
                    <>
                        <div>
                            <h1 className="text-center py-2 font-bold text-orange-900 text-xl">
                                Старый метод
                            </h1>
                            <span className="font-sans text-sky-800 font-medium">
                                Без веса
                            </span>{" "}
                            <p className="font-sans text-orange-800 font-medium">
                                {text}
                            </p>
                            <span className="font-sans text-sky-800 font-medium">
                                С весом
                            </span>{" "}
                            <p className="font-sans text-orange-800 font-medium">
                                {textWeight}
                            </p>
                            <p className="font-sans text-orange-800 font-medium">
                                {weightedAverageProbability}
                            </p>
                            <p className="font-sans text-orange-800 font-medium">
                                {sample}
                            </p>
                        </div>
                        <div>
                            <h1 className="text-center py-2 font-bold text-orange-900 text-xl">
                                Новый метод
                            </h1>
                            <p className="font-sans text-xl text-emerald-800 font-medium">
                                {dataNew.name}
                            </p>
                            <p className="font-sans text-sky-700 font-medium">
                                {`Кэф: ${dataNew.odd}`}
                            </p>
                            <p className="font-sans text-indigo-800 font-medium">
                                {`Вероятность: ${dataNew.probability.toFixed(
                                    1
                                )}%`}
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="text-center py-2 font-bold text-orange-900 text-xl">
                            Мало данных для прогноза
                        </h1>
                    </>
                )}
            </>
        ),
        onOk() {},
    });
};

const Match = () => {
    const [info, setInfo] = useState({});
    const [predictions, setPredictions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [odds, setOdds] = useState({});
    const [summary, setSummary] = useState({});
    const [historyOdds, setHistoryOdds] = useState({});
    const [topPredictions, setTopPredictions] = useState({
        topPredictions: [
            {
                text: "",
                odd: 0,
                profit: 0,
                name: "",
            },
        ],
        topPredictionsWeight: [
            {
                odd: 0,
                profit: 0,
                name: "",
            },
        ],
    });

    const getPredict = () => {
        const preditionCopy = JSON.parse(JSON.stringify(predictions));
        const oddsCopy = JSON.parse(JSON.stringify(odds));
        const historyOddsCopy = JSON.parse(JSON.stringify(historyOdds));

        const res = calcPredictions(preditionCopy, oddsCopy, summary, info);
        const resNew = calcPredictionNew(
            preditionCopy,
            oddsCopy,
            historyOddsCopy
        );
        const text = `Наиболее близкий исход: ${res.closestBet.name} с коэффициентом ${res.closestBet.odd}`;
        const textWeight = `Наиболее близкий исход: ${res.closestBetWeight.name} с коэффициентом ${res.closestBetWeight.odd}`;
        const weightedAverageProbability = `Взвешенная средняя вероятность: ${
            res.weightedAverageProbability * 100
        }%`;
        const sample = `Выборка: ${res.sample}`;
        console.log(sample);
        showInfo(
            res,
            text,
            textWeight,
            weightedAverageProbability,
            res.sample,
            resNew
        );
    };

    const elements = topPredictions.topPredictions.map((el, idx) => (
        <div key={idx} className=" border-b border-slate-300 py-2 mt-4">
            <span className="text-slate-800">{el.text}</span>
            <div className="flex justify-between mt-3">
                <div>
                    <span className="text-sky-600">Кэф</span>
                    <span className="text-orange-600 px-3">{el.odd}</span>
                </div>
                <div>
                    <span className="text-sky-600">Ставка</span>
                    <span className="text-orange-600 px-3">{el.name}</span>
                </div>
                <div>
                    <span className="text-sky-600">Прибыль</span>
                    <span className="text-orange-600 px-3">{el.profit}%</span>
                </div>
            </div>
        </div>
    ));
    const elementsWeight = topPredictions.topPredictionsWeight.map((el) => (
        <div key={el.profit} className=" border-b border-slate-300 py-2 mt-4">
            <div className="flex justify-between mt-3">
                <div>
                    <span className="text-sky-600">Кэф</span>
                    <span className="text-orange-600 px-3">{el.odd}</span>
                </div>
                <div>
                    <span className="text-sky-600">Ставка</span>
                    <span className="text-orange-600 px-3">{el.name}</span>
                </div>
                <div>
                    <span className="text-sky-600">Прибыль</span>
                    <span className="text-orange-600 px-3">{el.profit}%</span>
                </div>
            </div>
        </div>
    ));

    useEffect(() => {
        const getInfo = async () => {
            try {
                const [
                    matchesInfoNbbet,
                    matchesPredictionsNbbet1,
                    matchesPredictionsNbbet2,
                    matchesPredictionsNbbet3,
                    matchesPredictionsNbbet4,
                    historyOdds,
                    odds,
                    summary,
                ] = await Promise.all([
                    nbbetServices.getMatchInfo(),
                    nbbetServices.getMatchPredictions(1),
                    nbbetServices.getMatchPredictions(2),
                    nbbetServices.getMatchPredictions(3),
                    nbbetServices.getMatchPredictions(4),
                    nbbetServices.getHistoryOdds(),
                    getOdds(),
                    nbbetServices.getSummary(),
                ]);

                const matchesPredictionsNbbet = [
                    ...matchesPredictionsNbbet1.data.match.data["1"],
                    ...matchesPredictionsNbbet2.data.match.data["1"],
                    ...matchesPredictionsNbbet3.data.match.data["1"],
                    ...matchesPredictionsNbbet4.data.match.data["1"],
                ];

                setInfo(matchesInfoNbbet.data.match.data.match);
                setPredictions(matchesPredictionsNbbet);
                setOdds(odds.odds);
                setSummary(summary.data.match.data);
                setHistoryOdds(historyOdds.data.match.data);
                setTopPredictions(
                    filterPredictions(matchesPredictionsNbbet, odds.odds)
                );

                setIsLoading(true);
            } catch (error) {
                console.error(error);
                errorModal(error.message);
            }
        };

        getInfo();
    }, []);

    return (
        <div>
            <Header />
            <BackTop />
            {isLoading ? (
                <div className="container lg:px-52 mt-16">
                    <div className="flex justify-center mb-8 bg-neutral-50 p-3">
                        <h1 className="text-slate-700 font-mono text-xl text-center">
                            {info.tournament_name}
                        </h1>
                    </div>

                    <div className="flex justify-evenly item-center">
                        <div className="flex flex-col items-center w-5/12">
                            <img
                                className="w-6/12"
                                src={info[7][2]}
                                alt="логотип"
                            />
                            <span className="py-3 text-center font-mono text-clip text-lg font-medium text-teal-900">
                                {info[7][1]}
                            </span>
                        </div>
                        <div className="flex flex-col items-center w-5/12 ">
                            <img
                                className="w-6/12"
                                src={info[8][2]}
                                alt="логотип"
                            />
                            <span className="py-3 text-center font-mono text-lg font-medium text-teal-900">
                                {info[8][1]}
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-center mt-5">
                        <button
                            onClick={getPredict}
                            className="px-7 py-3 rounded-lg bg-teal-500 text-white"
                        >
                            Показать прогноз
                        </button>
                    </div>
                    <h2 className="text-lime-700 font-mono text-xl text-center mt-3">
                        Топ прогноз
                    </h2>
                    <div>
                        {elementsWeight.length > 0 ? (
                            elementsWeight
                        ) : (
                            <div className=" flex justify-center items-center">
                                <Empty
                                    description={
                                        <span className="font-mono text-lg font-medium text-gray-700">
                                            На данный момент нет топ прогнозов
                                        </span>
                                    }
                                ></Empty>
                            </div>
                        )}
                    </div>
                    <h2 className="text-lime-700 font-mono text-xl text-center mt-4">
                        Все прогнозы
                    </h2>
                    <div className="flex flex-col justify-center mt-2">
                        {elements}
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default Match;
