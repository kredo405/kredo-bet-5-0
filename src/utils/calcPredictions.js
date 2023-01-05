import { relevance } from "./relevence";

export const calcPredictions = (valueClass, info, form, predictions, outcomes) => {
  const bets = Object.assign({}, outcomes);

  // Рассчитываем метод монтекарло по мотивации
  const motivationHomeOdd = info.motivation[0].motivation_value;
  const motivationAwayOdd = info.motivation[0].motivation_value;

  const calcMotivationDifference = (oddHome, oddAway) => {
    if (oddHome > oddAway) {
      return oddHome - oddAway;
    }
    if (oddAway > oddHome) {
      return oddAway - oddHome;
    }
    else {
      return 0
    }
  }

  const motivationDifference = calcMotivationDifference(motivationHomeOdd, motivationAwayOdd);

  const changeValueOutcomes = (motivationDifference, motivationHomeOdd, motivationAwayOdd) => {
    if (motivationHomeOdd > motivationAwayOdd) {
      switch (motivationDifference) {
        case 1:
          bets.winnerHome.percent += 1;
          bets.winnerAway.percent -= 1;
          bets.winOrDrawHome.percent += 1;
          bets.winOrdrawAway.percent -= 1;
          bets.foraHomePlus15.percent += 1;
          bets.foraAwayPlus15.percent -= 1;
          bets.foraHomeMinus15.percent += 1;
          bets.foraAwayMinus15.percent -= 1;
          bets.it1O05.percent += 1;
          bets.it1O15.percent += 1;
          bets.it1O25.percent += 1;
          bets.it1U05.percent -= 1;
          bets.it1U15.percent -= 1;
          bets.it1U25.percent -= 1;
          bets.it2O05.percent -= 1;
          bets.it2O15.percent -= 1;
          bets.it2O25.percent -= 1;
          bets.it2U05.percent += 1;
          bets.it2U15.percent += 1;
          bets.it2U25.percent += 1;
          bets.to15.percent += 3;
          bets.to25.percent += 3;
          bets.to35.percent += 3;
          bets.tu15.percent -= 3;
          bets.tu25.percent -= 3;
          bets.tu35.percent -= 3;
          bets.btsYes.percent += 3;
          bets.btsNo.percent -= 3;
          bets.draw.percent += 3;
          break;
        case 2:
          bets.winnerHome.percent += 2;
          bets.winnerAway.percent -= 2;
          bets.winOrDrawHome.percent += 2;
          bets.winOrdrawAway.percent -= 2;
          bets.foraHomePlus15.percent += 2;
          bets.foraAwayPlus15.percent -= 2;
          bets.foraHomeMinus15.percent += 2;
          bets.foraAwayMinus15.percent -= 2;
          bets.it1O05.percent += 2;
          bets.it1O15.percent += 2;
          bets.it1O25.percent += 2;
          bets.it1U05.percent -= 2;
          bets.it1U15.percent -= 2;
          bets.it1U25.percent -= 2;
          bets.it2O05.percent -= 2;
          bets.it2O15.percent -= 2;
          bets.it2O25.percent -= 2;
          bets.it2U05.percent += 2;
          bets.it2U15.percent += 2;
          bets.it2U25.percent += 2;
          bets.to15.percent += 2;
          bets.to25.percent += 1;
          bets.tu15.percent -= 2;
          bets.tu25.percent -= 1
          bets.btsYes.percent += 1;
          bets.btsNo.percent -= 1;
          bets.draw.percent += 1;
          break;
        case 3:
          bets.winnerHome.percent += 3;
          bets.winnerAway.percent -= 3;
          bets.winOrDrawHome.percent += 3;
          bets.winOrdrawAway.percent -= 3;
          bets.foraHomePlus15.percent += 3;
          bets.foraAwayPlus15.percent -= 3;
          bets.foraHomeMinus15.percent += 3;
          bets.foraAwayMinus15.percent -= 3;
          bets.it1O05.percent += 3;
          bets.it1O15.percent += 3;
          bets.it1O25.percent += 3;
          bets.it1U05.percent -= 3;
          bets.it1U15.percent -= 3;
          bets.it1U25.percent -= 3;
          bets.it2O05.percent -= 3;
          bets.it2O15.percent -= 3;
          bets.it2O25.percent -= 3;
          bets.it2U05.percent += 3;
          bets.it2U15.percent += 3;
          bets.it2U25.percent += 3;
          bets.to15.percent += 1;
          bets.tu15.percent -= 1;
          bets.tu35.percent += 1;
          break;
        case 4:
          bets.winnerHome.percent += 4;
          bets.winnerAway.percent -= 4;
          bets.winOrDrawHome.percent += 4;
          bets.winOrdrawAway.percent -= 4;
          bets.foraHomePlus15.percent += 4;
          bets.foraAwayPlus15.percent -= 4;
          bets.foraHomeMinus15.percent += 4;
          bets.foraAwayMinus15.percent -= 4;
          bets.it1O05.percent += 4;
          bets.it1O15.percent += 4;
          bets.it1O25.percent += 4;
          bets.it1U05.percent -= 4;
          bets.it1U15.percent -= 4;
          bets.it1U25.percent -= 4;
          bets.it2O05.percent -= 4;
          bets.it2O15.percent -= 4;
          bets.it2O25.percent -= 4;
          bets.it2U05.percent += 4;
          bets.it2U15.percent += 4;
          bets.it2U25.percent += 4;
          bets.to25.percent -= 1;
          bets.to35.percent -= 2;
          bets.tu25.percent += 1;
          bets.tu35.percent += 2;
          bets.btsYes.percent -= 1;
          bets.btsNo.percent += 1;
          bets.draw.percent -= 1;
          break;
        case 5:
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
          bets.to15.percent -= 1;
          bets.to25.percent -= 2;
          bets.to35.percent -= 3;
          bets.tu15.percent += 1;
          bets.tu25.percent += 2;
          bets.tu35.percent += 3;
          bets.btsYes.percent -= 2;
          bets.btsNo.percent += 2;
          bets.draw.percent -= 2;
          break;
      }
    }

    if (motivationAwayOdd > motivationHomeOdd) {
      switch (motivationDifference) {
        case 1:
          bets.winnerHome.percent -= 1;
          bets.winnerAway.percent += 1;
          bets.winOrDrawHome.percent -= 1;
          bets.winOrdrawAway.percent += 1;
          bets.foraHomePlus15.percent -= 1;
          bets.foraAwayPlus15.percent += 1;
          bets.foraHomeMinus15.percent -= 1;
          bets.foraAwayMinus15.percent += 1;
          bets.it1O05.percent -= 1;
          bets.it1O15.percent -= 1;
          bets.it1O25.percent -= 1;
          bets.it1U05.percent += 1;
          bets.it1U15.percent += 1;
          bets.it1U25.percent += 1;
          bets.it2O05.percent += 1;
          bets.it2O15.percent += 1;
          bets.it2O25.percent += 1;
          bets.it2U05.percent -= 1;
          bets.it2U15.percent -= 1;
          bets.it2U25.percent -= 1;
          bets.to15.percent += 3;
          bets.to25.percent += 3;
          bets.to35.percent += 3;
          bets.tu15.percent -= 3;
          bets.tu25.percent -= 3;
          bets.tu35.percent -= 3;
          bets.btsYes.percent += 3;
          bets.btsNo.percent -= 3;
          bets.draw.percent += 3;
          break;
        case 2:
          bets.winnerHome.percent -= 2;
          bets.winnerAway.percent += 2;
          bets.winOrDrawHome.percent -= 2;
          bets.winOrdrawAway.percent += 2;
          bets.foraHomePlus15.percent -= 2;
          bets.foraAwayPlus15.percent += 2;
          bets.foraHomeMinus15.percent -= 2;
          bets.foraAwayMinus15.percent += 2;
          bets.it1O05.percent -= 2;
          bets.it1O15.percent -= 2;
          bets.it1O25.percent -= 2;
          bets.it1U05.percent += 2;
          bets.it1U15.percent += 2;
          bets.it1U25.percent += 2;
          bets.it2O05.percent += 2;
          bets.it2O15.percent += 2;
          bets.it2O25.percent += 2;
          bets.it2U05.percent -= 2;
          bets.it2U15.percent -= 2;
          bets.it2U25.percent -= 2;
          bets.to15.percent += 2;
          bets.to25.percent += 1;
          bets.tu15.percent -= 2;
          bets.tu25.percent -= 1
          bets.btsYes.percent += 1;
          bets.btsNo.percent -= 1;
          bets.draw.percent += 1;
          break;
        case 3:
          bets.winnerHome.percent -= 3;
          bets.winnerAway.percent += 3;
          bets.winOrDrawHome.percent -= 3;
          bets.winOrdrawAway.percent += 3;
          bets.foraHomePlus15.percent -= 3;
          bets.foraAwayPlus15.percent += 3;
          bets.foraHomeMinus15.percent -= 3;
          bets.foraAwayMinus15.percent += 3;
          bets.it1O05.percent -= 3;
          bets.it1O15.percent -= 3;
          bets.it1O25.percent -= 3;
          bets.it1U05.percent += 3;
          bets.it1U15.percent += 3;
          bets.it1U25.percent += 3;
          bets.it2O05.percent += 3;
          bets.it2O15.percent += 3;
          bets.it2O25.percent += 3;
          bets.it2U05.percent -= 3;
          bets.it2U15.percent -= 3;
          bets.it2U25.percent -= 3;
          bets.to15.percent += 1;
          bets.tu15.percent -= 1;
          bets.tu35.percent += 1;
          break;
        case 4:
          bets.winnerHome.percent -= 4;
          bets.winnerAway.percent += 4;
          bets.winOrDrawHome.percent -= 4;
          bets.winOrdrawAway.percent += 4;
          bets.foraHomePlus15.percent -= 4;
          bets.foraAwayPlus15.percent += 4;
          bets.foraHomeMinus15.percent -= 4;
          bets.foraAwayMinus15.percent += 4;
          bets.it1O05.percent -= 4;
          bets.it1O15.percent -= 4;
          bets.it1O25.percent -= 4;
          bets.it1U05.percent += 4;
          bets.it1U15.percent += 4;
          bets.it1U25.percent += 4;
          bets.it2O05.percent += 4;
          bets.it2O15.percent += 4;
          bets.it2O25.percent += 4;
          bets.it2U05.percent -= 4;
          bets.it2U15.percent -= 4;
          bets.it2U25.percent -= 4;
          bets.to25.percent -= 1;
          bets.to35.percent -= 2;
          bets.tu25.percent += 1;
          bets.tu35.percent += 2;
          bets.btsYes.percent -= 1;
          bets.btsNo.percent += 1;
          bets.draw.percent -= 1;
          break;
        case 5:
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
          bets.to15.percent -= 1;
          bets.to25.percent -= 2;
          bets.to35.percent -= 3;
          bets.tu15.percent += 1;
          bets.tu25.percent += 2;
          bets.tu35.percent += 3;
          bets.btsYes.percent -= 2;
          bets.btsNo.percent += 2;
          bets.draw.percent -= 2;
          break;
      }
    }
    if (motivationHomeOdd === motivationAwayOdd) {
      bets.btsYes.percent += 3;
      bets.btsNo.percent -= 3;
      bets.draw.percent += 3;
      bets.to15.percent += 3;
      bets.to25.percent += 3;
      bets.to35.percent += 3;
      bets.tu15.percent -= 3;
      bets.tu25.percent -= 3;
      bets.tu35.percent -= 3;
    }
  }
  // новый объект с пересчитанными значениями иходов
  changeValueOutcomes(motivationDifference, motivationHomeOdd, motivationAwayOdd)

  //  Расчитаваем исходы исходя из класса
  const calcValueForClass = (valueClass) => {

    if (valueClass > 60) {
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
      bets.draw.percent -= 5;
    }
    if (valueClass < 40) {
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
      bets.draw.percent -= 3;
    }
    if (valueClass >= 40 && valueClass <= 60) {
      bets.btsYes.percent += 5;
      bets.btsNo.percent -= 5;
      bets.draw.percent += 5;
    }
  }

  calcValueForClass(valueClass);

  const relevanceTeam = relevance(info.teams_form.home ? info.teams_form.home.matches : [1, 1], info.teams_form.away ? info.teams_form.away.matches : [1, 1]);

  // Рассчитываем исходы исходя из формы
  const calcValueForForm = (relevanceTeam) => {
    if (relevanceTeam.percentHome - relevanceTeam.percentAway > 15 && relevanceTeam.percentHome - relevanceTeam.percentAway <= 30) {
      bets.winnerHome.percent += 3;
      bets.winnerAway.percent -= 3;
      bets.winOrDrawHome.percent += 3;
      bets.winOrdrawAway.percent -= 3;
      bets.foraHomePlus15.percent += 3;
      bets.foraAwayPlus15.percent -= 3;
      bets.foraHomeMinus15.percent += 3;
      bets.foraAwayMinus15.percent -= 3;
      bets.it1O05.percent += 3;
      bets.it1O15.percent += 3;
      bets.it1O25.percent += 3;
      bets.it1U05.percent -= 3;
      bets.it1U15.percent -= 3;
      bets.it1U25.percent -= 3;
      bets.it2O05.percent -= 3;
      bets.it2O15.percent -= 3;
      bets.it2O25.percent -= 3;
      bets.it2U05.percent += 3;
      bets.it2U15.percent += 3;
      bets.it2U25.percent += 3;
    }
    if (relevanceTeam.percentHome - relevanceTeam.percentAway > 30) {
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
    if (relevanceTeam.percentAway - relevanceTeam.percentHome > 15 && relevanceTeam.percentAway - relevanceTeam.percentHome <= 30) {
      bets.winnerHome.percent -= 3;
      bets.winnerAway.percent += 3;
      bets.winOrDrawHome.percent -= 3;
      bets.winOrdrawAway.percent += 3;
      bets.foraHomePlus15.percent -= 3;
      bets.foraAwayPlus15.percent += 3;
      bets.foraHomeMinus15.percent -= 3;
      bets.foraAwayMinus15.percent += 3;
      bets.it1O05.percent -= 3;
      bets.it1O15.percent -= 3;
      bets.it1O25.percent -= 3;
      bets.it1U05.percent += 3;
      bets.it1U15.percent += 3;
      bets.it1U25.percent += 3;
      bets.it2O05.percent += 3;
      bets.it2O15.percent += 3;
      bets.it2O25.percent += 3;
      bets.it2U05.percent -= 3;
      bets.it2U15.percent -= 3;
      bets.it2U25.percent -= 3;
    }
    if (relevanceTeam.percentAway - relevanceTeam.percentHome > 30) {
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
    if (relevanceTeam.percentHome - relevanceTeam.percentAway >= -15 && relevanceTeam.percentHome - relevanceTeam.percentAway <= 15) {
      bets.btsYes.percent += 5;
      bets.btsNo.percent -= 5;
      bets.draw.percent += 5;
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

  const betsAfterCalcPredict = clacValueForPredict(info.forecast.odds_type)

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

    // для домашних матчей домашней команды
    arrMatchesHomeTeamHome.forEach(el => {
      const scoreHome = el.score[0] + el.score[2];
      const scoreAway = el.score[1] + el.score[3];

      if (scoreHome > scoreAway) {
        bets.winnerHome.percent += 2;
      }
      if (scoreHome >= scoreAway) {
        bets.winOrDrawHome.percent += 2;
      }
      if (scoreHome - scoreAway >= -1) {
        bets.foraHomePlus15.percent += 2;
      }
      if (scoreHome - scoreAway >= 2) {
        bets.foraHomeMinus15.percent += 2;
      }
      if (scoreHome > 0) {
        bets.it1O05.percent += 2;
      }
      if (scoreHome > 1) {
        bets.it1O15.percent += 2;
      }
      if (scoreHome > 2) {
        bets.it1O25.percent += 2;
      }
      if (scoreHome < 1) {
        bets.it1U05.percent += 2;
      }
      if (scoreHome < 2) {
        bets.it1U15.percent += 2;
      }
      if (scoreHome < 3) {
        bets.it1U25.percent += 2;
      }
      if (scoreHome + scoreAway > 1) {
        bets.to15.percent += 1;
      }
      if (scoreHome + scoreAway > 2) {
        bets.to25.percent += 1;
      }
      if (scoreHome + scoreAway > 3) {
        bets.to35.percent += 1;
      }
      if (scoreHome + scoreAway < 2) {
        bets.tu15.percent += 1;
      }
      if (scoreHome + scoreAway < 3) {
        bets.tu25.percent += 1;
      }
      if (scoreHome + scoreAway < 4) {
        bets.tu35.percent += 1;
      }
      if (scoreHome > 0 && scoreAway > 0) {
        bets.btsYes.percent += 1;
      }
      if (scoreHome > 0 && scoreAway === 0 || scoreHome === 0 && scoreAway > 0) {
        bets.btsNo.percent += 1;
      }
      if (scoreHome === scoreAway) {
        bets.draw.percent += 2;
      }
    });

    // Для гостевых матчей домашней команды
    arrMatchesHomeTeamAway.forEach(el => {
      const scoreHome = el.score[0] + el.score[2];
      const scoreAway = el.score[1] + el.score[3];

      if (scoreAway > scoreHome) {
        bets.winnerHome.percent += 2;
      }
      if (scoreAway >= scoreHome) {
        bets.winOrDrawHome.percent += 2;
      }
      if (scoreAway - scoreHome >= -1) {
        bets.foraHomePlus15.percent += 2;
      }
      if (scoreAway - scoreHome >= 2) {
        bets.foraHomeMinus15.percent += 2;
      }
      if (scoreAway > 0) {
        bets.it1O05.percent += 2;
      }
      if (scoreAway > 1) {
        bets.it1O15.percent += 2;
      }
      if (scoreAway > 2) {
        bets.it1O25.percent += 2;
      }
      if (scoreAway < 1) {
        bets.it1U05.percent += 2;
      }
      if (scoreAway < 2) {
        bets.it1U15.percent += 2;
      }
      if (scoreAway < 3) {
        bets.it1U25.percent += 2;
      }
      if (scoreHome + scoreAway > 1) {
        bets.to15.percent += 1;
      }
      if (scoreHome + scoreAway > 2) {
        bets.to25.percent += 1;
      }
      if (scoreHome + scoreAway > 3) {
        bets.to35.percent += 1;
      }
      if (scoreHome + scoreAway < 2) {
        bets.tu15.percent += 1;
      }
      if (scoreHome + scoreAway < 3) {
        bets.tu25.percent += 1;
      }
      if (scoreHome + scoreAway < 4) {
        bets.tu35.percent += 1;
      }
      if (scoreHome > 0 && scoreAway > 0) {
        bets.btsYes.percent += 1;
      }
      if (scoreHome > 0 && scoreAway === 0 || scoreHome === 0 && scoreAway > 0) {
        bets.btsNo.percent += 1;
      }
      if (scoreHome === scoreAway) {
        bets.draw.percent += 2;
      }
    });

    if (arrMatchesHomeTeamHomeH2h.length > 0) {
      // Для домашних матчей домашней команды h2h
      arrMatchesHomeTeamHomeH2h.forEach(el => {
        const scoreHome = el.score[0] + el.score[2];
        const scoreAway = el.score[1] + el.score[3];

        if (scoreHome > scoreAway) {
          bets.winnerHome.percent += 2;
        }
        if (scoreHome >= scoreAway) {
          bets.winOrDrawHome.percent += 2;
        }
        if (scoreHome - scoreAway >= -1) {
          bets.foraHomePlus15.percent += 2;
        }
        if (scoreHome - scoreAway >= 2) {
          bets.foraHomeMinus15.percent += 2;
        }
        if (scoreHome > 0) {
          bets.it1O05.percent += 2;
        }
        if (scoreHome > 1) {
          bets.it1O15.percent += 2;
        }
        if (scoreHome > 2) {
          bets.it1O25.percent += 2;
        }
        if (scoreHome < 1) {
          bets.it1U05.percent += 2;
        }
        if (scoreHome < 2) {
          bets.it1U15.percent += 2;
        }
        if (scoreHome < 3) {
          bets.it1U25.percent += 2;
        }
        if (scoreHome + scoreAway > 1) {
          bets.to15.percent += 1;
        }
        if (scoreHome + scoreAway > 2) {
          bets.to25.percent += 1;
        }
        if (scoreHome + scoreAway > 3) {
          bets.to35.percent += 1;
        }
        if (scoreHome + scoreAway < 2) {
          bets.tu15.percent += 1;
        }
        if (scoreHome + scoreAway < 3) {
          bets.tu25.percent += 1;
        }
        if (scoreHome + scoreAway < 4) {
          bets.tu35.percent += 1;
        }
        if (scoreHome > 0 && scoreAway > 0) {
          bets.btsYes.percent += 1;
        }
        if (scoreHome > 0 && scoreAway === 0 || scoreHome === 0 && scoreAway > 0) {
          bets.btsNo.percent += 1;
        }
        if (scoreHome === scoreAway) {
          bets.draw.percent += 2;
        }
      });
    }

    if (arrMatchesHomeTeamAwayH2h.length > 0) {
      // Для гостевых матчей домашней команды h2h
      arrMatchesHomeTeamAwayH2h.forEach(el => {
        const scoreHome = el.score[0] + el.score[2];
        const scoreAway = el.score[1] + el.score[3];

        if (scoreAway > scoreHome) {
          bets.winnerHome.percent += 2;
        }
        if (scoreAway >= scoreHome) {
          bets.winOrDrawHome.percent += 2;
        }
        if (scoreAway - scoreHome >= -1) {
          bets.foraHomePlus15.percent += 2;
        }
        if (scoreAway - scoreHome >= 2) {
          bets.foraHomeMinus15.percent += 2;
        }
        if (scoreAway > 0) {
          bets.it1O05.percent += 2;
        }
        if (scoreAway > 1) {
          bets.it1O15.percent += 2;
        }
        if (scoreAway > 2) {
          bets.it1O25.percent += 2;
        }
        if (scoreAway < 1) {
          bets.it1U05.percent += 2;
        }
        if (scoreAway < 2) {
          bets.it1U15.percent += 2;
        }
        if (scoreAway < 3) {
          bets.it1U25.percent += 2;
        }
        if (scoreHome + scoreAway > 1) {
          bets.to15.percent += 1;
        }
        if (scoreHome + scoreAway > 2) {
          bets.to25.percent += 1;
        }
        if (scoreHome + scoreAway > 3) {
          bets.to35.percent += 1;
        }
        if (scoreHome + scoreAway < 2) {
          bets.tu15.percent += 1;
        }
        if (scoreHome + scoreAway < 3) {
          bets.tu25.percent += 1;
        }
        if (scoreHome + scoreAway < 4) {
          bets.tu35.percent += 1;
        }
        if (scoreHome > 0 && scoreAway > 0) {
          bets.btsYes.percent += 1;
        }
        if (scoreHome > 0 && scoreAway === 0 || scoreHome === 0 && scoreAway > 0) {
          bets.btsNo.percent += 1;
        }
        if (scoreHome === scoreAway) {
          bets.draw.percent += 2;
        }
      });
    }

    // для домашних матчей гостевой команды
    arrMatchesAwayTeamHome.forEach(el => {
      const scoreHome = el.score[0] + el.score[2];
      const scoreAway = el.score[1] + el.score[3];

      if (scoreHome > scoreAway) {
        bets.winnerAway.percent += 2;
      }
      if (scoreHome >= scoreAway) {
        bets.winOrdrawAway.percent += 2;
      }
      if (scoreHome - scoreAway >= -1) {
        bets.foraAwayPlus15.percent += 2;
      }
      if (scoreHome - scoreAway >= 2) {
        bets.foraAwayMinus15.percent += 2;
      }
      if (scoreHome > 0) {
        bets.it2O05.percent += 2;
      }
      if (scoreHome > 1) {
        bets.it2O15.percent += 2;
      }
      if (scoreHome > 2) {
        bets.it2O25.percent += 2;
      }
      if (scoreHome < 1) {
        bets.it2U05.percent += 2;
      }
      if (scoreHome < 2) {
        bets.it2U15.percent += 2;
      }
      if (scoreHome < 3) {
        bets.it2U25.percent += 2;
      }
      if (scoreHome + scoreAway > 1) {
        bets.to15.percent += 1;
      }
      if (scoreHome + scoreAway > 2) {
        bets.to25.percent += 1;
      }
      if (scoreHome + scoreAway > 3) {
        bets.to35.percent += 1;
      }
      if (scoreHome + scoreAway < 2) {
        bets.tu15.percent += 1;
      }
      if (scoreHome + scoreAway < 3) {
        bets.tu25.percent += 1;
      }
      if (scoreHome + scoreAway < 4) {
        bets.tu35.percent += 1;
      }
      if (scoreHome > 0 && scoreAway > 0) {
        bets.btsYes.percent += 1;
      }
      if (scoreHome > 0 && scoreAway === 0 || scoreHome === 0 && scoreAway > 0) {
        bets.btsNo.percent += 1;
      }
      if (scoreHome === scoreAway) {
        bets.draw.percent += 2;
      }
    });

    // Для гостевых матчей гостевой команды
    arrMatchesAwayTeamAway.forEach(el => {
      const scoreHome = el.score[0] + el.score[2];
      const scoreAway = el.score[1] + el.score[3];

      if (scoreAway > scoreHome) {
        bets.winnerAway.percent += 2;
      }
      if (scoreAway >= scoreHome) {
        bets.winOrdrawAway.percent += 2;
      }
      if (scoreAway - scoreHome >= -1) {
        bets.foraAwayPlus15.percent += 2;
      }
      if (scoreAway - scoreHome >= 2) {
        bets.foraAwayMinus15.percent += 2;
      }
      if (scoreAway > 0) {
        bets.it2O05.percent += 2;
      }
      if (scoreAway > 1) {
        bets.it2O15.percent += 2;
      }
      if (scoreAway > 2) {
        bets.it2O25.percent += 2;
      }
      if (scoreAway < 1) {
        bets.it2U05.percent += 2;
      }
      if (scoreAway < 2) {
        bets.it2U15.percent += 2;
      }
      if (scoreAway < 3) {
        bets.it2U25.percent += 2;
      }
      if (scoreHome + scoreAway > 1) {
        bets.to15.percent += 1;
      }
      if (scoreHome + scoreAway > 2) {
        bets.to25.percent += 1;
      }
      if (scoreHome + scoreAway > 3) {
        bets.to35.percent += 1;
      }
      if (scoreHome + scoreAway < 2) {
        bets.tu15.percent += 1;
      }
      if (scoreHome + scoreAway < 3) {
        bets.tu25.percent += 1;
      }
      if (scoreHome + scoreAway < 4) {
        bets.tu35.percent += 1;
      }
      if (scoreHome > 0 && scoreAway > 0) {
        bets.btsYes.percent += 1;
      }
      if (scoreHome > 0 && scoreAway === 0 || scoreHome === 0 && scoreAway > 0) {
        bets.btsNo.percent += 1;
      }
      if (scoreHome === scoreAway) {
        bets.draw.percent += 2;
      }
    });

    if (arrMatchesAwayTeamHomeH2h.length > 0) {
      // Для домашних матчей гостевой команды h2h
      arrMatchesAwayTeamHomeH2h.forEach(el => {
        const scoreHome = el.score[0] + el.score[2];
        const scoreAway = el.score[1] + el.score[3];

        if (scoreHome > scoreAway) {
          bets.winnerAway.percent += 2;
        }
        if (scoreHome >= scoreAway) {
          bets.winOrdrawAway.percent += 2;
        }
        if (scoreHome - scoreAway >= -1) {
          bets.foraAwayPlus15.percent += 2;
        }
        if (scoreHome - scoreAway >= 2) {
          bets.foraAwayMinus15.percent += 2;
        }
        if (scoreHome > 0) {
          bets.it2O05.percent += 2;
        }
        if (scoreHome > 1) {
          bets.it2O15.percent += 2;
        }
        if (scoreHome > 2) {
          bets.it2O25.percent += 2;
        }
        if (scoreHome < 1) {
          bets.it2U05.percent += 2;
        }
        if (scoreHome < 2) {
          bets.it2U15.percent += 2;
        }
        if (scoreHome < 3) {
          bets.it2U25.percent += 2;
        }
        if (scoreHome + scoreAway > 1) {
          bets.to15.percent += 1;
        }
        if (scoreHome + scoreAway > 2) {
          bets.to25.percent += 1;
        }
        if (scoreHome + scoreAway > 3) {
          bets.to35.percent += 1;
        }
        if (scoreHome + scoreAway < 2) {
          bets.tu15.percent += 1;
        }
        if (scoreHome + scoreAway < 3) {
          bets.tu25.percent += 1;
        }
        if (scoreHome + scoreAway < 4) {
          bets.tu35.percent += 1;
        }
        if (scoreHome > 0 && scoreAway > 0) {
          bets.btsYes.percent += 1;
        }
        if (scoreHome > 0 && scoreAway === 0 || scoreHome === 0 && scoreAway > 0) {
          bets.btsNo.percent += 1;
        }
        if (scoreHome === scoreAway) {
          bets.draw.percent += 2;
        }
      });

    }

    if (arrMatchesAwayTeamAwayH2h.length > 0) {
      // Для гостевых матчей гостевой команды h2h
      arrMatchesAwayTeamAwayH2h.forEach(el => {
        const scoreHome = el.score[0] + el.score[2];
        const scoreAway = el.score[1] + el.score[3];

        if (scoreAway > scoreHome) {
          bets.winnerAway.percent += 2;
        }
        if (scoreAway >= scoreHome) {
          bets.winOrdrawAway.percent += 2;
        }
        if (scoreAway - scoreHome >= -1) {
          bets.foraAwayPlus15.percent += 2;
        }
        if (scoreAway - scoreHome >= 2) {
          bets.foraAwayMinus15.percent += 2;
        }
        if (scoreAway > 0) {
          bets.it2O05.percent += 2;
        }
        if (scoreAway > 1) {
          bets.it2O15.percent += 2;
        }
        if (scoreAway > 2) {
          bets.it2O25.percent += 2;
        }
        if (scoreAway < 1) {
          bets.it2U05.percent += 2;
        }
        if (scoreAway < 2) {
          bets.it2U15.percent += 2;
        }
        if (scoreAway < 3) {
          bets.it2U25.percent += 2;
        }
        if (scoreHome + scoreAway > 1) {
          bets.to15.percent += 1;
        }
        if (scoreHome + scoreAway > 2) {
          bets.to25.percent += 1;
        }
        if (scoreHome + scoreAway > 3) {
          bets.to35.percent += 1;
        }
        if (scoreHome + scoreAway < 2) {
          bets.tu15.percent += 1;
        }
        if (scoreHome + scoreAway < 3) {
          bets.tu25.percent += 1;
        }
        if (scoreHome + scoreAway < 4) {
          bets.tu35.percent += 1;
        }
        if (scoreHome > 0 && scoreAway > 0) {
          bets.btsYes.percent += 1;
        }
        if (scoreHome > 0 && scoreAway === 0 || scoreHome === 0 && scoreAway > 0) {
          bets.btsNo.percent += 1;
        }
        if (scoreHome === scoreAway) {
          bets.draw.percent += 2;
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
      if (bets[key].num === tip) {
        bets[key].percent += 20
      }
    }
  }

  calcValueForUserTopTips(info.users_top_tip[0]);

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
        if (bets[key].num === el[2]) {
          bets[key].percent += 10;
        }
      })
    }
  }

  calcValueForPredictions(predictions);

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

  return [newArr[0], newArr[1], newArr[2], newArr[3]]

}
