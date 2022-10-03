import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Avatar, List } from 'antd';

const determineComposition = (dataHome, dataAway) => {
    let calcHome = 0;

    const dataHomeFilter = [];
    const dataAwayFilter = [];

    let maxGamesHome = Math.max(...dataHome.map(obj => +obj.games));

    const maxArrHome = dataHome.filter(obj => {
        if (+obj.games === maxGamesHome) {
            calcHome++
            return obj;
        }
    });

    dataHomeFilter.push(...maxArrHome)

    const dataRemainingPlayersHome = dataHome.filter(el => +el.games !== maxGamesHome);
    const maxGamesRemainingPlayersHome = Math.max(...dataRemainingPlayersHome.map(obj => +obj.games));

    dataRemainingPlayersHome.forEach(el => {

        if (+el.games === maxGamesRemainingPlayersHome) {
            if (calcHome < 11) {
                calcHome++;
                dataHomeFilter.push(el)
            }
        } else {
            if (calcHome < 11 && +el.games === maxGamesRemainingPlayersHome - 1) {
                calcHome++;
                dataHomeFilter.push(el)
            } else {
                if (calcHome < 11 && +el.games > maxGamesRemainingPlayersHome - 3) {
                    calcHome++;
                    dataHomeFilter.push(el)
                }
            }
        }
    })

    console.log(dataHomeFilter)

}


const PoisonDestribution = (props) => {
    const state = useSelector((state) => state);
    const [dataHome, setDataHome] = useState(state.playerStatsHome);
    const [dataAway, setDataAway] = useState(state.playerStatsAway);

    const deletePlayerHome = (e) => {
        const dataHomeFilter = dataHome.filter(el => e.target.name !== el.player);
        setDataHome(dataHomeFilter);
    }

    const deletePlayerAway = (e) => {
        const dataAwayFilter = dataAway.filter(el => e.target.name !== el.player);
        setDataAway(dataAwayFilter);
    }

    const calcPoison = () => {
        determineComposition(dataHome, dataAway);
    }



    return (
        <div className='container'>
            <div className="flex justify-center py-2">
                <h2 className='text-xl'>Выберите травмированных игроков {props.homeName}</h2>
            </div>
            <List
                itemLayout="horizontal"
                dataSource={dataHome}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title={<p>{item.player}</p>}
                        />
                        <button className='text-red-600' name={item.player} onClick={deletePlayerHome}>Травмирован</button>
                    </List.Item>
                )}
            />
            <div className="flex justify-center py-2">
                <h2 className='text-xl'>Выберите травмированных игроков {props.awayName}</h2>
            </div>
            <List
                itemLayout="horizontal"
                dataSource={dataAway}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title={<p>{item.player}</p>}
                        />
                        <button className='text-red-600' name={item.player} onClick={deletePlayerAway}>Травмирован</button>
                    </List.Item>
                )}
            />
            <div className="flex justify-center py-2 mb-5 ">
                <button
                    className='text-xl bg-cyan-600 text-white px-10 py-3 rounded-lg border-2 border-cyan-600 border-solid'
                    onClick={calcPoison}
                >
                    Рассчитать
                </button>
            </div>
        </div>
    )
}

export default PoisonDestribution;