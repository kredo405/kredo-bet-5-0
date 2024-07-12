import {
  scoresMatch,
  scoresFirstTime,
  scoresSecondTime,
} from "../variables/scores";

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
          (combinedScoresFirstTime[score].probability * 100 + profit) / 2;
      } else if (
        period === 2 &&
        combinedScoresSecondTime.hasOwnProperty(score)
      ) {
        combinedScoresSecondTime[score].quantity +=
          (combinedScoresSecondTime[score].probability * 100 + profit) / 2;
      } else if (period === 3 && combinedScoresMatch.hasOwnProperty(score)) {
        combinedScoresMatch[score].quantity +=
          (combinedScoresMatch[score].probability * 100 + profit) / 2;
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

// Основная функция для расчета прогнозов методом коллективного интеллекта
export default function calcPredictionCollective(
  predictions,
  odds,
  historyOdds,
  summary
) {
  const data = [];
  const avgGoals = (summary) => (summary[0][8] + summary[1][9]) / 2;

  // Матч
  const individualTotalAvgHome = avgGoals(summary[0]);
  const individualTotalAvgAway = avgGoals(summary[0]);
  // 1 тайм
  const individualTotalAvgHome1 = avgGoals(summary[1]);
  const individualTotalAvgAway1 = avgGoals(summary[1]);
  // 2 тайм
  const individualTotalAvgHome2 = avgGoals(summary[2]);
  const individualTotalAvgAway2 = avgGoals(summary[2]);

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

  const filterPredictionsByProfit = data.filter((item) => item.profit > -10);
  const uniquePredictions = removeDuplicates(filterPredictionsByProfit);

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

  const result = findTopByQuantity(dataWithQuantity);
  const uniqueItems = removeDuplicatesName(result);

  return uniqueItems.slice(0, 2);
}
