import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { BackTop, Modal, Segmented } from "antd";
import { Loading } from "../../components/Loading/Loading";
import { nbbetServices } from "../../services/nbbet";
import getOdds from "../../utils/getOdds";
import { calcPredictions } from "../../utils/calcPredictions";
import calcPredictionNew from "../../utils/calcPredictionNew";
import calcPredictionCollective from "../../utils/calcPredictionsCollective";
import filterPredictions from "../../utils/filterPredictions";
import { Empty } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import Facts from "../../components/facts/Facts";
import LastMatches from "../../components/lastMatches/LastMatches";

const errorModal = (message) => {
  Modal.error({
    title: message,
  });
};

const showInfo = (
  data,
  sample,
  dataNew,
  res2,
  firstTimePredict,
  seconsdTimePredict,
  matchPredict,
  matchPredictNotScore,
  firstTimePredictNotScore,
  seconsdTimePredictNotScore
) => {
  Modal.info({
    title: `Прогноз на матч: ${data.prediction}`,
    content: (
      <>
        {" "}
        {sample >= 80 ? (
          <>
            <div>
              <div>
                <h2 className="py-2 font-bold text-emerald-800 text-center">
                  Старый метод
                </h2>
                <div className="flex justify-between items-center">
                  <p className="font-sans text-xl text-red-800 font-medium text-center py-3">
                    {data.prediction}
                  </p>
                  <p className="font-sans text-sky-700 font-medium text-xl">
                    {data.odd}
                  </p>
                </div>
              </div>
              <div>
                <h2 className="py-2 font-bold text-emerald-800 text-center">
                  Коллективный интеллект
                </h2>
                <h3 className="py-2 font-bold text-2xl text-orange-600 text-center">
                  1 Тайм
                </h3>
                <div>
                  {firstTimePredict.length < 1 ? (
                    <p className="py-2 font-bold text-orange-600 text-center">
                      Мало данных
                    </p>
                  ) : (
                    firstTimePredict
                  )}
                </div>
                <h4 className="py-2 font-bold text-orange-600 text-center">
                  Доп.
                </h4>
                <div className="  border-2 border-solid border-lime-700 p-2 mt-2 rounded-xl">
                  {firstTimePredictNotScore}
                </div>
                <h3 className="py-2 font-bold text-2xl text-orange-600 text-center">
                  2 Тайм
                </h3>
                <div>
                  {seconsdTimePredict.length < 1 ? (
                    <p className="py-2 font-bold text-orange-600 text-center">
                      Мало данных
                    </p>
                  ) : (
                    seconsdTimePredict
                  )}
                </div>

                <h4 className="py-2 font-bold text-orange-600 text-center">
                  Доп.
                </h4>
                <div className="  border-2 border-solid border-lime-700 p-2 mt-2 rounded-xl">
                  {seconsdTimePredictNotScore}
                </div>

                <h3 className="py-2 font-bold text-2xl text-orange-600 text-center">
                  Матч
                </h3>
                <div>
                  {matchPredict.length < 1 ? (
                    <p className="py-2 font-bold text-orange-600 text-center">
                      Мало данных
                    </p>
                  ) : (
                    matchPredict
                  )}
                </div>

                <h4 className="py-2 font-bold text-orange-600 text-center">
                  Доп.
                </h4>
                <div className="  border-2 border-solid border-lime-700 p-2 mt-2 rounded-xl">
                  {matchPredictNotScore}
                </div>
              </div>
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
  const [lastMatches, setLastMatches] = useState({});
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [odds, setOdds] = useState({});
  const [summary, setSummary] = useState({});
  const [historyOdds, setHistoryOdds] = useState({});
  const [topPredictions, setTopPredictions] = useState({
    topPredictionsWeight: [
      {
        odd: 0,
        profit: 0,
        name: "",
      },
    ],
  });
  const [content, setContent] = useState("");

  const getPredict = () => {
    const preditionCopy = JSON.parse(JSON.stringify(predictions));
    const oddsCopy = JSON.parse(JSON.stringify(odds));
    const historyOddsCopy = JSON.parse(JSON.stringify(historyOdds));

    const res = calcPredictions(
      preditionCopy,
      oddsCopy,
      historyOddsCopy,
      summary
    );
    const resNew = calcPredictionNew(
      preditionCopy,
      oddsCopy,
      historyOddsCopy,
      summary
    );
    const res2 = calcPredictionCollective(
      preditionCopy,
      oddsCopy,
      historyOddsCopy,
      summary,
      lastMatches,
      info
    );

    console.log(res2);

    const firstTimePredictByScore =
      res2.uniquePredictionsFirstTimeByScoresSorted.map((el) => {
        return (
          <div className="flex justify-between items-center border-b-2 border-solid border-sky-700">
            <p className="font-sans text-xl text-red-800 font-medium text-center py-3">
              {el.name}
            </p>
            <p className="font-sans text-sky-700 font-medium text-xl">
              {el.odd}
            </p>
          </div>
        );
      });
    const seconsdTimePredictByScore =
      res2.uniquePredictionsSecondTimeByScoresSorted.map((el) => {
        return (
          <div className="flex justify-between items-center border-b-2 border-solid border-sky-700">
            <p className="font-sans text-xl text-red-800 font-medium text-center py-3">
              {el.name}
            </p>
            <p className="font-sans text-sky-700 font-medium text-xl">
              {el.odd}
            </p>
          </div>
        );
      });
    const matchPredictByScore = res2.uniquePredictionsMatchByScoresSorted.map(
      (el) => {
        return (
          <div className="flex justify-between items-center border-b-2 border-solid border-sky-700">
            <p className="font-sans text-xl text-red-800 font-medium text-center py-3">
              {el.name}
            </p>
            <p className="font-sans text-sky-700 font-medium text-xl">
              {el.odd}
            </p>
          </div>
        );
      }
    );
    const matchPredict = res2.uniqueItemsMatch.map((el) => {
      return (
        <div className="flex justify-between items-center">
          <p className="font-sans text-red-800 font-medium text-center py-2">
            {el.name}
          </p>
          <p className="font-sans text-sky-700 font-medium">{el.odd}</p>
        </div>
      );
    });
    const firstTimePredict = res2.uniqueItemsFirstTime.map((el) => {
      return (
        <div className="flex justify-between items-center">
          <p className="font-sans text-red-800 font-medium text-center py-2">
            {el.name}
          </p>
          <p className="font-sans text-sky-700 font-medium">{el.odd}</p>
        </div>
      );
    });

    const seconsdTimePredict = res2.uniqueItemsSecondTime.map((el) => {
      return (
        <div className="flex justify-between items-center">
          <p className="font-sans text-red-800 font-medium text-center py-2">
            {el.name}
          </p>
          <p className="font-sans text-sky-700 font-medium">{el.odd}</p>
        </div>
      );
    });

    showInfo(
      res,
      res.sample,
      resNew,
      res2,
      firstTimePredictByScore,
      seconsdTimePredictByScore,
      matchPredictByScore,
      matchPredict,
      firstTimePredict,
      seconsdTimePredict
    );
  };

  const elementsWeight = topPredictions.topPredictionsWeight.map((el, idx) => (
    <div
      key={idx}
      className="flex items-center w-full py-2 mt-4 bg-sky-400 bg-opacity-20 px-3 rounded-2xl"
    >
      <div className="flex justify-between h-full  w-full items-center">
        <div>
          <span className="text-white font-bold text-sm">Кэф</span>
          <span className="text-red-500 font-bold px-3 text-sm">{el.odd}</span>
        </div>
        <div>
          <span className="text-red-500 px-3 font-bold text-xs text-center">
            {el.name}
          </span>
        </div>
        <div>
          <span className="text-white font-bold text-sm">Прибыль</span>
          <span className="text-red-500 px-3 font-bold text-sm">
            {el.profit}%
          </span>
        </div>
      </div>
    </div>
  ));

  useEffect(() => {
    // Получаем данные для прогноза
    const getInfo = async () => {
      try {
        const [
          matchesInfoNbbet,
          matchesPredictionsNbbet1,
          matchesPredictionsNbbet2,
          matchesPredictionsNbbet3,
          matchesPredictionsNbbet4,
          historyOdds,
          lastMatches,
          odds,
          summary,
        ] = await Promise.all([
          nbbetServices.getMatchInfo(),
          nbbetServices.getMatchPredictions(1),
          nbbetServices.getMatchPredictions(2),
          nbbetServices.getMatchPredictions(3),
          nbbetServices.getMatchPredictions(4),
          nbbetServices.getHistoryOdds(),
          nbbetServices.getLastMatches(),
          getOdds(),
          nbbetServices.getSummary(),
        ]);
        console.log(lastMatches);

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
        setLastMatches(lastMatches.data.match.data);
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
    <div className=" bg-[url('https://sportishka.com/uploads/posts/2022-08/1660150573_1-sportishka-com-p-futbolnii-fon-dlya-prezentatsii-sport-kras-1.jpg')] bg-cover bg-fixed">
      <Header />
      <BackTop />
      {isLoading ? (
        <div className="container lg:px-52 mt-16">
          <div className="flex justify-center mb-8 bg-cyan-300 p-3 rounded-2xl bg-opacity-20">
            <h1 className="text-white font-mono text-xl text-center">
              {info[10][1]}
            </h1>
          </div>

          <div className="flex flex-col justify-center mb-8 ">
            <div className="text-white font-mono font-bold text-center">
              {info[18][2]}
            </div>
            <div className="flex justify-center mt-2">
              <span className="text-white font-mono px-4 text-lg  text-center">
                {info[18][3]}
              </span>
              <span className="text-white font-mono text-lg text-center">
                {info[18][4]}
              </span>
            </div>
          </div>

          <div className="flex justify-evenly item-center">
            <div className="flex flex-col items-center w-5/12">
              <img className="w-6/12" src={info[7][2]} alt="логотип" />
              <span className="py-3 text-center font-mono text-clip text-lg text-white text-bold">
                {info[7][1]}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <MoreOutlined
                style={{
                  fontSize: "46px",
                  color: "white",
                  marginBottom: "50px",
                }}
              />
            </div>
            <div className="flex flex-col items-center w-5/12 ">
              <img className="w-6/12" src={info[8][2]} alt="логотип" />
              <span className="py-3 text-center font-mono text-lg text-white text-bold">
                {info[8][1]}
              </span>
            </div>
          </div>

          <div className="flex justify-center my-5">
            <Segmented
              className="text-white font-bold bg-sky-400 bg-opacity-40"
              options={["Прогноз", "Факты", "Матчи"]}
              defaultValue="Прогноз"
              onChange={(value) => {
                if (value === "Прогноз") {
                  setContent(
                    <>
                      <div className="flex justify-center my-5">
                        <button
                          onClick={getPredict}
                          className="px-7 py-3 rounded-lg bg-orange-500 text-white font-mono font-bold"
                        >
                          Рассчитать прогноз
                        </button>
                      </div>
                      <h2 className="text-white font-bold font-mono text-xl text-center mt-3">
                        Топ прогнозы
                      </h2>
                      <div className="pb-10">
                        {elementsWeight.length > 0 ? (
                          elementsWeight
                        ) : (
                          <div className=" flex justify-center items-center">
                            <Empty
                              description={
                                <span className="font-mono text-lg font-medium text-white">
                                  На данный момент нет топ прогнозов
                                </span>
                              }
                            ></Empty>
                          </div>
                        )}
                      </div>
                    </>
                  );
                } else if (value === "Факты") {
                  setContent(<Facts info={info} />);
                } else if (value === "Матчи") {
                  setContent(<LastMatches matches={lastMatches} />);
                }
              }}
            />
          </div>
          {content ? (
            content
          ) : (
            <>
              <div className="flex justify-center my-5">
                <button
                  onClick={getPredict}
                  className="px-7 py-3 rounded-lg bg-orange-500 text-white font-mono font-bold"
                >
                  Рассчитать прогноз
                </button>
              </div>
              <h2 className="text-white font-bold font-mono text-xl text-center mt-3">
                Топ прогнозы
              </h2>
              <div className="pb-10">
                {elementsWeight.length > 0 ? (
                  elementsWeight
                ) : (
                  <div className=" flex justify-center items-center">
                    <Empty
                      description={
                        <span className="font-mono text-lg font-medium text-white">
                          На данный момент нет топ прогнозов
                        </span>
                      }
                    ></Empty>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Match;
