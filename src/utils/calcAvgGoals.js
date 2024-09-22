function dataConversion(data) {
  return data.map((el) => ({
    homeTeam: el.homeTeam,
    awayTeam: el.awayTeam,
    homeGoals: Math.min(el.homeGoals, 5),
    awayGoals: Math.min(el.awayGoals, 5),
    homeGoalsFirstTime: Math.min(el.homeGoalsFirstTime, 3),
    awayGoalsFirstTime: Math.min(el.awayGoalsFirstTime, 3),
    homeGoalsSecondTime: Math.min(el.homeGoalsSecondTime, 4),
    awayGoalsSecondTime: Math.min(el.awayGoalsSecondTime, 4),
  }));
}

function calculateWeight(index) {
  return Math.pow(0.8, index); // Экспоненциальное взвешивание
}

export function calcAvgGolas(matches, teamName) {
  const historicalMatches = dataConversion(matches);
  let stats = {
    totalWeightedGoalsFor: 0,
    totalWeightedGoalsAgainst: 0,
    totalWeightedGoalsFirstHalfFor: 0,
    totalWeightedGoalsSecondHalfFor: 0,
    totalWeightedGoalsFirstHalfAgainst: 0,
    totalWeightedGoalsSecondHalfAgainst: 0,
    totalWeightFor: 0,
    totalWeightAgainst: 0,
    totalWeightFirstHalfFor: 0,
    totalWeightSecondHalfFor: 0,
    totalWeightFirstHalfAgainst: 0,
    totalWeightSecondHalfAgainst: 0,
  };

  historicalMatches.forEach((match, index) => {
    const weight = calculateWeight(index);

    if (match.homeTeam === teamName || match.awayTeam === teamName) {
      const isHome = match.homeTeam === teamName;
      const goalsFor = isHome ? match.homeGoals : match.awayGoals;
      const goalsAgainst = isHome ? match.awayGoals : match.homeGoals;
      const goalsFirstHalfFor = isHome
        ? match.homeGoalsFirstTime
        : match.awayGoalsFirstTime;
      const goalsSecondHalfFor = isHome
        ? match.homeGoalsSecondTime
        : match.awayGoalsSecondTime;
      const goalsFirstHalfAgainst = isHome
        ? match.awayGoalsFirstTime
        : match.homeGoalsFirstTime;
      const goalsSecondHalfAgainst = isHome
        ? match.awayGoalsSecondTime
        : match.homeGoalsSecondTime;
      // Суммируем забитые голы
      stats.totalWeightedGoalsFor += goalsFor * weight;
      stats.totalWeightFor += weight;

      stats.totalWeightedGoalsFirstHalfFor += goalsFirstHalfFor * weight;
      stats.totalWeightFirstHalfFor += weight;

      stats.totalWeightedGoalsSecondHalfFor += goalsSecondHalfFor * weight;
      stats.totalWeightSecondHalfFor += weight;

      // Суммируем пропущенные голы
      stats.totalWeightedGoalsAgainst += goalsAgainst * weight;
      stats.totalWeightAgainst += weight;

      stats.totalWeightedGoalsFirstHalfAgainst +=
        goalsFirstHalfAgainst * weight;
      stats.totalWeightFirstHalfAgainst += weight;

      stats.totalWeightedGoalsSecondHalfAgainst +=
        goalsSecondHalfAgainst * weight;
      stats.totalWeightSecondHalfAgainst += weight;
    }
  });

  // Рассчитываем средние значения, избегая деления на 0
  return {
    avgGoalsFor:
      stats.totalWeightFor > 0
        ? stats.totalWeightedGoalsFor / stats.totalWeightFor
        : 0,
    avgGoalsFirstHalfFor:
      stats.totalWeightFirstHalfFor > 0
        ? stats.totalWeightedGoalsFirstHalfFor / stats.totalWeightFirstHalfFor
        : 0,
    avgGoalsSecondHalfFor:
      stats.totalWeightSecondHalfFor > 0
        ? stats.totalWeightedGoalsSecondHalfFor / stats.totalWeightSecondHalfFor
        : 0,
    avgGoalsAgainst:
      stats.totalWeightAgainst > 0
        ? stats.totalWeightedGoalsAgainst / stats.totalWeightAgainst
        : 0,
    avgGoalsFirstHalfAgainst:
      stats.totalWeightFirstHalfAgainst > 0
        ? stats.totalWeightedGoalsFirstHalfAgainst /
          stats.totalWeightFirstHalfAgainst
        : 0,
    avgGoalsSecondHalfAgainst:
      stats.totalWeightSecondHalfAgainst > 0
        ? stats.totalWeightedGoalsSecondHalfAgainst /
          stats.totalWeightSecondHalfAgainst
        : 0,
  };
}
