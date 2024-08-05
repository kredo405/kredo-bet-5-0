import {
  scoresMatch,
  scoresFirstTime,
  scoresSecondTime,
} from "../variables/scores";
import { calcAvgGolas } from "./calcAvgGoals";

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
          combinedScoresFirstTime[score].worldProbabilty;
      } else if (
        period === 2 &&
        combinedScoresSecondTime.hasOwnProperty(score)
      ) {
        combinedScoresSecondTime[score].quantity +=
          combinedScoresSecondTime[score].worldProbabilty;
      } else if (period === 3 && combinedScoresMatch.hasOwnProperty(score)) {
        combinedScoresMatch[score].quantity +=
          combinedScoresMatch[score].worldProbabilty;
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
  const topElementsArray = [];

  for (const score in data) {
    if (data[score].quantity >= maxQuantity - threshold) {
      topElementsArray.push({ score: score, ...data[score] });
    }
  }

  topElementsArray.sort((a, b) => b.quantity - a.quantity);
  const topElements = {};

  for (let i = 0; i < Math.min(3, topElementsArray.length); i++) {
    const element = topElementsArray[i];
    topElements[element.score] = { quantity: element.quantity };
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
  historyOdds
) {
  const data = [];
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

  const uniquePredictionsMatchByScoresSorted = findTopByQuantity(
    uniquePredictionsMatchByScores
  ).slice(0, 2);

  const dataFirstTimeByScore = calcTopPredictionsByScore(
    dataFirstTime,
    collectivePrediction.combinedScoresFirstTime
  ).filter((el) => el.odd >= 1.5);
  const uniquePredictionsFirstTimeByScores =
    removeDuplicatesName(dataFirstTimeByScore);

  const uniquePredictionsFirstTimeByScoresSorted = findTopByQuantity(
    uniquePredictionsFirstTimeByScores
  ).slice(0, 2);
  const dataSecondTimeByScore = calcTopPredictionsByScore(
    dataSecondTime,
    collectivePrediction.combinedScoresSecondTime
  ).filter((el) => el.odd >= 1.5);
  const uniquePredictionsSecondTimeByScores = removeDuplicatesName(
    dataSecondTimeByScore
  );
  const uniquePredictionsSecondTimeByScoresSorted = findTopByQuantity(
    uniquePredictionsSecondTimeByScores
  ).slice(0, 2);

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
    uniquePredictionsFirstTimeByScoresSorted,
    uniquePredictionsSecondTimeByScoresSorted,
    uniquePredictionsMatchByScoresSorted,
  };
}
