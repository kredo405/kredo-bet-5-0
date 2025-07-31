import { div } from "@tensorflow/tfjs";
import Header from "../../components/header/Header";
import Matches from "../../components/matches/Matches";

const Home = () => {
  return (
    <div className="overflow-y-scroll bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 h-screen">
      <div className="">
        <Header />
        <Matches />
      </div>
    </div>
  );
};

export default Home;
