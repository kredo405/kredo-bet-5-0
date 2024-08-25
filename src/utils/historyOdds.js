export function changeProbabilityIntoHistoryOdds(bets) {
  const result = [];

  const betsFilter = bets.filter((bet) => {
    return bet.historyOdds;
  });

  betsFilter.forEach((bet) => {
    const diffProbabillity =
      100 / bet.historyOdds[0][1] -
      100 / bet.historyOdds[bet.historyOdds.length - 1][1];
    result.push({
      odd: bet.historyOdds[bet.historyOdds.length - 1][1],
      probability: bet.probability + diffProbabillity,
      name: bet.name,
    });
  });

  return result;
}
