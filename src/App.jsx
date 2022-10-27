import Home from './pages/home/Home';
import Velcome from './pages/velcome/Velcome';
import Live from './pages/live/Live';
import Matches from './components/matches/Matches';
import Authorization from './pages/authorization/Authorization';
import Registration from './pages/registration/Registration';
import Match from './pages/match/match';
import CollectiveMind from './pages/collectiveMind/CollectiveMind';
import CollectiveMindMatch from './pages/collectiveMind/CollectiveMindMatch';
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function App(props) {
  const { app } = props;
  const dispatch = useDispatch();
  dispatch({
    type: 'APP',
    payload: app,
});
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Velcome />} />
        <Route path="/auth" element={<Authorization />} />
        <Route path="/registration" element={<Registration app={app}/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/live" element={<Live />} />
        <Route path="/match" element={<Match />} />  
        <Route path="/collectiveMind" element={<CollectiveMind />} />  
        <Route path="/collectiveMindMatch" element={<CollectiveMindMatch />} />  
      </Routes>
    </div>
  );
}

export default App;
