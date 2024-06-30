export const calcPredictions = (predictions, odds, summary, info) => {
    const res = [];
    predictions.forEach((prediction) => {
        const margin = 0.06;
        odds.forEach((odd) => {
            if (+odd.odd === prediction[2]) {
                res.push({
                    odd: prediction[3],
                    name: odd.name,
                    probability: 1 / prediction[3] - margin,
                    profit: prediction[6],
                });
            }
        });
    });

    // Извлечение вероятностей из массива объектов
    const probabilities = res.map((bet) => bet.probability);

    // Вычисление средней вероятности
    const averageProbability =
        probabilities.reduce((sum, prob) => sum + prob, 0) /
        probabilities.length;

    // Нахождение ближайшего значения к средней вероятности
    const closestBet = res.reduce((prev, curr) => {
        return Math.abs(curr.probability - averageProbability) <
            Math.abs(prev.probability - averageProbability)
            ? curr
            : prev;
    });

    // Вывод прогноза
    console.log(`Прогноз на матч: ${closestBet.name}`);
    console.log(`Средняя вероятность: ${averageProbability.toFixed(4)}`);
    console.log(
        `Наиболее близкий исход: ${
            closestBet.name
        } с вероятностью ${closestBet.probability.toFixed(4)} и коэффициентом ${
            closestBet.odd
        }`
    );

    // Функция для нормализации прибыли в диапазон от 0 до 1
    function normalizeProfit(profit) {
        const minProfit = Math.min(...res.map((bet) => bet.profit));
        const maxProfit = Math.max(...res.map((bet) => bet.profit));
        return (profit - minProfit) / (maxProfit - minProfit);
    }

    // Добавление нормализованных весов в объекты
    res.forEach((bet) => {
        bet.weight = normalizeProfit(bet.profit);
    });

    // Вычисление взвешенного среднего вероятностей
    const totalWeight = res.reduce((sum, bet) => sum + bet.weight, 0);
    const weightedAverageProbability =
        res.reduce((sum, bet) => sum + bet.probability * bet.weight, 0) /
        totalWeight;

    // Нахождение ближайшего значения к взвешенному среднему вероятности
    const closestBetWeight = res.reduce((prev, curr) => {
        return Math.abs(curr.probability - weightedAverageProbability) <
            Math.abs(prev.probability - weightedAverageProbability)
            ? curr
            : prev;
    });

    // Вывод прогноза
    console.log(`Прогноз на матч: ${closestBet.name}`);
    console.log(
        `Наиболее близкий исход: ${
            closestBet.name
        } с вероятностью ${closestBet.probability.toFixed(4)} и коэффициентом ${
            closestBet.odd
        }`
    );

    return {
        closestBet: closestBet,
        closestBetWeight: closestBetWeight,
        weightedAverageProbability: weightedAverageProbability.toFixed(4),
        sample: res.length,
    };
};
