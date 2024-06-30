export default function filterPredictions(predictions, odds) {
    const filteredPredictions = predictions.filter((prediction) => {
        return prediction[4] !== null;
    });

    const filteredTopPredictions = predictions.filter(
        (prediction) => prediction[6] >= 250 && prediction[10] <= 50
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
