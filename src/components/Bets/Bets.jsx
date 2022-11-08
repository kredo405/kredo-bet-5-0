import { useState, useEffect } from 'react';
import { calcPoisonDestribution } from '../../utils/calcPoisonDestributin';
import { calPercentForMatches } from '../../utils/calcPercentForMatches';
import { calcPoisonWithScore } from '../../utils/calcPoisonWithScore';
import ToolsPrediction from '../ToolsPrediction/ToolsPrediction';
import Comment from '../Comment/Comment';
import Predictions from '../Predictions/Predictions';

const Bets = (props) => {

    const percentOutcomes = calcPoisonDestribution(props.form)
    const percentMatches = calPercentForMatches(props.form.matchesHome, props.form.matchesAway, props.homeName, props.awayName)
    const percentWithScore = calcPoisonWithScore(props.data)

    return (
        <>
            <div className="constainer">
                <div className="flex justify-center mb-3">
                    <h1 className='text-center py-3 font-serif text-2xl font-bold text-slate-600'>Вероятности</h1>
                </div>
                <div>
                    <ToolsPrediction
                        percentPoison={percentOutcomes}
                        percentMatches={percentMatches}
                        percentWithScore={percentWithScore}
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