export default function filterPredictions(predictions, odds) {
  console.log(predictions);

  const filteredTopPredictions = predictions.filter(
    (prediction) => prediction[6] >= 200 && prediction[10] <= 100
  );

  console.log(filteredTopPredictions);
  const uniqueIndexes = new Set();

  const filterFromDublicated = filteredTopPredictions.filter((item) => {
    if (uniqueIndexes.has(item[6])) {
      return false;
    } else {
      uniqueIndexes.add(item[6]);
      return true;
    }
  });

  console.log(filterFromDublicated);

  const sortedTopPredictions = filterFromDublicated.sort((a, b) => b[6] - a[6]);

  const mapedTopPredictions = sortedTopPredictions.map((prediction) => {
    const odd = odds.find((odd) => odd.odd === String(prediction[2]).trim());

    return {
      name: odd ? odd.name : "",
      odd: prediction[3],
      profit: prediction[6],
    };
  });

  const topPredictionsWeight = mapedTopPredictions.filter(
    (predictions) => predictions.name !== ""
  );

  console.log(topPredictionsWeight);

  return { topPredictionsWeight };
}
