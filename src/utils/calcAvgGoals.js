function dataConvqrsion(data) {
  const dataConv = data.map((el) => {
    return {
      homeTeam: el["7"],
      awayTeam: el["15"],
      homeGoals: Math.min(el["10"], 3) + 0.1,
      awayGoals: Math.min(el["18"], 3) - 0.1,
    };
  });

  return dataConv;
}

export function calcAvgGolas(matches, h2hMatches, team) {
  const historicalMatches = dataConvqrsion(matches);
  const historicalH2HMatches = dataConvqrsion(h2hMatches);

  // Функция для расчета экспоненциального веса
  function exponentialWeight(index, totalMatches) {
    const decay = 0.9; // Коэффициент затухания (можно настроить)
    return Math.pow(decay, totalMatches - index);
  }

  // Улучшенная функция для расчета среднего количества голов
  function calculateAvgGoals(team, matches, h2hMatches, numMatches) {
    const teamMatches = matches
      .filter((match) => match.homeTeam === team || match.awayTeam === team)
      .slice(0, numMatches);

    const combinedMatches = h2hMatches.length
      ? [...teamMatches, ...h2hMatches].slice(0, numMatches)
      : teamMatches;

    const totalGoalsFor = combinedMatches.reduce((sum, match, index) => {
      const weight = exponentialWeight(index, combinedMatches.length);
      if (match.homeTeam === team) {
        return sum + match.homeGoals * weight;
      } else if (match.awayTeam === team) {
        return sum + match.awayGoals * weight;
      }
      return sum;
    }, 0);

    const totalGoalsAgainst = combinedMatches.reduce((sum, match, index) => {
      const weight = exponentialWeight(index, combinedMatches.length);
      if (match.homeTeam === team) {
        return sum + match.awayGoals * weight;
      } else if (match.awayTeam === team) {
        return sum + match.homeGoals * weight;
      }
      return sum;
    }, 0);

    // Учитываем вес при расчете среднего количества голов
    const totalWeight = combinedMatches.reduce(
      (sum, _, index) => sum + exponentialWeight(index, combinedMatches.length),
      0
    );

    const avgGoalsFor = totalGoalsFor / totalWeight;
    const avgGoalsAgainst = totalGoalsAgainst / totalWeight;

    return {
      avgGoalsFor,
      avgGoalsAgainst,
    };
  }

  const res = calculateAvgGoals(
    team,
    historicalMatches,
    historicalH2HMatches,
    10
  );
  return res;
}
