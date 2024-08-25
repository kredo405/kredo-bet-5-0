function removeDuplicatesName(data) {
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

export function calcPercentPredictions(predictions, odds) {
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
          profit: prediction[6],
        });
      }
    });
  });

  const dataFiltered = removeDuplicatesName(data);

  // Объект для хранения итогов
  const result = {};

  // Общий подсчет количества прогнозов
  const totalPredictions = dataFiltered.length;

  // Проходим по каждому прогнозу
  dataFiltered.forEach((prediction) => {
    const { name, probability, odd, profit } = prediction;

    // Если такой исход еще не записан в результатах
    if (!result[name]) {
      result[name] = {
        percent: 0,
        probability: probability,
        profit: 0,
        odd: odd,
      };
    }

    // Увеличиваем количество пользователей для данного исхода
    result[name].percent += 1;

    // Суммируем прибыль
    result[name].profit += profit;
  });

  // Преобразуем результаты в массив объектов и сортируем по profit
  const finalResult = Object.keys(result)
    .map((name) => {
      return {
        name: name,
        percent: (result[name].percent / totalPredictions) * 100,
        probability: result[name].probability,
        profit: result[name].profit,
        odd: result[name].odd,
      };
    })
    .sort((a, b) => b.profit - a.profit);

  return { finalResult, totalPredictions };
}
