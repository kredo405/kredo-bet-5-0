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
          probability: 1 / prediction[3] - 0.06,
          rating: prediction[10], // Добавление рейтинга прогнозиста
          historyOdds: historyOdds[`${odd.odd}`],
          profit: prediction[6],
        });
      }
    });
  });
}
