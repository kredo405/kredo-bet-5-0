import { relevance } from "./relevence";

export const calcPredictions = (info, predictions, outcomes, moneyWay1x2, moneyWayOverUnder, correctScore) => {
  console.log(outcomes)
  const bets = Object.assign({}, outcomes);
  console.log(outcomes)
  // Рассчитываем метод монтекарло по мотивации
  const motivationHomeOdd = info.motivation[0].motivation_value;
  const motivationAwayOdd = info.motivation[0].motivation_value;

  const changeValueOutcomes = (motivationHomeOdd, motivationAwayOdd) => {

          bets.winnerHome.percent += motivationHomeOdd;
          bets.winOrDrawHome.percent += motivationHomeOdd;
          bets.foraHomePlus15.percent += motivationHomeOdd;
          bets.foraHomeMinus15.percent += motivationHomeOdd;
          bets.it1O05.percent += motivationHomeOdd;
          bets.it1O15.percent += motivationHomeOdd;
          bets.it1O25.percent += motivationHomeOdd;
          bets.it1U05.percent -= motivationHomeOdd;
          bets.it1U15.percent -= motivationHomeOdd;
          bets.it1U25.percent -= motivationHomeOdd;
          // bets.to15.percent += 3;
          // bets.to25.percent += 3;
          // bets.to35.percent += 3;
          // bets.tu15.percent -= 3;
          // bets.tu25.percent -= 3;
          // bets.tu35.percent -= 3;
          // bets.btsYes.percent += 3;
          // bets.btsNo.percent -= 3;
          // bets.draw.percent += 3;

          bets.winnerAway.percent += motivationAwayOdd;
          bets.winOrdrawAway.percent += motivationAwayOdd;
          bets.foraAwayPlus15.percent += motivationAwayOdd;
          bets.foraAwayMinus15.percent += motivationAwayOdd;
          bets.it2O05.percent += motivationAwayOdd;
          bets.it2O15.percent += motivationAwayOdd;
          bets.it2O25.percent += motivationAwayOdd;
          bets.it2U05.percent -= motivationAwayOdd;
          bets.it2U15.percent -= motivationAwayOdd;
          bets.it2U25.percent -= motivationAwayOdd;
  }
  // новый объект с пересчитанными значениями иходов
  changeValueOutcomes(motivationHomeOdd, motivationAwayOdd);

  const relevanceTeam = relevance(info.teams_form.home ? info.teams_form.home.matches : [1, 1], info.teams_form.away ? info.teams_form.away.matches : [1, 1]);

  // Рассчитываем исходы исходя из формы
  const calcValueForForm = (relevanceTeam) => {
    if (relevanceTeam.percentHome - relevanceTeam.percentAway > 15 && relevanceTeam.percentHome - relevanceTeam.percentAway <= 30) {
      bets.winnerHome.percent += 5;
      bets.winnerAway.percent -= 5;
      bets.winOrDrawHome.percent += 5;
      bets.winOrdrawAway.percent -= 5;
      bets.foraHomePlus15.percent += 5;
      bets.foraAwayPlus15.percent -= 5;
      bets.foraHomeMinus15.percent += 5;
      bets.foraAwayMinus15.percent -= 5;
      bets.it1O05.percent += 5;
      bets.it1O15.percent += 5;
      bets.it1O25.percent += 5;
      bets.it1U05.percent -= 5;
      bets.it1U15.percent -= 5;
      bets.it1U25.percent -= 5;
      bets.it2O05.percent -= 5;
      bets.it2O15.percent -= 5;
      bets.it2O25.percent -= 5;
      bets.it2U05.percent += 5;
      bets.it2U15.percent += 5;
      bets.it2U25.percent += 5;
    }
    if (relevanceTeam.percentHome - relevanceTeam.percentAway > 30) {
      bets.winnerHome.percent += 8;
      bets.winnerAway.percent -= 8;
      bets.winOrDrawHome.percent += 8;
      bets.winOrdrawAway.percent -= 8;
      bets.foraHomePlus15.percent += 8;
      bets.foraAwayPlus15.percent -= 8;
      bets.foraHomeMinus15.percent += 8;
      bets.foraAwayMinus15.percent -= 8;
      bets.it1O05.percent += 8;
      bets.it1O15.percent += 8;
      bets.it1O25.percent += 8;
      bets.it1U05.percent -= 8;
      bets.it1U15.percent -= 8;
      bets.it1U25.percent -= 8;
      bets.it2O05.percent -= 8;
      bets.it2O15.percent -= 8;
      bets.it2O25.percent -= 8;
      bets.it2U05.percent += 8;
      bets.it2U15.percent += 8;
      bets.it2U25.percent += 8;
    }
    if (relevanceTeam.percentAway - relevanceTeam.percentHome > 15 && relevanceTeam.percentAway - relevanceTeam.percentHome <= 30) {
      bets.winnerHome.percent -= 5;
      bets.winnerAway.percent += 5;
      bets.winOrDrawHome.percent -= 5;
      bets.winOrdrawAway.percent += 5;
      bets.foraHomePlus15.percent -= 5;
      bets.foraAwayPlus15.percent += 5;
      bets.foraHomeMinus15.percent -= 5;
      bets.foraAwayMinus15.percent += 5;
      bets.it1O05.percent -= 5;
      bets.it1O15.percent -= 5;
      bets.it1O25.percent -= 5;
      bets.it1U05.percent += 5;
      bets.it1U15.percent += 5;
      bets.it1U25.percent += 5;
      bets.it2O05.percent += 5;
      bets.it2O15.percent += 5;
      bets.it2O25.percent += 5;
      bets.it2U05.percent -= 5;
      bets.it2U15.percent -= 5;
      bets.it2U25.percent -= 5;
    }
    if (relevanceTeam.percentAway - relevanceTeam.percentHome > 30) {
      bets.winnerHome.percent -= 8;
      bets.winnerAway.percent += 8;
      bets.winOrDrawHome.percent -= 8;
      bets.winOrdrawAway.percent += 8;
      bets.foraHomePlus15.percent -= 8;
      bets.foraAwayPlus15.percent += 8;
      bets.foraHomeMinus15.percent -= 8;
      bets.foraAwayMinus15.percent += 8;
      bets.it1O05.percent -= 8;
      bets.it1O15.percent -= 8;
      bets.it1O25.percent -= 8;
      bets.it1U05.percent += 8;
      bets.it1U15.percent += 8;
      bets.it1U25.percent += 8;
      bets.it2O05.percent += 8;
      bets.it2O15.percent += 8;
      bets.it2O25.percent += 8;
      bets.it2U05.percent -= 8;
      bets.it2U15.percent -= 8;
      bets.it2U25.percent -= 8;
    }
  }

  calcValueForForm(relevanceTeam);

  // ищем и изменяем исход исходя из прогноза в api 
  const clacValueForPredict = (odd) => {
    for (let key in bets) {
      if (bets[key].num === odd) {
        bets[key].percent += 7;
      }
    }
  }

  clacValueForPredict(info.forecast.odds_type);

  // изменяем исходы исходя из результатов матчей
  const clacValueForMatches = (array, homeName, awayName) => {

    const filterMatches = (array, name, str) => {
      const arr = array.filter(el => {
        if (el[str] === name) {
          return el;
        }
      });

      return arr;
    }

    const arrMatchesHomeTeamHome = filterMatches(array[0], homeName, 'team1_name');
    const arrMatchesHomeTeamAway = filterMatches(array[0], homeName, 'team2_name');
    const arrMatchesAwayTeamHome = filterMatches(array[1], awayName, 'team1_name');
    const arrMatchesAwayTeamAway = filterMatches(array[1], awayName, 'team2_name');

    const arrMatchesHomeTeamHomeH2h = array[2].length > 0 ? filterMatches(array[2], homeName, 'team1_name') : [];
    const arrMatchesHomeTeamAwayH2h = array[2].length > 0 ? filterMatches(array[2], homeName, 'team2_name') : [];
    const arrMatchesAwayTeamHomeH2h = array[2].length > 0 ? filterMatches(array[2], awayName, 'team1_name') : [];
    const arrMatchesAwayTeamAwayH2h = array[2].length > 0 ? filterMatches(array[2], awayName, 'team2_name') : [];

    if (bets?.winnerHome) {
      // для домашних матчей домашней команды
      arrMatchesHomeTeamHome.forEach(el => {
        const scoreHome = el.score[0] + el.score[2];
        const scoreAway = el.score[1] + el.score[3];

        if (scoreHome > scoreAway) {
          bets.winnerHome.percent += 5;
        }
        if (scoreHome >= scoreAway) {
          bets.winOrDrawHome.percent += 5;
        }
        if (scoreHome - scoreAway >= -1) {
          bets.foraHomePlus15.percent += 5;
        }
        if (scoreHome - scoreAway >= 2) {
          bets.foraHomeMinus15.percent += 5;
        }
        if (scoreHome > 0) {
          bets.it1O05.percent += 5;
        }
        if (scoreHome > 1) {
          bets.it1O15.percent += 5;
        }
        if (scoreHome > 2) {
          bets.it1O25.percent += 5;
        }
        if (scoreHome < 1) {
          bets.it1U05.percent += 5;
        }
        if (scoreHome < 2) {
          bets.it1U15.percent += 5;
        }
        if (scoreHome < 3) {
          bets.it1U25.percent += 5;
        }
        if (scoreHome + scoreAway > 1) {
          bets.to15.percent += 5;
        }
        if (scoreHome + scoreAway > 2) {
          bets.to25.percent += 5;
        }
        if (scoreHome + scoreAway > 3) {
          bets.to35.percent += 5;
        }
        if (scoreHome + scoreAway < 2) {
          bets.tu15.percent += 5;
        }
        if (scoreHome + scoreAway < 3) {
          bets.tu25.percent += 5;
        }
        if (scoreHome + scoreAway < 4) {
          bets.tu35.percent += 5;
        }
        if (scoreHome > 0 && scoreAway > 0) {
          bets.btsYes.percent += 5;
        }
        if (scoreHome > 0 && scoreAway === 0 || scoreHome === 0 && scoreAway > 0) {
          bets.btsNo.percent += 5;
        }
        if (scoreHome === scoreAway) {
          bets.draw.percent += 5;
        }
      });

      // Для гостевых матчей домашней команды
      arrMatchesHomeTeamAway.forEach(el => {
        const scoreHome = el.score[0] + el.score[2];
        const scoreAway = el.score[1] + el.score[3];

        if (scoreAway > scoreHome) {
          bets.winnerHome.percent += 5;
        }
        if (scoreAway >= scoreHome) {
          bets.winOrDrawHome.percent += 5;
        }
        if (scoreAway - scoreHome >= -1) {
          bets.foraHomePlus15.percent += 5;
        }
        if (scoreAway - scoreHome >= 2) {
          bets.foraHomeMinus15.percent += 5;
        }
        if (scoreAway > 0) {
          bets.it1O05.percent += 5;
        }
        if (scoreAway > 1) {
          bets.it1O15.percent += 5;
        }
        if (scoreAway > 2) {
          bets.it1O25.percent += 5;
        }
        if (scoreAway < 1) {
          bets.it1U05.percent += 5;
        }
        if (scoreAway < 2) {
          bets.it1U15.percent += 5;
        }
        if (scoreAway < 3) {
          bets.it1U25.percent += 5;
        }
        if (scoreHome + scoreAway > 1) {
          bets.to15.percent += 5;
        }
        if (scoreHome + scoreAway > 2) {
          bets.to25.percent += 5;
        }
        if (scoreHome + scoreAway > 3) {
          bets.to35.percent += 5;
        }
        if (scoreHome + scoreAway < 2) {
          bets.tu15.percent += 5;
        }
        if (scoreHome + scoreAway < 3) {
          bets.tu25.percent += 5;
        }
        if (scoreHome + scoreAway < 4) {
          bets.tu35.percent += 5;
        }
        if (scoreHome > 0 && scoreAway > 0) {
          bets.btsYes.percent += 5;
        }
        if (scoreHome > 0 && scoreAway === 0 || scoreHome === 0 && scoreAway > 0) {
          bets.btsNo.percent += 5;
        }
        if (scoreHome === scoreAway) {
          bets.draw.percent += 5;
        }
      });
    }

    if (arrMatchesHomeTeamHomeH2h.length > 0) {
      // Для домашних матчей домашней команды h2h
      arrMatchesHomeTeamHomeH2h.forEach(el => {
        const scoreHome = el.score[0] + el.score[2];
        const scoreAway = el.score[1] + el.score[3];

        if (scoreHome > scoreAway) {
          bets.winnerHome.percent += 2;
        }
        if (scoreHome >= scoreAway) {
          if(bets?.winOrDrawHome?.percent) {
            bets.winOrDrawHome.percent += 5;
          }
        }
        if (scoreHome - scoreAway >= -1) {
          bets.foraHomePlus15.percent += 5;
        }
        if (scoreHome - scoreAway >= 2) {
          bets.foraHomeMinus15.percent += 5;
        }
        if (scoreHome > 0) {
          bets.it1O05.percent += 5;
        }
        if (scoreHome > 1) {
          bets.it1O15.percent += 5;
        }
        if (scoreHome > 2) {
          bets.it1O25.percent += 5;
        }
        if (scoreHome < 1) {
          bets.it1U05.percent += 5;
        }
        if (scoreHome < 2) {
          bets.it1U15.percent += 5;
        }
        if (scoreHome < 3) {
          bets.it1U25.percent += 5;
        }
        if (scoreHome + scoreAway > 1) {
          bets.to15.percent += 5;
        }
        if (scoreHome + scoreAway > 2) {
          bets.to25.percent += 5;
        }
        if (scoreHome + scoreAway > 3) {
          bets.to35.percent += 5;
        }
        if (scoreHome + scoreAway < 2) {
          bets.tu15.percent += 5;
        }
        if (scoreHome + scoreAway < 3) {
          bets.tu25.percent += 5;
        }
        if (scoreHome + scoreAway < 4) {
          bets.tu35.percent += 5;
        }
        if (scoreHome > 0 && scoreAway > 0) {
          bets.btsYes.percent += 5;
        }
        if (scoreHome > 0 && scoreAway === 0 || scoreHome === 0 && scoreAway > 0) {
          bets.btsNo.percent += 5;
        }
        if (scoreHome === scoreAway) {
          bets.draw.percent += 5;
        }
      });
    }

    if (arrMatchesHomeTeamAwayH2h.length > 0) {
      // Для гостевых матчей домашней команды h2h
      arrMatchesHomeTeamAwayH2h.forEach(el => {
        const scoreHome = el.score[0] + el.score[2];
        const scoreAway = el.score[1] + el.score[3];

        if (scoreAway > scoreHome) {
          bets.winnerHome.percent += 5;
        }
        if (scoreAway >= scoreHome) {
          bets.winOrDrawHome.percent += 5;
        }
        if (scoreAway - scoreHome >= -1) {
          bets.foraHomePlus15.percent += 5;
        }
        if (scoreAway - scoreHome >= 2) {
          bets.foraHomeMinus15.percent += 5;
        }
        if (scoreAway > 0) {
          bets.it1O05.percent += 5;
        }
        if (scoreAway > 1) {
          bets.it1O15.percent += 5;
        }
        if (scoreAway > 2) {
          bets.it1O25.percent += 5;
        }
        if (scoreAway < 1) {
          bets.it1U05.percent += 5;
        }
        if (scoreAway < 2) {
          bets.it1U15.percent += 5;
        }
        if (scoreAway < 3) {
          bets.it1U25.percent += 5;
        }
        if (scoreHome + scoreAway > 1) {
          bets.to15.percent += 5;
        }
        if (scoreHome + scoreAway > 2) {
          bets.to25.percent += 5;
        }
        if (scoreHome + scoreAway > 3) {
          bets.to35.percent += 5;
        }
        if (scoreHome + scoreAway < 2) {
          bets.tu15.percent += 5;
        }
        if (scoreHome + scoreAway < 3) {
          bets.tu25.percent += 5;
        }
        if (scoreHome + scoreAway < 4) {
          bets.tu35.percent += 5;
        }
        if (scoreHome > 0 && scoreAway > 0) {
          bets.btsYes.percent += 5;
        }
        if (scoreHome > 0 && scoreAway === 0 || scoreHome === 0 && scoreAway > 0) {
          bets.btsNo.percent += 5;
        }
        if (scoreHome === scoreAway) {
          bets.draw.percent += 5;
        }
      });
    }

    // для домашних матчей гостевой команды
    arrMatchesAwayTeamHome.forEach(el => {
      const scoreHome = el.score[0] + el.score[2];
      const scoreAway = el.score[1] + el.score[3];

      if (scoreHome > scoreAway) {
        bets.winnerAway.percent += 5;
      }
      if (scoreHome >= scoreAway) {
        bets.winOrdrawAway.percent += 5;
      }
      if (scoreHome - scoreAway >= -1) {
        bets.foraAwayPlus15.percent += 5;
      }
      if (scoreHome - scoreAway >= 2) {
        bets.foraAwayMinus15.percent += 5;
      }
      if (scoreHome > 0) {
        bets.it2O05.percent += 5;
      }
      if (scoreHome > 1) {
        bets.it2O15.percent += 5;
      }
      if (scoreHome > 2) {
        bets.it2O25.percent += 5;
      }
      if (scoreHome < 1) {
        bets.it2U05.percent += 5;
      }
      if (scoreHome < 2) {
        bets.it2U15.percent += 5;
      }
      if (scoreHome < 3) {
        bets.it2U25.percent += 5;
      }
      if (scoreHome + scoreAway > 1) {
        bets.to15.percent += 5;
      }
      if (scoreHome + scoreAway > 2) {
        bets.to25.percent += 5;
      }
      if (scoreHome + scoreAway > 3) {
        bets.to35.percent += 5;
      }
      if (scoreHome + scoreAway < 2) {
        bets.tu15.percent += 5;
      }
      if (scoreHome + scoreAway < 3) {
        bets.tu25.percent += 5;
      }
      if (scoreHome + scoreAway < 4) {
        bets.tu35.percent += 5;
      }
      if (scoreHome > 0 && scoreAway > 0) {
        bets.btsYes.percent += 5;
      }
      if (scoreHome > 0 && scoreAway === 0 || scoreHome === 0 && scoreAway > 0) {
        bets.btsNo.percent += 5;
      }
      if (scoreHome === scoreAway) {
        bets.draw.percent += 5;
      }
    });

    // Для гостевых матчей гостевой команды
    arrMatchesAwayTeamAway.forEach(el => {
      const scoreHome = el.score[0] + el.score[2];
      const scoreAway = el.score[1] + el.score[3];

      if (scoreAway > scoreHome) {
        bets.winnerAway.percent += 5;
      }
      if (scoreAway >= scoreHome) {
        bets.winOrdrawAway.percent += 5;
      }
      if (scoreAway - scoreHome >= -1) {
        bets.foraAwayPlus15.percent += 5;
      }
      if (scoreAway - scoreHome >= 2) {
        bets.foraAwayMinus15.percent += 5;
      }
      if (scoreAway > 0) {
        bets.it2O05.percent += 5;
      }
      if (scoreAway > 1) {
        bets.it2O15.percent += 5;
      }
      if (scoreAway > 2) {
        bets.it2O25.percent += 5;
      }
      if (scoreAway < 1) {
        bets.it2U05.percent += 5;
      }
      if (scoreAway < 2) {
        bets.it2U15.percent += 5;
      }
      if (scoreAway < 3) {
        bets.it2U25.percent += 5;
      }
      if (scoreHome + scoreAway > 1) {
        bets.to15.percent += 5;
      }
      if (scoreHome + scoreAway > 2) {
        bets.to25.percent += 5;
      }
      if (scoreHome + scoreAway > 3) {
        bets.to35.percent += 5;
      }
      if (scoreHome + scoreAway < 2) {
        bets.tu15.percent += 5;
      }
      if (scoreHome + scoreAway < 3) {
        bets.tu25.percent += 5;
      }
      if (scoreHome + scoreAway < 4) {
        bets.tu35.percent += 5;
      }
      if (scoreHome > 0 && scoreAway > 0) {
        bets.btsYes.percent += 5;
      }
      if (scoreHome > 0 && scoreAway === 0 || scoreHome === 0 && scoreAway > 0) {
        bets.btsNo.percent += 5;
      }
      if (scoreHome === scoreAway) {
        bets.draw.percent += 5;
      }
    });

    if (arrMatchesAwayTeamHomeH2h.length > 0) {
      // Для домашних матчей гостевой команды h2h
      arrMatchesAwayTeamHomeH2h.forEach(el => {
        const scoreHome = el.score[0] + el.score[2];
        const scoreAway = el.score[1] + el.score[3];

        if (scoreHome > scoreAway) {
          bets.winnerAway.percent += 5;
        }
        if (scoreHome >= scoreAway) {
          bets.winOrdrawAway.percent += 5;
        }
        if (scoreHome - scoreAway >= -1) {
          bets.foraAwayPlus15.percent += 5;
        }
        if (scoreHome - scoreAway >= 2) {
          bets.foraAwayMinus15.percent += 5;
        }
        if (scoreHome > 0) {
          bets.it2O05.percent += 5;
        }
        if (scoreHome > 1) {
          bets.it2O15.percent += 5;
        }
        if (scoreHome > 2) {
          bets.it2O25.percent += 5;
        }
        if (scoreHome < 1) {
          bets.it2U05.percent += 5;
        }
        if (scoreHome < 2) {
          bets.it2U15.percent += 5;
        }
        if (scoreHome < 3) {
          bets.it2U25.percent += 5;
        }
        if (scoreHome + scoreAway > 1) {
          bets.to15.percent += 5;
        }
        if (scoreHome + scoreAway > 2) {
          bets.to25.percent += 5;
        }
        if (scoreHome + scoreAway > 3) {
          bets.to35.percent += 5;
        }
        if (scoreHome + scoreAway < 2) {
          bets.tu15.percent += 5;
        }
        if (scoreHome + scoreAway < 3) {
          bets.tu25.percent += 5;
        }
        if (scoreHome + scoreAway < 4) {
          bets.tu35.percent += 5;
        }
        if (scoreHome > 0 && scoreAway > 0) {
          bets.btsYes.percent += 5;
        }
        if (scoreHome > 0 && scoreAway === 0 || scoreHome === 0 && scoreAway > 0) {
          bets.btsNo.percent += 5;
        }
        if (scoreHome === scoreAway) {
          bets.draw.percent += 5;
        }
      });

    }

    if (arrMatchesAwayTeamAwayH2h.length > 0) {
      // Для гостевых матчей гостевой команды h2h
      arrMatchesAwayTeamAwayH2h.forEach(el => {
        const scoreHome = el.score[0] + el.score[2];
        const scoreAway = el.score[1] + el.score[3];

        if (scoreAway > scoreHome) {
          bets.winnerAway.percent += 5;
        }
        if (scoreAway >= scoreHome) {
          bets.winOrdrawAway.percent += 5;
        }
        if (scoreAway - scoreHome >= -1) {
          bets.foraAwayPlus15.percent += 5;
        }
        if (scoreAway - scoreHome >= 2) {
          bets.foraAwayMinus15.percent += 5;
        }
        if (scoreAway > 0) {
          bets.it2O05.percent += 5;
        }
        if (scoreAway > 1) {
          bets.it2O15.percent += 5;
        }
        if (scoreAway > 2) {
          bets.it2O25.percent += 5;
        }
        if (scoreAway < 1) {
          bets.it2U05.percent += 5;
        }
        if (scoreAway < 2) {
          bets.it2U15.percent += 5;
        }
        if (scoreAway < 3) {
          bets.it2U25.percent += 5;
        }
        if (scoreHome + scoreAway > 1) {
          bets.to15.percent += 5;
        }
        if (scoreHome + scoreAway > 2) {
          bets.to25.percent += 5;
        }
        if (scoreHome + scoreAway > 3) {
          bets.to35.percent += 5;
        }
        if (scoreHome + scoreAway < 2) {
          bets.tu15.percent += 5;
        }
        if (scoreHome + scoreAway < 3) {
          bets.tu25.percent += 5;
        }
        if (scoreHome + scoreAway < 4) {
          bets.tu35.percent += 5;
        }
        if (scoreHome > 0 && scoreAway > 0) {
          bets.btsYes.percent += 5;
        }
        if (scoreHome > 0 && scoreAway === 0 || scoreHome === 0 && scoreAway > 0) {
          bets.btsNo.percent += 5;
        }
        if (scoreHome === scoreAway) {
          bets.draw.percent += 5;
        }
      });
    }
  }

  clacValueForMatches(info.matches, info.team1_name, info.team2_name);

  // Рассчитываем исходы исходя из фактов
  const clacValueForFacts = (facts) => {
    for (let key in bets) {
      facts.forEach(item => {
        if (item[1] === bets[key].num) {
          bets[key].bets.forEach(el => {
            for (let key1 in bets) {
              if (el === String(bets[key1].num)) {
                bets[key1].percent += 10;
              }
            }
          });
        }
      });
    }
  }

  clacValueForFacts(info.facts)

  const calcValueForUserTopTips = (tip) => {
    for (let key in bets) {
      bets[key].bets.forEach(el => {
        if (el === tip) {
          bets[key].percent += 10
        }
      })
      
    }
  }

  if(info.users_top_tip) {
    calcValueForUserTopTips(info.users_top_tip[0]);
  }
  
  const calcValueForDroppingOdds = (first_odds, current_odds) => {
    for (let i in first_odds) {
      for (let j in current_odds) {
        const oddsDiff = first_odds[i] - current_odds[i];
        for (let key in bets) {
          if (bets[key].num === i) {
            if (oddsDiff > 0) {
              bets[key].percent += 10
            }
            if (oddsDiff < 0) {
              bets[key].percent -= 10
            }
          }
        }
      }
    }
  }

  calcValueForDroppingOdds(info.first_odds, info.current_odds);


  const calcValueForPredictions = (predictions) => {
    for (let key in bets) {
      predictions.forEach(el => {
        bets[key].bets.forEach(item => {
          if (item === el[2]) {
            bets[key].percent += 10;
          }
        })
      })
    }
  }

  calcValueForPredictions(predictions);

  const calcValueForMoneyWay1x2 = (moneyWay) => {
    if (moneyWay.homeName) {
      const posHome = moneyWay.percentHome.indexOf('%');
      const posDraw = moneyWay.percentDraw.indexOf('%');
      const posAway = moneyWay.percentAway.indexOf('%');

      const percentHome = moneyWay.percentHome.slice(0, posHome - 1);
      const percentDraw = moneyWay.percentDraw.slice(0, posDraw - 1);
      const percentAway = moneyWay.percentAway.slice(0, posAway - 1);

      const findOutcomes = (property, percent) => {
        bets[property].bets.forEach(el => {
          for (let key in bets) {
            if (String(bets[key].num) === el) {
              bets[key].percent += (+percent / 10);
            }
          }
        });
      }

      findOutcomes('winnerHome', percentHome);
      findOutcomes('winnerAway', percentAway);
      findOutcomes('draw', percentDraw);
    }
  }

  calcValueForMoneyWay1x2(moneyWay1x2);

  const calcValueForMoneyWayOverUnder = (moneyWay) => {
    if (moneyWay.homeName) {
      const posOver = moneyWay.percentOver.indexOf('%');
      const posUnder = moneyWay.percentUnder.indexOf('%');

      const percentOver = moneyWay.percentOver.slice(0, posOver - 1);
      const percentUnder = moneyWay.percentUnder.slice(0, posUnder - 1);


      const findOutcomes = (property, percent) => {
        bets[property].bets.forEach(el => {
          for (let key in bets) {
            if (String(bets[key].num) === el) {
              bets[key].percent += (+percent / 10);
            }
          }
        });
      }

      findOutcomes('to35', percentOver);
      findOutcomes('tu15', percentUnder);
    }
  }

  calcValueForMoneyWayOverUnder(moneyWayOverUnder);


  const calcValueForCorrectScore = (correctScore) => {
    if (correctScore.homeName) {
      const pos0_0 = correctScore.scores[0].score0_0.percent.indexOf('%');
      const percent0_0 = correctScore.scores[0].score0_0.percent.slice(0, pos0_0);
      // Приплюсовываем значение к исходам подходящим под счет 0:0
      bets.draw.percent += +percent0_0;
      bets.winOrDrawHome.percent += +percent0_0;
      bets.winOrdrawAway.percent += +percent0_0;
      bets.foraHomePlus15.percent += +percent0_0;
      bets.foraAwayPlus15.percent += +percent0_0;
      bets.tu15.percent += +percent0_0;
      bets.tu25.percent += +percent0_0;
      bets.tu35.percent += +percent0_0;
      bets.btsNo.percent += +percent0_0;
      bets.it1U05.percent += +percent0_0;
      bets.it1U15.percent += +percent0_0;
      bets.it1U25.percent += +percent0_0;
      bets.it2U05.percent += +percent0_0;
      bets.it2U15.percent += +percent0_0;
      bets.it2U25.percent += +percent0_0;

      const pos0_1 = correctScore.scores[1].score0_1.percent.indexOf('%');
      const percent0_1 = correctScore.scores[1].score0_1.percent.slice(0, pos0_1);
      // Приплюсовываем значение к исходам подходящим под счет 0:1
      bets.winnerAway.percent += +percent0_1;
      bets.winOrdrawAway.percent += +percent0_1;
      bets.foraHomePlus15.percent += +percent0_1;
      bets.foraAwayPlus15.percent += +percent0_1;
      bets.tu15.percent += +percent0_1;
      bets.tu25.percent += +percent0_1;
      bets.tu35.percent += +percent0_1;
      bets.btsNo.percent += +percent0_1;
      bets.it1U05.percent += +percent0_1;
      bets.it1U15.percent += +percent0_1;
      bets.it1U25.percent += +percent0_1;
      bets.it2O05.percent += +percent0_1;
      bets.it2U15.percent += +percent0_1;
      bets.it2U25.percent += +percent0_1;

      const pos0_2 = correctScore.scores[2].score0_2.percent.indexOf('%');
      const percent0_2 = correctScore.scores[2].score0_2.percent.slice(0, pos0_2);
      // Приплюсовываем значение к исходам подходящим под счет 0:2
      bets.winnerAway.percent += +percent0_2;
      bets.winOrdrawAway.percent += +percent0_2;
      bets.foraAwayMinus15.percent += +percent0_2;
      bets.foraAwayPlus15.percent += +percent0_2;
      bets.to15.percent += +percent0_2;
      bets.tu25.percent += +percent0_2;
      bets.tu35.percent += +percent0_2;
      bets.btsNo.percent += +percent0_2;
      bets.it1U05.percent += +percent0_2;
      bets.it1U15.percent += +percent0_2;
      bets.it1U25.percent += +percent0_2;
      bets.it2O05.percent += +percent0_2;
      bets.it2O15.percent += +percent0_2;
      bets.it2U25.percent += +percent0_2;

      const pos0_3 = correctScore.scores[3].score0_3.percent.indexOf('%');
      const percent0_3 = correctScore.scores[3].score0_3.percent.slice(0, pos0_3);
      // Приплюсовываем значение к исходам подходящим под счет 0:3
      bets.winnerAway.percent += +percent0_3;
      bets.winOrdrawAway.percent += +percent0_3;
      bets.foraAwayMinus15.percent += +percent0_3;
      bets.foraAwayPlus15.percent += +percent0_3;
      bets.to15.percent += +percent0_3;
      bets.to25.percent += +percent0_3;
      bets.tu35.percent += +percent0_3;
      bets.btsNo.percent += +percent0_3;
      bets.it1U05.percent += +percent0_3;
      bets.it1U15.percent += +percent0_3;
      bets.it1U25.percent += +percent0_3;
      bets.it2O05.percent += +percent0_3;
      bets.it2O15.percent += +percent0_3;
      bets.it2O25.percent += +percent0_3;

      const pos1_0 = correctScore.scores[4].score1_0.percent.indexOf('%');
      const percent1_0 = correctScore.scores[4].score1_0.percent.slice(0, pos1_0);
      // Приплюсовываем значение к исходам подходящим под счет 1:0
      bets.winnerHome.percent += +percent1_0;
      bets.winOrDrawHome.percent += +percent1_0;
      bets.foraHomePlus15.percent += +percent1_0;
      bets.foraAwayPlus15.percent += +percent1_0;
      bets.tu15.percent += +percent1_0;
      bets.tu25.percent += +percent1_0;
      bets.tu35.percent += +percent1_0;
      bets.btsNo.percent += +percent1_0;
      bets.it1O05.percent += +percent1_0;
      bets.it1U15.percent += +percent1_0;
      bets.it1U25.percent += +percent1_0;
      bets.it2U05.percent += +percent1_0;
      bets.it2U15.percent += +percent1_0;
      bets.it2U25.percent += +percent1_0;

      const pos1_1 = correctScore.scores[5].score1_1.percent.indexOf('%');
      const percent1_1 = correctScore.scores[5].score1_1.percent.slice(0, pos1_1);
      // Приплюсовываем значение к исходам подходящим под счет 1:1
      bets.draw.percent += +percent1_1;
      bets.winOrDrawHome.percent += +percent1_1;
      bets.winOrdrawAway.percent += +percent1_1;
      bets.foraHomePlus15.percent += +percent1_1;
      bets.foraAwayPlus15.percent += +percent1_1;
      bets.to15.percent += +percent1_1;
      bets.tu25.percent += +percent1_1;
      bets.tu35.percent += +percent1_1;
      bets.btsYes.percent += +percent1_1;
      bets.it1O05.percent += +percent1_1;
      bets.it1U15.percent += +percent1_1;
      bets.it1U25.percent += +percent1_1;
      bets.it2O05.percent += +percent1_1;
      bets.it2U15.percent += +percent1_1;
      bets.it2U25.percent += +percent1_1;

      const pos1_2 = correctScore.scores[6].score1_2.percent.indexOf('%');
      const percent1_2 = correctScore.scores[6].score1_2.percent.slice(0, pos1_2);
      // Приплюсовываем значение к исходам подходящим под счет 1:2
      bets.winnerAway.percent += +percent1_2;
      bets.winOrdrawAway.percent += +percent1_2;
      bets.foraHomePlus15.percent += +percent1_2;
      bets.foraAwayPlus15.percent += +percent1_2;
      bets.to15.percent += +percent1_2;
      bets.to25.percent += +percent1_2;
      bets.tu35.percent += +percent1_2;
      bets.btsYes.percent += +percent1_2;
      bets.it1O05.percent += +percent1_2;
      bets.it1U15.percent += +percent1_2;
      bets.it1U25.percent += +percent1_2;
      bets.it2O05.percent += +percent1_2;
      bets.it2O15.percent += +percent1_2;
      bets.it2U25.percent += +percent1_2;

      const pos1_3 = correctScore.scores[7].score1_3.percent.indexOf('%');
      const percent1_3 = correctScore.scores[7].score1_3.percent.slice(0, pos1_3);
      // Приплюсовываем значение к исходам подходящим под счет 1:3
      bets.winnerAway.percent += +percent1_3;
      bets.winOrdrawAway.percent += +percent1_3;
      bets.foraAwayMinus15.percent += +percent1_3;
      bets.foraAwayPlus15.percent += +percent1_3;
      bets.to15.percent += +percent1_3;
      bets.to25.percent += +percent1_3;
      bets.to35.percent += +percent1_3;
      bets.btsYes.percent += +percent1_3;
      bets.it1O05.percent += +percent1_3;
      bets.it1U15.percent += +percent1_3;
      bets.it1U25.percent += +percent1_3;
      bets.it2O05.percent += +percent1_3;
      bets.it2O15.percent += +percent1_3;
      bets.it2O25.percent += +percent1_3;

      const pos2_0 = correctScore.scores[8].score2_0.percent.indexOf('%');
      const percent2_0 = correctScore.scores[8].score2_0.percent.slice(0, pos2_0);
      // Приплюсовываем значение к исходам подходящим под счет 2:0
      bets.winnerHome.percent += +percent2_0;
      bets.winOrDrawHome.percent += +percent2_0;
      bets.foraHomeMinus15.percent += +percent2_0;
      bets.foraHomePlus15.percent += +percent2_0;
      bets.to15.percent += +percent2_0;
      bets.tu25.percent += +percent2_0;
      bets.tu35.percent += +percent2_0;
      bets.btsNo.percent += +percent2_0;
      bets.it1O05.percent += +percent2_0;
      bets.it1O15.percent += +percent2_0;
      bets.it1U25.percent += +percent2_0;
      bets.it2U05.percent += +percent2_0;
      bets.it2U15.percent += +percent2_0;
      bets.it2U25.percent += +percent2_0;

      const pos2_1 = correctScore.scores[9].score2_1.percent.indexOf('%');
      const percent2_1 = correctScore.scores[9].score2_1.percent.slice(0, pos2_1);
      // Приплюсовываем значение к исходам подходящим под счет 2:1
      bets.winnerHome.percent += +percent2_1;
      bets.winOrDrawHome.percent += +percent2_1;
      bets.foraAwayPlus15.percent += +percent2_1;
      bets.foraHomePlus15.percent += +percent2_1;
      bets.to15.percent += +percent2_1;
      bets.to25.percent += +percent2_1;
      bets.tu35.percent += +percent2_1;
      bets.btsYes.percent += +percent2_1;
      bets.it1O05.percent += +percent2_1;
      bets.it1O15.percent += +percent2_1;
      bets.it1U25.percent += +percent2_1;
      bets.it2O05.percent += +percent2_1;
      bets.it2U15.percent += +percent2_1;
      bets.it2U25.percent += +percent2_1;

      const pos2_2 = correctScore.scores[10].score2_2.percent.indexOf('%');
      const percent2_2 = correctScore.scores[10].score2_2.percent.slice(0, pos2_2);
      // Приплюсовываем значение к исходам подходящим под счет 2:2
      bets.draw.percent += +percent2_2;
      bets.winOrDrawHome.percent += +percent2_2;
      bets.winOrdrawAway.percent += +percent2_2;
      bets.foraAwayPlus15.percent += +percent2_2;
      bets.foraHomePlus15.percent += +percent2_2;
      bets.to15.percent += +percent2_2;
      bets.to25.percent += +percent2_2;
      bets.to35.percent += +percent2_2;
      bets.btsYes.percent += +percent2_2;
      bets.it1O05.percent += +percent2_2;
      bets.it1O15.percent += +percent2_2;
      bets.it1U25.percent += +percent2_2;
      bets.it2O05.percent += +percent2_2;
      bets.it2O15.percent += +percent2_2;
      bets.it2U25.percent += +percent2_2;

      const pos2_3 = correctScore.scores[11].score2_3.percent.indexOf('%');
      const percent2_3 = correctScore.scores[11].score2_3.percent.slice(0, pos2_3);
      // Приплюсовываем значение к исходам подходящим под счет 2:3
      bets.winnerAway.percent += +percent2_3;
      bets.winOrdrawAway.percent += +percent2_3;
      bets.foraAwayPlus15.percent += +percent2_3;
      bets.foraHomePlus15.percent += +percent2_3;
      bets.to15.percent += +percent2_3;
      bets.to25.percent += +percent2_3;
      bets.to35.percent += +percent2_3;
      bets.btsYes.percent += +percent2_3;
      bets.it1O05.percent += +percent2_3;
      bets.it1O15.percent += +percent2_3;
      bets.it1U25.percent += +percent2_3;
      bets.it2O05.percent += +percent2_3;
      bets.it2O15.percent += +percent2_3;
      bets.it2O25.percent += +percent2_3;

      const pos3_0 = correctScore.scores[12].score3_0.percent.indexOf('%');
      const percent3_0 = correctScore.scores[12].score3_0.percent.slice(0, pos3_0);
      // Приплюсовываем значение к исходам подходящим под счет 3:0
      bets.winnerHome.percent += +percent3_0;
      bets.winOrDrawHome.percent += +percent3_0;
      bets.foraHomeMinus15.percent += +percent3_0;
      bets.foraHomePlus15.percent += +percent3_0;
      bets.to15.percent += +percent3_0;
      bets.to25.percent += +percent3_0;
      bets.tu35.percent += +percent3_0;
      bets.btsNo.percent += +percent3_0;
      bets.it1O05.percent += +percent3_0;
      bets.it1O15.percent += +percent3_0;
      bets.it1O25.percent += +percent3_0;
      bets.it2U05.percent += +percent3_0;
      bets.it2U15.percent += +percent3_0;
      bets.it2U25.percent += +percent3_0;

      const pos3_1 = correctScore.scores[13].score3_1.percent.indexOf('%');
      const percent3_1 = correctScore.scores[13].score3_1.percent.slice(0, pos3_1);
      // Приплюсовываем значение к исходам подходящим под счет 3:1
      bets.winnerHome.percent += +percent3_1;
      bets.winOrDrawHome.percent += +percent3_1;
      bets.foraHomeMinus15.percent += +percent3_1;
      bets.foraHomePlus15.percent += +percent3_1;
      bets.to15.percent += +percent3_1;
      bets.to25.percent += +percent3_1;
      bets.to35.percent += +percent3_1;
      bets.btsYes.percent += +percent3_1;
      bets.it1O05.percent += +percent3_1;
      bets.it1O15.percent += +percent3_1;
      bets.it1O25.percent += +percent3_1;
      bets.it2O05.percent += +percent3_1;
      bets.it2U15.percent += +percent3_1;
      bets.it2U25.percent += +percent3_1;

      const pos3_2 = correctScore.scores[14].score3_2.percent.indexOf('%');
      const percent3_2 = correctScore.scores[14].score3_2.percent.slice(0, pos3_2);
      // Приплюсовываем значение к исходам подходящим под счет 3:2
      bets.winnerHome.percent += +percent3_2;
      bets.winOrDrawHome.percent += +percent3_2;
      bets.foraAwayPlus15.percent += +percent3_2;
      bets.foraHomePlus15.percent += +percent3_2;
      bets.to15.percent += +percent3_2;
      bets.to25.percent += +percent3_2;
      bets.to35.percent += +percent3_2;
      bets.btsYes.percent += +percent3_2;
      bets.it1O05.percent += +percent3_2;
      bets.it1O15.percent += +percent3_2;
      bets.it1O25.percent += +percent3_2;
      bets.it2O05.percent += +percent3_2;
      bets.it2O15.percent += +percent3_2;
      bets.it2U25.percent += +percent3_2;

      const pos3_3 = correctScore.scores[15].score3_3.percent.indexOf('%');
      const percent3_3 = correctScore.scores[15].score3_3.percent.slice(0, pos3_3);
      // Приплюсовываем значение к исходам подходящим под счет 3:3
      bets.draw.percent += +percent3_3;
      bets.winOrDrawHome.percent += +percent3_3;
      bets.winOrdrawAway.percent += +percent3_3;
      bets.foraAwayPlus15.percent += +percent3_3;
      bets.foraHomePlus15.percent += +percent3_3;
      bets.to15.percent += +percent3_3;
      bets.to25.percent += +percent3_3;
      bets.to35.percent += +percent3_3;
      bets.btsYes.percent += +percent3_3;
      bets.it1O05.percent += +percent3_3;
      bets.it1O15.percent += +percent3_3;
      bets.it1O25.percent += +percent3_3;
      bets.it2O05.percent += +percent3_3;
      bets.it2O15.percent += +percent3_3;
      bets.it2O25.percent += +percent3_3;
    }
  }

  calcValueForCorrectScore(correctScore)

  const arrOutcomes = [];

  for (let key in bets) {
    if (bets[key].odds !== undefined && bets[key].odds >= 1.45) {
      arrOutcomes.push(bets[key]);
    }
  }

  const getArrLargestValues = (arr, byValue = 'percent') => {
    let result = arr;

    result.sort((a, b) => a[byValue] - b[byValue]);
    result = result.reverse();

    return result;
  }

  const newArr = getArrLargestValues(arrOutcomes);

  return [newArr[0], newArr[1], newArr[2], newArr[3]];

}
