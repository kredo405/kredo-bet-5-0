import { useSelector } from "react-redux";
import { calcPoisonDestribution } from '../../utils/calcPoisonDestributin';
import { calPercentForMatches } from '../../utils/calcPercentForMatches';
import { calcPoisonWithScore } from '../../utils/calcPoisonWithScore';
import ToolsPrediction from '../ToolsPrediction/ToolsPrediction';
import Comment from '../Comment/Comment';
import { calcCorrectScore } from '../../utils/calcCorrectScore';

const Bets = ({ data, form, info, homeName, awayName }) => {
    const state = useSelector(state => state);
    const percentOutcomes = calcPoisonDestribution(form)
    const percentMatches = calPercentForMatches(form.matchesHome, form.matchesAway, homeName, awayName)
    const percentWithScore = calcPoisonWithScore(data)

    console.log(info)

    return (
        <>
            <div className="constainer">
                <div className="flex justify-center mb-3">
                    <h1 className='text-center py-3 font-serif text-2xl font-bold text-slate-600'>Вероятность прохода</h1>
                </div>
                <div>
                    <ToolsPrediction
                        percentPoison={percentOutcomes}
                        percentMatches={percentMatches}
                        percentWithScore={percentWithScore}
                        info={info}
                        homeName={homeName}
                        awayName={awayName}
                    />
                    <Comment data={data} />
                </div>
            </div>
        </>
    )
}

export default Bets;