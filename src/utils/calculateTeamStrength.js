export function calculateTeamStrength(matches, team) {
  const homeMatches = matches.filter((m) => m.homeTeam === team);
  const awayMatches = matches.filter((m) => m.awayTeam === team);

  // Подсчет средней результативности и пропускаемости голов для домашних матчей
  const avgGoalsScoredHome =
    homeMatches.reduce((sum, m) => sum + m.homeGoals, 0) / homeMatches.length ||
    0;
  const avgGoalsConcededHome =
    homeMatches.reduce((sum, m) => sum + m.awayGoals, 0) / homeMatches.length ||
    0;
  const avgTotalGoalsHome =
    homeMatches.reduce((sum, m) => sum + m.homeGoals + m.awayGoals, 0) /
      homeMatches.length || 1;

  // Подсчет средней результативности и пропускаемости голов для выездных матчей
  const avgGoalsScoredAway =
    awayMatches.reduce((sum, m) => sum + m.awayGoals, 0) / awayMatches.length ||
    0;
  const avgGoalsConcededAway =
    awayMatches.reduce((sum, m) => sum + m.homeGoals, 0) / awayMatches.length ||
    0;
  const avgTotalGoalsAway =
    awayMatches.reduce((sum, m) => sum + m.homeGoals + m.awayGoals, 0) /
      awayMatches.length || 1;

  // Рассчитываем силы атаки и защиты
  const attackStrengthHome = avgGoalsScoredHome / avgTotalGoalsHome;
  const defenseStrengthHome = avgGoalsConcededHome / avgTotalGoalsHome;
  const attackStrengthAway = avgGoalsScoredAway / avgTotalGoalsAway;
  const defenseStrengthAway = avgGoalsConcededAway / avgTotalGoalsAway;

  return {
    attackStrengthHome,
    defenseStrengthHome,
    attackStrengthAway,
    defenseStrengthAway,
  };
}
