export function findUsefulInfo(data) {
    let minCoeff = Infinity;
    let maxCoeff = -Infinity;
    let minTime = 0;
    let maxTime = 0;
  
    data.forEach((item) => {
      const coeff = item[1];
      const time = item[0];
      if (coeff < minCoeff) {
        minCoeff = coeff;
        minTime = time;
      }
      if (coeff > maxCoeff) {
        maxCoeff = coeff;
        maxTime = time;
      }
    });
  
    return {
      minCoeff: minCoeff,
      maxCoeff: maxCoeff,
      minTime: new Date(minTime).toLocaleString(),
      maxTime: new Date(maxTime).toLocaleString(),
    };
  }
  
