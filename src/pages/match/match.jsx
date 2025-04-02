import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { BackTop, Modal } from "antd";
import { Loading } from "../../components/Loading/Loading";
import { nbbetServices } from "../../services/nbbet";
import getOdds from "../../utils/getOdds";
import { MoreOutlined } from "@ant-design/icons";
import { current } from "@reduxjs/toolkit";
import { div } from "@tensorflow/tfjs";

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
     return `${new Date(el["4"]).toDateString()} ${el["7"]} ${el["10"]} - ${el["18"]} ${el["15"]}`
   })

   const lastMatchesAway = lastMatches[1].splice(0, 5).map(el => {
    return `${new Date(el["4"]).toDateString()} ${el["7"]} ${el["10"]} - ${el["18"]} ${el["15"]}`
  })

    const result = `
    Составь прогноз на матч, проанализируй все, проведи все возможные рассчеты, и выбери саму лучшую ставку. Матч ${info[7][1]}-${info[8][1]}
    Превью: ${preview};
    Стадион: ${info[18][2]};
    Температура воздуха: ${info[18][3]};
    Погода: ${info[18][4]};
    Факты: ${facts};
    Мотивация ${info[7][1]}: 
    Текущий матч: ${motivationHome.currentMatch};
    Прошедший матч: ${motivationHome.lastMatch.team1_name} - ${motivationHome.lastMatch.team2_name}: ${motivationHome.lastMatch.text};
    Следующий матч: ${motivationHome.nextMatch.team1_name} - ${motivationHome.nextMatch.team2_name}: ${motivationHome.nextMatch.text};
    Мотивация ${info[8][1]}: 
    Текущий матч: ${motivationAway.currentMatch};
    Прошедший матч: ${motivationAway.lastMatch.team1_name} - ${motivationAway.lastMatch.team2_name}: ${motivationAway.lastMatch.text};
    Следующий матч: ${motivationAway.nextMatch.team1_name} - ${motivationAway.nextMatch.team2_name}: ${motivationAway.nextMatch.text};
    Травмы: ${injuries};
    Матчи между собой: ${lastMatchesH2h};
    Последние 5 матчей ${info[7][1]}: ${lastMatchesHome};
    Последние 5 матчей ${info[8][1]}: ${lastMatchesAway};
    Статистика: Ср. забитые голы ${info[7][1]}: ${stats.avgGoalsForHome} ; Ср. пропущенные голы ${info[7][1]}: ${stats.avgGoalsAgHome}; Ср. забитые голы ${info[8][1]}: ${stats.avgGoalsForHome}; Ср. пропущенные голы ${info[8][1]}: ${stats.avgGoalsAgAway};
    Ставки и коэффициенты: ${oddsAll}
    ${strengthsHome ? `Сильные стороны ${info[7][1]}: ${strengthsHome}` : ""} 
    ${strengthsAway ? `Сильные стороны ${info[8][1]}: ${strengthsAway}`: ""}
    ${weaknessesHome ? `Слабые стороны ${info[7][1]}: ${weaknessesHome};` : ""}
    ${weaknessesAway ? `Слабые стороны ${info[8][1]}: ${weaknessesAway};` : ""}
    ${playStyleHome ? `Стиль игры ${info[7][1]}: ${playStyleHome};` : ""}
    ${playStyleAway ? `Стиль игры ${info[8][1]}: ${playStyleAway};` : ""}
    ${description ? `Описание матча: ${description}.` : ""}
    `

    setResult(result)
  };

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