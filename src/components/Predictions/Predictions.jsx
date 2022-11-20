import { useState, useEffect } from 'react';
import findTeam from '../../utils/findTeam';
import { useSelector, useDispatch } from "react-redux";
import { predictionsServices } from "../../services/predctions";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserVotes from '../UserVotes/UserVotes';
import { Spin } from 'antd';


const Predictions = (props) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [data, setData] = useState(<p className='text-center font-mono text-lg font-semibold text-red-700'>На этом матч не нашлось прогнозов</p>)
    const [percent, setPercent] = useState({
        btsNo: '',
        btsYes: '',
        draw: '',
        totalUnder: '',
        totlaOver: '',
        winerAway: '',
        winerHome: '',
    });
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getPredictions = async () => {
            try {
                const betzonaLinks = state.betzona.filter(el => findTeam(el.homeName, props.homeName) && findTeam(el.awayName, props.awayName))
                let betzona

                if (betzonaLinks.length !== 0) {
                    const betzonaPredict = await predictionsServices.getBetzonaPredict(betzonaLinks[0].link)
                    console.log(betzonaPredict)
                    betzona = betzonaPredict.data.predicitons
                }
                else {
                    betzona = [{ predict: '', text: '' }]
                }

                const oddsRuLinks = state.oddsRu.filter(el => findTeam(el.homeName, props.homeName) && findTeam(el.awayName, props.awayName))
                let oddsRu

                if (oddsRuLinks.length !== 0) {
                    const oddsPredict = await predictionsServices.getOddsRuPredict(oddsRuLinks[0].link)
                    console.log(oddsPredict)
                    oddsRu = oddsPredict.data.predicitons
                }
                else {
                    oddsRu = [{ predict: '', text: '' }]
                }
                const euroFootballLink = state.euroFootball.filter(el => findTeam(el.homeName, props.homeName) && findTeam(el.awayName, props.awayName))
                let euroFootball

                if (euroFootballLink.length !== 0) {
                    const euroFootballPredict = await predictionsServices.getEuroFootballPredict(euroFootballLink[0].link)
                    console.log(euroFootballPredict)
                    euroFootball = euroFootballPredict.data.predicitons
                }
                else {
                    euroFootball = [{ predict: '', text: '' }]
                }

                const legalbetlLink = state.legalbet.filter(el => findTeam(el.homeName, props.homeName) && findTeam(el.awayName, props.awayName))
                let legalbet

                if (legalbetlLink.length !== 0) {
                    const legalbetPredict = await predictionsServices.getLeagalbetPredict(legalbetlLink[0].link)
                    console.log(legalbetPredict)
                    legalbet = legalbetPredict.data.predicitons
                }
                else {
                    legalbet = [{ predict: '', text: '' }]
                }

                const liveresultFilterOnNull = state.liveresult.filter(el => el.homeName && el.awayName)
                const liveresultlLink = liveresultFilterOnNull.filter(el => findTeam(el.homeName, props.homeName) && findTeam(el.awayName, props.awayName))
                let liveresult

                if (liveresultlLink.length !== 0) {
                    const liveresultPredict = await predictionsServices.getLiveresultPredict(liveresultlLink[0].link)
                    console.log(liveresultPredict)
                    liveresult = liveresultPredict.data.predicitons
                    setPercent(liveresultPredict.data.predicitons[0].percent)
                }
                else {
                    liveresult = [{ predict: '', text: '' }]
                }

                // const stavkiprognozylLink = state.stavkiprognozy.filter(el => findTeam(el.homeName, props.homeName) && findTeam(el.awayName, props.awayName))
                // let stavkiprognozy

                // if (stavkiprognozylLink.length !== 0) {
                //     const stavkiprognozyPredict = await predictionsServices.getStavkiprognozyPredict(stavkiprognozylLink[0].link)
                //     console.log(stavkiprognozyPredict)
                //     stavkiprognozy = stavkiprognozyPredict.data.predicitons
                // }
                // else {
                //     stavkiprognozy = [{ predict: '', text: '' }]
                // }

                const arrPredictions = [...betzona, ...oddsRu, ...euroFootball, ...legalbet, ...liveresult,]
                const arrPredictionsFilter = arrPredictions.filter(el => el.predict !== '' && el.text !== '')

                console.log(arrPredictionsFilter)

                if (arrPredictionsFilter.length > 0) {
                    const arrElements = arrPredictionsFilter.map((el, i) => {
                        return (
                            <div className='mt-3' key={i}>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id={i}
                                    >
                                        <Typography>{el.predict}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {el.text}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        )
                    })
                    setData(arrElements)
                }

                for (let key in percent) {
                    let pos = percent[key].indexOf('%')
                    percent[key] = percent[key].slice(0, pos)
                    setPercent(percent)
                }
                setIsLoading(true)
            }
            catch (error) {
                console.log(error)
                setIsLoading(true)
            }
        }

        getPredictions()

    }, [])


    return (
        <>
            <h2 className="text-center py-3 font-serif text-2xl font-bold text-slate-600">Прогнозы</h2>
            {isLoading ?
                <>
                    <div>
                        {data}
                    </div>
                    <div>
                        <UserVotes data={percent} />
                    </div>
                </>
                :
                <div className="h-16 flex flex-col justify-center items-center">
                    <Spin size="large" />
                </div>
            }

        </>
    )
}

export default Predictions;