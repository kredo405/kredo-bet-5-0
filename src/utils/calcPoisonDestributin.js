import { calcIndividualTotalWithXg } from "./calcIndividualTotalWithXg";

export const calcPoisonDestribution = async (data) => {
    let expectedGoalsHome = 0;
    let expectedGoalsAway = 0;

    if (data.summary[0][0]["71"] !== "0" && data.summary[0][1]["71"] !== "0") {
        // Рассчитываем владение мячом
        const posessionHome =
            (data.summary[0][0]["71"] + data.summary[0][1]["72"]) / 2;
        const possesionAway =
            (data.summary[0][1]["71"] + data.summary[0][0]["72"]) / 2;

        // Рассчитываем Удары Взависимости от владения
        const shotsHome =
            (posessionHome * data.summary[0][0]["32"]) /
            data.summary[0][0]["71"];
        const shotsVsHome =
            (posessionHome * data.summary[0][0]["33"]) /
            data.summary[0][0]["71"];
        const shotsAway =
            (possesionAway * data.summary[0][1]["32"]) /
            data.summary[0][1]["71"];
        const shotsVsAway =
            (possesionAway * data.summary[0][1]["33"]) /
            data.summary[0][1]["71"];
        const goalsHome =
            (possesionAway * data.summary[0][0]["8"]) /
            data.summary[0][0]["71"];
        const goalsVsHome =
            (possesionAway * data.summary[0][0]["9"]) /
            data.summary[0][0]["71"];
        const goalsAway =
            (possesionAway * data.summary[0][1]["8"]) /
            data.summary[0][1]["71"];
        const goalsVsAway =
            (possesionAway * data.summary[0][1]["9"]) /
            data.summary[0][1]["71"];

        // Рассчитываем индивидуальный тотал команд
        const expectedShotsHome = (shotsHome + shotsVsAway) / 2;
        const expectedShotsAway = (shotsAway + shotsVsHome) / 2;
        const goalsPerShotsHome =
            data.summary[0][0]["8"] / data.summary[0][0]["32"];
        const goalsPerShotsAway =
            data.summary[0][1]["8"] / data.summary[0][1]["32"];
        expectedGoalsHome =
            (expectedShotsHome * goalsPerShotsHome +
                (goalsHome + goalsVsAway) / 2) /
                2 +
            0.1;
        expectedGoalsAway =
            (expectedShotsAway * goalsPerShotsAway +
                (goalsAway + goalsVsHome) / 2) /
            2;
    } else {
        // Рассчитываем индивидуальный тотал команд
        const expectedShotsHome =
            (data.summary[0][0]["32"] + data.summary[0][1]["33"]) / 2;
        const expectedShotsAway =
            (data.summary[0][1]["32"] + data.summary[0][0]["33"]) / 2;
        const goalsPerShotsHome =
            data.summary[0][0]["8"] / data.summary[0][0]["32"];
        const goalsPerShotsAway =
            data.summary[0][1]["8"] / data.summary[0][1]["32"];
        expectedGoalsHome =
            (expectedShotsHome * goalsPerShotsHome +
                (+data.goalsForAvgHome + +data.goalsAgainstAvgAway) / 2) /
                2 +
            0.1;
        expectedGoalsAway =
            (expectedShotsAway * goalsPerShotsAway +
                (+data.goalsForAvgAway + +data.goalsAgainstAvgHome) / 2) /
            2;
    }

    // Рассчитываем индивидуальный тотал Команд с помощью xg
    const expectedXg = await calcIndividualTotalWithXg(data);

    let goalsHome = 0;
    let goalsAway = 0;

    if (
        expectedXg.individualTotalHome === 0 ||
        expectedXg.individualTotalAway === 0
    ) {
        goalsHome = expectedGoalsHome;
        goalsAway = expectedGoalsAway;
    } else {
        goalsHome = (expectedXg.individualTotalHome + expectedGoalsHome) / 2;
        goalsAway = (expectedXg.individualTotalAway + expectedGoalsAway) / 2;
    }

    console.log(goalsHome);
    console.log(goalsAway);

    function poissonDistribution(lambda, k) {
        // Функция для расчета значения распределения Пуассона для заданных параметров

        // Расчет вероятности события
        const probability =
            ((Math.exp(-lambda) * Math.pow(lambda, k)) / factorial(k)) * 100;

        return probability;
    }

    function factorial(n) {
        // Функция для расчета факториала

        let result = 1;

        for (let i = 2; i <= n; i++) {
            result *= i;
        }

        return result;
    }

    function calculatePoissonDistribution(outcomes, lambda) {
        // Функция для расчета распределения Пуассона для всех исходов в ставках

        let result = {};

        // Рассчитываем вероятность каждого исхода
        for (let i = 0; i < outcomes.length; i++) {
            let k = outcomes[i];
            let probability = poissonDistribution(lambda, k);
            result[k] = probability;
        }

        return result;
    }

    let outcomes = [0, 1, 2, 3, 4, 5];

    let distributionHome = calculatePoissonDistribution(outcomes, goalsHome);
    let distributionAway = calculatePoissonDistribution(outcomes, goalsAway);

    // рассчитываем вероятности прохода ставки по распределению паусона
    const percentOutcomes = {
        winnerHome:
            (distributionHome["1"] * distributionAway["0"]) / 100 +
            (distributionHome["2"] * distributionAway["0"]) / 100 +
            (distributionHome["3"] * distributionAway["0"]) / 100 +
            (distributionHome["4"] * distributionAway["0"]) / 100 +
            (distributionHome["5"] * distributionAway["0"]) / 100 +
            (distributionHome["2"] * distributionAway["1"]) / 100 +
            (distributionHome["3"] * distributionAway["1"]) / 100 +
            (distributionHome["4"] * distributionAway["1"]) / 100 +
            (distributionHome["5"] * distributionAway["1"]) / 100 +
            (distributionHome["3"] * distributionAway["2"]) / 100 +
            (distributionHome["4"] * distributionAway["2"]) / 100 +
            (distributionHome["5"] * distributionAway["2"]) / 100 +
            (distributionHome["4"] * distributionAway["3"]) / 100 +
            (distributionHome["5"] * distributionAway["3"]) / 100 +
            (distributionHome["5"] * distributionAway["4"]) / 100,
        draw:
            (distributionHome["0"] * distributionAway["0"]) / 100 +
            (distributionHome["1"] * distributionAway["1"]) / 100 +
            (distributionHome["2"] * distributionAway["2"]) / 100 +
            (distributionHome["3"] * distributionAway["3"]) / 100 +
            (distributionHome["4"] * distributionAway["4"]) / 100 +
            (distributionHome["5"] * distributionAway["5"]) / 100,
        winnerAway:
            (distributionHome["0"] * distributionAway["1"]) / 100 +
            (distributionHome["0"] * distributionAway["2"]) / 100 +
            (distributionHome["0"] * distributionAway["3"]) / 100 +
            (distributionHome["0"] * distributionAway["4"]) / 100 +
            (distributionHome["0"] * distributionAway["5"]) / 100 +
            (distributionHome["1"] * distributionAway["2"]) / 100 +
            (distributionHome["1"] * distributionAway["3"]) / 100 +
            (distributionHome["1"] * distributionAway["4"]) / 100 +
            (distributionHome["1"] * distributionAway["5"]) / 100 +
            (distributionHome["2"] * distributionAway["3"]) / 100 +
            (distributionHome["2"] * distributionAway["4"]) / 100 +
            (distributionHome["2"] * distributionAway["5"]) / 100 +
            (distributionHome["3"] * distributionAway["4"]) / 100 +
            (distributionHome["3"] * distributionAway["5"]) / 100 +
            (distributionHome["4"] * distributionAway["5"]) / 100,
        foraHomeMinus15:
            (distributionHome["2"] * distributionAway["0"]) / 100 +
            (distributionHome["3"] * distributionAway["0"]) / 100 +
            (distributionHome["4"] * distributionAway["0"]) / 100 +
            (distributionHome["5"] * distributionAway["0"]) / 100 +
            (distributionHome["3"] * distributionAway["1"]) / 100 +
            (distributionHome["4"] * distributionAway["1"]) / 100 +
            (distributionHome["5"] * distributionAway["1"]) / 100 +
            (distributionHome["4"] * distributionAway["2"]) / 100 +
            (distributionHome["5"] * distributionAway["2"]) / 100 +
            (distributionHome["5"] * distributionAway["3"]) / 100,
        foraAwayMinus15:
            (distributionHome["0"] * distributionAway["2"]) / 100 +
            (distributionHome["0"] * distributionAway["3"]) / 100 +
            (distributionHome["0"] * distributionAway["4"]) / 100 +
            (distributionHome["0"] * distributionAway["5"]) / 100 +
            (distributionHome["1"] * distributionAway["3"]) / 100 +
            (distributionHome["1"] * distributionAway["4"]) / 100 +
            (distributionHome["1"] * distributionAway["5"]) / 100 +
            (distributionHome["2"] * distributionAway["4"]) / 100 +
            (distributionHome["2"] * distributionAway["5"]) / 100 +
            (distributionHome["3"] * distributionAway["5"]) / 100,
        foraHomePlus15:
            (distributionHome["1"] * distributionAway["0"]) / 100 +
            (distributionHome["2"] * distributionAway["0"]) / 100 +
            (distributionHome["3"] * distributionAway["0"]) / 100 +
            (distributionHome["4"] * distributionAway["0"]) / 100 +
            (distributionHome["5"] * distributionAway["0"]) / 100 +
            (distributionHome["2"] * distributionAway["1"]) / 100 +
            (distributionHome["3"] * distributionAway["1"]) / 100 +
            (distributionHome["4"] * distributionAway["1"]) / 100 +
            (distributionHome["5"] * distributionAway["1"]) / 100 +
            (distributionHome["3"] * distributionAway["2"]) / 100 +
            (distributionHome["4"] * distributionAway["2"]) / 100 +
            (distributionHome["5"] * distributionAway["2"]) / 100 +
            (distributionHome["4"] * distributionAway["3"]) / 100 +
            (distributionHome["5"] * distributionAway["3"]) / 100 +
            (distributionHome["5"] * distributionAway["4"]) / 100 +
            (distributionHome["0"] * distributionAway["0"]) / 100 +
            (distributionHome["1"] * distributionAway["1"]) / 100 +
            (distributionHome["2"] * distributionAway["2"]) / 100 +
            (distributionHome["3"] * distributionAway["3"]) / 100 +
            (distributionHome["4"] * distributionAway["4"]) / 100 +
            (distributionHome["5"] * distributionAway["5"]) / 100 +
            (distributionHome["0"] * distributionAway["1"]) / 100 +
            (distributionHome["1"] * distributionAway["2"]) / 100 +
            (distributionHome["2"] * distributionAway["3"]) / 100 +
            (distributionHome["3"] * distributionAway["4"]) / 100 +
            (distributionHome["4"] * distributionAway["5"]) / 100,
        foraAwayPlus15:
            (distributionHome["0"] * distributionAway["1"]) / 100 +
            (distributionHome["0"] * distributionAway["2"]) / 100 +
            (distributionHome["0"] * distributionAway["3"]) / 100 +
            (distributionHome["0"] * distributionAway["4"]) / 100 +
            (distributionHome["0"] * distributionAway["5"]) / 100 +
            (distributionHome["1"] * distributionAway["2"]) / 100 +
            (distributionHome["1"] * distributionAway["3"]) / 100 +
            (distributionHome["1"] * distributionAway["4"]) / 100 +
            (distributionHome["1"] * distributionAway["5"]) / 100 +
            (distributionHome["2"] * distributionAway["3"]) / 100 +
            (distributionHome["2"] * distributionAway["4"]) / 100 +
            (distributionHome["2"] * distributionAway["5"]) / 100 +
            (distributionHome["3"] * distributionAway["4"]) / 100 +
            (distributionHome["3"] * distributionAway["5"]) / 100 +
            (distributionHome["4"] * distributionAway["5"]) / 100 +
            (distributionHome["0"] * distributionAway["0"]) / 100 +
            (distributionHome["1"] * distributionAway["1"]) / 100 +
            (distributionHome["2"] * distributionAway["2"]) / 100 +
            (distributionHome["3"] * distributionAway["3"]) / 100 +
            (distributionHome["4"] * distributionAway["4"]) / 100 +
            (distributionHome["5"] * distributionAway["5"]) / 100 +
            (distributionHome["1"] * distributionAway["0"]) / 100 +
            (distributionHome["2"] * distributionAway["1"]) / 100 +
            (distributionHome["3"] * distributionAway["2"]) / 100 +
            (distributionHome["4"] * distributionAway["3"]) / 100 +
            (distributionHome["5"] * distributionAway["4"]) / 100,
        winOrDrawHome:
            (distributionHome["1"] * distributionAway["0"]) / 100 +
            (distributionHome["2"] * distributionAway["0"]) / 100 +
            (distributionHome["3"] * distributionAway["0"]) / 100 +
            (distributionHome["4"] * distributionAway["0"]) / 100 +
            (distributionHome["5"] * distributionAway["0"]) / 100 +
            (distributionHome["2"] * distributionAway["1"]) / 100 +
            (distributionHome["3"] * distributionAway["1"]) / 100 +
            (distributionHome["4"] * distributionAway["1"]) / 100 +
            (distributionHome["5"] * distributionAway["1"]) / 100 +
            (distributionHome["3"] * distributionAway["2"]) / 100 +
            (distributionHome["4"] * distributionAway["2"]) / 100 +
            (distributionHome["5"] * distributionAway["2"]) / 100 +
            (distributionHome["4"] * distributionAway["3"]) / 100 +
            (distributionHome["5"] * distributionAway["3"]) / 100 +
            (distributionHome["5"] * distributionAway["4"]) / 100 +
            (distributionHome["0"] * distributionAway["0"]) / 100 +
            (distributionHome["1"] * distributionAway["1"]) / 100 +
            (distributionHome["2"] * distributionAway["2"]) / 100 +
            (distributionHome["3"] * distributionAway["3"]) / 100 +
            (distributionHome["4"] * distributionAway["4"]) / 100 +
            (distributionHome["5"] * distributionAway["5"]) / 100,
        winOrdrawAway:
            (distributionHome["0"] * distributionAway["1"]) / 100 +
            (distributionHome["0"] * distributionAway["2"]) / 100 +
            (distributionHome["0"] * distributionAway["3"]) / 100 +
            (distributionHome["0"] * distributionAway["4"]) / 100 +
            (distributionHome["0"] * distributionAway["5"]) / 100 +
            (distributionHome["1"] * distributionAway["2"]) / 100 +
            (distributionHome["1"] * distributionAway["3"]) / 100 +
            (distributionHome["1"] * distributionAway["4"]) / 100 +
            (distributionHome["1"] * distributionAway["5"]) / 100 +
            (distributionHome["2"] * distributionAway["3"]) / 100 +
            (distributionHome["2"] * distributionAway["4"]) / 100 +
            (distributionHome["2"] * distributionAway["5"]) / 100 +
            (distributionHome["3"] * distributionAway["4"]) / 100 +
            (distributionHome["3"] * distributionAway["5"]) / 100 +
            (distributionHome["4"] * distributionAway["5"]) / 100 +
            (distributionHome["0"] * distributionAway["0"]) / 100 +
            (distributionHome["1"] * distributionAway["1"]) / 100 +
            (distributionHome["2"] * distributionAway["2"]) / 100 +
            (distributionHome["3"] * distributionAway["3"]) / 100 +
            (distributionHome["4"] * distributionAway["4"]) / 100 +
            (distributionHome["5"] * distributionAway["5"]) / 100,
        tu15:
            (distributionHome["0"] * distributionAway["0"]) / 100 +
            (distributionHome["1"] * distributionAway["0"]) / 100 +
            (distributionHome["0"] * distributionAway["1"]) / 100,
        to15:
            100 -
            ((distributionHome["0"] * distributionAway["0"]) / 100 +
                (distributionHome["1"] * distributionAway["0"]) / 100 +
                (distributionHome["0"] * distributionAway["1"]) / 100),
        tu25:
            (distributionHome["0"] * distributionAway["0"]) / 100 +
            (distributionHome["1"] * distributionAway["0"]) / 100 +
            (distributionHome["0"] * distributionAway["1"]) / 100 +
            (distributionHome["1"] * distributionAway["1"]) / 100 +
            (distributionHome["2"] * distributionAway["0"]) / 100 +
            (distributionHome["0"] * distributionAway["2"]) / 100,
        to25:
            100 -
            ((distributionHome["0"] * distributionAway["0"]) / 100 +
                (distributionHome["1"] * distributionAway["0"]) / 100 +
                (distributionHome["0"] * distributionAway["1"]) / 100 +
                (distributionHome["1"] * distributionAway["1"]) / 100 +
                (distributionHome["2"] * distributionAway["0"]) / 100 +
                (distributionHome["0"] * distributionAway["2"]) / 100),
        tu35:
            (distributionHome["0"] * distributionAway["0"]) / 100 +
            (distributionHome["1"] * distributionAway["0"]) / 100 +
            (distributionHome["0"] * distributionAway["1"]) / 100 +
            (distributionHome["1"] * distributionAway["1"]) / 100 +
            (distributionHome["2"] * distributionAway["0"]) / 100 +
            (distributionHome["0"] * distributionAway["2"]) / 100 +
            (distributionHome["2"] * distributionAway["1"]) / 100 +
            (distributionHome["1"] * distributionAway["2"]) / 100,
        to35:
            100 -
            ((distributionHome["0"] * distributionAway["0"]) / 100 +
                (distributionHome["1"] * distributionAway["0"]) / 100 +
                (distributionHome["0"] * distributionAway["1"]) / 100 +
                (distributionHome["1"] * distributionAway["1"]) / 100 +
                (distributionHome["2"] * distributionAway["0"]) / 100 +
                (distributionHome["0"] * distributionAway["2"]) / 100 +
                (distributionHome["2"] * distributionAway["1"]) / 100 +
                (distributionHome["1"] * distributionAway["2"]) / 100),
        btsYes:
            100 -
            ((distributionHome["0"] * distributionAway["0"]) / 100 +
                (distributionHome["1"] * distributionAway["0"]) / 100 +
                (distributionHome["2"] * distributionAway["0"]) / 100 +
                (distributionHome["3"] * distributionAway["0"]) / 100 +
                (distributionHome["4"] * distributionAway["0"]) / 100 +
                (distributionHome["5"] * distributionAway["0"]) / 100 +
                (distributionHome["0"] * distributionAway["1"]) / 100 +
                (distributionHome["0"] * distributionAway["2"]) / 100 +
                (distributionHome["0"] * distributionAway["3"]) / 100 +
                (distributionHome["0"] * distributionAway["4"]) / 100 +
                (distributionHome["0"] * distributionAway["5"]) / 100),
        btsNo:
            (distributionHome["0"] * distributionAway["0"]) / 100 +
            (distributionHome["1"] * distributionAway["0"]) / 100 +
            (distributionHome["2"] * distributionAway["0"]) / 100 +
            (distributionHome["3"] * distributionAway["0"]) / 100 +
            (distributionHome["4"] * distributionAway["0"]) / 100 +
            (distributionHome["5"] * distributionAway["0"]) / 100 +
            (distributionHome["0"] * distributionAway["1"]) / 100 +
            (distributionHome["0"] * distributionAway["2"]) / 100 +
            (distributionHome["0"] * distributionAway["3"]) / 100 +
            (distributionHome["0"] * distributionAway["4"]) / 100 +
            (distributionHome["0"] * distributionAway["5"]) / 100,
        it1O05:
            distributionHome["1"] +
            distributionHome["2"] +
            distributionHome["3"] +
            distributionHome["4"] +
            distributionHome["5"],
        it2O05:
            distributionAway["1"] +
            distributionAway["2"] +
            distributionAway["3"] +
            distributionAway["4"] +
            distributionAway["5"],
        it1O15:
            distributionHome["2"] +
            distributionHome["3"] +
            distributionHome["4"] +
            distributionHome["5"],
        it2O15:
            distributionAway["2"] +
            distributionAway["3"] +
            distributionAway["4"] +
            distributionAway["5"],
        it1O25:
            distributionHome["3"] +
            distributionHome["4"] +
            distributionHome["5"],
        it2O25:
            distributionAway["3"] +
            distributionAway["4"] +
            distributionAway["5"],
        it1U05: distributionHome["0"],
        it2U05: distributionAway["0"],
        it1U15: distributionHome["0"] + distributionHome["1"],
        it2U15: distributionAway["0"] + distributionAway["1"],
        it1U25:
            distributionHome["0"] +
            distributionHome["1"] +
            distributionHome["2"],
        it2U25:
            distributionAway["0"] +
            distributionAway["1"] +
            distributionAway["2"],
    };
    console.log(percentOutcomes);

    return percentOutcomes;
};
