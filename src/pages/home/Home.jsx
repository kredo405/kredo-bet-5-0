import { div } from "@tensorflow/tfjs";
import Header from "../../components/header/Header";
import Matches from "../../components/matches/Matches";

const Home = () => {
  return (
    <div className=" bg-[url('https://sportishka.com/uploads/posts/2022-08/1660150573_1-sportishka-com-p-futbolnii-fon-dlya-prezentatsii-sport-kras-1.jpg')] bg-fixed bg-repeat-space">
      <div>
        <Header />
        <Matches />
      </div>
    </div>
  );
};

export default Home;
