export const calcPredictions = (
    predictions, odds
) => {

    console.log(predictions)
    console.log(odds)

   const predictionsWithOdds = predictions.map((prediction) => {

    let res ;
    odds.forEach((odd) => {
        if(+odd.odd === prediction[2]) {
            res = {
                odd: prediction[3],
                name: odd.name,
                probability: 1 / prediction[3]
            }
        } 
    })

    return res;
});


const predictionsWithOddsFilter = predictionsWithOdds.filter((el) => el !== undefined)

console.log(predictionsWithOddsFilter)

// Извлечение вероятностей из массива объектов
const probabilities = predictionsWithOddsFilter.map(bet => bet.probability);

// Вычисление средней вероятности
const averageProbability = probabilities.reduce((sum, prob) => sum + prob, 0) / probabilities.length;

// Нахождение ближайшего значения к средней вероятности
const closestBet = predictionsWithOddsFilter.reduce((prev, curr) => {
    return Math.abs(curr.probability - averageProbability) < Math.abs(prev.probability - averageProbability) ? curr : prev;
});

// Вывод прогноза
console.log(`Прогноз на матч: ${closestBet.name}`);
console.log(`Средняя вероятность: ${averageProbability.toFixed(4)}`);
console.log(`Наиболее близкий исход: ${closestBet.name} с вероятностью ${closestBet.probability.toFixed(4)} и коэффициентом ${closestBet.odd}`);

return closestBet
}