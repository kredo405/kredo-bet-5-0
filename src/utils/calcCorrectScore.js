export const calcCorrectScore = (scores) => {
    const matchespercent = {
        btsNo:
            +scores[4].score1_0.percent.slice(0, -1) +
            +scores[8].score2_0.percent.slice(0, -1) +
            +scores[12].score3_0.percent.slice(0, -1) +
            +scores[1].score0_1.percent.slice(0, -1) +
            +scores[2].score0_2.percent.slice(0, -1) +
            +scores[3].score0_3.percent.slice(0, -1) +
            +scores[0].score0_0.percent.slice(0, -1),
        btsYes:
            +scores[9].score2_1.percent.slice(0, -1) +
            +scores[13].score3_1.percent.slice(0, -1) +
            +scores[14].score3_2.percent.slice(0, -1) +
            +scores[6].score1_2.percent.slice(0, -1) +
            +scores[7].score1_3.percent.slice(0, -1) +
            +scores[11].score2_3.percent.slice(0, -1) +
            +scores[5].score1_1.percent.slice(0, -1) +
            +scores[10].score2_2.percent.slice(0, -1) +
            +scores[15].score3_3.percent.slice(0, -1),
        draw:
            +scores[0].score0_0.percent.slice(0, -1) +
            +scores[5].score1_1.percent.slice(0, -1) +
            +scores[10].score2_2.percent.slice(0, -1) +
            +scores[15].score3_3.percent.slice(0, -1),
        foraAwayMinus15:
            +scores[2].score0_2.percent.slice(0, -1) +
            +scores[3].score0_3.percent.slice(0, -1) +
            +scores[7].score1_3.percent.slice(0, -1),
        foraAwayPlus15:
            +scores[1].score0_1.percent.slice(0, -1) +
            +scores[2].score0_2.percent.slice(0, -1) +
            +scores[6].score1_2.percent.slice(0, -1) +
            +scores[3].score0_3.percent.slice(0, -1) +
            +scores[7].score1_3.percent.slice(0, -1) +
            +scores[11].score2_3.percent.slice(0, -1) +
            +scores[0].score0_0.percent.slice(0, -1) +
            +scores[5].score1_1.percent.slice(0, -1) +
            +scores[10].score2_2.percent.slice(0, -1) +
            +scores[15].score3_3.percent.slice(0, -1) +
            +scores[4].score1_0.percent.slice(0, -1) +
            +scores[9].score2_1.percent.slice(0, -1) +
            +scores[14].score3_2.percent.slice(0, -1),
        foraHomeMinus15:
            +scores[8].score2_0.percent.slice(0, -1) +
            +scores[12].score3_0.percent.slice(0, -1) +
            +scores[13].score3_1.percent.slice(0, -1),
        foraHomePlus15:
            +scores[0].score0_0.percent.slice(0, -1) +
            +scores[5].score1_1.percent.slice(0, -1) +
            +scores[10].score2_2.percent.slice(0, -1) +
            +scores[15].score3_3.percent.slice(0, -1) +
            +scores[4].score1_0.percent.slice(0, -1) +
            +scores[8].score2_0.percent.slice(0, -1) +
            +scores[9].score2_1.percent.slice(0, -1) +
            +scores[12].score3_0.percent.slice(0, -1) +
            +scores[13].score3_1.percent.slice(0, -1) +
            +scores[14].score3_2.percent.slice(0, -1) +
            +scores[1].score0_1.percent.slice(0, -1) +
            +scores[6].score1_2.percent.slice(0, -1) +
            +scores[11].score2_3.percent.slice(0, -1),
        it1O05:
            +scores[8].score2_0.percent.slice(0, -1) +
            +scores[9].score2_1.percent.slice(0, -1) +
            +scores[12].score3_0.percent.slice(0, -1) +
            +scores[13].score3_1.percent.slice(0, -1) +
            +scores[14].score3_2.percent.slice(0, -1) +
            +scores[10].score2_2.percent.slice(0, -1) +
            +scores[15].score3_3.percent.slice(0, -1) +
            +scores[11].score2_3.percent.slice(0, -1) +
            +scores[4].score1_0.percent.slice(0, -1) +
            +scores[5].score1_1.percent.slice(0, -1),
        it1O15:
            +scores[8].score2_0.percent.slice(0, -1) +
            +scores[9].score2_1.percent.slice(0, -1) +
            +scores[12].score3_0.percent.slice(0, -1) +
            +scores[13].score3_1.percent.slice(0, -1) +
            +scores[14].score3_2.percent.slice(0, -1) +
            +scores[10].score2_2.percent.slice(0, -1) +
            +scores[15].score3_3.percent.slice(0, -1) +
            +scores[11].score2_3.percent.slice(0, -1),
        it1O25:
            +scores[12].score3_0.percent.slice(0, -1) +
            +scores[13].score3_1.percent.slice(0, -1) +
            +scores[14].score3_2.percent.slice(0, -1) +
            +scores[15].score3_3.percent.slice(0, -1),
        it1U05:
            +scores[0].score0_0.percent.slice(0, -1) +
            +scores[1].score0_1.percent.slice(0, -1) +
            +scores[2].score0_2.percent.slice(0, -1) +
            +scores[3].score0_3.percent.slice(0, -1),
        it1U15:
            +scores[0].score0_0.percent.slice(0, -1) +
            +scores[1].score0_1.percent.slice(0, -1) +
            +scores[2].score0_2.percent.slice(0, -1) +
            +scores[3].score0_3.percent.slice(0, -1) +
            +scores[5].score1_1.percent.slice(0, -1) +
            +scores[6].score1_2.percent.slice(0, -1) +
            +scores[7].score1_3.percent.slice(0, -1) +
            +scores[4].score1_0.percent.slice(0, -1),
        it1U25:
            +scores[0].score0_0.percent.slice(0, -1) +
            +scores[1].score0_1.percent.slice(0, -1) +
            +scores[2].score0_2.percent.slice(0, -1) +
            +scores[3].score0_3.percent.slice(0, -1) +
            +scores[5].score1_1.percent.slice(0, -1) +
            +scores[6].score1_2.percent.slice(0, -1) +
            +scores[7].score1_3.percent.slice(0, -1) +
            +scores[4].score1_0.percent.slice(0, -1) +
            +scores[10].score2_2.percent.slice(0, -1) +
            +scores[11].score2_3.percent.slice(0, -1) +
            +scores[8].score2_0.percent.slice(0, -1) +
            +scores[9].score2_1.percent.slice(0, -1),
        it2O05:
            +scores[1].score0_1.percent.slice(0, -1) +
            +scores[2].score0_2.percent.slice(0, -1) +
            +scores[6].score1_2.percent.slice(0, -1) +
            +scores[3].score0_3.percent.slice(0, -1) +
            +scores[7].score1_3.percent.slice(0, -1) +
            +scores[11].score2_3.percent.slice(0, -1) +
            +scores[10].score2_2.percent.slice(0, -1) +
            +scores[15].score3_3.percent.slice(0, -1) +
            +scores[14].score3_2.percent.slice(0, -1) +
            +scores[5].score1_1.percent.slice(0, -1) +
            +scores[13].score3_1.percent.slice(0, -1) +
            +scores[9].score2_1.percent.slice(0, -1),
        it2O15:
            +scores[1].score0_1.percent.slice(0, -1) +
            +scores[2].score0_2.percent.slice(0, -1) +
            +scores[6].score1_2.percent.slice(0, -1) +
            +scores[3].score0_3.percent.slice(0, -1) +
            +scores[7].score1_3.percent.slice(0, -1) +
            +scores[11].score2_3.percent.slice(0, -1) +
            +scores[10].score2_2.percent.slice(0, -1) +
            +scores[15].score3_3.percent.slice(0, -1) +
            +scores[14].score3_2.percent.slice(0, -1),
        it2O25:
            +scores[15].score3_3.percent.slice(0, -1) +
            +scores[11].score2_3.percent.slice(0, -1) +
            +scores[7].score1_3.percent.slice(0, -1) +
            +scores[3].score0_3.percent.slice(0, -1),
        it2U05:
            +scores[0].score0_0.percent.slice(0, -1) +
            +scores[4].score1_0.percent.slice(0, -1) +
            +scores[8].score2_0.percent.slice(0, -1) +
            +scores[12].score3_0.percent.slice(0, -1),
        it2U15:
            +scores[0].score0_0.percent.slice(0, -1) +
            +scores[4].score1_0.percent.slice(0, -1) +
            +scores[8].score2_0.percent.slice(0, -1) +
            +scores[12].score3_0.percent.slice(0, -1) +
            +scores[1].score0_1.percent.slice(0, -1) +
            +scores[9].score2_1.percent.slice(0, -1) +
            +scores[13].score3_1.percent.slice(0, -1) +
            +scores[5].score1_1.percent.slice(0, -1),
        it2U25:
            +scores[0].score0_0.percent.slice(0, -1) +
            +scores[4].score1_0.percent.slice(0, -1) +
            +scores[8].score2_0.percent.slice(0, -1) +
            +scores[12].score3_0.percent.slice(0, -1) +
            +scores[1].score0_1.percent.slice(0, -1) +
            +scores[9].score2_1.percent.slice(0, -1) +
            +scores[13].score3_1.percent.slice(0, -1) +
            +scores[5].score1_1.percent.slice(0, -1) +
            +scores[6].score1_2.percent.slice(0, -1) +
            +scores[10].score2_2.percent.slice(0, -1) +
            +scores[14].score3_2.percent.slice(0, -1),
        to15:
            +scores[9].score2_1.percent.slice(0, -1) +
            +scores[12].score3_0.percent.slice(0, -1) +
            +scores[13].score3_1.percent.slice(0, -1) +
            +scores[14].score3_2.percent.slice(0, -1) +
            +scores[6].score1_2.percent.slice(0, -1) +
            +scores[3].score0_3.percent.slice(0, -1) +
            +scores[7].score1_3.percent.slice(0, -1) +
            +scores[11].score2_3.percent.slice(0, -1) +
            +scores[10].score2_2.percent.slice(0, -1) +
            +scores[15].score3_3.percent.slice(0, -1) +
            +scores[5].score1_1.percent.slice(0, -1) +
            +scores[8].score2_0.percent.slice(0, -1) +
            +scores[2].score0_2.percent.slice(0, -1),
        to25:
            +scores[9].score2_1.percent.slice(0, -1) +
            +scores[12].score3_0.percent.slice(0, -1) +
            +scores[13].score3_1.percent.slice(0, -1) +
            +scores[14].score3_2.percent.slice(0, -1) +
            +scores[6].score1_2.percent.slice(0, -1) +
            +scores[3].score0_3.percent.slice(0, -1) +
            +scores[7].score1_3.percent.slice(0, -1) +
            +scores[11].score2_3.percent.slice(0, -1) +
            +scores[10].score2_2.percent.slice(0, -1) +
            +scores[15].score3_3.percent.slice(0, -1),
        to35:
            +scores[13].score3_1.percent.slice(0, -1) +
            +scores[14].score3_2.percent.slice(0, -1) +
            +scores[7].score1_3.percent.slice(0, -1) +
            +scores[11].score2_3.percent.slice(0, -1) +
            +scores[10].score2_2.percent.slice(0, -1) +
            +scores[15].score3_3.percent.slice(0, -1),
        tu15:
            +scores[4].score1_0.percent.slice(0, -1) +
            +scores[1].score0_1.percent.slice(0, -1) +
            +scores[0].score0_0.percent.slice(0, -1),
        tu25:
            +scores[4].score1_0.percent.slice(0, -1) +
            +scores[8].score2_0.percent.slice(0, -1) +
            +scores[1].score0_1.percent.slice(0, -1) +
            +scores[2].score0_2.percent.slice(0, -1) +
            +scores[0].score0_0.percent.slice(0, -1) +
            +scores[5].score1_1.percent.slice(0, -1),
        tu35:
            +scores[4].score1_0.percent.slice(0, -1) +
            +scores[8].score2_0.percent.slice(0, -1) +
            +scores[1].score0_1.percent.slice(0, -1) +
            +scores[2].score0_2.percent.slice(0, -1) +
            +scores[0].score0_0.percent.slice(0, -1) +
            +scores[5].score1_1.percent.slice(0, -1) +
            +scores[9].score2_1.percent.slice(0, -1) +
            +scores[12].score3_0.percent.slice(0, -1) +
            +scores[6].score1_2.percent.slice(0, -1) +
            +scores[3].score0_3.percent.slice(0, -1),
        winOrDrawHome:
            +scores[4].score1_0.percent.slice(0, -1) +
            +scores[8].score2_0.percent.slice(0, -1) +
            +scores[9].score2_1.percent.slice(0, -1) +
            +scores[12].score3_0.percent.slice(0, -1) +
            +scores[13].score3_1.percent.slice(0, -1) +
            +scores[14].score3_2.percent.slice(0, -1) +
            +scores[0].score0_0.percent.slice(0, -1) +
            +scores[5].score1_1.percent.slice(0, -1) +
            +scores[10].score2_2.percent.slice(0, -1) +
            +scores[15].score3_3.percent.slice(0, -1),
        winOrdrawAway:
            +scores[1].score0_1.percent.slice(0, -1) +
            +scores[2].score0_2.percent.slice(0, -1) +
            +scores[6].score1_2.percent.slice(0, -1) +
            +scores[3].score0_3.percent.slice(0, -1) +
            +scores[7].score1_3.percent.slice(0, -1) +
            +scores[11].score2_3.percent.slice(0, -1) +
            +scores[0].score0_0.percent.slice(0, -1) +
            +scores[5].score1_1.percent.slice(0, -1) +
            +scores[10].score2_2.percent.slice(0, -1) +
            +scores[15].score3_3.percent.slice(0, -1),
        winnerAway:
            +scores[1].score0_1.percent.slice(0, -1) +
            +scores[2].score0_2.percent.slice(0, -1) +
            +scores[6].score1_2.percent.slice(0, -1) +
            +scores[3].score0_3.percent.slice(0, -1) +
            +scores[7].score1_3.percent.slice(0, -1) +
            +scores[11].score2_3.percent.slice(0, -1),
        winnerHome:
            +scores[4].score1_0.percent.slice(0, -1) +
            +scores[8].score2_0.percent.slice(0, -1) +
            +scores[9].score2_1.percent.slice(0, -1) +
            +scores[12].score3_0.percent.slice(0, -1) +
            +scores[13].score3_1.percent.slice(0, -1) +
            +scores[14].score3_2.percent.slice(0, -1),
    };

    return matchespercent;
};
