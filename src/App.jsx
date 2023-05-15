import Home from "./pages/home/Home";
import Velcome from "./pages/velcome/Velcome";
import Authorization from "./pages/authorization/Authorization";
import Registration from "./pages/registration/Registration";
import Match from "./pages/match/match";
import MatchHockey from "./pages/matchHockey/matchHockey";
import MatchesHokey from "./components/MatchesHokey/MatchesHockey";
import { Routes, Route } from "react-router-dom";

function App(props) {
    const { app } = props;

    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Velcome />} />
                <Route path="/auth" element={<Authorization />} />
                <Route
                    path="/registration"
                    element={<Registration app={app} />}
                />
                <Route path="/home" element={<Home />} />
                <Route path="/match" element={<Match />} />
                <Route path="/matchHockey" element={<MatchHockey />} />
                <Route path="/hockey" element={<MatchesHokey />} />
            </Routes>
        </div>
    );
}

export default App;
