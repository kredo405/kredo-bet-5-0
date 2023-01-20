import { calcPoisonDestribution } from '../../utils/calcPoisonDestributin';
import { calPercentForMatches } from '../../utils/calcPercentForMatches';
import { calcPoisonWithScore } from '../../utils/calcPoisonWithScore';
import ToolsPrediction from '../ToolsPrediction/ToolsPrediction';
import Comment from '../Comment/Comment';

const Bets = ({ data, info }) => {
    const percentOutcomes = calcPoisonDestribution(info);
    const percentMatches = calPercentForMatches(info.matches[0], info.matches[1], info.team1_name, info.team2_name);
    const percentWithScore = calcPoisonWithScore(data);

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
                    />
                    <Comment data={data} />
                </div>
            </div>
        </>
    )
}

export default Bets;