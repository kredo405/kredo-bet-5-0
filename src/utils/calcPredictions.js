import { scoresMatch } from "../variables/scores";
import { calcAvgGolas } from "./calcAvgGoals";
import { calcIndividualTotalByPredictions } from "./calcIndividualTotalByPredictions";
import { monteCarloScoreSimulation } from "./calcMonteCarlo";
import { changeProbabilityIntoHistoryOdds } from "./historyOdds";

export const calcPredictions = (
  predictions,
  odds,
  historyOdds,
  info,
  lastMatches
) => {
  const data = [];
  const allBets = [];
  const teamHomeName = info["7"]["1"];
  const teamAwayName = info["8"]["1"];

  // Рассчитывем индивидуальные тоталы команд
  const avgGoalsHome = calcAvgGolas(
    lastMatches[0],
    lastMatches[2],
    teamHomeName
  );
  const avgGoalsAway = calcAvgGolas(
    lastMatches[1],
    lastMatches[2],
    teamAwayName
  );

  const individualTotalHome =
    (avgGoalsHome.avgGoalsFor + avgGoalsAway.avgGoalsAgainst) / 2;
  const individualTotalAway =
    (avgGoalsAway.avgGoalsFor + avgGoalsHome.avgGoalsAgainst) / 2;

  console.log(individualTotalHome);
  console.log(individualTotalAway);

  // Собираем данные из прогнозов и коэффициентов
  predictions.forEach((prediction) => {
    odds.forEach((odd) => {
      // Добавляем все прогнозы
      if (+odd.odd === prediction[2]) {
        data.push({
          odd: prediction[3],
          name: odd.name,
          historyOdds: historyOdds[`${odd.odd}`],
          profit: prediction[6],
          period: odd.period,
          scores: odd.scores,
        });
      }
    });
  });

  // Рассчитываем ИНДИВИДУАЛЬНЫЕ счета команд с помощь прогнозв пользователей
  const individualScores = calcIndividualTotalByPredictions(data);

  // Рассчитываем вероятности счетов методом распределения паунсона и метода монтекарло

  const probabilities = monteCarloScoreSimulation(
    (individualTotalHome + individualScores.scoreHome) / 2,
    (individualTotalAway + individualScores.scoreAway) / 2
  );

  console.log(probabilities);

  // Соединяем дааные вероятностей с мировыми данными

  for (let score in probabilities) {
    for (let worldScore in scoresMatch) {
      if (score === worldScore) {
        scoresMatch[worldScore].probability = probabilities[score];
      }
    }
  }

  odds.forEach((odd) => {
    // Получаем все ставки и расчитывем их вероятности
    if (odd.period === 3) {
      let probabilityBet = 0;
      odd.scores.forEach((score) => {
        probabilityBet +=
          (scoresMatch[score].probability +
            scoresMatch[score].worldProbabilty) /
          2;
      });

      allBets.push({
        name: odd.name,
        probability: probabilityBet,
        period: odd.period,
        historyOdds: historyOdds[`${odd.odd}`],
        scores: odd.scores,
      });
    }
  });
  // Изменяем вероятности иходя их изменения коэффициентов
  const result = changeProbabilityIntoHistoryOdds(allBets);

  // Фильтруем ставки чтобы коэфициент был больше чем 1.55
  const betsFilter = result.filter((bet) => bet.odd > 1.55);
  // Выбираем 3 самые вероятный ставки
  const topBets = betsFilter
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 3);

  console.log(topBets);

  return {
    sample: data.length,
    topBets,
  };
};
