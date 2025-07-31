import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BackTop, Modal, Empty } from "antd";
import { Loading } from "../Loading/Loading";
import { nbbetServices } from "../../services/nbbet";
import { setMatches } from "../../store/slices/matchSlice";

const showErrorModal = (message) => {
  Modal.error({ title: "Ошибка", content: message });
};

const Matches = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [allLeagues, setAllLeagues] = useState([]);
  const [filteredLeagues, setFilteredLeagues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setIsLoading(false);
        const response = await nbbetServices.getAllMatches();
        const leagues = response.data.matches.data.leagues;

        // Сохраняем оригинальные данные для Redux и локального использования
        setAllLeagues(leagues);
        
        // Фильтрация для отображения (без изменения оригинальных данных)
        const displayLeagues = leagues
          .map(league => ({
            ...league,
            "4": league["4"].filter(match => match["4"] >= Date.now())
          }))
          .filter(league => league["4"].length > 0);

        setFilteredLeagues(displayLeagues);
        
        // Передаем в Redux оригинальные данные без изменений
        dispatch(setMatches(leagues));
        setIsLoading(true);
      } catch (error) {
        console.error("Ошибка загрузки матчей:", error);
        showErrorModal(error.message);
      }
    };

    fetchMatches();
  }, [dispatch]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      // Используем предварительно отфильтрованные данные для отображения
      const displayLeagues = allLeagues
        .map(league => ({
          ...league,
          "4": league["4"].filter(match => match["4"] >= Date.now())
        }))
        .filter(league => league["4"].length > 0);
        
      setFilteredLeagues(displayLeagues);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = allLeagues
        .filter(league => league["1"].toLowerCase().includes(query))
        .map(league => ({
          ...league,
          "4": league["4"].filter(match => match["4"] >= Date.now())
        }))
        .filter(league => league["4"].length > 0);
        
      setFilteredLeagues(filtered);
    }
  }, [searchQuery, allLeagues]);

  const renderMatchItem = (match) => {
    const {
      "3": id,
      "5": odds,
      "7": homeTeam,
      "8": homeLogo,
      "15": awayTeam,
      "16": awayLogo,
    } = match;

    return (
      <div
        key={id}
        onClick={() => {
          navigate("/match");
          sessionStorage.setItem("link", id);
        }}
        className="hover:bg-sky-300 w-full cursor-pointer h-16 bg-slate-50 flex justify-around items-center mb-2.5 px-2 border-1 rounded-xl border-solid border-slate-300"
      >
        <div className="flex pr-2 items-center w-4/12">
          <img
            className="w-[20px] md:w-[30px]"
            src={homeLogo}
            alt={homeTeam}
          />
          <span className="px-1 md:px-3 font-mono text-slate-700 text-sm lg:text-xl">
            {homeTeam}
          </span>
        </div>
        <div className="flex pl-2 items-center w-4/12">
          <img
            className="w-[20px] md:w-[30px]"
            src={awayLogo}
            alt={awayTeam}
          />
          <span className="px-1 md:px-3 font-mono text-slate-700 text-sm lg:text-xl">
            {awayTeam}
          </span>
        </div>
        <div className="flex flex-col md:flex-row justify-end items-end w-2/12">
          <span className="text-xs md:text-base lg:text-lg lg:font-bold px-1 lg:px-2 font-mono text-green-600">
            {odds?.["1"]?.toFixed(1)}
          </span>
          <span className="text-xs md:text-base lg:text-lg lg:font-bold px-1 lg:px-2 font-mono text-amber-600">
            {odds?.["2"]?.toFixed(1)}
          </span>
          <span className="text-xs md:text-base lg:text-lg lg:font-bold px-1 lg:px-2 font-mono text-cyan-500">
            {odds?.["3"]?.toFixed(1)}
          </span>
        </div>
      </div>
    );
  };

  const renderLeagueSection = (league, index) => {
    const { "1": name, "3": country, "4": matches } = league;

    return (
      <div key={`${name}_${index}`} className="mb-2 p-2">
        <div className="w-full h-14 flex justify-between items-center bg-sky-300 mb-2">
          <div className="flex items-center ml-2 w-full">
            <span className="p-2 font-bold font-mono text-lg text-gray-900">
              {country} · {name}
            </span>
          </div>
        </div>

        <div>{matches.map(renderMatchItem)}</div>
      </div>
    );
  };

  const renderContent = () => {
    if (!isLoading) return <Loading />;
    
    if (filteredLeagues.length === 0) {
      return (
        <div className="h-screen flex justify-center items-center">
          <Empty
            description={
              <span className="font-mono text-lg font-medium text-gray-100">
                На данный момент нет матчей
              </span>
            }
          />
        </div>
      );
    }

    return filteredLeagues.map(renderLeagueSection);
  };

  return (
    <div>
      <div className="container lg:px-44 pt-10">
        <BackTop />
        
        <div className="mb-10">
          <input
            className="rounded-lg w-full md:w-5/12 px-3 py-2"
            placeholder="Введите название страны"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default Matches;