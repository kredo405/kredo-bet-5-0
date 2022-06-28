import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import Content from '../../components/content/Content';
import Live from '../live/Live';
import Matches from '../matches/Matches';
import { Outlet } from "react-router-dom";

const Home = () => {

    return (
        <div className="app">
            <div className="app__header">
            <div className="app__navbar">
                <Header />
            </div>
            <div className="app__sidebar">
                <Sidebar />
            </div>
            </div>
            <div className="app__content">   
            <Outlet />
            </div>
        </div>
    );
}

export default Home;