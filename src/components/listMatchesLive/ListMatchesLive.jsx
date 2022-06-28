import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './listMatchesLive.scss';

const ListMatchesLive = () => {
    const [arrMatches, setArrayMatches] = useState([]);

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
            params: {live: 'all'},
            headers: {
              'X-RapidAPI-Key': 'f570367049msh92d23c8fda1a817p1b03cfjsne8957d93c6e0',
              'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
              console.log(response.data);
              setArrayMatches(response.data.response)
          }).catch(function (error) {
              console.error(error);
          });
    }, []);

    let matches = arrMatches.map(el => {
        return (
           <div className="list-item">
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
                        <ListItemText primary={`${el.goals.home} : ${el.goals.away}`} />
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
            <List
                sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                {matches}
            </List>
        </div>
    )
}

export default ListMatchesLive;