const Facts = ({ info }) => {
  const removeStrongTags = (str) => {
    return str.replace(/<\/?strong>/g, "");
  };
  const cleanedData = info[27][3].map((item) => {
    return {
      ...item,
      1: removeStrongTags(item[1]),
    };
  });
  const element = cleanedData.map((el, i) => {
    return (
      <div
        key={i}
        className="px-3 py-2 rounded-lg text-white font-mono mt-2 bg-cyan-300 rounded-2xl bg-opacity-40"
      >
        <span className="text-orange-300 font-bold px-2">{i}.</span>
        {el["1"]}
      </div>
    );
  });
  return (
    <>
      <div>{element}</div>
    </>
  );
};

export default Facts;
