export function findMaxCoefficientChange(arr) {
    let largestChange = 0;
    let startCoeff = 0;
    let endCoeff = 0;
    let date;

    for (let i = 0; i < arr.length - 1; i++) {
        let diff = arr[i + 1][1] - arr[i][1];
        if (Math.abs(diff) > largestChange) {
            largestChange = Math.abs(diff);
            startCoeff = arr[i][1];
            endCoeff = arr[i + 1][1];
            date = new Date(arr[i + 1][0]).toLocaleString();
        }
    }

    return {
        startCoeff,
        endCoeff,
        largestChange,
        date,
    };
}
