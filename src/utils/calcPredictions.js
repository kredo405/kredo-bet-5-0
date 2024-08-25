import {
  scoresMatch,
  scoresFirstTime,
  scoresSecondTime,
} from "../variables/scores";
import { calcAvgGolas } from "./calcAvgGoals";
import { monteCarloScoreSimulation } from "./calcMonteCarlo";
import { changeProbabilityIntoHistoryOdds } from "./historyOdds";
import { removeDuplicateByProfit } from "./removeDublicates";
import { normalizeProfit } from "./normalizeProfit";

function findMinMaxProfit(predictions) {
  // Инициализация значений прибыли
  let minProfit = Infinity;
  let maxProfit = -Infinity;

  // Проход по массиву объектов
  predictions.forEach((prediction) => {
    const profit = prediction.profit;

    // Обновление минимальной прибыли
    if (profit < minProfit) {
      minProfit = profit;
    }

    // Обновление максимальной прибыли
    if (profit > maxProfit) {
      maxProfit = profit;
    }
  });

  // Возвращение результата в виде объекта
  return {
    minProfit,
    maxProfit,
  };
}

export const calcPredictions = (
  predictions,
  odds,
  historyOdds,
  info,
  lastMatchesInfoHome,
  lastMatchesInfoAway
) => {
  const data = [];
  const allBets = [];
  const teamHomeName = info["7"]["1"];
  const teamAwayName = info["8"]["1"];

  console.log(lastMatchesInfoHome);
  const lastMatchesHome = lastMatchesInfoHome.map((el) => {
    return {
      homeTeam: el.data.match.data.match["7"]["1"],
      awayTeam: el.data.match.data.match["8"]["1"],
      homeGoals: el.data.match.data.match["7"]["4"],
      awayGoals: el.data.match.data.match["8"]["4"],
      homeGoalsFirstTime: el.data.match.data.match["7"]["5"],
      awayGoalsFirstTime: el.data.match.data.match["8"]["5"],
      homeGoalsSecondTimeTime:
        el.data.match.data.match["7"]["4"] - el.data.match.data.match["7"]["5"],
      awayGoalsSecondTimeTime:
        el.data.match.data.match["8"]["5"] - el.data.match.data.match["8"]["4"],
      xgHome:
        el.data.match.data.match["17"] &&
        el.data.match.data.match["17"]["0"]["21"]
          ? el.data.match.data.match["17"]["0"]["21"]["0"]
          : 0,
      xgAway:
        el.data.match.data.match["17"] &&
        el.data.match.data.match["17"]["0"]["21"]
          ? el.data.match.data.match["17"][0]["21"][1]
          : 0,
      winnerHomeOdd: el.data.match.data.match["5"]
        ? el.data.match.data.match["5"]["1"]
        : 0,
      winnerAwayOdd: el.data.match.data.match["5"]
        ? el.data.match.data.match["5"]["2"]
        : 0,
    };
  });
  const lastMatchesAway = lastMatchesInfoAway.map((el) => {
    return {
      homeTeam: el.data.match.data.match["7"]["1"],
      awayTeam: el.data.match.data.match["8"]["1"],
      homeGoals: el.data.match.data.match["7"]["4"],
      awayGoals: el.data.match.data.match["8"]["4"],
      homeGoalsFirstTime: el.data.match.data.match["7"]["5"],
      awayGoalsFirstTime: el.data.match.data.match["8"]["5"],
      homeGoalsSecondTimeTime:
        el.data.match.data.match["7"]["4"] - el.data.match.data.match["7"]["5"],
      awayGoalsSecondTimeTime:
        el.data.match.data.match["8"]["5"] - el.data.match.data.match["8"]["4"],
      xgHome:
        el.data.match.data.match["17"] &&
        el.data.match.data.match["17"]["0"]["21"]
          ? el.data.match.data.match["17"]["0"]["21"]["0"]
          : 0,
      xgAway:
        el.data.match.data.match["17"] &&
        el.data.match.data.match["17"]["0"]["21"]
          ? el.data.match.data.match["17"][0]["21"][1]
          : 0,
      winnerHomeOdd: el.data.match.data.match["5"]["1"]
        ? el.data.match.data.match["5"]["1"]
        : 0,
      winnerAwayOdd: el.data.match.data.match["5"]["2"]
        ? el.data.match.data.match["5"]["2"]
        : 0,
    };
  });

  // Рассчитывем индивидуальные тоталы команд
  const avgGoalsHome = calcAvgGolas(lastMatchesHome, teamHomeName);
  const avgGoalsAway = calcAvgGolas(lastMatchesAway, teamAwayName);

  const individualTotalHome =
    (avgGoalsHome.avgGoalsFor + avgGoalsAway.avgGoalsAgainst) / 2;
  const individualTotalAway =
    (avgGoalsAway.avgGoalsFor + avgGoalsHome.avgGoalsAgainst) / 2;
  const individualTotalHomeFirstHalf =
    (avgGoalsHome.avgGoalsFirstHalfFor +
      avgGoalsAway.avgGoalsFirstHalfAgainst) /
    2;
  const individualTotalAwayFirstHalf =
    (avgGoalsHome.avgGoalsFirstHalfAgainst +
      avgGoalsAway.avgGoalsFirstHalfFor) /
    2;
  const individualTotalHomeSeondHalf =
    (avgGoalsHome.avgGoalsSecondHalfFor +
      avgGoalsAway.avgGoalsSecondHalfAgainst) /
    2;
  const individualTotalAwaySecondHalf =
    (avgGoalsHome.avgGoalsSecondHalfAgainst +
      avgGoalsAway.avgGoalsSecondHalfFor) /
    2;

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

  const dataFiltered = removeDuplicateByProfit(data);

  const { minProfit, maxProfit } = findMinMaxProfit(dataFiltered);

  const normalizedData = dataFiltered.map((item) => {
    return {
      ...item,
      profit: normalizeProfit(item.profit, minProfit, maxProfit),
    };
  });

  console.log(normalizedData);

  // Рассчитываем вероятности счетов методом распределения паунсона и метода монтекарло

  const probabilities = monteCarloScoreSimulation(
    individualTotalHome,
    individualTotalAway
  );

  const probabilitiesFitstTime = monteCarloScoreSimulation(
    individualTotalHomeFirstHalf,
    individualTotalAwayFirstHalf
  );

  const probabilitiesSecondTime = monteCarloScoreSimulation(
    individualTotalHomeSeondHalf,
    individualTotalAwaySecondHalf
  );

  // Соединяем дааные вероятностей с мировыми данными

  for (let score in probabilities) {
    for (let worldScore in scoresMatch) {
      if (score === worldScore) {
        scoresMatch[worldScore].probability = probabilities[score];
      }
    }
  }

  for (let score in probabilitiesFitstTime) {
    for (let worldScore in scoresFirstTime) {
      if (score === worldScore) {
        scoresFirstTime[worldScore].probability = probabilitiesFitstTime[score];
      }
    }
  }

  for (let score in probabilitiesSecondTime) {
    for (let worldScore in scoresSecondTime) {
      if (score === worldScore) {
        scoresSecondTime[worldScore].probability =
          probabilitiesSecondTime[score];
      }
    }
  }

  // Изменяем вероятности счетов взависимости от прогноза
  normalizedData.forEach((el) => {
    if (el.period === 3) {
      el.scores.forEach((score) => {
        scoresMatch[score].probability += el.profit;
      });
    } else if (el.period === 1) {
      el.scores.forEach((score) => {
        scoresFirstTime[score].probability += el.profit;
      });
    } else if (el.period === 2) {
      el.scores.forEach((score) => {
        scoresSecondTime[score].probability += el.profit;
      });
    }
  });

  odds.forEach((odd) => {
    // Получаем все ставки и расчитывем их вероятности
    let probabilityBet = 0;
    if (odd.period === 3) {
      odd.scores.forEach((score) => {
        probabilityBet +=
          (scoresMatch[score].probability +
            scoresMatch[score].worldProbabilty) /
          2;
      });
    } else if (odd.period === 1) {
      odd.scores.forEach((score) => {
        probabilityBet +=
          (scoresFirstTime[score].probability +
            scoresFirstTime[score].worldProbabilty) /
          2;
      });
    } else if (odd.period === 2) {
      odd.scores.forEach((score) => {
        probabilityBet +=
          (scoresSecondTime[score].probability +
            scoresSecondTime[score].worldProbabilty) /
          2;
      });
    }

    allBets.push({
      name: odd.name,
      probability: probabilityBet,
      period: odd.period,
      historyOdds: historyOdds[`${odd.odd}`],
      scores: odd.scores,
    });
  });
  // Изменяем вероятности иходя их изменения коэффициентов
  const betsIntoHistoryOdds = changeProbabilityIntoHistoryOdds(allBets);

  console.log(betsIntoHistoryOdds);

  // Фильтруем ставки чтобы коэфициент был больше чем 1.55
  const betsFilter = betsIntoHistoryOdds.filter((bet) => bet.odd > 1.55);
  // Выбираем 3 самые вероятный ставки
  const topBets = betsFilter
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 3);

  return {
    sample: dataFiltered.length,
    topBets,
  };
};
