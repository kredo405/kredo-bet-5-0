export function normalizeProfit(profit, minProfit, maxProfit) {
  let normalizedProfit;

  if (profit < 0) {
    // Нормализация прибыли от 0 до 1 для отрицательных значений
    normalizedProfit = (profit - minProfit) / (0 - minProfit);
    normalizedProfit = Math.max(0, Math.min(1, normalizedProfit));
  } else {
    // Нормализация прибыли от 1 до 5 для положительных значений
    normalizedProfit = (profit - 0) / (maxProfit - 0);
    normalizedProfit = Math.max(1, Math.min(5, normalizedProfit * 4 + 1));
  }

  return normalizedProfit;
}
