import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { BackTop, Modal, Segmented } from "antd";
import { Loading } from "../../components/Loading/Loading";
import { nbbetServices } from "../../services/nbbet";
import getOdds from "../../utils/getOdds";
import { calcPredictions } from "../../utils/calcPredictions";
import filterPredictions from "../../utils/filterPredictions";
import { Empty } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import Facts from "../../components/facts/Facts";
import LastMatches from "../../components/lastMatches/LastMatches";
import PercentPredict from "../../components/percentPredict/PercentPredict";
import { CookieSharp } from "@mui/icons-material";

const errorModal = (message) => {
  Modal.error({
    title: message,
  });
};

const showInfo = (
  data,
  sample,
  predictionsElements,
  facts,
  expenctedScores
) => {
  Modal.info({
    title: `Прогноз на матч: ${data.topredicionSorted[0].name}`,
    content: (
      <>
        {" "}
        {sample >= 30 ? (
          <>
            <div>
              <div>Кол-во прогнозистов {sample}</div>
              <div>{facts}</div>
              <div>
                <h2 className="text-center py-2 font-bold text-orange-900 text-xl">
                  Возможные счета
                </h2>
                <div className="flex justify-center">{expenctedScores}</div>
              </div>
              <h2 className="text-center py-2 font-bold text-orange-900 text-xl">
                Топ прогнозы
              </h2>
              <div>
                {predictionsElements ? (
                  predictionsElements
                ) : (
                  <h1 className="text-center py-2 font-bold text-orange-900 text-xl">
                    Нет прогнозов
                  </h1>
                )}
              </div>
              <h2 className="text-center py-2 font-bold text-orange-900 text-xl">
                Все прогнозы
              </h2>
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
  const [lastMatchesInfoHome, setLastMatchesInfoHome] = useState({});
  const [lastMatchesInfoAway, setLastMatchesInfoAway] = useState({});

  const getPredict = () => {
    const preditionCopy = JSON.parse(JSON.stringify(predictions));
    const oddsCopy = JSON.parse(JSON.stringify(odds));
    const historyOddsCopy = JSON.parse(JSON.stringify(historyOdds));

    const res = calcPredictions(
      preditionCopy,
      oddsCopy,
      historyOddsCopy,
      info,
      lastMatchesInfoHome,
      lastMatchesInfoAway
    );

    const expenctedScores = res.top3ScoresKeys.map((el) => {
      return (
        <div className="flex items-center bg-sky-400 bg-opacity-20 px-3 rounded-2xl">
          <span className="text-orange -600 font-bold text-lg px-3">{el}</span>
        </div>
      );
    });

    const predictionsElements = res.topredicionSorted.map((el, idx) => (
      <div
        key={idx}
        className={
          idx < 1
            ? "flex items-center w-full py-2 mt-4 bg-green-400 bg-opacity-20 px-3 rounded-2xl"
            : "flex items-center w-full py-2 mt-4 bg-sky-400 bg-opacity-20 px-3 rounded-2xl"
        }
      >
        <div className="flex justify-between h-full  w-full items-center">
          <div className="w-4/12">
            <span className="text-green-600 font-bold text-sm">Кэф</span>
            <span className="text-red-500 font-bold px-3 text-sm">
              {el.historyOdds[el.historyOdds.length - 1][1].toFixed(2)}
            </span>
          </div>
          <div className="w-4/12">
            <span className="text-orange-700 px-3 font-bold text-xs text-center">
              {el.probability.toFixed(0)}%
            </span>
          </div>
          <div className="w-4/12">
            <span className="text-yellow-700 px-3 font-bold text-xs text-center">
              {el.name}
            </span>
          </div>
        </div>
      </div>
    ));

    const removeStrongTags = (str) => {
      return str.replace(/<\/?strong>/g, "");
    };
    const cleanedData = res.info.map((item) => {
      return {
        ...item,
        1: removeStrongTags(item[1]),
      };
    });
    const facts = cleanedData.map((el, i) => {
      return (
        <div
          key={i}
          className="px-3 py-2 rounded-lg text-white font-mono mt-2 bg-cyan-700 rounded-2xl bg-opacity-80"
        >
          <span className="text-orange-300 font-bold px-2">{i}.</span>
          {el["1"]}
        </div>
      );
    });

    showInfo(res, res.sample, predictionsElements, facts, expenctedScores);
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

        const matchesPredictionsNbbet = [
          ...matchesPredictionsNbbet1.data.match.data["1"],
          ...matchesPredictionsNbbet2.data.match.data["1"],
          ...matchesPredictionsNbbet3.data.match.data["1"],
          ...matchesPredictionsNbbet4.data.match.data["1"],
        ];
        console.log(lastMatches.data.match.data);

        const LastMatchesInfoHome = lastMatches.data.match.data[0]
          .slice(0, 15)
          .map((el) => {
            return nbbetServices.getMatchInfo(el["3"]);
          });
        const LastMatchesInfoAway = lastMatches.data.match.data[1]
          .slice(0, 15)
          .map((el) => {
            return nbbetServices.getMatchInfo(el["3"]);
          });

        console.log(LastMatchesInfoAway);

        // Используем Promise.all для ожидания выполнения всех промисов
        Promise.all([
          Promise.all(LastMatchesInfoHome),
          Promise.all(LastMatchesInfoAway),
        ])
          .then(([homeResults, awayResults]) => {
            // homeResults и awayResults содержат массивы с результатами
            console.log("Home matches info:", homeResults);
            console.log("Away matches info:", awayResults);
            setLastMatchesInfoHome(homeResults);
            setLastMatchesInfoAway(awayResults);
          })
          .catch((error) => {
            console.error("Ошибка получения данных матчей:", error);
          });

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
    <div className=" bg-[url('https://sportishka.com/uploads/posts/2022-08/1660150573_1-sportishka-com-p-futbolnii-fon-dlya-prezentatsii-sport-kras-1.jpg')] h-screen overflow-scroll bg-cover bg-fixed">
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
                      <h2 className="text-white font-bold font-mono text-xl text-center my-3">
                        Прогнозы пользователей
                      </h2>
                      <div>
                        <PercentPredict predictions={predictions} odds={odds} />
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
                      <div className="flex justify-center my-3">
                        <button
                          onClick={getPredict}
                          className="px-7 py-3 rounded-lg bg-orange-500 text-white font-mono font-bold"
                        >
                          Рассчитать прогноз
                        </button>
                      </div>
                      <div className="mt-5">.</div>
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
              <h2 className="text-white font-bold font-mono text-xl text-center my-3">
                Прогнозы пользователей
              </h2>
              <div>
                <PercentPredict predictions={predictions} odds={odds} />
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
              <div className="flex justify-center my-3 mb-5">
                <button
                  onClick={getPredict}
                  className="px-7 py-3 rounded-lg bg-orange-500 text-white font-mono font-bold"
                >
                  Рассчитать прогноз
                </button>
              </div>
              <div className="mt-5">.</div>
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
