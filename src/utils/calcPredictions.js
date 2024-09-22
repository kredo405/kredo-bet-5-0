import {
  scoresMatch,
  scoresFirstTime,
  scoresSecondTime,
} from "../variables/scores";
import { calcAvgGolas } from "./calcAvgGoals";
import { monteCarloScoreSimulation } from "./calcMonteCarlo";
import { changeProbabilityIntoHistoryOdds } from "./historyOdds";
import { removeDuplicateByProfit } from "./removeDublicates";
import { updateScoresBasedOnOdds } from "./updateScoresBasedOnOdds";

export const calcPredictions = (
  predictions,
  odds,
  historyOdds,
  info,
  lastMatchesInfoHome,
  lastMatchesInfoAway
) => {
  const data = [];
  const allBets = [];
  const teamHomeName = info["7"]["1"];
  const teamAwayName = info["8"]["1"];

  console.log(info);

  // function findKeysByValue(obj, value) {
  //   const keys = [];
  //   for (const key in obj) {
  //     if (obj[key] === value) {
  //       keys.push(key);
  //     }
  //   }
  //   return keys;
  // }

  // console.log(findKeysByValue(info["5"], 4.65));

  const lastMatchesHome = lastMatchesInfoHome.map((el) => {
    return {
      homeTeam: el.data.match.data.match["7"]["1"],
      awayTeam: el.data.match.data.match["8"]["1"],
      logoHome: el.data.match.data.match["7"]["2"],
      logoAway: el.data.match.data.match["8"]["2"],
      homeGoals: el.data.match.data.match["7"]["4"],
      awayGoals: el.data.match.data.match["8"]["4"],
      homeGoalsFirstTime: el.data.match.data.match["7"]["5"],
      awayGoalsFirstTime: el.data.match.data.match["8"]["5"],
      homeGoalsSecondTime:
        el.data.match.data.match["7"]["4"] - el.data.match.data.match["7"]["5"],
      awayGoalsSecondTime:
        el.data.match.data.match["8"]["4"] - el.data.match.data.match["8"]["5"],
      xgHome:
        el.data.match.data.match["17"] &&
        el.data.match.data.match["17"]["0"]["21"]
          ? el.data.match.data.match["17"]["0"]["21"]["0"]
          : 0,
      xgAway:
        el.data.match.data.match["17"] &&
        el.data.match.data.match["17"]["0"]["21"]
          ? el.data.match.data.match["17"][0]["21"][1]
          : 0,
      winnerHomeOdd: el.data.match.data.match["5"]
        ? el.data.match.data.match["5"]["1"]
        : 0,
      winnerAwayOdd: el.data.match.data.match["5"]
        ? el.data.match.data.match["5"]["2"]
        : 0,
      statusHome: el.data.match.data.match["27"]["4"][0].current_match_text
        ? el.data.match.data.match["27"]["4"][0].current_match_text
            .split("-")[1]
            .trim()
        : null,
      statusAway: el.data.match.data.match["27"]["4"][1].current_match_text
        ? el.data.match.data.match["27"]["4"][1].current_match_text
            .split("-")[1]
            .trim()
        : null,
    };
  });
  const lastMatchesAway = lastMatchesInfoAway.map((el) => {
    return {
      homeTeam: el.data.match.data.match["7"]["1"],
      awayTeam: el.data.match.data.match["8"]["1"],
      logoHome: el.data.match.data.match["7"]["2"],
      logoAway: el.data.match.data.match["8"]["2"],
      homeGoals: el.data.match.data.match["7"]["4"],
      awayGoals: el.data.match.data.match["8"]["4"],
      homeGoalsFirstTime: el.data.match.data.match["7"]["5"],
      awayGoalsFirstTime: el.data.match.data.match["8"]["5"],
      homeGoalsSecondTime:
        el.data.match.data.match["7"]["4"] - el.data.match.data.match["7"]["5"],
      awayGoalsSecondTime:
        el.data.match.data.match["8"]["4"] - el.data.match.data.match["8"]["5"],
      xgHome:
        el.data.match.data.match["17"] &&
        el.data.match.data.match["17"]["0"]["21"]
          ? el.data.match.data.match["17"]["0"]["21"]["0"]
          : 0,
      xgAway:
        el.data.match.data.match["17"] &&
        el.data.match.data.match["17"]["0"]["21"]
          ? el.data.match.data.match["17"][0]["21"][1]
          : 0,
      winnerHomeOdd: el.data.match.data.match["5"]
        ? el.data.match.data.match["5"]["1"]
        : 0,
      winnerAwayOdd: el.data.match.data.match["5"]
        ? el.data.match.data.match["5"]["2"]
        : 0,
      statusHome: el.data.match.data.match["27"]["4"][0].current_match_text
        ? el.data.match.data.match["27"]["4"][0].current_match_text
            .split("-")[1]
            .trim()
        : "Равные",
      statusAway: el.data.match.data.match["27"]["4"][1].current_match_text
        ? el.data.match.data.match["27"]["4"][1].current_match_text
            .split("-")[1]
            .trim()
        : "Равные",
    };
  });

  // Рассчитывем индивидуальные тоталы команд
  const avgGoalsHome = calcAvgGolas(lastMatchesHome, teamHomeName);
  const avgGoalsAway = calcAvgGolas(lastMatchesAway, teamAwayName);

  const individualTotalHome =
    (avgGoalsHome.avgGoalsFor + avgGoalsAway.avgGoalsAgainst) / 2;
  const individualTotalAway =
    (avgGoalsAway.avgGoalsFor + avgGoalsHome.avgGoalsAgainst) / 2;
  const individualTotalHomeFirstHalf =
    (avgGoalsHome.avgGoalsFirstHalfFor +
      avgGoalsAway.avgGoalsFirstHalfAgainst) /
    2;
  const individualTotalAwayFirstHalf =
    (avgGoalsHome.avgGoalsFirstHalfAgainst +
      avgGoalsAway.avgGoalsFirstHalfFor) /
    2;
  const individualTotalHomeSeondHalf =
    (avgGoalsHome.avgGoalsSecondHalfFor +
      avgGoalsAway.avgGoalsSecondHalfAgainst) /
    2;
  const individualTotalAwaySecondHalf =
    (avgGoalsHome.avgGoalsSecondHalfAgainst +
      avgGoalsAway.avgGoalsSecondHalfFor) /
    2;

  // Рассчитываем вероятности счетов методом распределения паунсона и метода монтекарло

  const probabilities = monteCarloScoreSimulation(
    individualTotalHome,
    individualTotalAway
  );

  const probabilitiesFitstTime = monteCarloScoreSimulation(
    individualTotalHomeFirstHalf,
    individualTotalAwayFirstHalf
  );

  const probabilitiesSecondTime = monteCarloScoreSimulation(
    individualTotalHomeSeondHalf,
    individualTotalAwaySecondHalf
  );

  // Соединяем дааные вероятностей с мировыми данными

  for (let score in probabilities) {
    for (let worldScore in scoresMatch) {
      if (score === worldScore) {
        scoresMatch[worldScore].probability =
          (probabilities[score] + scoresMatch[worldScore].worldProbabilty) / 2;
      }
    }
  }

  for (let score in probabilitiesFitstTime) {
    for (let worldScore in scoresFirstTime) {
      if (score === worldScore) {
        scoresFirstTime[worldScore].probability = probabilitiesFitstTime[score];
      }
    }
  }

  for (let score in probabilitiesSecondTime) {
    for (let worldScore in scoresSecondTime) {
      if (score === worldScore) {
        scoresSecondTime[worldScore].probability =
          probabilitiesSecondTime[score];
      }
    }
  }

  // Пример использования функции
  const currentOdds = { home: info["5"]["1"], away: info["5"]["2"] }; // текущие коэффициенты
  const homeStatus = info["27"]["4"][0].current_match_text.split("-")[1].trim();
  const awayStatus = info["27"]["4"][1].current_match_text.split("-")[1].trim();

  const lastScores = updateScoresBasedOnOdds(
    lastMatchesHome,
    lastMatchesAway,
    homeStatus,
    awayStatus,
    teamHomeName,
    teamAwayName,
    currentOdds
  );

  console.log(lastScores);

  // Собираем данные из прогнозов и коэффициентов
  predictions.forEach((prediction) => {
    odds.forEach((odd) => {
      // Добавляем все прогнозы
      if (+odd.odd === prediction[2]) {
        data.push({
          odd: prediction[3],
          name: odd.name,
          historyOdds: historyOdds[`${odd.odd}`],
          profit: prediction[6],
          period: odd.period,
          scores: odd.scores,
        });
      }
    });
  });

  const dataFiltered = removeDuplicateByProfit(data);

  // Рассчитаываем Коэфиценты прогноза для Счетов
  dataFiltered.forEach((prediction) => {
    const countScores = prediction.scores.length;
    const normalizationFactor = 1 / countScores; // Нормализующий коэффициент
    const profitOnScores =
      (prediction.profit / countScores) * normalizationFactor;

    if (prediction.period === 3) {
      prediction.scores.forEach((score) => {
        scoresMatch[score].quantity += profitOnScores;
      });
    } else if (prediction.period === 1) {
      prediction.scores.forEach((score) => {
        scoresFirstTime[score].quantity += profitOnScores;
      });
    } else if (prediction.period === 2) {
      prediction.scores.forEach((score) => {
        scoresSecondTime[score].quantity += profitOnScores;
      });
    }
  });

  odds.forEach((odd) => {
    let probabilityBet = 0;

    if (odd.period === 3) {
      odd.scores.forEach((score) => {
        probabilityBet += scoresMatch[score].probability;
      });
    } else if (odd.period === 1) {
      odd.scores.forEach((score) => {
        probabilityBet += scoresFirstTime[score].probability;
      });
    } else if (odd.period === 2) {
      odd.scores.forEach((score) => {
        probabilityBet += scoresSecondTime[score].probability;
      });
    }

    const predictOdd = odd.scores.reduce((acc, curr) => {
      if (odd.period === 3) {
        return acc + scoresMatch[curr].quantity;
      }
      if (odd.period === 1) {
        return acc + scoresFirstTime[curr].quantity;
      }
      if (odd.period === 2) {
        return acc + scoresSecondTime[curr].quantity;
      }
    }, 0);

    const scores =
      odd.period === 3
        ? odd.scores.map((score) => ({
            name: score,
            quantity: scoresMatch[score].quantity,
            probability: scoresMatch[score].probability,
          }))
        : odd.period === 1
        ? odd.scores.map((score) => ({
            name: score,
            quantity: scoresFirstTime[score].quantity,
            probability: scoresFirstTime[score].probability,
          }))
        : odd.scores.map((score) => ({
            name: score,
            quantity: scoresSecondTime[score].quantity,
            probability: scoresSecondTime[score].probability,
          }));

    if (odd.period === 3 || odd.period === 1) {
      allBets.push({
        name: odd.name,
        probability: probabilityBet,
        period: odd.period,
        odd: historyOdds[`${odd.odd}`]
          ? historyOdds[`${odd.odd}`][historyOdds[`${odd.odd}`].length - 1][1]
          : null,
        historyOdds: historyOdds[`${odd.odd}`],
        predictOdd,
        scores,
      });
    }
  });

  console.log(allBets);
  // Фильтруем ставки чтобы коэфициент был больше чем 1.55
  const betsFilter = allBets.filter((bet) => bet.odd > 1.5);
  const betsSorted = betsFilter
    .sort((a, b) => {
      if (a.predictOdd > b.predictOdd) {
        return -1;
      } else if (a.predictOdd < b.predictOdd) {
        return 1;
      } else {
        return 0;
      }
    })
    .slice(0, 3);
  console.log(betsSorted);

  return {
    sample: dataFiltered.length,
    betsSorted,
    info: info[27][3],
    lastScores,
  };
};
