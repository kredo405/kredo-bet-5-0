export default function filterPredictions(predictions, odds) {
    const filteredPredictions = predictions.filter(
        (prediction) => prediction[4] !== null
    );

    const filteredTopPredictions = filteredPredictions.filter(
        (prediction) => prediction[6] >= 30
    );

    console.log(filteredTopPredictions);
    const sortedPredictions = filteredPredictions.sort((a, b) => b[6] - a[6]);
    const sortedTopPredictions = filteredTopPredictions.sort(
        (a, b) => b[6] - a[6]
    );

    const mapedPredictions = sortedPredictions.map((prediction) => {
        const odd = odds.find(
            (odd) => odd.odd === String(prediction[2]).trim()
        );
        return {
            name: odd ? odd.name : "",
            text: prediction[4],
            odd: prediction[3],
            profit: prediction[6],
        };
    });

    const mapedTopPredictions = sortedTopPredictions.map((prediction) => {
        const odd = odds.find(
            (odd) => odd.odd === String(prediction[2]).trim()
        );

        return {
            name: odd ? odd.name : "",
            odd: prediction[3],
            profit: prediction[6],
        };
    });

    const topPredictions = mapedPredictions.filter(
        (predictions) => predictions.name !== ""
    );

    const topPredictionsWeight = mapedTopPredictions.filter(
        (predictions) => predictions.name !== ""
    );

    return { topPredictions, topPredictionsWeight };
}
