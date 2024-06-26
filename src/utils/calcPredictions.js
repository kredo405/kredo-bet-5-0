export const calcPredictions = (predictions, odds, info, summary) => {
    console.log(predictions);
    console.log(odds);
    const predictionsWithOdds = predictions.map((prediction) => {
        let res;
        const margin = 0.06;
        odds.forEach((odd) => {
            if (+odd.odd === prediction[2]) {
                res = {
                    odd: prediction[3],
                    name: odd.name,
                    probability: 1 / prediction[3] - margin,
                    profit: prediction[6],
                };
            }
        });
        return res;
    });

    const predictionsWithOddsFilter = predictionsWithOdds.filter(
        (el) => el !== undefined
    );

    console.log(predictionsWithOddsFilter);

    // Извлечение вероятностей из массива объектов
    const probabilities = predictionsWithOddsFilter.map(
        (bet) => bet.probability
    );

    // Вычисление средней вероятности
    const averageProbability =
        probabilities.reduce((sum, prob) => sum + prob, 0) /
        probabilities.length;

    // Нахождение ближайшего значения к средней вероятности
    const closestBet = predictionsWithOddsFilter.reduce((prev, curr) => {
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
        const minProfit = Math.min(
            ...predictionsWithOddsFilter.map((bet) => bet.profit)
        );
        const maxProfit = Math.max(
            ...predictionsWithOddsFilter.map((bet) => bet.profit)
        );
        return (profit - minProfit) / (maxProfit - minProfit);
    }

    // Добавление нормализованных весов в объекты
    predictionsWithOddsFilter.forEach((bet) => {
        bet.weight = normalizeProfit(bet.profit);
    });

    // Вычисление взвешенного среднего вероятностей
    const totalWeight = predictionsWithOddsFilter.reduce(
        (sum, bet) => sum + bet.weight,
        0
    );
    const weightedAverageProbability =
        predictionsWithOddsFilter.reduce(
            (sum, bet) => sum + bet.probability * bet.weight,
            0
        ) / totalWeight;

    // Нахождение ближайшего значения к взвешенному среднему вероятности
    const closestBetWeight = predictionsWithOddsFilter.reduce((prev, curr) => {
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
        sample: predictionsWithOdds.length,
    };
};
