import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { BackTop, Modal, Card, Collapse, Input, Button } from "antd";
import { Loading } from "../../components/Loading/Loading";
import { nbbetServices } from "../../services/nbbet";
import getOdds from "../../utils/getOdds";
import { 
  MoreOutlined, 
  TeamOutlined, 
  BarChartOutlined,
  TrophyOutlined,
  EditOutlined,
  CopyOutlined
} from "@ant-design/icons";

const { Panel } = Collapse;
const { TextArea } = Input;

const errorModal = (message) => {
  Modal.error({ title: message });
};

const removeStrongTags = (str) => {
  if (!str) return "";
  return str.replace(/<\/?strong>/g, "");
};

const TeamCard = ({ team, logo, name, onInputChange, values }) => (
  <Card 
    className="bg-opacity-50 bg-slate-800 backdrop-blur-sm border-cyan-400"
    title={<span className="text-cyan-300 font-semibold">{name}</span>}
    headStyle={{ borderColor: '#0891b2' }}
  >
    <div className="flex flex-col items-center">
      <img 
        className="w-20 h-20 object-contain mb-3 bg-white p-1 rounded-full" 
        src={logo} 
        alt={name} 
      />
      
      <div className="w-full space-y-3">
        <Input
          prefix={<TrophyOutlined className="text-cyan-300" />}
          placeholder="Рейтинг команды"
          value={values[`rate${team}`]}
          onChange={(e) => onInputChange(`rate${team}`, e.target.value)}
        />
        <TextArea
          rows={2}
          placeholder="Сильные стороны"
          value={values[`strengths${team}`]}
          onChange={(e) => onInputChange(`strengths${team}`, e.target.value)}
        />
        <TextArea
          rows={2}
          placeholder="Слабые стороны"
          value={values[`weaknesses${team}`]}
          onChange={(e) => onInputChange(`weaknesses${team}`, e.target.value)}
        />
        <TextArea
          rows={2}
          placeholder="Стиль игры"
          value={values[`playStyle${team}`]}
          onChange={(e) => onInputChange(`playStyle${team}`, e.target.value)}
        />
        <Input
          prefix={<BarChartOutlined className="text-cyan-300" />}
          placeholder="xG/удар"
          value={values[`xg${team}`]}
          onChange={(e) => onInputChange(`xg${team}`, e.target.value)}
        />
      </div>
    </div>
  </Card>
);

const Match = () => {
  const [state, setState] = useState({
    info: {},
    isLoading: false,
    odds: {},
    summary: {},
    historyOdds: [],
    lastMatches: [],
    strengthsHome: "",
    strengthsAway: "",
    weaknessesHome: "",
    weaknessesAway: "",
    playStyleHome: "",
    playStyleAway: "",
    description: "",
    xgHome: "",
    xgAway: "",
    rateHome: "",
    rateAway: "",
    momentPredict: "",
    result: ""
  });

  const handleInputChange = (field, value) => {
    setState(prev => ({ ...prev, [field]: value }));
  };

  const getPredict = () => {
    if (!state.info["27"]) {
      errorModal("Данные о матче не загружены");
      return;
    }

    const preview = removeStrongTags(state.info["27"]['1']);
    const facts = state.info["27"]["3"].map(el => {
      return removeStrongTags(el['1']);
    });

    const motivationHome = {
      currentMatch: removeStrongTags(state.info["27"]["4"][0].current_match_text),
      lastMatch: {
        team1_name: state.info["27"]["4"][0].last_match.team1_name,
        team2_name: state.info["27"]["4"][0].last_match.team2_name,
        text: removeStrongTags(state.info["27"]["4"][0].last_match.text)
      },
      nextMatch: {
        team1_name: state.info["27"]["4"][0].next_match.team1_name,
        team2_name: state.info["27"]["4"][0].next_match.team2_name,
        text: removeStrongTags(state.info["27"]["4"][0].next_match.text)
      },
    };

    const motivationAway = {
      currentMatch: removeStrongTags(state.info["27"]["4"][1].current_match_text),
      lastMatch: {
        team1_name: state.info["27"]["4"][1].last_match.team1_name,
        team2_name: state.info["27"]["4"][1].last_match.team2_name,
        text: removeStrongTags(state.info["27"]["4"][1].last_match.text)
      },
      nextMatch: {
        team1_name: state.info["27"]["4"][1].next_match.team1_name,
        team2_name: state.info["27"]["4"][1].next_match.team2_name,
        text: removeStrongTags(state.info["27"]["4"][1].next_match.text)
      },
    };

    const injuries = state.info["27"]["5"];

    // Используем slice вместо splice чтобы не мутировать состояние
    const lastMatchesH2h = state.info["27"]["7"].slice(0, 5).map(el => {
      return `${new Date(el["4"]).toDateString()} ${el["7"]} ${el["10"]} - ${el["18"]} ${el["15"]}`;
    });

    const stats = {
      avgGoalsForHome: state.summary[0][0]["8"],
      avgGoalsForAway: state.summary[0][1]["8"],
      avgGoalsAgHome: state.summary[0][0]["9"],
      avgGoalsAgAway: state.summary[0][1]["9"],
      gamesHome: state.summary[0][0]["1"],
      gamesAway: state.summary[0][1]["1"],
      winsHome: state.summary[0][0]["2"],
      winsAway: state.summary[0][1]["2"],
      drawsHome: state.summary[0][0]["3"],
      drawsAway: state.summary[0][1]["3"],
      losesHome: state.summary[0][0]["4"],
      losesAway: state.summary[0][1]["4"],
      awgTotalHome: state.summary[0][0]["7"],
      awgTotalAway: state.summary[0][1]["7"],
      shotsOnTargetHome: state.summary[0][0]["20"],
      shotsOnTargetAway: state.summary[0][1]["20"],
      shotsOnTargetOppHome: state.summary[0][0]["21"],
      shotsOnTargetOppAway: state.summary[0][1]["21"],
      shotsHome: state.summary[0][0]["32"],
      shotsAway: state.summary[0][1]["32"],
      shotsOppHome: state.summary[0][0]["33"],
      shotsOppAway: state.summary[0][1]["33"],
      attaksHome: state.summary[0][0]["36"],
      attaksAway: state.summary[0][1]["36"],
      attaksOppHome: state.summary[0][0]["37"],
      attaksOppAway: state.summary[0][1]["37"],
      possHome: state.summary[0][0]["71"],
      possAway: state.summary[0][1]["71"],
      possOppHome: state.summary[0][0]["72"],
      possOppAway: state.summary[0][1]["72"],
    };

    const oddsAll = Object.entries(state.historyOdds)
      .map(([key, value]) => ({
        key: key,
        odd: value[0][1]
      }))
      .filter(el => el.odd > 1.6 && el.odd < 5)
      .map(el => {
        const filteredOdds = state.odds.filter(item => item.period === 3);
        const matchedItem = filteredOdds.find(item => el.key === item.odd);
        return matchedItem ? { name: matchedItem.name, odd: el.odd } : undefined;
      })
      .filter(el => el !== undefined)
      .map(el => `${el.name} - ${el.odd}`);

    // Используем slice вместо splice
    const lastMatchesHome = state.lastMatches[0]?.slice(0, 5).map(el => {
      return ` ${new Date(el["4"]).toDateString()} ${el["7"]} ${el["10"]} - ${el["18"]} ${el["15"]} `;
    }) || [];

    const lastMatchesAway = state.lastMatches[1]?.slice(0, 5).map(el => {
      return ` ${new Date(el["4"]).toDateString()} ${el["7"]} ${el["10"]} - ${el["18"]} ${el["15"]} `;
    }) || [];

    const generateAiPrompt = () => {
      const teamHome = state.info[7][1];
      const teamAway = state.info[8][1];
      const stadium = state.info[18][2];
      const temperature = state.info[18][3];
      const weather = state.info[18][4];
    
      return `
Проанализируй все предоставленые данные и сформируй прогноз на матч между командами ${teamHome} и ${teamAway}. Учти следующие данные так же проведи все возможные рассчеты для более точного прогнозирования:

**1. Общая информация о матче:**
- Превью: ${preview}
- Стадион: ${stadium}
- Температура воздуха: ${temperature}
- Погода: ${weather}
- Факты о матче: ${facts.join(", ")}

**2. Анализ формы команд:**
- **Для команды ${teamHome}:**
  - Последние 5 матчей: ${lastMatchesHome.join(", ")}
  - Среднее количество забитых голов: ${stats.avgGoalsForHome}
  - Среднее количество пропущенных голов: ${stats.avgGoalsAgHome}
  - Средний тотал голов: ${stats.awgTotalHome}
  - Удары в створ за матч: ${stats.shotsOnTargetHome}
  - Удары в створ у противников: ${stats.shotsOnTargetOppHome}
  - Xg/удар: ${state.xgHome}
  - Рейтинг: ${state.rateHome}
  - Сильные стороны: ${state.strengthsHome}
  - Слабые стороны: ${state.weaknessesHome}
  - Стиль игры: ${state.playStyleHome}
- **${teamAway}:**
  - Последние 5 матчей: ${lastMatchesAway.join(", ")}
  - Среднее количество забитых голов: ${stats.avgGoalsForAway}
  - Среднее количество пропущенных голов: ${stats.avgGoalsAgAway}
  - Средний тотал голов: ${stats.awgTotalAway}
  - Удары в створ за матч: ${stats.shotsOnTargetAway}
  - Удары в створ у противников: ${stats.shotsOnTargetOppAway}
  - Xg/удар: ${state.xgAway}
  - Рейтинг: ${state.rateAway}
  - Сильные стороны: ${state.strengthsAway}
  - Слабые стороны: ${state.weaknessesAway}
  - Стиль игры: ${state.playStyleAway}

**3. Мотивация команд:**
- **${teamHome}:**
  - Текущий матч: ${motivationHome.currentMatch}
  - Прошедший матч: ${motivationHome.lastMatch.team1_name} - ${motivationHome.lastMatch.team2_name}: ${motivationHome.lastMatch.text}
  - Следующий матч: ${motivationHome.nextMatch.team1_name} - ${motivationHome.nextMatch.team2_name}: ${motivationHome.nextMatch.text}
- **${teamAway}:**
  - Текущий матч: ${motivationAway.currentMatch}
  - Прошедший матч: ${motivationAway.lastMatch.team1_name} - ${motivationAway.lastMatch.team2_name}: ${motivationAway.lastMatch.text}
  - Следующий матч: ${motivationAway.nextMatch.team1_name} - ${motivationAway.nextMatch.team2_name}: ${motivationAway.nextMatch.text}

**4. Травмы:** ${JSON.stringify(injuries)}

**5. История личных встреч:** ${lastMatchesH2h.join(", ")}

**6. Статистика команд:**
- ${teamHome}: 
  Матчи: ${stats.gamesHome}, Победы: ${stats.winsHome}, Ничьи: ${stats.drawsHome}, Поражения: ${stats.losesHome}
  Удары: ${stats.shotsHome}, Удары соперника: ${stats.shotsOppHome}
  Атаки: ${stats.attaksHome}, Атаки соперника: ${stats.attaksOppHome}
  Владение: ${stats.possHome}%, Владение соперника: ${stats.possOppHome}%
- ${teamAway}: 
  Матчи: ${stats.gamesAway}, Победы: ${stats.winsAway}, Ничьи: ${stats.drawsAway}, Поражения: ${stats.losesAway}
  Удары: ${stats.shotsAway}, Удары соперника: ${stats.shotsOppAway}
  Атаки: ${stats.attaksAway}, Атаки соперника: ${stats.attaksOppAway}
  Владение: ${stats.possAway}%, Владение соперника: ${stats.possOppAway}%

**7. Мнения экспертов:** ${state.description}

**8. Предположительные моменты:** ${state.momentPredict}

**9. Коэффициенты букмекеров:** ${oddsAll.join(", ")}

**На основе этих данных предложи рекомендацию по наиболее вероятной и обоснованной ставке на этот матч. Предложи несколько вариантов ставок с объяснением (например, исход матча, тотал голов, фора, комбинированные ставки и т.д.).**
`;
    };
    
    setState(prev => ({ 
      ...prev, 
      result: generateAiPrompt() 
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          matchesInfoNbbet,
          oddsData,
          summaryData,
          historyOddsData,
          lastMatchesData
        ] = await Promise.all([
          nbbetServices.getMatchInfo(),
          getOdds(),
          nbbetServices.getSummary(),
          nbbetServices.getHistoryOdds(),
          nbbetServices.getLastMatches()
        ]);

        setState(prev => ({
          ...prev,
          info: matchesInfoNbbet.data.match.data.match,
          odds: oddsData.odds,
          summary: summaryData.data.match.data,
          historyOdds: historyOddsData.data.match.data,
          lastMatches: lastMatchesData.data.match.data,
          isLoading: true
        }));
      } catch (error) {
        console.error(error);
        errorModal(error.message);
      }
    };

    fetchData();
  }, []);

  if (!state.isLoading) return <Loading />;

  return (
    <div className="bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 min-h-screen bg-fixed">
      <Header />
      <BackTop />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Заголовок матча */}
        <Card 
          className="bg-opacity-70 bg-slate-800 border-cyan-500 mb-8 shadow-lg"
          bodyStyle={{ padding: "16px" }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-center text-cyan-100 mb-2">
            {state.info[10]?.[1] || "Название матча"}
          </h1>
          <div className="text-center text-gray-300">
            <p className="text-lg">{state.info[18]?.[2] || "Стадион"}</p>
            <div className="flex justify-center gap-4 mt-1">
              <span>{state.info[18]?.[3] && `${state.info[18][3]}°C`}</span>
              <span>{state.info[18]?.[4] && state.info[18][4]}</span>
            </div>
          </div>
        </Card>

        {/* Команды */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <TeamCard 
            team="Home"
            logo={state.info[7]?.[2]}
            name={state.info[7]?.[1]}
            onInputChange={handleInputChange}
            values={state}
          />
          
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center">
              <MoreOutlined className="text-4xl text-cyan-400 mb-2" />
              <span className="text-white font-bold text-xl bg-cyan-700 px-4 py-2 rounded-full">
                VS
              </span>
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-300 mb-2">Дата матча</p>
              <p className="text-white font-medium">
                {new Date(state.info[0]?.[0]).toLocaleString()}
              </p>
            </div>
          </div>
          
          <TeamCard 
            team="Away"
            logo={state.info[8]?.[2]}
            name={state.info[8]?.[1]}
            onInputChange={handleInputChange}
            values={state}
          />
        </div>

        {/* Дополнительные поля */}
        <Collapse 
          ghost 
          expandIconPosition="end"
          className="bg-transparent mb-6"
        >
          <Panel 
            header={
              <span className="text-cyan-300 text-lg font-medium">
                <EditOutlined className="mr-2" /> 
                Дополнительные параметры анализа
              </span>
            } 
            key="1"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-opacity-50 bg-slate-800 backdrop-blur-sm border-cyan-400">
                <h3 className="text-cyan-300 mb-3">Прогноз ключевых моментов</h3>
                <TextArea
                  rows={3}
                  placeholder="Опишите ключевые моменты матча (голевые моменты, стандарты, тактика и т.д.)"
                  value={state.momentPredict}
                  onChange={(e) => handleInputChange("momentPredict", e.target.value)}
                  className="mb-4"
                />
                
                <h3 className="text-cyan-300 mb-3">Экспертное мнение</h3>
                <TextArea
                  rows={3}
                  placeholder="Добавьте описание матча и ваше мнение"
                  value={state.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </Card>
              
              <div className="flex flex-col justify-center items-center">
                <Button 
                  type="primary" 
                  size="large"
                  onClick={getPredict}
                  className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 h-14 w-full max-w-xs font-bold text-lg shadow-lg"
                >
                  Сгенерировать AI прогноз
                </Button>
                <p className="text-gray-400 mt-4 text-center max-w-md">
                  На основе всех введенных данных будет создан подробный промт для анализа матча с рекомендациями по ставкам
                </p>
              </div>
            </div>
          </Panel>
        </Collapse>

        {/* Результат */}
        {state.result && (
          <Card 
            title={<span className="text-cyan-300">Сгенерированный промт для AI</span>} 
            className="bg-slate-800 bg-opacity-70 border-cyan-500"
            extra={
              <Button 
                icon={<CopyOutlined />}
                onClick={() => navigator.clipboard.writeText(state.result)}
                className="flex items-center text-cyan-300 border-cyan-300"
              >
                Скопировать
              </Button>
            }
          >
            <div className="whitespace-pre-wrap text-gray-200 bg-gray-900 p-4 rounded-lg overflow-x-auto max-h-[500px] overflow-y-auto font-mono text-sm">
              {state.result}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Match;