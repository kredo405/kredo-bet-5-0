export function monteCarloScoreSimulation(
  homeExpectedGoals,
  awayExpectedGoals,
  simulations = 10000
) {
  // Функция для генерации случайного числа голов на основе распределения Пуассона с ограничением до 5 голов
  function poissonWithLimit(lambda, limit = 5) {
    let L = Math.exp(-lambda);
    let k = 0;
    let p = 1;
    do {
      k++;
      p *= Math.random();
    } while (p > L && k <= limit);
    return Math.min(k - 1, limit);
  }

  let scoreProbabilities = {};

  // Выполняем симуляции
  for (let i = 0; i < simulations; i++) {
    let homeGoals = poissonWithLimit(homeExpectedGoals, 5);
    let awayGoals = poissonWithLimit(awayExpectedGoals, 5);

    // Формируем строку вида "homeGoals:awayGoals"
    let score = `${homeGoals}:${awayGoals}`;

    // Увеличиваем количество для данного счета
    if (scoreProbabilities[score]) {
      scoreProbabilities[score]++;
    } else {
      scoreProbabilities[score] = 1;
    }
  }

  // Преобразуем количество в вероятности
  for (let score in scoreProbabilities) {
    scoreProbabilities[score] = (scoreProbabilities[score] / simulations) * 100;
  }

  return scoreProbabilities;
}
