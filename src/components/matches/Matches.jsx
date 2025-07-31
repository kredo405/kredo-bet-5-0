import { useDispatch } from "react-redux";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { nbbetServices } from "../../services/nbbet";
import { BackTop, Modal, Empty, Input, Card, Spin } from "antd";
import { Loading } from "../Loading/Loading";
import { setMatches } from "../../store/slices/matchSlice";
import { SearchOutlined, FireOutlined } from "@ant-design/icons";

const errorModal = (message) => {
  Modal.error({ title: message });
};

const MatchItem = ({ match, navigate }) => {
  const { id, homeLogo, homeName, awayLogo, awayName, odds, date } = match;
  
  // Форматируем дату
  const formattedDate = useMemo(() => {
    return new Date(date).toLocaleString("ru-RU", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }, [date]);

  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer mb-4"
      onClick={() => {
        navigate("/match");
        sessionStorage.setItem("link", id);
      }}
      bodyStyle={{ padding: "12px" }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* Дата матча */}
        <div className="text-sm text-gray-500 mb-2 md:mb-0 md:w-1/6">
          {formattedDate}
        </div>
        
        {/* Команды */}
        <div className="flex flex-col md:flex-row items-center w-full md:w-3/5">
          <div className="flex items-center w-full md:w-1/2 mb-2 md:mb-0">
            <img 
              className="w-8 h-8 mr-2 object-contain" 
              src={homeLogo} 
              alt={homeName} 
            />
            <span className="font-medium truncate">{homeName}</span>
          </div>
          
          <div className="mx-2 text-gray-400 font-bold hidden md:block">VS</div>
          
          <div className="flex items-center w-full md:w-1/2">
            <img 
              className="w-8 h-8 mr-2 object-contain" 
              src={awayLogo} 
              alt={awayName} 
            />
            <span className="font-medium truncate">{awayName}</span>
          </div>
        </div>
        
        {/* Коэффициенты */}
        <div className="flex justify-end space-x-3 mt-2 md:mt-0 w-full md:w-1/5">
          {odds?.winHome && (
            <div className="bg-green-100 text-green-800 px-2 py-1 rounded font-bold min-w-[40px] text-center">
              {odds.winHome.toFixed(2)}
            </div>
          )}
          {odds?.draw && (
            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-bold min-w-[40px] text-center">
              {odds.draw.toFixed(2)}
            </div>
          )}
          {odds?.winAway && (
            <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded font-bold min-w-[40px] text-center">
              {odds.winAway.toFixed(2)}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

const LeagueSection = ({ league, navigate }) => {
  if (!league.matches || league.matches.length === 0) return null;
  
  return (
    <div key={league.id} className="mb-8">
      <div className="flex items-center bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-t-lg border-b border-blue-200">
        <FireOutlined className="text-red-500 mr-2" />
        <h2 className="text-lg font-bold text-gray-800">
          {league.name} · {league.country}
        </h2>
      </div>
      
      <div className="bg-white rounded-b-lg p-2">
        {league.matches.map(match => (
          <MatchItem 
            key={match.id} 
            match={match} 
            navigate={navigate} 
          />
        ))}
      </div>
    </div>
  );
};

const Matches = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Форматируем данные при загрузке
  const [leagues, setLeagues] = useState([]);
  const [filteredLeagues, setFilteredLeagues] = useState([]);

  // Загрузка данных
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setIsLoading(true);
        const response = await nbbetServices.getAllMatches();
        
        // Форматируем данные в более читаемую структуру
        const formattedLeagues = response.data.matches.data.leagues
          .map(league => ({
            id: league[0],
            name: league[1],
            country: league[3],
            matches: league[4]
              .filter(match => match[4] >= Date.now()) // Будущие матчи
              .map(match => ({
                id: match[3],
                date: match[4],
                homeName: match[7],
                homeLogo: match[8],
                awayName: match[15],
                awayLogo: match[16],
                odds: match[5] ? {
                  winHome: match[5][1],
                  draw: match[5][2],
                  winAway: match[5][3]
                } : null
              }))
          }))
          .filter(league => league.matches.length > 0); // Фильтруем пустые лиги
        
        setLeagues(formattedLeagues);
        setFilteredLeagues(formattedLeagues);
        dispatch(setMatches(formattedLeagues));
      } catch (error) {
        console.error("Ошибка при загрузке матчей:", error);
        errorModal("Не удалось загрузить данные матчей");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, [dispatch]);

  // Фильтрация по поисковому запросу
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredLeagues(leagues);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = leagues.filter(league => {
      const leagueMatch = league.name.toLowerCase().includes(query) || 
                         league.country.toLowerCase().includes(query);
      
      // Если лига совпадает или есть совпадения по матчам
      if (leagueMatch) return true;
      
      // Проверяем матчи в лиге
      const hasMatchingMatches = league.matches.some(match => 
        match.homeName.toLowerCase().includes(query) || 
        match.awayName.toLowerCase().includes(query)
      );
      
      return hasMatchingMatches;
    });

    setFilteredLeagues(filtered);
  }, [searchQuery, leagues]);

  // Состояние пустого результата
  const isEmpty = useMemo(() => {
    return !isLoading && filteredLeagues.length === 0;
  }, [isLoading, filteredLeagues]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <BackTop />
      
      {/* Заголовок и поиск */}
      <div className="mb-8">
        
        <Input
          size="large"
          placeholder="Поиск по лиге, стране или команде..."
          prefix={<SearchOutlined className="text-gray-400" />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-lg shadow-sm"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center my-12">
          <Spin size="large" />
        </div>
      ) : isEmpty ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <span className="text-gray-600">
                {searchQuery ? "Ничего не найдено" : "На данный момент нет матчей"}
              </span>
            }
          />
          {searchQuery && (
            <button 
              className="mt-4 text-blue-600 hover:text-blue-800"
              onClick={() => setSearchQuery("")}
            >
              Сбросить поиск
            </button>
          )}
        </div>
      ) : (
        <div>
          {filteredLeagues.map(league => (
            <LeagueSection 
              key={`${league.id}-${league.country}`} 
              league={league} 
              navigate={navigate} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Matches;