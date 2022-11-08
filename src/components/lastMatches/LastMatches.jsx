import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Progress } from 'antd';
import axios from 'axios';

const LastMatches = (props) => {
    const matchesHome = props.data.matchesHome
    const matchesAway = props.data.matchesAway


    const elementsMatchesHome = matchesHome.map((el, i) => {
        return (
            <li key={i} className='flex justify-between py-2 border-b-2 border-slate-200 border-solid '>
                <span className='w-2/12 lg:w-1/12 text-center text-xs lg:text-lg font-sans font-medium'>{el.date}</span>
                <div className='w-4/12 flex lg:pl-10 items-center'>
                    <img className='w-[20px] h-[20px]' src={el.homeLogo} alt="Логотип" />
                    <span className='text-center px-1 text-xs lg:text-lg text-blue-900 font-mono font-bold'>{el.homeTeam}</span>
                </div>
                <span className='w-1/12 lg:w-3/12 mt-3 text-center text-xs lg:text-lg font-sans font-medium text-red-400'>{el.homeGoals} : {el.awayGoals}</span>
                <div className='w-4/12 flex items-center'>
                    <img className='w-[20px] h-[20px]' src={el.awayLogo} alt="Логотип" />
                    <span className='text-center px-1 text-xs lg:text-lg text-blue-900 font-mono font-bold'>{el.awayTeam}</span>
                </div>
            </li>
        )
    })

    const elementsMatchesAway = matchesAway.map((el, i) => {
        return (
            <li key={i} className='flex justify-between py-2 border-b-2 border-slate-200 border-solid '>
                <span className='w-2/12 lg:w-1/12 text-center text-xs lg:text-lg font-sans font-medium'>{el.date}</span>
                <div className='w-4/12 flex lg:pl-10 items-center'>
                    <img className='w-[20px] h-[20px]' src={el.homeLogo} alt="Логотип" />
                    <span className='text-center px-1 text-xs lg:text-lg text-blue-900 font-mono font-bold'>{el.homeTeam}</span>
                </div>
                <span className='w-1/12 lg:w-3/12 mt-3 text-center text-xs lg:text-lg font-sans font-medium text-red-400'>{el.homeGoals} : {el.awayGoals}</span>
                <div className='w-4/12 flex items-center'>
                    <img className='w-[20px] h-[20px]' src={el.awayLogo} alt="Логотип" />
                    <span className='text-center px-1 text-xs lg:text-lg text-blue-900 font-mono font-bold'>{el.awayTeam}</span>
                </div>
            </li>
        )
    })

    return (
        <div className='container'>
            <div className="flex justify-center my-4">
                <h1 className='text-center py-3 font-serif text-2xl font-bold text-slate-600'>Последние матчи {props.homeName}</h1>
            </div>
            <ul>
                {elementsMatchesHome}
            </ul>
            <div className="flex justify-center my-4">
                <h1 className='text-center py-3 font-serif text-2xl font-bold text-slate-600'>Последние матчи {props.awayName}</h1>
            </div>
            <ul>
                {elementsMatchesAway}
            </ul>
        </div>
    )
}

export default LastMatches;