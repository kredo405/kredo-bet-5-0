function monteCarloPrediction(
  homeTeamStats,
  awayTeamStats,
  oddsMatch,
  simulations = 10000
) {
  const results = oddsMatch.reduce((acc, odd) => {
    acc[odd.name] = {
      count: 0,
      probability: 0,
    };
    return acc;
  }, {});

  for (let i = 0; i < simulations; i++) {
    const homeScore = simulateScore(homeTeamStats);
    const awayScore = simulateScore(awayTeamStats);

    oddsMatch.forEach((odd) => {
      odd.possibleScores.forEach((score) => {
        if (
          (score.home === homeScore && score.away === awayScore) ||
          (odd.name === "homeWin" && homeScore > awayScore) ||
          (odd.name === "awayWin" && awayScore > homeScore) ||
          (odd.name === "draw" && homeScore === awayScore)
        ) {
          results[odd.name].count++;
        }
      });
    });
  }

  Object.keys(results).forEach((key) => {
    results[key].probability = results[key].count / simulations;
  });

  return results;
}

function simulateScore(teamStats) {
  const { awgGoalsFirstTime, awgGoalsSecondTime } = teamStats;
  const firstHalfGoals = poissonRandom(awgGoalsFirstTime);
  const secondHalfGoals = poissonRandom(awgGoalsSecondTime);
  return firstHalfGoals + secondHalfGoals;
}

function poissonRandom(lambda) {
  let L = Math.exp(-lambda);
  let k = 0;
  let p = 1;

  do {
    k++;
    p *= Math.random();
  } while (p > L);

  return k - 1;
}

export default function calcMonteCarlo(
  predictions,
  odds,
  historyOdds,
  summary,
  lastMatches,
  info
) {
  const homeTeamName = info["7"]["1"];
  const awayTeamName = info["8"]["1"];

  const motivationValueHome = info["27"]["4"][0].motivation_value; // пример: 6.4
  const motivationValueAway = info["27"]["4"][1].motivation_value; // пример: 4.5

  const oddsMatch = odds.map((el) => {
    return {
      name: el.name,
      possibleScores: el.scores,
      period: el.period, // 1 - первый тайм, 2 - второй тайм, 3 - матч
      startOdd: info["6"][`${el.odd}`],
      currentOdd: info["5"][`${el.odd}`],
    };
  });

  const lastMatchesData = {
    homeTeamMatches: lastMatches[0]
      .map((match) => {
        return {
          teamHome: match[7],
          teamAway: match[15],
          homeGoals: match[10],
          awayGoals: match[18],
          homeGoalsFirstTime: match[11],
          awayGoalsFirstTime: match[19],
          homeGoalsSecondTime: match[10] - match[11],
          awayGoalsSecondTime: match[18] - match[19],
          cornersHome: match[46],
          cornerAway: match[47],
          date: match[4],
        };
      })
      .sort((a, b) => b.date - a.date),
    awayTeamMatches: lastMatches[1]
      .map((match) => {
        return {
          teamHome: match[7],
          teamAway: match[15],
          homeGoals: match[10],
          awayGoals: match[18],
          homeGoalsFirstTime: match[11],
          awayGoalsFirstTime: match[19],
          homeGoalsSecondTime: match[10] - match[11],
          awayGoalsSecondTime: match[18] - match[19],
          cornersHome: match[46],
          cornerAway: match[47],
          date: match[4],
        };
      })
      .sort((a, b) => b.date - a.date),
    h2hTeamMatches: lastMatches[2]
      ?.map((match) => {
        return {
          teamHome: match[7],
          teamAway: match[15],
          homeGoals: match[10],
          awayGoals: match[18],
          homeGoalsFirstTime: match[11],
          awayGoalsFirstTime: match[19],
          homeGoalsSecondTime: match[10] - match[11],
          awayGoalsSecondTime: match[18] - match[19],
          cornersHome: match[46],
          cornerAway: match[47],
          date: match[4],
        };
      })
      .sort((a, b) => b.date - a.date),
  };

  const statistics = {
    home: {
      awgGoals: summary[0][0]["8"],
      awgGoalsFirstTime: summary[1][0]["8"],
      awgGoalsSecondTime: summary[2][0]["8"],
      awgGoalsAgainst: summary[0][0]["9"],
      awgGoalsFirstTimeAgainst: summary[1][0]["9"],
      awgGoalsSecondTimeAgainst: summary[2][0]["9"],
      shotsOnTarget: summary[0][0]["20"],
      shotsOnTargetFirstTime: summary[1][0]["20"],
      shotsOnTargetSecondTime: summary[2][0]["20"],
      shotsOnTargetAgainst: summary[0][0]["21"],
      shotsOnTargetFirstTimeAgainst: summary[1][0]["21"],
      shotsOnTargetSecondTimeAgainst: summary[2][0]["21"],
      shots: summary[0][0]["32"],
      shotsFirstTime: summary[1][0]["32"],
      shotsSecondTime: summary[2][0]["32"],
      shotsAgainst: summary[0][0]["33"],
      shotsFirstTimeAgainst: summary[1][0]["33"],
      shotsSecondTimeAgainst: summary[2][0]["33"],
      attacks: summary[0][0]["36"],
      attacksFirstTime: summary[1][0]["36"],
      attacksSecondTime: summary[2][0]["36"],
      attacksAgainst: summary[0][0]["37"],
      attacksFirstTimeAgainst: summary[1][0]["37"],
      attacksSecondTimeAgainst: summary[2][0]["37"],
      dangerousAttacks: summary[0][0]["40"],
      dangerousAttacksFirstTime: summary[1][0]["40"],
      dangerousAttacksSecondTime: summary[2][0]["40"],
      dangerousAttacksAgainst: summary[0][0]["41"],
      dangerousAttacksFirstTimeAgainst: summary[1][0]["41"],
      dangerousAttacksSecondTimeAgainst: summary[2][0]["41"],
      possesion: summary[0][0]["71"],
      possesionFirstTime: summary[1][0]["71"],
      possesionSecondTime: summary[2][0]["71"],
      possesionAgainst: summary[0][0]["72"],
      possesionFirstTimeAgainst: summary[1][0]["72"],
      possesionSecondTimeAgainst: summary[2][0]["72"],
    },
    away: {
      awgGoals: summary[0][1]["8"],
      awgGoalsFirstTime: summary[1][1]["8"],
      awgGoalsSecondTime: summary[2][1]["8"],
      awgGoalsAgainst: summary[0][1]["9"],
      awgGoalsFirstTimeAgainst: summary[1][1]["9"],
      awgGoalsSecondTimeAgainst: summary[2][1]["9"],
      shotsOnTarget: summary[0][1]["20"],
      shotsOnTargetFirstTime: summary[1][1]["20"],
      shotsOnTargetSecondTime: summary[2][1]["20"],
      shotsOnTargetAgainst: summary[0][1]["21"],
      shotsOnTargetFirstTimeAgainst: summary[1][1]["21"],
      shotsOnTargetSecondTimeAgainst: summary[2][1]["21"],
      shots: summary[0][1]["32"],
      shotsFirstTime: summary[1][1]["32"],
      shotsSecondTime: summary[2][1]["32"],
      shotsAgainst: summary[0][1]["33"],
      shotsFirstTimeAgainst: summary[1][1]["33"],
      shotsSecondTimeAgainst: summary[2][1]["33"],
      attacks: summary[0][1]["36"],
      attacksFirstTime: summary[1][1]["36"],
      attacksSecondTime: summary[2][1]["36"],
      attacksAgainst: summary[0][1]["37"],
      attacksFirstTimeAgainst: summary[1][1]["37"],
      attacksSecondTimeAgainst: summary[2][1]["37"],
      dangerousAttacks: summary[0][1]["40"],
      dangerousAttacksFirstTime: summary[1][1]["40"],
      dangerousAttacksSecondTime: summary[2][1]["40"],
      dangerousAttacksAgainst: summary[0][1]["41"],
      dangerousAttacksFirstTimeAgainst: summary[1][1]["41"],
      dangerousAttacksSecondTimeAgainst: summary[2][1]["41"],
      possesion: summary[0][1]["71"],
      possesionFirstTime: summary[1][1]["71"],
      possesionSecondTime: summary[2][1]["71"],
      possesionAgainst: summary[0][1]["72"],
      possesionFirstTimeAgainst: summary[1][1]["72"],
      possesionSecondTimeAgainst: summary[2][1]["72"],
    },
  };

  const predictionResults = monteCarloPrediction(
    statistics.home,
    statistics.away,
    oddsMatch
  );

  console.log(predictionResults);
}
