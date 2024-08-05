export default function calcPredictionNew(
  predictions,
  odds,
  historyOdds,
  summary
) {
  const resNormalized = []; // Нормализация прибыли к шкале от 0% до 100%

  function normalizeProfit(profit) {
    const normalized = Math.max(0, Math.min((profit + 1000) / 20, 100));
    return normalized;
  }

  predictions.forEach((prediction) => {
    odds.forEach((odd) => {
      if (+odd.odd === prediction[2]) {
        resNormalized.push({
          odd: prediction[3],
          name: odd.name,
          probability: 1 / prediction[3] - 0.06,
          rating: prediction[10],
          historyOdds: historyOdds[`${odd.odd}`],
          profit: normalizeProfit(prediction[6]),
        });
      }
    });
  }); // Рассчитываем изменение коэффициентов

  function calculateOddsChange(historyOdds) {
    if (!historyOdds || historyOdds.length < 2) return 0;
    return (
      (historyOdds[historyOdds.length - 1][1] - historyOdds[0][1]) /
      historyOdds[0][1]
    );
  } // Рассчитываем ценность ставки

  function calculateBetValue(predictions) {
    const betValues = new Map();

    predictions.forEach((prediction) => {
      const oddsChange = calculateOddsChange(prediction.historyOdds);
      const value = prediction.profit * (1 + Math.abs(oddsChange));

      if (!betValues.has(prediction.name)) {
        betValues.set(prediction.name, { ...prediction, value });
        return;
      }

      const existing = betValues.get(prediction.name);
      existing.value += value;
      existing.probability = Math.max(
        existing.probability,
        prediction.probability
      );
    });

    return Array.from(betValues.values());
  } // Основная функция прогнозирования

  function predictOutcome(predictionsNormalized) {
    const weightedPredictionsNormalized = calculateBetValue(
      predictionsNormalized
    );
    weightedPredictionsNormalized.sort((a, b) => b.value - a.value); // Удаление дубликатов

    const uniquePredictions = Array.from(
      new Map(weightedPredictionsNormalized.map((p) => [p.name, p])).values()
    );

    return uniquePredictions.slice(0, 2);
  }

  const bestTwoPredictions = predictOutcome(resNormalized);
  console.log(bestTwoPredictions);
  return bestTwoPredictions;
}
