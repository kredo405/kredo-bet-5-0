export default function LastMatches({ matches }) {
  const elements = matches[2].map((match, i) => {
    return (
      <div
        key={i}
        className="flex justify-between items-center px-1 py-2 rounded-lg text-white font-mono mt-2 bg-cyan-700 rounded-2xl bg-opacity-80"
      >
        <div className="flex items-center w-5/12">
          <img className="pr-2 w-4/12 md:w-2/12" src={match[8]} />
          <div>{match[7]}</div>
        </div>
        <div className="w-2/12 text-center text-orange-200 font-bold">
          {match[10]} : {match[18]}
        </div>
        <div className="flex items-center w-5/12 justify-end">
          <div>{match[15]}</div>
          <img className="pr-2 w-4/12 md:w-2/12" src={match[16]} />
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
