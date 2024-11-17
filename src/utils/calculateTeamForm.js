export function calculateTeamForm(matches, recentMatchesCount = 5, team) {
  let points = 0;
  let totalMatches = Math.min(recentMatchesCount, matches.length);

  for (let i = 0; i < totalMatches; i++) {
    const match = matches[i];
    const { homeGoals, awayGoals, homeTeam, awayTeam } = match;

    // Определяем очки в зависимости от результата
    if (homeTeam === team) {
      if (homeGoals > awayGoals) points += 3; // Победа дома
      else if (homeGoals === awayGoals) points += 1; // Ничья дома
    } else {
      if (awayGoals > homeGoals) points += 3; // Победа в гостях
      else if (awayGoals === homeGoals) points += 1; // Ничья в гостях
    }
  }
  // Нормализуем форму (макс. количество очков = recentMatchesCount * 3)
  return (points / (recentMatchesCount * 3)) * 100;
}
