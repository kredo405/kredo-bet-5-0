import { ConstructionOutlined } from "@mui/icons-material";
import {
  scoresMatch,
  scoresFirstTime,
  scoresSecondTime,
} from "../variables/scores";
import { calcAvgGolas } from "./calcAvgGoals";

// Функция для расчета вероятности Пуассона
function poissonProbability(lambda, k) {
  return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
}

// Функция для расчета факториала
function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
}

// Функция для расчета вероятностей Пуассона для всех возможных счетов
function calculatePoissonProbabilities(
  scores,
  avgGoalsHome,
  avgGoalsAway,
  maxGoals
) {
  for (let homeGoals = 0; homeGoals <= maxGoals; homeGoals++) {
    for (let awayGoals = 0; awayGoals <= maxGoals; awayGoals++) {
      const scoreKey = `${homeGoals}:${awayGoals}`;
      const probHome = poissonProbability(avgGoalsHome, homeGoals);
      const probAway = poissonProbability(avgGoalsAway, awayGoals);
      const probability = probHome * probAway;
      if (scores.hasOwnProperty(scoreKey)) {
        scores[scoreKey].probability = probability;
      } else {
        scores[scoreKey] = { probability, quantity: 0 };
      }
    }
  }
}

// Метод коллективного интеллекта
function calculateCollectiveIntelligence(data) {
  const combinedScoresMatch = JSON.parse(JSON.stringify(scoresMatch));
  const combinedScoresFirstTime = JSON.parse(JSON.stringify(scoresFirstTime));
  const combinedScoresSecondTime = JSON.parse(JSON.stringify(scoresSecondTime));

  data.forEach((item) => {
    const { scores, period, profit } = item;

    scores.forEach((score) => {
      if (period === 1 && combinedScoresFirstTime.hasOwnProperty(score)) {
        combinedScoresFirstTime[score].quantity +=
          ((combinedScoresFirstTime[score].probability * 100 +
            combinedScoresFirstTime[score].worldProbabilty) /
            2 +
            profit) /
          2;
      } else if (
        period === 2 &&
        combinedScoresSecondTime.hasOwnProperty(score)
      ) {
        combinedScoresSecondTime[score].quantity +=
          ((combinedScoresSecondTime[score].probability * 100 +
            combinedScoresSecondTime[score].worldProbabilty) /
            2 +
            profit) /
          2;
      } else if (period === 3 && combinedScoresMatch.hasOwnProperty(score)) {
        combinedScoresMatch[score].quantity +=
          ((combinedScoresMatch[score].probability * 100 +
            combinedScoresMatch[score].worldProbabilty) /
            2 +
            profit) /
          2;
      }
    });
  });

  return {
    combinedScoresMatch,
    combinedScoresFirstTime,
    combinedScoresSecondTime,
  };
}

// Функция для нахождения топовых прогнозов по количеству
function findTopByQuantity(data) {
  return data.sort((a, b) => b.quantity - a.quantity);
}

function removeDuplicates(data) {
  const uniqueItems = new Set();
  return data.filter((item) => {
    const identifier = `${item.profit}`;
    if (!uniqueItems.has(identifier)) {
      uniqueItems.add(identifier);
      return true;
    }
    return false;
  });
}

function removeDuplicatesName(data) {
  const uniqueItems = new Set();
  return data.filter((item) => {
    const identifier = `${item.name}`;
    if (!uniqueItems.has(identifier)) {
      uniqueItems.add(identifier);
      return true;
    }
    return false;
  });
}

// Функция для приведения прибыли к шкале от 0% до 100%
function normalizeProfit(profit) {
  const normalized = (profit + 100) / 20; // Приведение к шкале от 0 до 100
  return Math.max(0, Math.min(normalized, 100)); // Ограничение значения от 0 до 100
}

// Функция для нахождения элементов с наибольшим quantity
function findTopElementsByQuantity(data, thresholdPercentage = 10) {
  let maxQuantity = 0;
  for (const score in data) {
    if (data[score].quantity > maxQuantity) {
      maxQuantity = data[score].quantity;
    }
  }

  const threshold = (maxQuantity * thresholdPercentage) / 100;
  const topElements = {};

  for (const score in data) {
    if (data[score].quantity >= maxQuantity - threshold) {
      topElements[score] = data[score];
    }
  }

  return topElements;
}

// Функция для нахождения топовых прогнозов по счетам
function calcTopPredictionsByScore(
  predictions,
  scoresData,
  thresholdPercentage = 10
) {
  // Найти топовые элементы по quantity
  const topScores = findTopElementsByQuantity(scoresData, thresholdPercentage);
  const topScoreKeys = Object.keys(topScores);

  // Фильтровать прогнозы по счетам
  const result = predictions.filter((prediction) => {
    return topScoreKeys.every((topScore) =>
      prediction.scores.includes(topScore)
    );
  });

  return result;
}

// Основная функция для расчета прогнозов методом коллективного интеллекта
export default function calcPredictionCollective(
  predictions,
  odds,
  historyOdds,
  summary,
  lastMatches,
  info
) {
  const data = [];
  const avgGoals = (goalsFor, avgGoalsAgainst) =>
    (goalsFor + avgGoalsAgainst) / 2;

  console.log(lastMatches);
  console.log(info);

  // calcAvgGolas

  // Матч
  const individualTotalHome = calcAvgGolas(
    lastMatches[0],
    lastMatches[2],
    info["7"]["1"]
  );
  const individualTotalAway = calcAvgGolas(
    lastMatches[1],
    lastMatches[2],
    info["8"]["1"]
  );

  const individualTotalAvgHome = avgGoals(
    individualTotalHome.avgGoalsFor,
    individualTotalAway.avgGoalsAgainst
  );
  const individualTotalAvgAway = avgGoals(
    individualTotalAway.avgGoalsFor,
    individualTotalHome.avgGoalsAgainst
  );
  // 1 тайм
  const individualTotalAvgHome1 = avgGoals(
    individualTotalHome.avgGoalsForFirstTime,
    individualTotalAway.avgGoalsAgainstFirstTime
  );
  const individualTotalAvgAway1 = avgGoals(
    individualTotalAway.avgGoalsForFirstTime,
    individualTotalHome.avgGoalsAgainstFirstTime
  );
  // 2 тайм
  const individualTotalAvgHome2 = avgGoals(
    individualTotalHome.avgGoalsForSecondTime,
    individualTotalAway.avgGoalsAgainstSecondTime
  );
  const individualTotalAvgAway2 = avgGoals(
    individualTotalAway.avgGoalsForSecondTime,
    individualTotalHome.avgGoalsAgainstSecondTime
  );

  // Расчет вероятностей для матча
  calculatePoissonProbabilities(
    scoresMatch,
    individualTotalAvgHome,
    individualTotalAvgAway,
    3
  );
  // Расчет вероятностей для 1 тайма
  calculatePoissonProbabilities(
    scoresFirstTime,
    individualTotalAvgHome1,
    individualTotalAvgAway1,
    2
  );
  // Расчет вероятностей для 2 тайма
  calculatePoissonProbabilities(
    scoresSecondTime,
    individualTotalAvgHome2,
    individualTotalAvgAway2,
    2
  );

  // Собираем данные из прогнозов и коэффициентов
  predictions.forEach((prediction) => {
    odds.forEach((odd) => {
      if (+odd.odd === prediction[2]) {
        data.push({
          odd: prediction[3],
          name: odd.name,
          historyOdds: historyOdds[`${odd.odd}`],
          profit: normalizeProfit(prediction[6]),
          period: odd.period,
          scores: odd.scores,
        });
      }
    });
  });

  const uniquePredictions = removeDuplicates(data);

  console.log(uniquePredictions);

  const collectivePrediction =
    calculateCollectiveIntelligence(uniquePredictions);

  const dataWithQuantity = uniquePredictions.map((item) => {
    const totalQuantity = item.scores.reduce((total, score) => {
      if (item.period === 1) {
        return (
          total + collectivePrediction.combinedScoresFirstTime[score].quantity
        );
      } else if (item.period === 2) {
        return (
          total + collectivePrediction.combinedScoresSecondTime[score].quantity
        );
      } else if (item.period === 3) {
        return total + collectivePrediction.combinedScoresMatch[score].quantity;
      }
      return total;
    }, 0);

    const averageQuantity = totalQuantity / item.scores.length;

    return {
      ...item,
      quantity: averageQuantity,
    };
  });

  const dataMatch = dataWithQuantity.filter((item) => item.period === 3);
  const dataFirstTime = dataWithQuantity.filter((item) => item.period === 1);
  const dataSecondTime = dataWithQuantity.filter((item) => item.period === 2);

  const dataMatchByScore = calcTopPredictionsByScore(
    dataMatch,
    collectivePrediction.combinedScoresMatch
  ).filter((el) => el.odd >= 1.5);

  const uniquePredictionsMatchByScores = removeDuplicatesName(dataMatchByScore);

  console.log(uniquePredictionsMatchByScores);
  const dataFirstTimeByScore = calcTopPredictionsByScore(
    dataFirstTime,
    collectivePrediction.combinedScoresFirstTime
  ).filter((el) => el.odd >= 1.5);
  const uniquePredictionsFirstTimeByScores =
    removeDuplicatesName(dataFirstTimeByScore);
  const dataSecondTimeByScore = calcTopPredictionsByScore(
    dataSecondTime,
    collectivePrediction.combinedScoresSecondTime
  ).filter((el) => el.odd >= 1.5);
  const uniquePredictionsSecondTimeByScores = removeDuplicatesName(
    dataSecondTimeByScore
  );

  const resultMatch = findTopByQuantity(dataMatch);
  const resultFirstTime = findTopByQuantity(dataFirstTime);
  const resultSecondTime = findTopByQuantity(dataSecondTime);

  const uniqueItemsMatch = removeDuplicatesName(resultMatch).slice(0, 2);
  const uniqueItemsFirstTime = removeDuplicatesName(resultFirstTime).slice(
    0,
    2
  );
  const uniqueItemsSecondTime = removeDuplicatesName(resultSecondTime).slice(
    0,
    2
  );

  return {
    uniqueItemsMatch,
    uniqueItemsFirstTime,
    uniqueItemsSecondTime,
    uniquePredictionsFirstTimeByScores,
    uniquePredictionsSecondTimeByScores,
    uniquePredictionsMatchByScores,
  };
}
