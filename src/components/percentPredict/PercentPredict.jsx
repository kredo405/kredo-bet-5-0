import { calcPercentPredictions } from "../../utils/calcPercentPredictions";

export default function PercentPredict({ predictions, odds }) {
  const result = calcPercentPredictions(predictions, odds);
  const elements = result.map((prediction, i) => {
    return (
      <div>
        <div
          key={i}
          className="px-3 py-2 flex flex-col rounded-lg text-white font-mono mt-2 bg-cyan-700 rounded-2xl bg-opacity-80"
        >
          <span className="text-white text-lg font-bold px-1">
            {prediction.name}
          </span>
          <span className="text-red-200 text-lg font-bold px-1">
            Прогнозируют:{" "}
            <span className="text-white px-2">
              {prediction.percent.toFixed(0)}%
            </span>
            людей
          </span>
          <span className="text-red-200 text-lg font-bold px-1">
            Сумарная прибыль:{" "}
            <span className="text-white px-2">
              {prediction.profit.toFixed(0)}
            </span>
          </span>
          <span className="text-red-200 text-lg font-bold px-1">
            Кэф:{" "}
            <span className="text-white px-2">{prediction.odd.toFixed(1)}</span>
          </span>
        </div>
      </div>
    );
  });

  return (
    <>
      <div>{elements}</div>
    </>
  );
}
