import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { BackTop, Modal } from "antd";
import { Loading } from "../../components/Loading/Loading";
import { nbbetServices } from "../../services/nbbet";
import getOdds from "../../utils/getOdds";
import { calcPredictions } from "../../utils/calcPredictions";

const errorModal = (message) => {
    Modal.error({
        title: message,
    });
};

const showInfo = (data, text) => {
    Modal.info({
        title: `Прогноз на матч: ${data.name}`,
        content: (
            <div>
                <p className="font-sans text-orange-800 font-medium">{text}</p>
            </div>
        ),
        onOk() {},
    });
};

const Match = () => {
    const [info, setInfo] = useState({});
    const [predictions, setPredictions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [odds, setOdds] = useState({});
    // const [summary, setSummary] = useState({});

    const getPredict = () => {
        const res = calcPredictions(predictions, odds);
        const text = `Наиболее близкий исход: ${res.name} с коэффициентом ${res.odd}`;
        showInfo(res, text);
    };

    useEffect(() => {
        const getInfo = async () => {
            try {
                const [
                    matchesInfoNbbet,
                    matchesPredictionsNbbet,
                    odds,
                    // summary,
                ] = await Promise.all([
                    nbbetServices.getMatchInfo(),
                    nbbetServices.getMatchPredictions(),
                    getOdds(),
                    // nbbetServices.getSummary(),
                ]);

                // console.log(matchesInfoNbbet);
                // console.log(matchesPredictionsNbbet);
                // console.log(odds);
                // console.log(summary);

                setInfo(matchesInfoNbbet.data.match.data.match);
                setPredictions(matchesPredictionsNbbet.data.match.data["1"]);
                setOdds(odds.odds);
                // setSummary(summary);

                // setOddsHistory(historyOddsNbbet.data.match.data);

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
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default Match;
