export default function calcPredictionNew(predictions, odds, historyOdds) {
    const res = [];
    const margin = 0.06;

    // Создание массива объектов прогнозов с нормализованной прибылью и добавлением истории коэффициентов
    predictions.forEach((prediction) => {
        odds.forEach((odd) => {
            if (+odd.odd === prediction[2]) {
                res.push({
                    odd: prediction[3],
                    name: odd.name,
                    probability: 1 / prediction[3] - margin,
                    profit: prediction[6],
                    rating: prediction[10], // Добавление рейтинга прогнозиста
                    historyOdds: historyOdds[`${odd.odd}`],
                });
            }
        });
    });

    // Функция для расчета среднего значения и стандартного отклонения прибыли
    function calculateStatistics(profits) {
        const mean =
            profits.reduce((sum, profit) => sum + profit, 0) / profits.length;
        const variance =
            profits.reduce(
                (sum, profit) => sum + Math.pow(profit - mean, 2),
                0
            ) / profits.length;
        const stdDeviation = Math.sqrt(variance);
        return { mean, stdDeviation };
    }

    // Расчет изменения коэффициентов
    function calculateOddsChange(historyOdds) {
        if (!historyOdds || historyOdds.length < 2) return 0;
        const firstOdd = historyOdds[0][1];
        const lastOdd = historyOdds[historyOdds.length - 1][1];
        return (lastOdd - firstOdd) / firstOdd;
    }

    // Взвешивание прогнозов на основе средней прибыли, стандартного отклонения, рейтинга прогнозиста и изменения коэффициентов
    function weightPredictions(predictions) {
        const profits = predictions.map((prediction) => prediction.profit);
        const { mean, stdDeviation } = calculateStatistics(profits);

        return predictions.map((prediction) => {
            const zScore = (prediction.profit - mean) / stdDeviation;
            const weightProfit = Math.max(0, 1 / (1 + Math.exp(-zScore))); // Сигмоидная функция для нормализации веса прибыли
            const weightRating = 1 / prediction.rating; // Чем ниже рейтинг, тем выше вес
            const oddsChange = calculateOddsChange(prediction.historyOdds);
            const weightOddsChange = 1 + Math.abs(oddsChange); // Учет и падения, и повышения коэффициентов
            const weight = weightProfit * weightRating * weightOddsChange;
            return {
                ...prediction,
                weight,
            };
        });
    }

    // Стратификация для симуляции методом Монте-Карло
    function stratifiedSampling(weights, numStrata) {
        const strataSize = weights.length / numStrata;
        const strata = [];

        for (let i = 0; i < numStrata; i++) {
            const start = Math.floor(i * strataSize);
            const end = Math.floor((i + 1) * strataSize);
            strata.push(weights.slice(start, end));
        }

        return strata;
    }

    // Симуляция методом Монте-Карло с стратификацией и динамической корректировкой весов
    function monteCarloSimulation(
        weightedPredictions,
        simulations = 10000,
        numStrata = 10
    ) {
        const outcomes = {};
        const strata = stratifiedSampling(weightedPredictions, numStrata);

        for (let i = 0; i < simulations; i++) {
            for (const stratum of strata) {
                let randomValue = Math.random();
                let cumulativeProbability = 0;

                for (const prediction of stratum) {
                    cumulativeProbability += prediction.weight;

                    if (randomValue <= cumulativeProbability) {
                        outcomes[prediction.name] =
                            (outcomes[prediction.name] || 0) + 1;

                        // Динамическая корректировка веса на основе результата симуляции
                        prediction.weight += 0.01; // Увеличение веса при успешной симуляции
                        break;
                    }
                }
            }
        }

        return outcomes;
    }

    // Функция для определения наиболее вероятного исхода
    function getBestOutcome(outcomes, weightedPredictions) {
        let bestOutcome = null;
        let maxCount = 0;
        let bestPrediction = null;

        for (const [outcome, count] of Object.entries(outcomes)) {
            if (count > maxCount) {
                bestOutcome = outcome;
                maxCount = count;
                bestPrediction = weightedPredictions.find(
                    (prediction) => prediction.name === outcome
                );
            }
        }

        return {
            name: bestOutcome,
            odd: bestPrediction.odd,
            probability: bestPrediction.probability * 100,
        };
    }

    // Основная функция для прогнозирования
    function predictOutcome(predictions) {
        const weightedPredictions = weightPredictions(predictions);
        const outcomes = monteCarloSimulation(weightedPredictions);
        const bestOutcome = getBestOutcome(outcomes, weightedPredictions);

        return bestOutcome;
    }

    console.log(predictOutcome(res));
    return predictOutcome(res); // Возвращаем прогноз вместе с коэффициентом и вероятностью
}
