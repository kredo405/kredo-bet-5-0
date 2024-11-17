export function calculateAverageXG(matches, recentMatchesCount = 5, team) {
  let totalXG = 0;
  let weightSum = 0;
  const weightFactor = 0.9; // Фактор для экспоненциального взвешивания

  for (let i = 0; i < Math.min(recentMatchesCount, matches.length); i++) {
    const match = matches[i];
    const { xgHome, xgAway, homeTeam } = match;

    console.log(team);

    // Определяем xG для команды в зависимости от того, играет ли она дома или в гостях
    let xgForTeam = homeTeam === team ? xgHome : xgAway;

    // Применяем экспоненциальное взвешивание
    const weight = Math.pow(weightFactor, i);
    totalXG += xgForTeam * weight;
    weightSum += weight;
  }

  return totalXG / weightSum;
}
