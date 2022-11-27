export const calcCorrectScore = (scores) => {

    const matchesPercent = {
        btsNo: scores[4].score1_0.percent + scores[8].score2_0.percent + scores[12].score3_0.percent + scores[1].score0_1.percent + scores[2].score0_2.percent + scores[3].score0_3.percent + scores[0].score0_0.percent,
        btsYes: (+scores[9].score2_1.percent + +scores[13].score3_1.percent + +scores[14].score3_2.percent + +scores[6].score1_2.percent + +scores[7].score1_3.percent + +scores[11].score2_3.percent +
            +scores[5].score1_1.percent + +scores[10].score2_2.percent + +scores[15].score3_3.percent),
        draw: scores[0].score0_0.percent + scores[5].score1_1.percent + scores[10].score2_2.percent + scores[15].score3_3.percent,
        foraAwayMinus15: scores[2].score0_2.percent + scores[3].score0_3.percent + scores[7].score1_3.percent,
        foraAwayPlus15: +scores[1].score0_1.percent + +scores[2].score0_2.percent + +scores[6].score1_2.percent + +scores[3].score0_3.percent + +scores[7].score1_3.percent + +scores[11].score2_3.percent +
            scores[0].score0_0.percent + scores[5].score1_1.percent + scores[10].score2_2.percent + scores[15].score3_3.percent + scores[4].score1_0.percent + scores[9].score2_1.percent + scores[14].score3_2.percent,
        foraHomeMinus15: scores[8].score2_0.percent + scores[12].score3_0.percent + scores[13].score3_1.percent,
        foraHomePlus15: scores[0].score0_0.percent + scores[5].score1_1.percent + scores[10].score2_2.percent + scores[15].score3_3.percent + scores[4].score1_0.percent + +scores[8].score2_0.percent + +scores[9].score2_1.percent +
            +scores[12].score3_0.percent + +scores[13].score3_1.percent + +scores[14].score3_2.percent + scores[1].score0_1.percent + scores[6].score1_2.percent + scores[11].score2_3.percent,
        it1O05: +scores[8].score2_0.percent + +scores[9].score2_1.percent + +scores[12].score3_0.percent + +scores[13].score3_1.percent + +scores[14].score3_2.percent +
            +scores[10].score2_2.percent + +scores[15].score3_3.percent + +scores[11].score2_3.percent + scores[4].score1_0.percent + scores[5].score1_1.percent,
        it1O15: (+scores[8].score2_0.percent + +scores[9].score2_1.percent + +scores[12].score3_0.percent + +scores[13].score3_1.percent + +scores[14].score3_2.percent +
            +scores[10].score2_2.percent + +scores[15].score3_3.percent + +scores[11].score2_3.percent),
        it1O25: scores[12].score3_0.percent + scores[13].score3_1.percent + scores[14].score3_2.percent + scores[15].score3_3.percent,
        it1U05: scores[0].score0_0.percent + scores[1].score0_1.percent + scores[2].score0_2.percent + scores[3].score0_3.percent,
        it1U15: scores[0].score0_0.percent + scores[1].score0_1.percent + scores[2].score0_2.percent + scores[3].score0_3.percent + scores[5].score1_1.percent + scores[6].score1_2.percent +
            scores[7].score1_3.percent + scores[4].score1_0.percent,
        it1U25: scores[0].score0_0.percent + scores[1].score0_1.percent + scores[2].score0_2.percent + scores[3].score0_3.percent + scores[5].score1_1.percent + scores[6].score1_2.percent +
            scores[7].score1_3.percent + scores[4].score1_0.percent + scores[10].score2_2.percent + scores[11].score2_3.percent + scores[8].score2_0.percent + scores[9].score2_1.percent,
        it2O05: +scores[1].score0_1.percent + +scores[2].score0_2.percent + +scores[6].score1_2.percent + +scores[3].score0_3.percent + +scores[7].score1_3.percent + +scores[11].score2_3.percent +
            +scores[10].score2_2.percent + +scores[15].score3_3.percent + +scores[14].score3_2.percent + scores[5].score1_1.percent + scores[13].score3_1.percent + scores[9].score2_1.percent,
        it2O15: (+scores[1].score0_1.percent + +scores[2].score0_2.percent + +scores[6].score1_2.percent + +scores[3].score0_3.percent + +scores[7].score1_3.percent + +scores[11].score2_3.percent +
            +scores[10].score2_2.percent + +scores[15].score3_3.percent + +scores[14].score3_2.percent),
        it2O25: scores[15].score3_3.percent + scores[11].score2_3.percent + scores[7].score1_3.percent + scores[3].score0_3.percent,
        it2U05: scores[0].score0_0.percent + scores[4].score1_0.percent + scores[8].score2_0.percent + scores[12].score3_0.percent,
        it2U15: scores[0].score0_0.percent + scores[4].score1_0.percent + scores[8].score2_0.percent + scores[12].score3_0.percent + scores[1].score0_1.percent + scores[9].score2_1.percent +
            scores[13].score3_1.percent + scores[5].score1_1.percent,
        it2U25: scores[0].score0_0.percent + scores[4].score1_0.percent + scores[8].score2_0.percent + scores[12].score3_0.percent + scores[1].score0_1.percent + scores[9].score2_1.percent +
            scores[13].score3_1.percent + scores[5].score1_1.percent + scores[6].score1_2.percent + scores[10].score2_2.percent + scores[14].score3_2.percent,
        to15: (+scores[9].score2_1.percent + +scores[12].score3_0.percent + +scores[13].score3_1.percent + +scores[14].score3_2.percent + +scores[6].score1_2.percent + +scores[3].score0_3.percent +
            +scores[7].score1_3.percent + +scores[11].score2_3.percent + +scores[10].score2_2.percent + +scores[15].score3_3.percent) + scores[5].score1_1.percent + scores[8].score2_0.percent +
            scores[2].score0_2.percent,
        to25: (+scores[9].score2_1.percent + +scores[12].score3_0.percent + +scores[13].score3_1.percent + +scores[14].score3_2.percent + +scores[6].score1_2.percent + +scores[3].score0_3.percent +
            +scores[7].score1_3.percent + +scores[11].score2_3.percent + +scores[10].score2_2.percent + +scores[15].score3_3.percent),
        to35: (scores[13].score3_1.percent + +scores[14].score3_2.percent + scores[7].score1_3.percent + +scores[11].score2_3.percent + +scores[10].score2_2.percent + +scores[15].score3_3.percent),
        tu15: (+scores[4].score1_0.percent + scores[1].score0_1.percent + +scores[0].score0_0.percent),
        tu25: (+scores[4].score1_0.percent + +scores[8].score2_0.percent + +scores[1].score0_1.percent + +scores[2].score0_2.percent + +scores[0].score0_0.percent + +scores[5].score1_1.percent),
        tu35: (+scores[4].score1_0.percent + +scores[8].score2_0.percent + +scores[1].score0_1.percent + +scores[2].score0_2.percent + +scores[0].score0_0.percent + +scores[5].score1_1.percent) +
            scores[9].score2_1.percent + scores[12].score3_0.percent + scores[6].score1_2.percent + scores[3].score0_3.percent,
        winOrDrawHome: (+scores[4].score1_0.percent + +scores[8].score2_0.percent + +scores[9].score2_1.percent + +scores[12].score3_0.percent + +scores[13].score3_1.percent + +scores[14].score3_2.percent) +
            scores[0].score0_0.percent + scores[5].score1_1.percent + scores[10].score2_2.percent + scores[15].score3_3.percent,
        winOrdrawAway: (+scores[1].score0_1.percent + +scores[2].score0_2.percent + +scores[6].score1_2.percent + +scores[3].score0_3.percent + +scores[7].score1_3.percent + +scores[11].score2_3.percent) +
            scores[0].score0_0.percent + scores[5].score1_1.percent + scores[10].score2_2.percent + scores[15].score3_3.percent,
        winnerAway: (+scores[1].score0_1.percent + +scores[2].score0_2.percent + +scores[6].score1_2.percent + +scores[3].score0_3.percent + +scores[7].score1_3.percent + +scores[11].score2_3.percent),
        winnerHome: (+scores[4].score1_0.percent + +scores[8].score2_0.percent + +scores[9].score2_1.percent + +scores[12].score3_0.percent + +scores[13].score3_1.percent + +scores[14].score3_2.percent),
    }

    return matchesPercent;
}