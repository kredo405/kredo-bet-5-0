export default function calcPredictionNew(predictions, odds, historyOdds) {
    const res = [];

    // Функция для приведения прибыли к шкале от 0% до 100%
    function normalizeProfit(profit) {
        const normalized = (profit + 1000) / 20; // Приведение к шкале от 0 до 100
        return Math.max(0, Math.min(normalized, 100)); // Ограничение значения от 0 до 100
    }

    // Создание массива объектов прогнозов с нормализованной прибылью и добавлением истории коэффициентов
    predictions.forEach((prediction) => {
        odds.forEach((odd) => {
            if (+odd.odd === prediction[2]) {
                res.push({
                    odd: prediction[3],
                    name: odd.name,
                    probability: 1 / prediction[3] - 0.06,
                    profit: normalizeProfit(prediction[6]), // Нормализация прибыли
                    rating: prediction[10], // Добавление рейтинга прогнозиста
                    historyOdds: historyOdds[`${odd.odd}`],
                });
            }
        });
    });

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
            const normalizedProfit = prediction.profit;
            const oddsChange = calculateOddsChange(prediction.historyOdds);
            const value = normalizedProfit * (1 + Math.abs(oddsChange));

            if (!betValues[prediction.name]) {
                betValues[prediction.name] = { ...prediction, value };
            } else {
                betValues[prediction.name].value += value;
                betValues[prediction.name].probability = Math.max(betValues[prediction.name].probability, prediction.probability);
            }
        });

        return Object.values(betValues);
    }

    // Основная функция для прогнозирования
    function predictOutcome(predictions) {
        const weightedPredictions = calculateBetValue(predictions);
        weightedPredictions.sort((a, b) => b.value - a.value); // Сортировка по убыванию ценности ставки
        const bestPredictions = weightedPredictions.slice(0, 2); // Выбор двух лучших прогнозов

        return bestPredictions.map(prediction => ({
            name: prediction.name,
            odd: prediction.odd,
            probability: prediction.probability * 100,
            value: prediction.value,
        }));
    }

    console.log(predictOutcome(res));
    return predictOutcome(res); // Возвращаем два лучших прогноза
}
