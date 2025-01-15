import Home from "./pages/home/Home";
import Velcome from "./pages/velcome/Velcome";
import Authorization from "./pages/authorization/Authorization";
import Registration from "./pages/registration/Registration";
import Match from "./pages/match/match";
import { Routes, Route } from "react-router-dom";

function App(props) {
  const { app } = props;

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Velcome />} />
        <Route path="/auth" element={<Authorization />} />
        <Route path="/registration" element={<Registration app={app} />} />
        <Route path="/home/:sport" element={<Home />} />
        <Route path="/match" element={<Match />} />
      </Routes>
    </div>
  );
}

export default App;
