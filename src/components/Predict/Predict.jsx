import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { calcPredictions } from "../../utils/calcPredictions";
import { Spin, Collapse } from "antd";
import * as Scroll from "react-scroll";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { findUsefulInfo } from "../../utils/findFulInfo";
import { findMaxCoefficientChange } from "../../utils/findMaxCoefficientChange";

function formatDate(timestamp) {
    const date = new Date(timestamp);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${day}-${month}-${year}`;
}

const Predict = ({
    info,
    predictions,
    outsiderRange,
    midleRange,
    grandRange,
    oddsHistory,
}) => {
    const state = useSelector((state) => state);
    const [predictionsElements, setPredictionsElements] = useState(null);
    const [outcomes, setOutcomes] = useState({});
    const [moneyWay1x2, setMoneyWay1x2] = useState({});
    const [moneyWayOverUnder, setMoneyWayOverUnder] = useState({});
    const [correctScore, setCorrectScore] = useState({});
    const [odd, setOdd] = useState("1.5");

    const onChange = (key) => {
        console.log(key);
    };

    const handleClick = () => {
        const predictArr = calcPredictions(
            info,
            predictions,
            outcomes,
            moneyWay1x2,
            moneyWayOverUnder,
            correctScore,
            odd,
            outsiderRange,
            midleRange,
            grandRange
        );

        setPredictionsElements(<Spin className="my-3 py-10" size="large" />);

        const tableValue = {
            winnerHome: {
                percentageRank:
                    (predictArr.outcomes.winnerHome.percentageRank * 100) /
                    predictArr.outcomes.countMatchesRankHome,
                percentagleH2h:
                    (predictArr.outcomes.winnerHome.percentagleH2h * 100) /
                    predictArr.outcomes.countMatchesH2hHome,
                percentagleMatches:
                    (predictArr.outcomes.winnerHome.percentagleMatches * 100) /
                    predictArr.outcomes.countMatchesHome,
                percentaglePredictions:
                    predictArr.outcomes.winnerHome.percentaglePredictions,
                summ() {
                    const h2h =
                        this.percentagleH2h > 100 ? null : this.percentagleH2h;
                    const score = correctScore.winnerHome
                        ? correctScore.winnerHome
                        : null;
                    let sum;
                    if (h2h && score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.winnerHome.percent +
                            score;
                    } else if (h2h && !score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.winnerHome.percent +
                            50;
                    } else if (!h2h && score) {
                        sum =
                            this.percentageRank +
                            50 +
                            this.percentagleMatches +
                            outcomes.winnerHome.percent +
                            score;
                    }

                    return sum;
                },
                odd: +outcomes.winnerHome.odds,
            },
            winnerAway: {
                percentageRank:
                    (predictArr.outcomes.winnerAway.percentageRank * 100) /
                    predictArr.outcomes.countMatchesRankAway,
                percentagleH2h:
                    (predictArr.outcomes.winnerAway.percentagleH2h * 100) /
                    predictArr.outcomes.countMatchesH2hAway,
                percentagleMatches:
                    (predictArr.outcomes.winnerAway.percentagleMatches * 100) /
                    predictArr.outcomes.countMatchesAway,
                percentaglePredictions:
                    predictArr.outcomes.winnerAway.percentaglePredictions,
                summ() {
                    const h2h =
                        this.percentagleH2h > 100 ? null : this.percentagleH2h;
                    const score = correctScore.winnerAway
                        ? correctScore.winnerAway
                        : null;
                    let sum;
                    if (h2h && score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.winnerAway.percent +
                            score;
                    } else if (h2h && !score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.winnerAway.percent +
                            50;
                    } else if (!h2h && score) {
                        sum =
                            this.percentageRank +
                            50 +
                            this.percentagleMatches +
                            outcomes.winnerAway.percent +
                            score;
                    }

                    return sum;
                },
                odd: +outcomes.winnerAway.odds,
            },
            draw: {
                percentageRank:
                    (predictArr.outcomes.draw.percentageRank * 100) /
                    (predictArr.outcomes.countMatchesRankAway +
                        predictArr.outcomes.countMatchesRankHome),
                percentagleH2h:
                    (predictArr.outcomes.draw.percentagleH2h * 100) /
                    (predictArr.outcomes.countMatchesH2hAway +
                        predictArr.outcomes.countMatchesH2hHome),
                percentagleMatches:
                    (predictArr.outcomes.draw.percentagleMatches * 100) /
                    (predictArr.outcomes.countMatchesAway +
                        predictArr.outcomes.countMatchesHome),
                percentaglePredictions:
                    predictArr.outcomes.draw.percentaglePredictions,
                summ() {
                    const h2h =
                        this.percentagleH2h > 100 ? null : this.percentagleH2h;
                    const score = correctScore.draw ? correctScore.draw : null;
                    let sum;
                    if (h2h && score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.draw.percent +
                            score;
                    } else if (h2h && !score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.draw.percent +
                            50;
                    } else if (!h2h && score) {
                        sum =
                            this.percentageRank +
                            50 +
                            this.percentagleMatches +
                            outcomes.draw.percent +
                            score;
                    }

                    return sum;
                },
                odd: +outcomes.draw.odds,
            },
            winOrDrawHome: {
                percentageRank:
                    (predictArr.outcomes.winOrDrawHome.percentageRank * 100) /
                    predictArr.outcomes.countMatchesRankHome,
                percentagleH2h:
                    (predictArr.outcomes.winOrDrawHome.percentagleH2h * 100) /
                    predictArr.outcomes.countMatchesH2hHome,
                percentagleMatches:
                    (predictArr.outcomes.winOrDrawHome.percentagleMatches *
                        100) /
                    predictArr.outcomes.countMatchesHome,
                percentaglePredictions:
                    predictArr.outcomes.winOrDrawHome.percentaglePredictions,
                summ() {
                    const h2h =
                        this.percentagleH2h > 100 ? null : this.percentagleH2h;
                    const score = correctScore.winOrDrawHome
                        ? correctScore.winOrDrawHome
                        : null;
                    let sum;
                    if (h2h && score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.winOrDrawHome.percent +
                            score;
                    } else if (h2h && !score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.winOrDrawHome.percent +
                            50;
                    } else if (!h2h && score) {
                        sum =
                            this.percentageRank +
                            50 +
                            this.percentagleMatches +
                            outcomes.winOrDrawHome.percent +
                            score;
                    }

                    return sum;
                },
                odd: +outcomes.winOrDrawHome.odds,
            },
            winOrdrawAway: {
                percentageRank:
                    (predictArr.outcomes.winOrdrawAway.percentageRank * 100) /
                    predictArr.outcomes.countMatchesRankAway,
                percentagleH2h:
                    (predictArr.outcomes.winOrdrawAway.percentagleH2h * 100) /
                    predictArr.outcomes.countMatchesH2hAway,
                percentagleMatches:
                    (predictArr.outcomes.winOrdrawAway.percentagleMatches *
                        100) /
                    predictArr.outcomes.countMatchesAway,
                percentaglePredictions:
                    predictArr.outcomes.winOrdrawAway.percentaglePredictions,
                summ() {
                    const h2h =
                        this.percentagleH2h > 100 ? null : this.percentagleH2h;
                    const score = correctScore.winOrdrawAway
                        ? correctScore.winOrdrawAway
                        : null;
                    let sum;
                    if (h2h && score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.winOrdrawAway.percent +
                            score;
                    } else if (h2h && !score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.winOrdrawAway.percent +
                            50;
                    } else if (!h2h && score) {
                        sum =
                            this.percentageRank +
                            50 +
                            this.percentagleMatches +
                            outcomes.winOrdrawAway.percent +
                            score;
                    }

                    return sum;
                },
                odd: +outcomes.winOrdrawAway.odds,
            },
            foraHomeMinus15: {
                percentageRank:
                    (predictArr.outcomes.foraHomeMinus15.percentageRank * 100) /
                    predictArr.outcomes.countMatchesRankHome,
                percentagleH2h:
                    (predictArr.outcomes.foraHomeMinus15.percentagleH2h * 100) /
                    predictArr.outcomes.countMatchesH2hHome,
                percentagleMatches:
                    (predictArr.outcomes.foraHomeMinus15.percentagleMatches *
                        100) /
                    predictArr.outcomes.countMatchesHome,
                percentaglePredictions:
                    predictArr.outcomes.foraHomeMinus15.percentaglePredictions,
                summ() {
                    const h2h =
                        this.percentagleH2h > 100 ? null : this.percentagleH2h;
                    const score = correctScore.foraHomeMinus15
                        ? correctScore.foraHomeMinus15
                        : null;
                    let sum;
                    if (h2h && score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.foraHomeMinus15.percent +
                            score;
                    } else if (h2h && !score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.foraHomeMinus15.percent +
                            50;
                    } else if (!h2h && score) {
                        sum =
                            this.percentageRank +
                            50 +
                            this.percentagleMatches +
                            outcomes.foraHomeMinus15.percent +
                            score;
                    }

                    return sum;
                },
                odd: +outcomes.foraHomeMinus15.odds,
            },
            foraHomePlus15: {
                percentageRank:
                    (predictArr.outcomes.foraHomePlus15.percentageRank * 100) /
                    predictArr.outcomes.countMatchesRankHome,
                percentagleH2h:
                    (predictArr.outcomes.foraHomePlus15.percentagleH2h * 100) /
                    predictArr.outcomes.countMatchesH2hHome,
                percentagleMatches:
                    (predictArr.outcomes.foraHomePlus15.percentagleMatches *
                        100) /
                    predictArr.outcomes.countMatchesHome,
                percentaglePredictions:
                    predictArr.outcomes.foraHomePlus15.percentaglePredictions,
                summ() {
                    const h2h =
                        this.percentagleH2h > 100 ? null : this.percentagleH2h;
                    const score = correctScore.foraHomePlus15
                        ? correctScore.foraHomePlus15
                        : null;
                    let sum;
                    if (h2h && score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.foraHomePlus15.percent +
                            score;
                    } else if (h2h && !score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.foraHomePlus15.percent +
                            50;
                    } else if (!h2h && score) {
                        sum =
                            this.percentageRank +
                            50 +
                            this.percentagleMatches +
                            outcomes.foraHomePlus15.percent +
                            score;
                    }

                    return sum;
                },
                odd: +outcomes.foraHomePlus15.odds,
            },
            foraAwayMinus15: {
                percentageRank:
                    (predictArr.outcomes.foraAwayMinus15.percentageRank * 100) /
                    predictArr.outcomes.countMatchesRankAway,
                percentagleH2h:
                    (predictArr.outcomes.foraAwayMinus15.percentagleH2h * 100) /
                    predictArr.outcomes.countMatchesH2hAway,
                percentagleMatches:
                    (predictArr.outcomes.foraAwayMinus15.percentagleMatches *
                        100) /
                    predictArr.outcomes.countMatchesAway,
                percentaglePredictions:
                    predictArr.outcomes.foraAwayMinus15.percentaglePredictions,
                summ() {
                    const h2h =
                        this.percentagleH2h > 100 ? null : this.percentagleH2h;
                    const score = correctScore.foraAwayMinus15
                        ? correctScore.foraAwayMinus15
                        : null;
                    let sum;
                    if (h2h && score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.foraAwayMinus15.percent +
                            score;
                    } else if (h2h && !score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.foraAwayMinus15.percent +
                            50;
                    } else if (!h2h && score) {
                        sum =
                            this.percentageRank +
                            50 +
                            this.percentagleMatches +
                            outcomes.foraAwayMinus15.percent +
                            score;
                    }

                    return sum;
                },
                odd: +outcomes.foraAwayMinus15.odds,
            },
            foraAwayPlus15: {
                percentageRank:
                    (predictArr.outcomes.foraAwayPlus15.percentageRank * 100) /
                    predictArr.outcomes.countMatchesRankAway,
                percentagleH2h:
                    (predictArr.outcomes.foraAwayPlus15.percentagleH2h * 100) /
                    predictArr.outcomes.countMatchesH2hAway,
                percentagleMatches:
                    (predictArr.outcomes.foraAwayPlus15.percentagleMatches *
                        100) /
                    predictArr.outcomes.countMatchesAway,
                percentaglePredictions:
                    predictArr.outcomes.foraAwayPlus15.percentaglePredictions,
                summ() {
                    const h2h =
                        this.percentagleH2h > 100 ? null : this.percentagleH2h;
                    const score = correctScore.foraAwayPlus15
                        ? correctScore.foraAwayPlus15
                        : null;
                    let sum;
                    if (h2h && score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.foraAwayPlus15.percent +
                            score;
                    } else if (h2h && !score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.foraAwayPlus15.percent +
                            50;
                    } else if (!h2h && score) {
                        sum =
                            this.percentageRank +
                            50 +
                            this.percentagleMatches +
                            outcomes.foraAwayPlus15.percent +
                            score;
                    }

                    return sum;
                },
                odd: +outcomes.foraAwayPlus15.odds,
            },
            to15: {
                percentageRank:
                    (predictArr.outcomes.to15.percentageRank * 100) /
                    (predictArr.outcomes.countMatchesRankAway +
                        predictArr.outcomes.countMatchesRankHome),
                percentagleH2h:
                    (predictArr.outcomes.to15.percentagleH2h * 100) /
                    (predictArr.outcomes.countMatchesH2hAway +
                        predictArr.outcomes.countMatchesH2hHome),
                percentagleMatches:
                    (predictArr.outcomes.to15.percentagleMatches * 100) /
                    (predictArr.outcomes.countMatchesAway +
                        predictArr.outcomes.countMatchesHome),
                percentaglePredictions:
                    predictArr.outcomes.to15.percentaglePredictions,
                summ() {
                    const h2h =
                        this.percentagleH2h > 100 ? null : this.percentagleH2h;
                    const score = correctScore.to15 ? correctScore.to15 : null;
                    let sum;
                    if (h2h && score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.to15.percent +
                            score;
                    } else if (h2h && !score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.to15.percent +
                            50;
                    } else if (!h2h && score) {
                        sum =
                            this.percentageRank +
                            50 +
                            this.percentagleMatches +
                            outcomes.to15.percent +
                            score;
                    }

                    return sum;
                },
                odd: +outcomes.to15.odds,
            },
            tu15: {
                percentageRank:
                    (predictArr.outcomes.tu15.percentageRank * 100) /
                    (predictArr.outcomes.countMatchesRankAway +
                        predictArr.outcomes.countMatchesRankHome),
                percentagleH2h:
                    (predictArr.outcomes.tu15.percentagleH2h * 100) /
                    (predictArr.outcomes.countMatchesH2hAway +
                        predictArr.outcomes.countMatchesH2hHome),
                percentagleMatches:
                    (predictArr.outcomes.tu15.percentagleMatches * 100) /
                    (predictArr.outcomes.countMatchesAway +
                        predictArr.outcomes.countMatchesHome),
                percentaglePredictions:
                    predictArr.outcomes.tu15.percentaglePredictions,
                summ() {
                    const h2h =
                        this.percentagleH2h > 100 ? null : this.percentagleH2h;
                    const score = correctScore.tu15 ? correctScore.tu15 : null;
                    let sum;
                    if (h2h && score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.tu15.percent +
                            score;
                    } else if (h2h && !score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.tu15.percent +
                            50;
                    } else if (!h2h && score) {
                        sum =
                            this.percentageRank +
                            50 +
                            this.percentagleMatches +
                            outcomes.tu15.percent +
                            score;
                    }

                    return sum;
                },
                odd: +outcomes.tu15.odds,
            },
            to25: {
                percentageRank:
                    (predictArr.outcomes.to25.percentageRank * 100) /
                    (predictArr.outcomes.countMatchesRankAway +
                        predictArr.outcomes.countMatchesRankHome),
                percentagleH2h:
                    (predictArr.outcomes.to25.percentagleH2h * 100) /
                    (predictArr.outcomes.countMatchesH2hAway +
                        predictArr.outcomes.countMatchesH2hHome),
                percentagleMatches:
                    (predictArr.outcomes.to25.percentagleMatches * 100) /
                    (predictArr.outcomes.countMatchesAway +
                        predictArr.outcomes.countMatchesHome),
                percentaglePredictions:
                    predictArr.outcomes.to25.percentaglePredictions,
                summ() {
                    const h2h =
                        this.percentagleH2h > 100 ? null : this.percentagleH2h;
                    const score = correctScore.to25 ? correctScore.to25 : null;
                    let sum;
                    if (h2h && score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.to25.percent +
                            score;
                    } else if (h2h && !score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.to25.percent +
                            50;
                    } else if (!h2h && score) {
                        sum =
                            this.percentageRank +
                            50 +
                            this.percentagleMatches +
                            outcomes.to25.percent +
                            score;
                    }

                    return sum;
                },
                odd: +outcomes.to25.odds,
            },
            tu25: {
                percentageRank:
                    (predictArr.outcomes.tu25.percentageRank * 100) /
                    (predictArr.outcomes.countMatchesRankAway +
                        predictArr.outcomes.countMatchesRankHome),
                percentagleH2h:
                    (predictArr.outcomes.tu25.percentagleH2h * 100) /
                    (predictArr.outcomes.countMatchesH2hAway +
                        predictArr.outcomes.countMatchesH2hHome),
                percentagleMatches:
                    (predictArr.outcomes.tu25.percentagleMatches * 100) /
                    (predictArr.outcomes.countMatchesAway +
                        predictArr.outcomes.countMatchesHome),
                percentaglePredictions:
                    predictArr.outcomes.tu25.percentaglePredictions,
                summ() {
                    const h2h =
                        this.percentagleH2h > 100 ? null : this.percentagleH2h;
                    const score = correctScore.tu25 ? correctScore.tu25 : null;
                    let sum;
                    if (h2h && score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.tu25.percent +
                            score;
                    } else if (h2h && !score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.tu25.percent +
                            50;
                    } else if (!h2h && score) {
                        sum =
                            this.percentageRank +
                            50 +
                            this.percentagleMatches +
                            outcomes.tu25.percent +
                            score;
                    }

                    return sum;
                },
                odd: +outcomes.tu25.odds,
            },
            to35: {
                percentageRank:
                    (predictArr.outcomes.to35.percentageRank * 100) /
                    (predictArr.outcomes.countMatchesRankAway +
                        predictArr.outcomes.countMatchesRankHome),
                percentagleH2h:
                    (predictArr.outcomes.to35.percentagleH2h * 100) /
                    (predictArr.outcomes.countMatchesH2hAway +
                        predictArr.outcomes.countMatchesH2hHome),
                percentagleMatches:
                    (predictArr.outcomes.to35.percentagleMatches * 100) /
                    (predictArr.outcomes.countMatchesAway +
                        predictArr.outcomes.countMatchesHome),
                percentaglePredictions:
                    predictArr.outcomes.to35.percentaglePredictions,
                summ() {
                    const h2h =
                        this.percentagleH2h > 100 ? null : this.percentagleH2h;
                    const score = correctScore.to35 ? correctScore.to35 : null;
                    let sum;
                    if (h2h && score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.to35.percent +
                            score;
                    } else if (h2h && !score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.to35.percent +
                            50;
                    } else if (!h2h && score) {
                        sum =
                            this.percentageRank +
                            50 +
                            this.percentagleMatches +
                            outcomes.to35.percent +
                            score;
                    }

                    return sum;
                },
                odd: +outcomes.to35.odds,
            },
            tu35: {
                percentageRank:
                    (predictArr.outcomes.tu35.percentageRank * 100) /
                    (predictArr.outcomes.countMatchesRankAway +
                        predictArr.outcomes.countMatchesRankHome),
                percentagleH2h:
                    (predictArr.outcomes.tu35.percentagleH2h * 100) /
                    (predictArr.outcomes.countMatchesH2hAway +
                        predictArr.outcomes.countMatchesH2hHome),
                percentagleMatches:
                    (predictArr.outcomes.tu35.percentagleMatches * 100) /
                    (predictArr.outcomes.countMatchesAway +
                        predictArr.outcomes.countMatchesHome),
                percentaglePredictions:
                    predictArr.outcomes.tu35.percentaglePredictions,
                summ() {
                    const h2h =
                        this.percentagleH2h > 100 ? null : this.percentagleH2h;
                    const score = correctScore.tu35 ? correctScore.tu35 : null;
                    let sum;
                    if (h2h && score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.tu35.percent +
                            score;
                    } else if (h2h && !score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.tu35.percent +
                            50;
                    } else if (!h2h && score) {
                        sum =
                            this.percentageRank +
                            50 +
                            this.percentagleMatches +
                            outcomes.tu35.percent +
                            score;
                    }

                    return sum;
                },
                odd: +outcomes.tu35.odds,
            },
            btsYes: {
                percentageRank:
                    (predictArr.outcomes.btsYes.percentageRank * 100) /
                    (predictArr.outcomes.countMatchesRankAway +
                        predictArr.outcomes.countMatchesRankHome),
                percentagleH2h:
                    (predictArr.outcomes.btsYes.percentagleH2h * 100) /
                    (predictArr.outcomes.countMatchesH2hAway +
                        predictArr.outcomes.countMatchesH2hHome),
                percentagleMatches:
                    (predictArr.outcomes.btsYes.percentagleMatches * 100) /
                    (predictArr.outcomes.countMatchesAway +
                        predictArr.outcomes.countMatchesHome),
                percentaglePredictions:
                    predictArr.outcomes.btsYes.percentaglePredictions,
                summ() {
                    const h2h =
                        this.percentagleH2h > 100 ? null : this.percentagleH2h;
                    const score = correctScore.btsYes
                        ? correctScore.btsYes
                        : null;
                    let sum;
                    if (h2h && score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.btsYes.percent +
                            score;
                    } else if (h2h && !score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.btsYes.percent +
                            50;
                    } else if (!h2h && score) {
                        sum =
                            this.percentageRank +
                            50 +
                            this.percentagleMatches +
                            outcomes.btsYes.percent +
                            score;
                    }

                    return sum;
                },
                odd: +outcomes.btsYes.odds,
            },
            btsNo: {
                percentageRank:
                    (predictArr.outcomes.btsNo.percentageRank * 100) /
                    (predictArr.outcomes.countMatchesRankAway +
                        predictArr.outcomes.countMatchesRankHome),
                percentagleH2h:
                    (predictArr.outcomes.btsNo.percentagleH2h * 100) /
                    (predictArr.outcomes.countMatchesH2hAway +
                        predictArr.outcomes.countMatchesH2hHome),
                percentagleMatches:
                    (predictArr.outcomes.btsNo.percentagleMatches * 100) /
                    (predictArr.outcomes.countMatchesAway +
                        predictArr.outcomes.countMatchesHome),
                percentaglePredictions:
                    predictArr.outcomes.btsNo.percentaglePredictions,
                summ() {
                    const h2h =
                        this.percentagleH2h > 100 ? null : this.percentagleH2h;
                    const score = correctScore.btsNo
                        ? correctScore.btsNo
                        : null;
                    let sum;
                    if (h2h && score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.btsNo.percent +
                            score;
                    } else if (h2h && !score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.btsNo.percent +
                            50;
                    } else if (!h2h && score) {
                        sum =
                            this.percentageRank +
                            50 +
                            this.percentagleMatches +
                            outcomes.btsNo.percent +
                            score;
                    }

                    return sum;
                },
                odd: +outcomes.btsNo.odds,
            },
            it1O05: {
                percentageRank:
                    (predictArr.outcomes.it1O05.percentageRank * 100) /
                    predictArr.outcomes.countMatchesRankHome,
                percentagleH2h:
                    (predictArr.outcomes.it1O05.percentagleH2h * 100) /
                    predictArr.outcomes.countMatchesH2hHome,
                percentagleMatches:
                    (predictArr.outcomes.it1O05.percentagleMatches * 100) /
                    predictArr.outcomes.countMatchesHome,
                percentaglePredictions:
                    predictArr.outcomes.it1O05.percentaglePredictions,
                summ() {
                    const h2h =
                        this.percentagleH2h > 100 ? null : this.percentagleH2h;
                    const score = correctScore.it1O05
                        ? correctScore.it1O05
                        : null;
                    let sum;
                    if (h2h && score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.it1O05.percent +
                            score;
                    } else if (h2h && !score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.it1O05.percent +
                            50;
                    } else if (!h2h && score) {
                        sum =
                            this.percentageRank +
                            50 +
                            this.percentagleMatches +
                            outcomes.it1O05.percent +
                            score;
                    }

                    return sum;
                },
                odd: +outcomes.it1O05.odds,
            },
            it1O15: {
                percentageRank:
                    (predictArr.outcomes.it1O15.percentageRank * 100) /
                    predictArr.outcomes.countMatchesRankHome,
                percentagleH2h:
                    (predictArr.outcomes.it1O15.percentagleH2h * 100) /
                    predictArr.outcomes.countMatchesH2hHome,
                percentagleMatches:
                    (predictArr.outcomes.it1O15.percentagleMatches * 100) /
                    predictArr.outcomes.countMatchesHome,
                percentaglePredictions:
                    predictArr.outcomes.it1O15.percentaglePredictions,
                summ() {
                    const h2h =
                        this.percentagleH2h > 100 ? null : this.percentagleH2h;
                    const score = correctScore.it1O15
                        ? correctScore.it1O15
                        : null;
                    let sum;
                    if (h2h && score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.it1O15.percent +
                            score;
                    } else if (h2h && !score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.it1O15.percent +
                            50;
                    } else if (!h2h && score) {
                        sum =
                            this.percentageRank +
                            50 +
                            this.percentagleMatches +
                            outcomes.it1O15.percent +
                            score;
                    }

                    return sum;
                },
                odd: +outcomes.it1O15.odds,
            },
            it1O25: {
                percentageRank:
                    (predictArr.outcomes.it1O25.percentageRank * 100) /
                    predictArr.outcomes.countMatchesRankHome,
                percentagleH2h:
                    (predictArr.outcomes.it1O25.percentagleH2h * 100) /
                    predictArr.outcomes.countMatchesH2hHome,
                percentagleMatches:
                    (predictArr.outcomes.it1O25.percentagleMatches * 100) /
                    predictArr.outcomes.countMatchesHome,
                percentaglePredictions:
                    predictArr.outcomes.it1O25.percentaglePredictions,
                summ() {
                    const h2h =
                        this.percentagleH2h > 100 ? null : this.percentagleH2h;
                    const score = correctScore.it1O25
                        ? correctScore.it1O25
                        : null;
                    let sum;
                    if (h2h && score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.it1O25.percent +
                            score;
                    } else if (h2h && !score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.it1O25.percent +
                            50;
                    } else if (!h2h && score) {
                        sum =
                            this.percentageRank +
                            50 +
                            this.percentagleMatches +
                            outcomes.it1O25.percent +
                            score;
                    }

                    return sum;
                },
                odd: +outcomes.it1O25.odds,
            },
            it1U05: {
                percentageRank:
                    (predictArr.outcomes.it1U05.percentageRank * 100) /
                    predictArr.outcomes.countMatchesRankHome,
                percentagleH2h:
                    (predictArr.outcomes.it1U05.percentagleH2h * 100) /
                    predictArr.outcomes.countMatchesH2hHome,
                percentagleMatches:
                    (predictArr.outcomes.it1U05.percentagleMatches * 100) /
                    predictArr.outcomes.countMatchesHome,
                percentaglePredictions:
                    predictArr.outcomes.it1U05.percentaglePredictions,
                summ() {
                    const h2h =
                        this.percentagleH2h > 100 ? null : this.percentagleH2h;
                    const score = correctScore.it1U05
                        ? correctScore.it1U05
                        : null;
                    let sum;
                    if (h2h && score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.it1U05.percent +
                            score;
                    } else if (h2h && !score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.it1U05.percent +
                            50;
                    } else if (!h2h && score) {
                        sum =
                            this.percentageRank +
                            50 +
                            this.percentagleMatches +
                            outcomes.it1U05.percent +
                            score;
                    }

                    return sum;
                },
                odd: +outcomes.it1U05.odds,
            },
            it1U15: {
                percentageRank:
                    (predictArr.outcomes.it1U15.percentageRank * 100) /
                    predictArr.outcomes.countMatchesRankHome,
                percentagleH2h:
                    (predictArr.outcomes.it1U15.percentagleH2h * 100) /
                    predictArr.outcomes.countMatchesH2hHome,
                percentagleMatches:
                    (predictArr.outcomes.it1U15.percentagleMatches * 100) /
                    predictArr.outcomes.countMatchesHome,
                percentaglePredictions:
                    predictArr.outcomes.it1U15.percentaglePredictions,
                summ() {
                    const h2h =
                        this.percentagleH2h > 100 ? null : this.percentagleH2h;
                    const score = correctScore.it1U15
                        ? correctScore.it1U15
                        : null;
                    let sum;
                    if (h2h && score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.it1U15.percent +
                            score;
                    } else if (h2h && !score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.it1U15.percent +
                            50;
                    } else if (!h2h && score) {
                        sum =
                            this.percentageRank +
                            50 +
                            this.percentagleMatches +
                            outcomes.it1U15.percent +
                            score;
                    }

                    return sum;
                },
                odd: +outcomes.it1U15.odds,
            },
            it1U25: {
                percentageRank:
                    (predictArr.outcomes.it1U25.percentageRank * 100) /
                    predictArr.outcomes.countMatchesRankHome,
                percentagleH2h:
                    (predictArr.outcomes.it1U25.percentagleH2h * 100) /
                    predictArr.outcomes.countMatchesH2hHome,
                percentagleMatches:
                    (predictArr.outcomes.it1U25.percentagleMatches * 100) /
                    predictArr.outcomes.countMatchesHome,
                percentaglePredictions:
                    predictArr.outcomes.it1U25.percentaglePredictions,
                summ() {
                    const h2h =
                        this.percentagleH2h > 100 ? null : this.percentagleH2h;
                    const score = correctScore.it1U25
                        ? correctScore.it1U25
                        : null;
                    let sum;
                    if (h2h && score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.it1U25.percent +
                            score;
                    } else if (h2h && !score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.it1U25.percent +
                            50;
                    } else if (!h2h && score) {
                        sum =
                            this.percentageRank +
                            50 +
                            this.percentagleMatches +
                            outcomes.it1U25.percent +
                            score;
                    }

                    return sum;
                },
                odd: +outcomes.it1U25.odds,
            },
            it2O05: {
                percentageRank:
                    (predictArr.outcomes.it2O05.percentageRank * 100) /
                    predictArr.outcomes.countMatchesRankAway,
                percentagleH2h:
                    (predictArr.outcomes.it2O05.percentagleH2h * 100) /
                    predictArr.outcomes.countMatchesH2hAway,
                percentagleMatches:
                    (predictArr.outcomes.it2O05.percentagleMatches * 100) /
                    predictArr.outcomes.countMatchesAway,
                percentaglePredictions:
                    predictArr.outcomes.it2O05.percentaglePredictions,
                summ() {
                    const h2h =
                        this.percentagleH2h > 100 ? null : this.percentagleH2h;
                    const score = correctScore.it2O05
                        ? correctScore.it2O05
                        : null;
                    let sum;
                    if (h2h && score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.it2O05.percent +
                            score;
                    } else if (h2h && !score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.it2O05.percent +
                            50;
                    } else if (!h2h && score) {
                        sum =
                            this.percentageRank +
                            50 +
                            this.percentagleMatches +
                            outcomes.it2O05.percent +
                            score;
                    }

                    return sum;
                },
                odd: +outcomes.it2O05.odds,
            },
            it2O15: {
                percentageRank:
                    (predictArr.outcomes.it2O15.percentageRank * 100) /
                    predictArr.outcomes.countMatchesRankAway,
                percentagleH2h:
                    (predictArr.outcomes.it2O15.percentagleH2h * 100) /
                    predictArr.outcomes.countMatchesH2hAway,
                percentagleMatches:
                    (predictArr.outcomes.it2O15.percentagleMatches * 100) /
                    predictArr.outcomes.countMatchesAway,
                percentaglePredictions:
                    predictArr.outcomes.it2O15.percentaglePredictions,
                summ() {
                    const h2h =
                        this.percentagleH2h > 100 ? null : this.percentagleH2h;
                    const score = correctScore.it2O15
                        ? correctScore.it2O15
                        : null;
                    let sum;
                    if (h2h && score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.it2O15.percent +
                            score;
                    } else if (h2h && !score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.it2O15.percent +
                            50;
                    } else if (!h2h && score) {
                        sum =
                            this.percentageRank +
                            50 +
                            this.percentagleMatches +
                            outcomes.it2O15.percent +
                            score;
                    }

                    return sum;
                },
                odd: +outcomes.it2O15.odds,
            },
            it2O25: {
                percentageRank:
                    (predictArr.outcomes.it2O25.percentageRank * 100) /
                    predictArr.outcomes.countMatchesRankAway,
                percentagleH2h:
                    (predictArr.outcomes.it2O25.percentagleH2h * 100) /
                    predictArr.outcomes.countMatchesH2hAway,
                percentagleMatches:
                    (predictArr.outcomes.it2O25.percentagleMatches * 100) /
                    predictArr.outcomes.countMatchesAway,
                percentaglePredictions:
                    predictArr.outcomes.it2O25.percentaglePredictions,
                summ() {
                    const h2h =
                        this.percentagleH2h > 100 ? null : this.percentagleH2h;
                    const score = correctScore.it2O25
                        ? correctScore.it2O25
                        : null;
                    let sum;
                    if (h2h && score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.it2O25.percent +
                            score;
                    } else if (h2h && !score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.it2O25.percent +
                            50;
                    } else if (!h2h && score) {
                        sum =
                            this.percentageRank +
                            50 +
                            this.percentagleMatches +
                            outcomes.it2O25.percent +
                            score;
                    }

                    return sum;
                },
                odd: +outcomes.it2O25.odds,
            },
            it2U05: {
                percentageRank:
                    (predictArr.outcomes.it2U05.percentageRank * 100) /
                    predictArr.outcomes.countMatchesRankAway,
                percentagleH2h:
                    (predictArr.outcomes.it2U05.percentagleH2h * 100) /
                    predictArr.outcomes.countMatchesH2hAway,
                percentagleMatches:
                    (predictArr.outcomes.it2U05.percentagleMatches * 100) /
                    predictArr.outcomes.countMatchesAway,
                percentaglePredictions:
                    predictArr.outcomes.it2U05.percentaglePredictions,
                summ() {
                    const h2h =
                        this.percentagleH2h > 100 ? null : this.percentagleH2h;
                    const score = correctScore.it2U05
                        ? correctScore.it2U05
                        : null;
                    let sum;
                    if (h2h && score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.it2U05.percent +
                            score;
                    } else if (h2h && !score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.it2U05.percent +
                            50;
                    } else if (!h2h && score) {
                        sum =
                            this.percentageRank +
                            50 +
                            this.percentagleMatches +
                            outcomes.it2U05.percent +
                            score;
                    }

                    return sum;
                },
                odd: +outcomes.it2U05.odds,
            },
            it2U15: {
                percentageRank:
                    (predictArr.outcomes.it2U15.percentageRank * 100) /
                    predictArr.outcomes.countMatchesRankAway,
                percentagleH2h:
                    (predictArr.outcomes.it2U15.percentagleH2h * 100) /
                    predictArr.outcomes.countMatchesH2hAway,
                percentagleMatches:
                    (predictArr.outcomes.it2U15.percentagleMatches * 100) /
                    predictArr.outcomes.countMatchesAway,
                percentaglePredictions:
                    predictArr.outcomes.it2U15.percentaglePredictions,
                summ() {
                    const h2h =
                        this.percentagleH2h > 100 ? null : this.percentagleH2h;
                    const score = correctScore.it2U15
                        ? correctScore.it2U15
                        : null;
                    let sum;
                    if (h2h && score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.it2U15.percent +
                            score;
                    } else if (h2h && !score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.it2U15.percent +
                            50;
                    } else if (!h2h && score) {
                        sum =
                            this.percentageRank +
                            50 +
                            this.percentagleMatches +
                            outcomes.it2U15.percent +
                            score;
                    }

                    return sum;
                },
                odd: +outcomes.it2U15.odds,
            },
            it2U25: {
                percentageRank:
                    (predictArr.outcomes.it2U25.percentageRank * 100) /
                    predictArr.outcomes.countMatchesRankAway,
                percentagleH2h:
                    (predictArr.outcomes.it2U25.percentagleH2h * 100) /
                    predictArr.outcomes.countMatchesH2hAway,
                percentagleMatches:
                    (predictArr.outcomes.it2U25.percentagleMatches * 100) /
                    predictArr.outcomes.countMatchesAway,
                percentaglePredictions:
                    predictArr.outcomes.it2U25.percentaglePredictions,
                summ() {
                    const h2h =
                        this.percentagleH2h > 100 ? null : this.percentagleH2h;
                    const score = correctScore.it2U25
                        ? correctScore.it2U25
                        : null;
                    let sum;
                    if (h2h && score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.it2U25.percent +
                            score;
                    } else if (h2h && !score) {
                        sum =
                            this.percentageRank +
                            h2h +
                            this.percentagleMatches +
                            outcomes.it2U25.percent +
                            50;
                    } else if (!h2h && score) {
                        sum =
                            this.percentageRank +
                            50 +
                            this.percentagleMatches +
                            outcomes.it2U25.percent +
                            score;
                    }

                    return sum;
                },
                odd: +outcomes.it2U25.odds,
            },
        };

        const resultObj = {};

        for (const key in tableValue) {
            if (tableValue[key].odd >= 1.4) {
                resultObj[key] = {
                    sum: tableValue[key].summ(),
                    odd: tableValue[key].odd,
                    percentaglePredictions:
                        tableValue[key].percentaglePredictions,
                    name: outcomes[key].outcomes,
                    num: outcomes[key].num,
                    percent: outcomes[key].percent,
                    percentageRank: tableValue[key].percentageRank,
                    percentagleH2h: tableValue[key].percentagleH2h,
                    percentagleMatches: tableValue[key].percentagleMatches,
                };
            }
        }

        const sorted = Object.entries(resultObj)
            .sort((a, b) => b[1].sum - a[1].sum)
            .slice(0, 5);
        const result = sorted.map(([key, value]) => ({ [key]: value }));

        const table = result.map((el) => {
            let element;
            for (let key in el) {
                element = {
                    name: el[key].name,
                    odd: el[key].odd,
                    percentaglePredictions: el[key].percentaglePredictions,
                    sum: el[key].sum,
                    num: el[key].num,
                    percent: el[key].percent,
                    percentageRank: el[key].percentageRank,
                    percentagleH2h: el[key].percentagleH2h,
                    percentagleMatches: el[key].percentagleMatches,
                };
            }

            const oddElements = oddsHistory[element.num].map((el) => {
                const date = formatDate(el[0]);
                return (
                    <div
                        key={el[0]}
                        className="flex justify-between items-center border-b-2 border-slate-400 border-solid px-3"
                    >
                        <div className="font-bold text-lime-900 ">{date}</div>
                        <div className="font-bold text-cyan-800">
                            {el[1].toFixed(2)}
                        </div>
                    </div>
                );
            });

            return (
                <div className="mb-3" key={element.num}>
                    <div className="flex justify-center py-3 w-full bg-slate-100">
                        <span className="text-lg font-bold font-mono">
                            {element.name}
                        </span>
                    </div>
                    <div>
                        <Tabs
                            defaultActiveKey={element.name}
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey={element.name} title="Основное">
                                <div>
                                    <div className="flex justify-between items-center border-b-2 border-slate-400 border-solid">
                                        <div className="font-bold text-lime-900 ">
                                            Вероятность
                                        </div>
                                        <div className="font-bold text-red-800">
                                            {element.percent.toFixed(1)}%
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center border-b-2 border-slate-400 border-solid">
                                        <div className="font-bold text-lime-900 ">
                                            Рейтинг
                                        </div>
                                        <div className="font-bold text-red-800">
                                            {element.sum.toFixed(1)}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center border-b-2 border-slate-400 border-solid">
                                        <div className="font-bold text-lime-900 ">
                                            Кол-во прогнозов
                                        </div>
                                        <div className="font-bold text-red-800">
                                            {element.percentaglePredictions}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center border-b-2 border-slate-400 border-solid">
                                        <div className="font-bold text-lime-900 ">
                                            Коэфицент
                                        </div>
                                        <div className="font-bold text-red-800">
                                            {element.odd.toFixed(1)}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center border-b-2 border-slate-400 border-solid">
                                        <div className="font-bold text-lime-900 ">
                                            Валуйность
                                        </div>
                                        <div className="font-bold text-red-800">
                                            {(
                                                element.percent -
                                                100 / element.odd
                                            ).toFixed(1)}
                                            %
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center border-b-2 border-slate-400 border-solid">
                                        <div className="font-bold text-lime-900 ">
                                            Прошёл в матчах%
                                        </div>
                                        <div className="font-bold text-red-800">
                                            {element.percentagleMatches.toFixed(
                                                1
                                            )}
                                            %
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center border-b-2 border-slate-400 border-solid">
                                        <div className="font-bold text-lime-900 ">
                                            Прошёл в матчах H2H%
                                        </div>
                                        <div className="font-bold text-red-800">
                                            {element.percentagleH2h.toFixed(1)}%
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center border-b-2 border-slate-400 border-solid">
                                        <div className="font-bold text-lime-900 ">
                                            Прошёл c пох. командами
                                        </div>
                                        <div className="font-bold text-red-800">
                                            {element.percentageRank.toFixed(1)}%
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab
                                eventKey={element.num}
                                title="История Коэфицентов"
                            >
                                <div>{oddElements}</div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            );
        });

        const green =
            "bg-green-200 flex justify-center font-mono text-center text-black font-bold";
        const rose =
            "bg-rose-200 flex justify-center font-mono text-center text-black font-bold";
        const blue =
            "bg-sky-200 flex justify-center font-mono text-center text-black font-bold";

        setTimeout(() => {
            setPredictionsElements(
                <>
                    <div>{table}</div>
                </>
            );
            Scroll.animateScroll.scrollToBottom();
        }, 2500);

        Scroll.animateScroll.scrollToBottom();
    };

    useEffect(() => {
        setOutcomes(state.matchSlice.outcomes);
        setMoneyWay1x2(state.moneyWaySlice.moneyWay1x2);
        setMoneyWayOverUnder(state.moneyWaySlice.moneyWayOverUnder);
        setCorrectScore(state.moneyWaySlice.correctScore);
    }, [
        state.matchSlice.outcomes,
        state.moneyWaySlice.moneyWay1x2,
        state.moneyWaySlice.moneyWayOverUnder,
        state.moneyWaySlice.correctScore,
    ]);

    return (
        <>
            <div className="flex justify-center mb-3">
                <h2 className="text-center py-3 font-serif text-2xl font-bold text-slate-600">
                    Прогноз
                </h2>
            </div>

            <div className="flex justify-center my-5">
                <button
                    className="px-5 py-2 bg-emerald-500 text-lg text-gray-50 border-emerald-500 rounded-lg border-2 border-solid"
                    onClick={handleClick}
                >
                    Рассчитать прогноз
                </button>
            </div>
            <div className="flex flex-col justify-center items-center">
                {predictionsElements}
            </div>
        </>
    );
};

export default Predict;
