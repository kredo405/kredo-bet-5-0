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
    winnerHomeOdd: el.winnerHomeOdd,
    winnerAwayOdd: el.winnerAwayOdd,
    xgHome: el.xgHome,
    xgAway: el.xgAway,
  }));
}

export function calcAvgGolas(matches, teamName) {
  const historicalMatches = dataConversion(matches);

  let totalWeightedGoalsFor = 0; // Сумма взвешенных голов забитых за весь матч
  let totalWeightedGoalsAgainst = 0; // Сумма взвешенных голов пропущенных за весь матч
  let totalWeightedGoalsFirstHalfFor = 0; // Сумма взвешенных голов забитых в первом тайме
  let totalWeightedGoalsSecondHalfFor = 0; // Сумма взвешенных голов забитых во втором тайме
  let totalWeightedGoalsFirstHalfAgainst = 0; // Сумма взвешенных голов пропущенных в первом тайме
  let totalWeightedGoalsSecondHalfAgainst = 0; // Сумма взвешенных голов пропущенных во втором тайме
  let totalWeightFor = 0; // Общий вес для голов забитых за весь матч
  let totalWeightAgainst = 0; // Общий вес для голов пропущенных за весь матч
  let totalWeightFirstHalfFor = 0; // Общий вес для голов забитых в первом тайме
  let totalWeightSecondHalfFor = 0; // Общий вес для голов забитых во втором тайме
  let totalWeightFirstHalfAgainst = 0; // Общий вес для голов пропущенных в первом тайме
  let totalWeightSecondHalfAgainst = 0; // Общий вес для голов пропущенных во втором тайме

  historicalMatches.forEach((match, index) => {
    const weight = Math.pow(0.8, index); // Экспоненциальное взвешивание
    let coeffAdjustment = 1;

    console.log(
      `Processing match ${index + 1}: ${match.homeTeam} vs ${match.awayTeam}`
    );

    if (match.homeTeam === teamName) {
      // Команда играет дома
      const goalsFor = match.xgHome > 0 ? match.xgHome : match.homeGoals;
      const goalsFirstHalfFor = match.homeGoalsFirstTime;
      const goalsSecondHalfFor = match.homeGoalsSecondTime;
      const goalsFirstHalfAgainst = match.awayGoalsFirstTime;
      const goalsSecondHalfAgainst = match.awayGoalsSecondTime;

      console.log(
        `Team ${teamName} is home. Full Match Goals: ${goalsFor}, 1st Half Goals: ${goalsFirstHalfFor}, 2nd Half Goals: ${goalsSecondHalfFor}`
      );

      // Корректировка веса в зависимости от коэффициентов
      if (match.winnerHomeOdd > 0 && match.winnerAwayOdd > 0) {
        coeffAdjustment = Math.max(
          match.winnerHomeOdd / match.winnerAwayOdd,
          match.winnerAwayOdd / match.winnerHomeOdd
        );
      }

      totalWeightedGoalsFor += goalsFor * weight * coeffAdjustment;
      totalWeightFor += weight * coeffAdjustment;

      totalWeightedGoalsFirstHalfFor +=
        goalsFirstHalfFor * weight * coeffAdjustment;
      totalWeightFirstHalfFor += weight * coeffAdjustment;

      totalWeightedGoalsSecondHalfFor +=
        goalsSecondHalfFor * weight * coeffAdjustment;
      totalWeightSecondHalfFor += weight * coeffAdjustment;

      totalWeightedGoalsFirstHalfAgainst +=
        goalsFirstHalfAgainst * weight * coeffAdjustment;
      totalWeightFirstHalfAgainst += weight * coeffAdjustment;

      totalWeightedGoalsSecondHalfAgainst +=
        goalsSecondHalfAgainst * weight * coeffAdjustment;
      totalWeightSecondHalfAgainst += weight * coeffAdjustment;

      // Ожидаемые пропущенные голы за весь матч
      const goalsAgainst = match.awayGoals;
      const xgAgainst = match.xgAway > 0 ? match.xgAway : goalsAgainst;

      totalWeightedGoalsAgainst += xgAgainst * weight * coeffAdjustment;
      totalWeightAgainst += weight * coeffAdjustment;
    } else if (match.awayTeam === teamName) {
      // Команда играет в гостях
      const goalsFor = match.xgAway > 0 ? match.xgAway : match.awayGoals;
      const goalsFirstHalfFor = match.awayGoalsFirstTime;
      const goalsSecondHalfFor = match.awayGoalsSecondTime;
      const goalsFirstHalfAgainst = match.homeGoalsFirstTime;
      const goalsSecondHalfAgainst = match.homeGoalsSecondTime;

      console.log(
        `Team ${teamName} is away. Full Match Goals: ${goalsFor}, 1st Half Goals: ${goalsFirstHalfFor}, 2nd Half Goals: ${goalsSecondHalfFor}`
      );

      // Корректировка веса в зависимости от коэффициентов
      if (match.winnerHomeOdd > 0 && match.winnerAwayOdd > 0) {
        coeffAdjustment = Math.max(
          match.winnerAwayOdd / match.winnerHomeOdd,
          match.winnerHomeOdd / match.winnerAwayOdd
        );
      }

      totalWeightedGoalsFor += goalsFor * weight * coeffAdjustment;
      totalWeightFor += weight * coeffAdjustment;

      totalWeightedGoalsFirstHalfFor +=
        goalsFirstHalfFor * weight * coeffAdjustment;
      totalWeightFirstHalfFor += weight * coeffAdjustment;

      totalWeightedGoalsSecondHalfFor +=
        goalsSecondHalfFor * weight * coeffAdjustment;
      totalWeightSecondHalfFor += weight * coeffAdjustment;

      totalWeightedGoalsFirstHalfAgainst +=
        goalsFirstHalfAgainst * weight * coeffAdjustment;
      totalWeightFirstHalfAgainst += weight * coeffAdjustment;

      totalWeightedGoalsSecondHalfAgainst +=
        goalsSecondHalfAgainst * weight * coeffAdjustment;
      totalWeightSecondHalfAgainst += weight * coeffAdjustment;

      // Ожидаемые пропущенные голы за весь матч
      const goalsAgainst = match.homeGoals;
      const xgAgainst = match.xgHome > 0 ? match.xgHome : goalsAgainst;

      totalWeightedGoalsAgainst += xgAgainst * weight * coeffAdjustment;
      totalWeightAgainst += weight * coeffAdjustment;
    }
  });

  // Проверка на деление на 0
  const avgGoalsFor =
    totalWeightFor > 0 ? totalWeightedGoalsFor / totalWeightFor : 0;
  const avgGoalsFirstHalfFor =
    totalWeightFirstHalfFor > 0
      ? totalWeightedGoalsFirstHalfFor / totalWeightFirstHalfFor
      : 0;
  const avgGoalsSecondHalfFor =
    totalWeightSecondHalfFor > 0
      ? totalWeightedGoalsSecondHalfFor / totalWeightSecondHalfFor
      : 0;
  const avgGoalsAgainst =
    totalWeightAgainst > 0 ? totalWeightedGoalsAgainst / totalWeightAgainst : 0;
  const avgGoalsFirstHalfAgainst =
    totalWeightFirstHalfAgainst > 0
      ? totalWeightedGoalsFirstHalfAgainst / totalWeightFirstHalfAgainst
      : 0;
  const avgGoalsSecondHalfAgainst =
    totalWeightSecondHalfAgainst > 0
      ? totalWeightedGoalsSecondHalfAgainst / totalWeightSecondHalfAgainst
      : 0;

  return {
    avgGoalsFor,
    avgGoalsFirstHalfFor,
    avgGoalsSecondHalfFor,
    avgGoalsAgainst,
    avgGoalsFirstHalfAgainst,
    avgGoalsSecondHalfAgainst,
  };
}
