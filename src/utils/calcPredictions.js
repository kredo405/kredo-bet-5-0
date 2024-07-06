export const calcPredictions = (predictions, odds, historyOdds, summary) => {
  const data = [];

  // Собираем данные из прогнозов и коэффициентов
  predictions.forEach((prediction) => {
    odds.forEach((odd) => {
      if (+odd.odd === prediction[2]) {
        data.push({
          odd: prediction[3],
          name: odd.name,
          probability: 1 / prediction[3] - 0.06,
          rating: prediction[10], // Добавление рейтинга прогнозиста
          historyOdds: historyOdds[`${odd.odd}`],
          profit: prediction[6],
        });
      }
    });
  });

  // Функция сигмоиды для преобразования нормализованных значений прибыли в вес
  function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }

  // Нормализация прибыли на шкале от -1 до 1
  function normalizeProfit(profit, minProfit, maxProfit) {
    return ((profit - minProfit) / (maxProfit - minProfit)) * 2 - 1;
  }

  // Вычисляем минимальную и максимальную прибыль для нормализации
  const profits = data.map((item) => item.profit);
  const minProfit = Math.min(...profits);
  const maxProfit = Math.max(...profits);

  // Считаем взвешенную сумму вероятностей с учетом нормализованных прибылей
  const weightedSum = data.reduce(
    (acc, item) => {
      const normalizedProfit = normalizeProfit(
        item.profit,
        minProfit,
        maxProfit
      );
      const weight = sigmoid(normalizedProfit); // Преобразуем нормализованную прибыль в вес
      acc.sum += item.probability * weight;
      acc.weight += weight;
      return acc;
    },
    { sum: 0, weight: 0 }
  );

  const averageProbability = weightedSum.sum / weightedSum.weight;

  // Находим исход с вероятностью, ближайшей к средней взвешенной вероятности
  let closestOutcome = data[0];
  let closestDifference = Math.abs(data[0].probability - averageProbability);

  for (const item of data) {
    const difference = Math.abs(item.probability - averageProbability);
    if (difference < closestDifference) {
      closestOutcome = item;
      closestDifference = difference;
    }
  }

  console.log(closestOutcome);

  return {
    prediction: closestOutcome.name,
    avgProbability: averageProbability,
    closestProbability: closestOutcome.probability * 100,
    odd: closestOutcome.odd,
    sample: data.length,
  };
};
