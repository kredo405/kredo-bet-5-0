import axios from 'axios';
import { useEffect, useState } from 'react';

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
           <div className="list-item" key={el.fixture.id}>
           </div>
        );
    })


    return (
        <div className="listMatchesLive">
           
        </div>
    )
}

export default ListMatchesLive;