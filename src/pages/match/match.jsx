import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { BackTop, Modal } from "antd";
import { Loading } from "../../components/Loading/Loading";
import { nbbetServices } from "../../services/nbbet";
import getOdds from "../../utils/getOdds";
import { MoreOutlined } from "@ant-design/icons";

const errorModal = (message) => {
  Modal.error({
    title: message,
  });
};

const removeStrongTags = (str) => {
  return str.replace(/<\/?strong>/g, "");
};

const Match = () => {
  const [info, setInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [odds, setOdds] = useState({});
  const [summary, setSummary] = useState({});
  const [historyOdds, setHistoryOdds] = useState([]);
  const [lastMatches, setLastMatches] = useState([]);
  const [strengthsHome, setStrengthsHome] = useState("");
  const [strengthsAway, setStrengthsAway] = useState("");
  const [weaknessesHome, setWeaknessesHome] = useState("");
  const [weaknessesAway, setWeaknessesAway] = useState("");
  const [playStyleHome, setPlayStyleHome] = useState("");
  const [playStyleAway, setPlayStyleAway] = useState("");
  const [description, setDescription] = useState("");
  const [xgHome, setXgHome] = useState("");
  const [xgAway, setXgAway] = useState("");
  const [rateHome, setRateHome] = useState("");
  const [rateAway, setRateAway] = useState("");
  const [momentPredict, setMomentPredict] = useState("");
  const [result, setResult] = useState("");

  // Обработчики изменений для input
  const handleStrengthsHomeChange = (e) => {
    setStrengthsHome(e.target.value);
  };

  const handleStrengthsAwayChange = (e) => {
    setStrengthsAway(e.target.value);
  };

  const handleWeaknessesHomeChange = (e) => {
    setWeaknessesHome(e.target.value);
  };

  const handleWeaknessesAwayChange = (e) => {
    setWeaknessesAway(e.target.value);
  };

  const handlePlayStyleHomeChange = (e) => {
    setPlayStyleHome(e.target.value);
  };

  const handlePlayStyleAwayChange = (e) => {
    setPlayStyleAway(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleXgHomeChange = (e) => {
    setXgHome(e.target.value);
  };

  const handleXgAwayChange = (e) => {
    setXgAway(e.target.value);
  };

  const handleRateHomeChange = (e) => {
    setRateHome(e.target.value);
  };

  const handleRateAwayChange = (e) => {
    setRateAway(e.target.value);
  };
  const handlePredictMomentChange = (e) => {
    setMomentPredict(e.target.value);
  };

  const getPredict = () => {
    const preview = removeStrongTags(info["27"]['1'])

    const facts = info["27"]["3"].map(el => {
      return removeStrongTags(el['1'])
    })

    const motivationHome = {
      currentMatch: removeStrongTags(info["27"]["4"][0].current_match_text),
      lastMatch: {
        team1_name: info["27"]["4"][0].last_match.team1_name,
        team2_name: info["27"]["4"][0].last_match.team2_name,
        text: removeStrongTags(info["27"]["4"][0].last_match.text)
      },
      nextMatch: {
        team1_name: info["27"]["4"][0].next_match.team1_name,
        team2_name: info["27"]["4"][0].next_match.team2_name,
        text: removeStrongTags(info["27"]["4"][0].next_match.text)
      },
    }

    const motivationAway = {
      currentMatch: removeStrongTags(info["27"]["4"][1].current_match_text),
      lastMatch: {
        team1_name: info["27"]["4"][1].last_match.team1_name,
        team2_name: info["27"]["4"][1].last_match.team2_name,
        text: removeStrongTags(info["27"]["4"][1].last_match.text)
      },
      nextMatch: {
        team1_name: info["27"]["4"][1].next_match.team1_name,
        team2_name: info["27"]["4"][1].next_match.team2_name,
        text: removeStrongTags(info["27"]["4"][1].next_match.text)
      },
    }

    const injuries = info["27"]["5"]

    const lastMatchesH2h = info["27"]["7"].map(el => {

      return `${new Date(el["4"]).toDateString()} ${el["7"]} ${el["10"]} - ${el["18"]} ${el["15"]}`
    })

    const stats = {
      avgGoalsForHome: summary[0][0]["8"],
      avgGoalsForAway: summary[0][1]["8"],
      avgGoalsAgHome: summary[0][0]["9"],
      avgGoalsAgAway: summary[0][1]["9"],
      gamesHome: summary[0][0]["1"],
      gamesAway: summary[0][1]["1"],
      winsHome: summary[0][0]["2"],
      winsAway: summary[0][1]["2"],
      drawsHome: summary[0][0]["3"],
      drawsAway: summary[0][1]["3"],
      losesHome: summary[0][0]["4"],
      losesAway: summary[0][1]["4"],
      awgTotalHome: summary[0][0]["7"],
      awgTotalAway: summary[0][1]["7"],
      shotsOnTargetHome: summary[0][0]["20"],
      shotsOnTargetAway: summary[0][1]["20"],
      shotsOnTargetOppHome: summary[0][0]["21"],
      shotsOnTargetOppAway: summary[0][1]["21"],
      shotsHome: summary[0][0]["32"],
      shotsAway: summary[0][1]["32"],
      shotsOppHome: summary[0][0]["33"],
      shotsOppAway: summary[0][1]["33"],
      attaksHome: summary[0][0]["36"],
      attaksAway: summary[0][1]["36"],
      attaksOppHome: summary[0][0]["37"],
      attaksOppAway: summary[0][1]["37"],
      possHome: summary[0][0]["71"],
      possAway: summary[0][1]["71"],
      possOppHome: summary[0][0]["72"],
      possOppAway: summary[0][1]["72"],
    }

    const oddsAll = Object.entries(historyOdds).map(([key, value]) => {
      return {
        key: key,
        odd: value[0][1]
      }
    })
      .filter(el => el.odd > 1.6 && el.odd < 5)
      .map(el => {
        const filteredOdds = odds.filter(item => item.period === 3)
        const matchedItem = filteredOdds.find(item => el.key === item.odd);
        return matchedItem ? { name: matchedItem.name, odd: el.odd } : undefined;
      })
      .filter(el => el !== undefined)
      .map(el => {
        return `${el.name} - ${el.odd}`
      })

    const lastMatchesHome = lastMatches[0].splice(0, 5).map(el => {
      return ` ${new Date(el["4"]).toDateString()} ${el["7"]} ${el["10"]} - ${el["18"]} ${el["15"]} `
    })

    const lastMatchesAway = lastMatches[1].splice(0, 5).map(el => {
      return ` ${new Date(el["4"]).toDateString()} ${el["7"]} ${el["10"]} - ${el["18"]} ${el["15"]} `
    })

    const generateAiPrompt = (info, preview, facts, motivationHome, motivationAway, injuries, lastMatchesH2h, lastMatchesHome, lastMatchesAway, stats, oddsAll, strengthsHome, strengthsAway, weaknessesHome, weaknessesAway, playStyleHome, playStyleAway, description, xgHome, xgAway, rateHome, rateAway, momentPredict) => {
      const teamHome = info[7][1];
      const teamAway = info[8][1];
      const stadium = info[18][2];
      const temperature = info[18][3];
      const weather = info[18][4];
    
      const prompt = `
    Проанализируй все предоставленые мной данные и сформируй прогноз на матч между командами ${teamHome} и ${teamAway}. Учти следующие данные так же проведи все возможные рассчеты для более точного прогнозирования:
    
    **1. Общая информация о матче:**
    - Превью: ${preview}
    - Стадион: ${stadium}
    - Температура воздуха: ${temperature}
    - Погода: ${weather}
    - Факты о матче: ${facts}
    
    **2. Анализ формы команд:**
    - **Для команды${teamHome} --->:**
      - Последние 5 матчей: ${lastMatchesHome}
      - Среднее количество забитых голов в турнире: ${stats.avgGoalsForHome}
      - Среднее количество пропущенных голов в турнире: ${stats.avgGoalsAgHome}
      - Средний тотал голов в турнире: ${stats.awgTotalHome}
      - Удары в створ за матч в турнире: ${stats.shotsOnTargetHome}
      - Удары в створ у противников за матч в турнире: ${stats.shotsOnTargetOppHome}
      - Xg/удар (если есть): ${xgHome}
      - Рейтинг (если есть): ${rateHome}
      - Сильные стороны (если есть): ${strengthsHome}
      - Слабые стороны (если есть): ${weaknessesHome}
      - Стиль игры (если есть): ${playStyleHome}
    - **${teamAway}:**
      - Последние 5 матчей: ${lastMatchesAway}
      - Среднее количество забитых голов в турнире: ${stats.avgGoalsForAway}
      - Среднее количество пропущенных голов в турнире: ${stats.avgGoalsAgAway}
      - Средний тотал голов в турнире: ${stats.awgTotalAway}
      - Удары в створ за матч в турнире: ${stats.shotsOnTargetAway}
      - Удары в створ у противников за матч в турнире: ${stats.shotsOnTargetOppAway}
      - Xg/удар (если есть): ${xgAway}
      - Рейтинг (если есть): ${rateAway}
      - Сильные стороны (если есть): ${strengthsAway}
      - Слабые стороны (если есть): ${weaknessesAway}
      - Стиль игры (если есть): ${playStyleAway}
    
    **3. Мотивация команд:**
    - **${teamHome}:**
      - Текущий матч: ${motivationHome.currentMatch}
      - Прошедший матч: ${motivationHome.lastMatch.team1_name} - ${motivationHome.lastMatch.team2_name}: ${motivationHome.lastMatch.text}
      - Следующий матч: ${motivationHome.nextMatch.team1_name} - ${motivationHome.nextMatch.team2_name}: ${motivationHome.nextMatch.text}
    - **${teamAway}:**
      - Текущий матч: ${motivationAway.currentMatch}
      - Прошедший матч: ${motivationAway.lastMatch.team1_name} - ${motivationAway.lastMatch.team2_name}: ${motivationAway.lastMatch.text}
      - Следующий матч: ${motivationAway.nextMatch.team1_name} - ${motivationAway.nextMatch.team2_name}: ${motivationAway.nextMatch.text}
    
    **4. Травмы:** ${injuries}
    
    **5. История личных встреч:** ${lastMatchesH2h}
    
    **6. Статистика команд (общая):**
    - Сыграно матчей в турнире ${teamHome}: ${stats.gamesHome}; Победы в турнире ${teamHome}: ${stats.winsHome}; Ничьи в турнире ${teamHome}: ${stats.drawsHome}; Поражения в турнире ${teamHome}: ${stats.losesHome};
    - Сыграно матчей в турнире ${teamAway}: ${stats.gamesAway}; Победы в турнире ${teamAway}: ${stats.winsAway}; Ничьи в турнире ${teamAway}: ${stats.drawsAway}; Поражения в турнире ${teamAway}: ${stats.losesAway};
    - Удары за матч в турнире ${teamHome}: ${stats.shotsHome}; Удары за матч у противников в турнире ${teamHome}: ${stats.shotsOppHome}; Атаки за матч в турнире  ${teamHome}: ${stats.attaksHome}; Атаки за матч у противников в турнире ${teamHome}: ${stats.attaksOppHome}; Владение за матч в турнире ${teamHome}: ${stats.possHome}; Владение за матч у противников в турнире ${teamHome}: ${stats.possOppHome};
    - Удары за матч в турнире ${teamAway}: ${stats.shotsAway}; Удары за матч у противников в турнире ${teamAway}: ${stats.shotsOppAway}; Атаки за матч в турнире ${teamAway}: ${stats.attaksAway}; Атаки за матч у противников в турнире ${teamAway}: ${stats.attaksOppAway}; Владение за матч в турнире ${teamAway}: ${stats.possAway}; Владение за матч у противников в турнире ${teamAway}: ${stats.possOppAway};
    
    **7. Мнения экспертов:** ${description}

    **8. Предположительные моменты:** ${momentPredict}
    
    **9. Коэффициенты букмекеров:** ${oddsAll}
    
    
    **На основе этих данных предложи мне Рекомендацию по наиболее вероятной и обоснованной ставке на этот матч. Предложи несколько вариантов ставок с объяснением (например, исход матча, тотал голов, фора, комбинированные ставки и т.д.).**
    `;
      return prompt;
    };
    
    // Пример использования (предполагается, что все переменные info, preview и т.д. уже определены):
    const aiPrompt = generateAiPrompt(
      info,
      preview,
      facts,
      motivationHome,
      motivationAway,
      injuries,
      lastMatchesH2h,
      lastMatchesHome,
      lastMatchesAway,
      stats,
      oddsAll,
      strengthsHome,
      strengthsAway,
      weaknessesHome,
      weaknessesAway,
      playStyleHome,
      playStyleAway,
      description,
      xgHome,
      xgAway,
      rateHome,
      rateAway,
      momentPredict
    );
    
    console.log(aiPrompt);
    
    setResult(aiPrompt)
  }

  useEffect(() => {
    // Получаем данные для прогноза
    const getInfo = async () => {
      try {
        const [
          matchesInfoNbbet,
          odds,
          summary,
          historyOdds,
          lastMatches
        ] = await Promise.all([
          nbbetServices.getMatchInfo(),
          getOdds(),
          nbbetServices.getSummary(),
          nbbetServices.getHistoryOdds(),
          nbbetServices.getLastMatches()
        ]);

        console.log(matchesInfoNbbet)
        console.log(odds)
        console.log(summary)
        console.log(historyOdds)
        console.log(lastMatches)

        setInfo(matchesInfoNbbet.data.match.data.match);
        setOdds(odds.odds);
        setSummary(summary.data.match.data);
        setHistoryOdds(historyOdds.data.match.data)
        setLastMatches(lastMatches.data.match.data)

        console.log(summary.data.match.data)

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
          <div>
          <div>
              <h2 className="text-center font-bold text-slate-200">Рейтинг домашней команды</h2>
              <div className="flex justify-evenly my-3">
                <input
                  type="text"
                  value={rateHome}
                  className="px-2 py-2 rounded-lg w-[200px]"
                  onChange={handleRateHomeChange}
                />
              </div>
            </div>
            <div>
              <h2 className="text-center font-bold text-slate-200">Рейтинг гостевой команды</h2>
              <div className="flex justify-evenly my-3">
                <input
                  type="text"
                  value={rateAway}
                  className="px-2 py-2 rounded-lg w-[200px]"
                  onChange={handleRateAwayChange}
                />
              </div>
            </div>
            
            <div>
              <h2 className="text-center font-bold text-slate-200">Сильные стороны Домашней команды</h2>
              <div className="flex justify-evenly my-3">
                <input
                  type="text"
                  value={strengthsHome}
                  className="px-2 py-2 rounded-lg w-[200px]"
                  onChange={handleStrengthsHomeChange}
                />
              </div>
            </div>
            <div>
              <h2 className="text-center font-bold text-slate-200">Слабые стороны Домашней команды</h2>
              <div className="flex justify-evenly my-3">
                <input
                  type="text"
                  value={weaknessesHome}
                  className="px-2 py-2 rounded-lg w-[200px]"
                  onChange={handleWeaknessesHomeChange}
                />
              </div>
            </div>
            <div>
              <h2 className="text-center font-bold text-slate-200">Стиль игры Домашней команды</h2>
              <div className="flex justify-evenly my-3">
                <input
                  type="text"
                  value={playStyleHome}
                  className="px-2 py-2 rounded-lg w-[200px]"
                  onChange={handlePlayStyleHomeChange}
                />
              </div>
            </div>
            <div>
              <h2 className="text-center font-bold text-slate-200">Сильные стороны Гостевой команды</h2>
              <div className="flex justify-evenly my-3">
                <input
                  type="text"
                  value={strengthsAway}
                  className="px-2 py-2 rounded-lg w-[200px]"
                  onChange={handleStrengthsAwayChange}
                />
              </div>
            </div>
            <div>
              <h2 className="text-center font-bold text-slate-200">Слабые стороны Гостевой команды</h2>
              <div className="flex justify-evenly my-3">
                <input
                  type="text"
                  value={weaknessesAway}
                  className="px-2 py-2 rounded-lg w-[200px]"
                  onChange={handleWeaknessesAwayChange}
                />
              </div>
            </div>
            <div>
              <h2 className="text-center font-bold text-slate-200">Стиль игры Гостевой команды</h2>
              <div className="flex justify-evenly my-3">
                <input
                  type="text"
                  value={playStyleAway}
                  className="px-2 py-2 rounded-lg w-[200px]"
                  onChange={handlePlayStyleAwayChange}
                />
              </div>
            </div>
            <div>
              <h2 className="text-center font-bold text-slate-200">Прогноз моментов</h2>
              <div className="flex justify-evenly my-3">
                <input
                  type="text"
                  value={momentPredict}
                  className="px-2 py-2 rounded-lg w-[200px]"
                  onChange={handlePredictMomentChange}
                />
              </div>
            </div>
            <div>
              <h2 className="text-center font-bold text-slate-200">Описание матча</h2>
              <div className="flex justify-evenly my-3">
                <input
                  type="text"
                  value={description}
                  className="px-2 py-2 rounded-lg w-[200px]"
                  onChange={handleDescriptionChange}
                />
              </div>
            </div>
            <div>
              <h2 className="text-center font-bold text-slate-200">Xg/Удар Домашней команды</h2>
              <div className="flex justify-evenly my-3">
                <input
                  type="text"
                  value={xgHome}
                  className="px-2 py-2 rounded-lg w-[200px]"
                  onChange={handleXgHomeChange}
                />
              </div>
            </div>
            <div>
              <h2 className="text-center font-bold text-slate-200">Xg/Удар Гостевой команды</h2>
              <div className="flex justify-evenly my-3">
                <input
                  type="text"
                  value={xgAway}
                  className="px-2 py-2 rounded-lg w-[200px]"
                  onChange={handleXgAwayChange}
                />
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <button
                className="px-5 py-2 bg-green-500 text-slate-100 font-bold rounded-xl"
                onClick={getPredict}
              >
                Составить промт
              </button>
            </div>
            <div className="mt-4 bg-slate-700 text-white px-3 py-3">
              {result}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Match;