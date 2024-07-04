import ball from "../../assets/ball.png";

export const Loading = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center ">
      <img className="animate-bounce w-24" src={ball} alt="ball" />
      <span className="text-center font-mono text-2xl font-semibold text-white">
        Загрузка
      </span>
    </div>
  );
};
