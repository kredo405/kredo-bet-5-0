import { useSelector, useDispatch } from "react-redux";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar } from '@mui/material';
import { Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Matches = (props) => {
    const [arrMatches, setArrayMatches] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { app } = props;
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const history = useNavigate();

    useEffect(() => {

        const getMatches = () => {
            const date = new Date(),
                year = date.getFullYear(),
                mounth = date.getMonth(),
                day = date.getDate();

            let mounthNew = '0',
                dayNew = '0';
            if (day < 10) {
                dayNew = dayNew + String(day)
            } else {
                dayNew = day;
            }
            if (mounth < 10) {
                mounthNew = mounthNew + String(mounth + 1)
            } else {
                mounthNew = String(mounth + 1);
            }
            const options = {
                method: 'GET',
                url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
                params: { date: `${year}-${mounthNew}-${dayNew}` },
                headers: {
                    'X-RapidAPI-Key': 'f570367049msh92d23c8fda1a817p1b03cfjsne8957d93c6e0',
                    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                }
            };

            axios.request(options).then(function (response) {
                console.log(`${year}-${mounthNew}-${dayNew}`);
                setArrayMatches(response.data.response);
                setIsLoading(true);
                dispatch({
                    type: 'MATCHES',
                    payload: {
                        matches: response.data.response,
                        date: date,
                    }
                })
            }).catch(function (error) {
                console.error(error);
            });
        }

        if (state.arrMatchesToday.length !== 0) {
            setArrayMatches(state.arrMatchesToday);
            setIsLoading(true);
        } else {
            getMatches();
        }

    }, []);

    let filterMatches = arrMatches.filter(el => el.goals.home === null);

    let matches = filterMatches.map(el => {
        return (
            <div onClick={() => {
                dispatch({
                    type: 'MATCH',
                    payload: {
                        id: el.fixture.id,
                        homeLogo: el.teams.home.logo,
                        homeName: el.teams.home.name,
                        awayLogo: el.teams.away.logo,
                        awayName: el.teams.away.name,
                        goalsHome: el.goals.home,
                        goalsAway: el.goals.away,
                        leagueName: el.league.name,
                        leagueLogo: el.league.logo,
                        leagueId: el.league.id,
                        country: el.league.country,
                        flag: el.league.flag,
                    }
                });
                history('/home/match');
            }}
                className="list-item">
                <ListItemButton key={el.fixture.id}>
                    <ListItemIcon>
                        <Avatar alt="logo" src={el.teams.home.logo} />
                    </ListItemIcon>
                    <div className="listMatchesLive__teamName">
                        <div>
                            <p className='listMatchesLive__text'>{el.teams.home.name}</p>
                        </div>
                    </div>
                    <div className="listMatchesLive__score">
                        <div>
                            <ListItemText primary={`${el.fixture.date.slice(11, 16)}(+3ч)`} />
                        </div>
                    </div>
                    <div className="listMatchesLive__teamName">
                        <div>
                            <p className='listMatchesLive__text'>{el.teams.away.name}</p>
                        </div>
                    </div>
                    <ListItemIcon>
                        <Avatar alt="logo" src={el.teams.away.logo} />
                    </ListItemIcon>
                </ListItemButton>
            </div>
        );
    })

    return (
        <div className="listMatchesLive">
            {isLoading ?
                <List
                    sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    {matches}
                </List>
                :
                <div className='spinner'>
                    <Spinner animation="grow" variant="primary" />
                    <Spinner animation="grow" variant="secondary" />
                    <Spinner animation="grow" variant="success" />
                    <Spinner animation="grow" variant="danger" />
                    <Spinner animation="grow" variant="warning" />
                    <Spinner animation="grow" variant="info" />
                    <Spinner animation="grow" variant="primary" />
                </div>
            }

        </div>
    )
}

export default Matches;