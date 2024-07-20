import { div } from "@tensorflow/tfjs";
import Header from "../../components/header/Header";
import Matches from "../../components/matches/Matches";

const Home = () => {
  return (
    <div className="overflow-scroll bg-[url('https://sportishka.com/uploads/posts/2022-08/1660150573_1-sportishka-com-p-futbolnii-fon-dlya-prezentatsii-sport-kras-1.jpg')] bg-fixed bg-cover h-screen">
      <div className="">
        <Header />
        <Matches />
      </div>
    </div>
  );
};

export default Home;
