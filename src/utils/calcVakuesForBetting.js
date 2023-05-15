export function calcValuesForBetting(
    info,
    predictions,
    outcomes,
    moneyWay1x2,
    moneyWayOverUnder,
    correctScore,
    odd,
    outsiderRange,
    midleRange,
    pretendersRange,
    grandRange
) {
    // console.log(info)
    // console.log(predictions)
    // console.log(outcomes)
    // console.log(odd)
    // console.log(outsiderRange)
    // console.log(midleRange)
    // console.log(pretendersRange)
    // console.log(grandRange)

    const atackHome =
        (info.summary[0][0]["8"] * 100) /
        (info.summary[0][0]["8"] + info.summary[0][1]["8"]);
    const atackAway =
        (info.summary[0][1]["8"] * 100) /
        (info.summary[0][0]["8"] + info.summary[0][1]["8"]);
    const defHome =
        100 -
        (info.summary[0][0]["9"] * 100) /
            (info.summary[0][0]["9"] + info.summary[0][1]["9"]);
    const defAway =
        100 -
        (info.summary[0][1]["9"] * 100) /
            (info.summary[0][0]["9"] + info.summary[0][1]["9"]);

    console.log({
        atackHome,
        atackAway,
        defHome,
        defAway,
    });
}
