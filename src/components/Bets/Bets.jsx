import { useState, useEffect } from 'react';
import { calcPoisonDestribution } from '../../utils/calcPoisonDestributin';
import { calPercentForMatches } from '../../utils/calcPercentForMatches';
import { calcPoisonWithScore } from '../../utils/calcPoisonWithScore';
import ToolsPrediction from '../ToolsPrediction/ToolsPrediction';
import Comment from '../Comment/Comment';
import { calcCorrectScore } from '../../utils/calcCorrectScore';
import Predictions from '../Predictions/Predictions';

const Bets = (props) => {

    const percentOutcomes = calcPoisonDestribution(props.form)
    const percentMatches = calPercentForMatches(props.form.matchesHome, props.form.matchesAway, props.homeName, props.awayName)
    const percentWithScore = calcPoisonWithScore(props.data)
    const correctScoreFilter = props.correctScore.map(el => {
        const pos = el.teamName.indexOf('vs')
        const homeName = el.teamName.slice(0, pos)
        const awayName = el.teamName.slice(pos + 2)

        const scores = el.scores.map(item => {
            const elements = ['score0_0', 'score0_1', 'score0_2', 'score0_3', 'score1_0', 'score1_1', 'score1_2', 'score1_3',
                'score2_0', 'score2_1', 'score2_2', 'score2_3', 'score3_0', 'score3_1', 'score3_2', 'score3_3',]

            elements.forEach(element => {
                if (item[element]) {
                    const pos = item[element].indexOf('%')
                    item[element] = +item[element].slice(0, pos)
                }
            })

            return item
        })

        const percentOutcomes = calcCorrectScore(el.scores)

        return {
            homeName: homeName,
            awayName: awayName,
            scores: scores,
            date: el.date,
            league: el.leagueName,
            percentOutcomes: percentOutcomes,
        }
    })

    console.log(correctScoreFilter)

    return (
        <>
            <div className="constainer">
                <div className="flex justify-center mb-3">
                    <h1 className='text-center py-3 font-serif text-2xl font-bold text-slate-600'>Ставки с найбольшей вероятностью прохода</h1>
                </div>
                <div>
                    <ToolsPrediction
                        percentPoison={percentOutcomes}
                        percentMatches={percentMatches}
                        percentWithScore={percentWithScore}
                        correctScore={correctScoreFilter}
                        homeName={props.homeName}
                        awayName={props.awayName}
                    />
                    <Comment data={props.data} />
                </div>
            </div>
        </>
    )
}

export default Bets;