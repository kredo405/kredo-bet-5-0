// Функция для обновления вероятностей на основе прошедших матчей
export function updateScoresBasedOnOdds(
  lastMatchesHome,
  lastMatchesAway,
  homeStatus,
  awayStatus,
  teamHomeName,
  teamAwayName,
  currentOdds
) {
  const homeScoresMatch = [];

  const awayScoresMatch = [];

  // Проходим по всем прошлым матчам для домашней команды
  lastMatchesHome.forEach((match) => {
    if (match.homeTeam === teamHomeName) {
      if (Math.abs(currentOdds.home - match.winnerHomeOdd) <= 0.3) {
        homeScoresMatch.push({
          score: `${match.homeGoals}:${match.awayGoals}`,
          firstTime: `${match.homeGoalsFirstTime}:${match.awayGoalsFirstTime}`,
          secondTime: `${match.homeGoalsSecondTime}:${match.awayGoalsSecondTime}`,
          homeTeamName: match.homeTeam,
          awayTeamName: match.awayTeam,
          logoHome: match.logoHome,
          logoAway: match.logoAway,
        });
      }
    }
    if (match.awayTeam === teamHomeName) {
      if (Math.abs(currentOdds.home - match.winnerAwayOdd) <= 0.3) {
        homeScoresMatch.push({
          score: `${match.homeGoals}:${match.awayGoals}`,
          firstTime: `${match.homeGoalsFirstTime}:${match.awayGoalsFirstTime}`,
          secondTime: `${match.homeGoalsSecondTime}:${match.awayGoalsSecondTime}`,
          homeTeamName: match.homeTeam,
          awayTeamName: match.awayTeam,
          logoHome: match.logoHome,
          logoAway: match.logoAway,
        });
      }
    }
  });

  // Проходим по всем прошлым матчам для выездной команды
  lastMatchesAway.forEach((match) => {
    if (match.homeTeam === teamAwayName) {
      if (Math.abs(currentOdds.away - match.winnerHomeOdd) <= 0.3) {
        awayScoresMatch.push({
          score: `${match.homeGoals}:${match.awayGoals}`,
          firstTime: `${match.homeGoalsFirstTime}:${match.awayGoalsFirstTime}`,
          secondTime: `${match.homeGoalsSecondTime}:${match.awayGoalsSecondTime}`,
          homeTeamName: match.homeTeam,
          awayTeamName: match.awayTeam,
          logoHome: match.logoHome,
          logoAway: match.logoAway,
        });
      }
    }
    if (match.awayTeam === teamAwayName) {
      if (Math.abs(currentOdds.away - match.winnerAwayOdd) <= 0.3) {
        awayScoresMatch.push({
          score: `${match.homeGoals}:${match.awayGoals}`,
          firstTime: `${match.homeGoalsFirstTime}:${match.awayGoalsFirstTime}`,
          secondTime: `${match.homeGoalsSecondTime}:${match.awayGoalsSecondTime}`,
          homeTeamName: match.homeTeam,
          awayTeamName: match.awayTeam,
          logoHome: match.logoHome,
          logoAway: match.logoAway,
        });
      }
    }
  });

  return {
    homeScoresMatch,
    awayScoresMatch,
  };
}
