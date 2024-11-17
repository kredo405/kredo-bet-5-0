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
import { calculateTeamForm } from "./calculateTeamForm";
import { CodeSandboxCircleFilled } from "@ant-design/icons";
import { calculateAverageXG } from "./calculateAverageXG";
import { calculateTeamStrength } from "./calculateTeamStrength";

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

  const teamHomeGoalsAvgFor = info["27"]["8"][0]["5"] / info["27"]["8"][0]["1"];
  const teamAwayGoalsAvgFor = info["27"]["8"][1]["5"] / info["27"]["8"][1]["1"];
  const scoresMatchCopy = JSON.parse(JSON.stringify(scoresMatch));

  const teamHomeGoalsAvgAgainst =
    info["27"]["8"][0]["6"] / info["27"]["8"][0]["6"];
  const teamAwayGoalsAvgAgainst =
    info["27"]["8"][1]["6"] / info["27"]["8"][1]["6"];

  console.log(info);

  predictions.forEach((prediction) => {
    odds.forEach((odd) => {
      // Добавляем все прогнозы
      if (+odd.odd === prediction[2]) {
        data.push({
          odd: prediction[3],
          name: odd.name,
          historyOdds: historyOdds[`${odd.odd}`],
          period: odd.period,
          scores: odd.scores,
        });
      }
    });
  });

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

  // Рассчитываем индивидуальные тоталы команд
  const avgGoalsHome = calcAvgGolas(lastMatchesHome, teamHomeName);
  const avgGoalsAway = calcAvgGolas(lastMatchesAway, teamAwayName);

  const individualTotalHome =
    (avgGoalsHome.avgGoalsFor + avgGoalsAway.avgGoalsAgainst) / 2;
  const individualTotalAway =
    (avgGoalsAway.avgGoalsFor + avgGoalsHome.avgGoalsAgainst) / 2;

  // const homeForm = calculateTeamForm(lastMatchesHome, 5, teamHomeName);
  // const awayForm = calculateTeamForm(lastMatchesAway, 5, teamAwayName);

  // const avgXGHome = calculateAverageXG(lastMatchesHome, 5, teamHomeName);
  // const avgXGAway = calculateAverageXG(lastMatchesAway, 5, teamAwayName);

  // const strengthsHome = calculateTeamStrength(lastMatchesHome, teamHomeName);
  // const strengthsAway = calculateTeamStrength(lastMatchesAway, teamAwayName);

  // console.log(strengthsHome);
  // console.log(strengthsAway);

  // Рассчитываем вероятности счетов методом Монте-Карло

  const probabilities = monteCarloScoreSimulation(
    individualTotalHome,
    individualTotalAway,
    100000
  );

  console.log(probabilities);

  // Соединяем данные вероятностей с мировыми данными

  for (let score in probabilities) {
    for (let worldScore in scoresMatchCopy) {
      if (score === worldScore) {
        scoresMatchCopy[worldScore].probability =
          (probabilities[score] + scoresMatchCopy[worldScore].worldProbabilty) /
          2;
      }
    }
  }

  data.forEach((el) => {
    if (el.period === 3) {
      el.scores.forEach((score) => {
        scoresMatchCopy[score].quantity += scoresMatchCopy[score].probability;
      });
    }
  });

  console.log(scoresMatchCopy);

  function findTop3ByQuantity(scoresMatchCopy) {
    // Преобразуем объект в массив, чтобы сортировать
    const entries = Object.entries(scoresMatchCopy);

    // Сортируем массив по значению `quantity` в порядке убывания
    entries.sort((a, b) => b[1].quantity - a[1].quantity);

    // Берём первые 3 результата и возвращаем их в виде объекта
    const top3 = entries.slice(0, 3);

    // Преобразуем массив обратно в объект
    return Object.fromEntries(top3);
  }

  // Пример использования
  const top3Scores = findTop3ByQuantity(scoresMatchCopy);

  const top3ScoresKeys = Object.keys(top3Scores);
  console.log(top3ScoresKeys);

  const topPredictions = odds.map((el) => {
    if (
      el.scores.find((el) => el === top3ScoresKeys[0]) &&
      el.scores.find((el) => el === top3ScoresKeys[1]) &&
      el.scores.find((el) => el === top3ScoresKeys[1]) &&
      el.period === 3
    ) {
      return {
        ...el,
        historyOdds: historyOdds[`${el.odd}`],
        probability: el.scores.reduce(
          (acc, el) => acc + scoresMatchCopy[el].probability,
          0
        ),
      };
    }
  });

  const topPredictionsFiltered = topPredictions.filter((el) => {
    return el !== undefined && el.historyOdds
      ? el.historyOdds[el.historyOdds.length - 1][1] > 1.4
      : false;
  });

  console.log(topPredictionsFiltered);

  const topredicionSorted = topPredictionsFiltered.sort(
    (a, b) => b.probability - a.probability
  );

  return {
    sample: data.length,
    topredicionSorted,
    info: info[27][3],
  };
};
