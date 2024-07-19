function dataConvqrsion(data) {
  const dataConv = data.map((el) => {
    return {
      homeTeam: el["7"],
      awayTeam: el["15"],
      homeGoals: Math.min(el["10"], 3),
      awayGoals: Math.min(el["18"], 3),
      homeGoalsFirstTime: Math.min(el["11"], 2),
      awayGoalsFirstTime: Math.min(el["19"], 2),
      homeGoalsSecondTime: Math.min(el["10"] - el["11"], 2),
      awayGoalsSecondTime: Math.min(el["18"] - el["19"], 2),
    };
  });

  return dataConv;
}

export function calcAvgGolas(matches, h2hMatches, team) {
  console.log(matches);
  console.log(h2hMatches);
  console.log(team);

  const historicalMatches = dataConvqrsion(matches);
  const historicalH2HMatches = dataConvqrsion(h2hMatches);
  // Функция для расчета среднего количества голов за последние N матчей с учетом веса
  function calculateAvgGoals(team, matches, h2hMatches, numMatches) {
    const teamMatches = matches
      .filter((match) => match.homeTeam === team || match.awayTeam === team)
      .slice(0, numMatches);

    const combinedMatches = h2hMatches.length
      ? [...teamMatches, ...h2hMatches].slice(0, numMatches)
      : teamMatches;

    const totalGoalsFor = combinedMatches.reduce((sum, match, index) => {
      const weight = index < 5 ? 1.5 : 1;
      if (match.homeTeam === team) {
        return sum + match.homeGoals * weight;
      } else if (match.awayTeam === team) {
        return sum + match.awayGoals * weight;
      }
      return sum;
    }, 0);

    const totalGoalsAgainst = combinedMatches.reduce((sum, match, index) => {
      const weight = index < 5 ? 1.5 : 1;
      if (match.homeTeam === team) {
        return sum + match.awayGoals * weight;
      } else if (match.awayTeam === team) {
        return sum + match.homeGoals * weight;
      }
      return sum;
    }, 0);

    const avgGoalsFor = totalGoalsFor / (combinedMatches.length * 1.25);
    const avgGoalsAgainst = totalGoalsAgainst / (combinedMatches.length * 1.25);

    const totalGoalsForFirstTime = combinedMatches.reduce(
      (sum, match, index) => {
        const weight = index < 5 ? 1.5 : 1;
        if (match.homeTeam === team) {
          return sum + match.homeGoalsFirstTime * weight;
        } else if (match.awayTeam === team) {
          return sum + match.awayGoalsFirstTime * weight;
        }
        return sum;
      },
      0
    );

    const totalGoalsAgainstFirstTime = combinedMatches.reduce(
      (sum, match, index) => {
        const weight = index < 5 ? 1.5 : 1;
        if (match.homeTeam === team) {
          return sum + match.awayGoalsFirstTime * weight;
        } else if (match.awayTeam === team) {
          return sum + match.homeGoalsFirstTime * weight;
        }
        return sum;
      },
      0
    );

    const avgGoalsForFirstTime =
      totalGoalsForFirstTime / (combinedMatches.length * 1.25);
    const avgGoalsAgainstFirstTime =
      totalGoalsAgainstFirstTime / (combinedMatches.length * 1.25);

    const totalGoalsForSecondTime = combinedMatches.reduce(
      (sum, match, index) => {
        const weight = index < 5 ? 1.5 : 1;
        if (match.homeTeam === team) {
          return sum + match.homeGoalsSecondTime * weight;
        } else if (match.awayTeam === team) {
          return sum + match.awayGoalsSecondTime * weight;
        }
        return sum;
      },
      0
    );

    const totalGoalsAgainstSecondTime = combinedMatches.reduce(
      (sum, match, index) => {
        const weight = index < 5 ? 1.5 : 1;
        if (match.homeTeam === team) {
          return sum + match.awayGoalsSecondTime * weight;
        } else if (match.awayTeam === team) {
          return sum + match.homeGoalsSecondTime * weight;
        }
        return sum;
      },
      0
    );

    const avgGoalsForSecondTime =
      totalGoalsForSecondTime / (combinedMatches.length * 1.25);
    const avgGoalsAgainstSecondTime =
      totalGoalsAgainstSecondTime / (combinedMatches.length * 1.25);

    return {
      avgGoalsFor,
      avgGoalsAgainst,
      avgGoalsForFirstTime,
      avgGoalsAgainstFirstTime,
      avgGoalsForSecondTime,
      avgGoalsAgainstSecondTime,
    };
  }

  const res = calculateAvgGoals(
    team,
    historicalMatches,
    historicalH2HMatches,
    10
  );
  console.log(res);
  return res;
}
