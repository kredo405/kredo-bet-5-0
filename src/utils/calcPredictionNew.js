export default function calcPredictionNew(
  predictions,
  odds,
  historyOdds,
  summary
) {
  const resNormalized = [];
  const resOriginal = [];

  // Функция для приведения прибыли к шкале от 0% до 100%
  function normalizeProfit(profit) {
    const normalized = (profit + 1000) / 20; // Приведение к шкале от 0 до 100
    return Math.max(0, Math.min(normalized, 100)); // Ограничение значения от 0 до 100
  }

  // Создание массива объектов прогнозов с нормализованной и оригинальной прибылью
  predictions.forEach((prediction) => {
    odds.forEach((odd) => {
      if (+odd.odd === prediction[2]) {
        const basePrediction = {
          odd: prediction[3],
          name: odd.name,
          probability: 1 / prediction[3] - 0.06,
          rating: prediction[10], // Добавление рейтинга прогнозиста
          historyOdds: historyOdds[`${odd.odd}`],
        };

        resNormalized.push({
          ...basePrediction,
          profit: normalizeProfit(prediction[6]), // Нормализация прибыли
        });

        resOriginal.push({
          ...basePrediction,
          profit: prediction[6], // Оригинальная прибыль
        });
      }
    });
  });

  console.log(resOriginal);
  console.log(historyOdds);
  console.log(summary);

  // const obj = {
  //   individualTotalAvgHome: 1.6,
  //   individualTotalAvgAway: 1.3,
  //   individualTotalAvgHomeOpponent: 1.4,
  //   individualTotalAvgAwayOpponent: 1.9,
  //   possesionHome: 54,
  //   possesionAway: 44,
  //   possesionHomeOpponent: 46,
  //   possesionAwayOpponent: 56,
  // }

  // Функция для расчета изменения коэффициентов
  function calculateOddsChange(historyOdds) {
    if (!historyOdds || historyOdds.length < 2) return 0;
    const firstOdd = historyOdds[0][1];
    const lastOdd = historyOdds[historyOdds.length - 1][1];
    return (lastOdd - firstOdd) / firstOdd;
  }

  // Функция для расчета ценности ставки
  function calculateBetValue(predictions) {
    const betValues = {};

    predictions.forEach((prediction) => {
      const oddsChange = calculateOddsChange(prediction.historyOdds);
      const value = prediction.profit * (1 + Math.abs(oddsChange));

      if (!betValues[prediction.name]) {
        betValues[prediction.name] = { ...prediction, value };
      } else {
        betValues[prediction.name].value += value;
        betValues[prediction.name].probability = Math.max(
          betValues[prediction.name].probability,
          prediction.probability
        );
      }
    });

    return Object.values(betValues);
  }

  // Основная функция для прогнозирования
  function predictOutcome(predictionsNormalized, predictionsOriginal) {
    const weightedPredictionsNormalized = calculateBetValue(
      predictionsNormalized
    );
    const weightedPredictionsOriginal = calculateBetValue(predictionsOriginal);

    weightedPredictionsNormalized.sort((a, b) => b.value - a.value); // Сортировка по убыванию ценности ставки
    weightedPredictionsOriginal.sort((a, b) => b.value - a.value); // Сортировка по убыванию ценности ставки

    const bestPredictionNormalized = weightedPredictionsNormalized[0];
    const bestPredictionOriginal = weightedPredictionsOriginal[0];

    return [
      {
        name: bestPredictionNormalized.name,
        odd: bestPredictionNormalized.odd,
        probability: bestPredictionNormalized.probability * 100,
        value: bestPredictionNormalized.value,
      },
      {
        name: bestPredictionOriginal.name,
        odd: bestPredictionOriginal.odd,
        probability: bestPredictionOriginal.probability * 100,
        value: bestPredictionOriginal.value,
      },
    ];
  }

  console.log(predictOutcome(resNormalized, resOriginal));
  return predictOutcome(resNormalized, resOriginal); // Возвращаем два лучших прогноза
}
