export function calcIndividualTotalByPredictions(predictions) {
  let scoreHome = 0;
  let scoreAway = 0;
  let count = 0;

  predictions.forEach((prediction) => {
    if (prediction.period === 3) {
      if (prediction.length >= 40) {
        let totalHome = 0;
        let totalAway = 0;
        prediction.scores.forEach((score) => {
          totalHome += +score.slice(0, 1);
          totalAway += +score.slice(2);
        });
        scoreHome += totalHome / prediction.scores.length;
        scoreAway += totalAway / prediction.scores.length;
        count++;
      }
    } else {
      let totalHome = 0;
      let totalAway = 0;
      prediction.scores.forEach((score) => {
        totalHome += +score.slice(0, 1);
        totalAway += +score.slice(2);
      });
      scoreHome += totalHome / prediction.scores.length;
      scoreAway += totalAway / prediction.scores.length;
      count++;
    }
  });

  return {
    scoreHome: scoreHome / count,
    scoreAway: scoreAway / count,
  };
}
