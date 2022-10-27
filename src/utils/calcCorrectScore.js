export const calcCorrectScore = (scores) => {

        const matchesPercent = {
            btsNo: scores[4].score1_0 + scores[8].score2_0 + scores[12].score3_0 + scores[1].score0_1 + scores[2].score0_2 + scores[3].score0_3 + scores[0].score0_0,
            btsYes: (+scores[9].score2_1 + +scores[13].score3_1 + +scores[14].score3_2 + +scores[6].score1_2 + +scores[7].score1_3 + +scores[11].score2_3 +
                +scores[5].score1_1 + +scores[10].score2_2 + +scores[15].score3_3),
            draw: scores[0].score0_0 + scores[5].score1_1 + scores[10].score2_2 + scores[15].score3_3,
            foraAwayMinus15: scores[2].score0_2 + scores[3].score0_3 + scores[7].score1_3,
            foraAwayPlus15: +scores[1].score0_1 + +scores[2].score0_2 + +scores[6].score1_2 + +scores[3].score0_3 + +scores[7].score1_3 + +scores[11].score2_3 +
            scores[0].score0_0 + scores[5].score1_1 + scores[10].score2_2 + scores[15].score3_3 + scores[4].score1_0 + scores[9].score2_1 + scores[14].score3_2,
            foraHomeMinus15: scores[8].score2_0 + scores[12].score3_0 + scores[13].score3_1,
            foraHomePlus15: scores[0].score0_0 + scores[5].score1_1 + scores[10].score2_2 + scores[15].score3_3 + scores[4].score1_0 + +scores[8].score2_0 + +scores[9].score2_1 +
             +scores[12].score3_0 + +scores[13].score3_1 + +scores[14].score3_2 + scores[1].score0_1 + scores[6].score1_2 + scores[11].score2_3,
            it1O05: +scores[8].score2_0 + +scores[9].score2_1 + +scores[12].score3_0 + +scores[13].score3_1 + +scores[14].score3_2 +
            +scores[10].score2_2 + +scores[15].score3_3 + +scores[11].score2_3 + scores[4].score1_0 + scores[5].score1_1,
            it1O15: (+scores[8].score2_0 + +scores[9].score2_1 + +scores[12].score3_0 + +scores[13].score3_1 + +scores[14].score3_2 +
                +scores[10].score2_2 + +scores[15].score3_3 + +scores[11].score2_3),
            it1O25: scores[12].score3_0 + scores[13].score3_1 + scores[14].score3_2 + scores[15].score3_3,
            it1U05: scores[0].score0_0 + scores[1].score0_1 + scores[2].score0_2 + scores[3].score0_3,
            it1U15: scores[0].score0_0 + scores[1].score0_1 + scores[2].score0_2 + scores[3].score0_3 + scores[5].score1_1 + scores[6].score1_2 + 
            scores[7].score1_3 + scores[4].score1_0,
            it1U25: scores[0].score0_0 + scores[1].score0_1 + scores[2].score0_2 + scores[3].score0_3 + scores[5].score1_1 + scores[6].score1_2 + 
            scores[7].score1_3 + scores[4].score1_0 + scores[10].score2_2 + scores[11].score2_3 + scores[8].score2_0 + scores[9].score2_1,
            it2O05: +scores[1].score0_1 + +scores[2].score0_2 + +scores[6].score1_2 + +scores[3].score0_3 + +scores[7].score1_3 + +scores[11].score2_3 +
            +scores[10].score2_2 + +scores[15].score3_3 + +scores[14].score3_2 + scores[5].score1_1 + scores[13].score3_1 + scores[9].score2_1,
            it2O15: (+scores[1].score0_1 + +scores[2].score0_2 + +scores[6].score1_2 + +scores[3].score0_3 + +scores[7].score1_3 + +scores[11].score2_3 +
                +scores[10].score2_2 + +scores[15].score3_3 + +scores[14].score3_2),
            it2O25: scores[15].score3_3 + scores[11].score2_3 + scores[7].score1_3 + scores[3].score0_3,
            it2U05: scores[0].score0_0 + scores[4].score1_0 + scores[8].score2_0 + scores[12].score3_0,
            it2U15: scores[0].score0_0 + scores[4].score1_0 + scores[8].score2_0 + scores[12].score3_0 + scores[1].score0_1 + scores[9].score2_1 + 
            scores[13].score3_1 + scores[5].score1_1,
            it2U25: scores[0].score0_0 + scores[4].score1_0 + scores[8].score2_0 + scores[12].score3_0 + scores[1].score0_1 + scores[9].score2_1 + 
            scores[13].score3_1 + scores[5].score1_1 + scores[6].score1_2 + scores[10].score2_2 + scores[14].score3_2,
            to15: (+scores[9].score2_1 + +scores[12].score3_0 + +scores[13].score3_1 + +scores[14].score3_2 + +scores[6].score1_2 + +scores[3].score0_3 +
                +scores[7].score1_3 + +scores[11].score2_3 + +scores[10].score2_2 + +scores[15].score3_3) + scores[5].score1_1 + scores[8].score2_0 +
                scores[2].score0_2,
            to25: (+scores[9].score2_1 + +scores[12].score3_0 + +scores[13].score3_1 + +scores[14].score3_2 + +scores[6].score1_2 + +scores[3].score0_3 +
                +scores[7].score1_3 + +scores[11].score2_3 + +scores[10].score2_2 + +scores[15].score3_3),
            to35: (scores[13].score3_1 + +scores[14].score3_2 + scores[7].score1_3 + +scores[11].score2_3 + +scores[10].score2_2 + +scores[15].score3_3),
            tu15: (+scores[4].score1_0 + scores[1].score0_1 + +scores[0].score0_0),
            tu25:  (+scores[4].score1_0 + +scores[8].score2_0 + +scores[1].score0_1 + +scores[2].score0_2 + +scores[0].score0_0 + +scores[5].score1_1),
            tu35: (+scores[4].score1_0 + +scores[8].score2_0 + +scores[1].score0_1 + +scores[2].score0_2 + +scores[0].score0_0 + +scores[5].score1_1) + 
            scores[9].score2_1 + scores[12].score3_0 + scores[6].score1_2 + scores[3].score0_3,
            winOrDrawHome: (+scores[4].score1_0 + +scores[8].score2_0 + +scores[9].score2_1 + +scores[12].score3_0 + +scores[13].score3_1 + +scores[14].score3_2) + 
            scores[0].score0_0 + scores[5].score1_1 + scores[10].score2_2 + scores[15].score3_3,
            winOrdrawAway: (+scores[1].score0_1 + +scores[2].score0_2 + +scores[6].score1_2 + +scores[3].score0_3 + +scores[7].score1_3 + +scores[11].score2_3) + 
            scores[0].score0_0 + scores[5].score1_1 + scores[10].score2_2 + scores[15].score3_3,
            winnerAway: (+scores[1].score0_1 + +scores[2].score0_2 + +scores[6].score1_2 + +scores[3].score0_3 + +scores[7].score1_3 + +scores[11].score2_3),
            winnerHome: (+scores[4].score1_0 + +scores[8].score2_0 + +scores[9].score2_1 + +scores[12].score3_0 + +scores[13].score3_1 + +scores[14].score3_2),
        }

        return matchesPercent;
}