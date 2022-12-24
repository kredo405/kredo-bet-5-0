export const relevance = (formHome, formAway) => {
    const arrModified = (arr) => {
        const form = arr.map(el => {
            if (el === 1) {
                return 3
            }
            if (el === 2) {
                return 0
            }
            if (el === 3) {
                return 1
            }
        })
        return form;
    }

    const formHomeModified = arrModified(formHome);
    const formAwayModified = arrModified(formAway);

    const formHomeSum = formHomeModified.reduce((sum, current) => {
        return sum + current;
    }, 0);

    const formAwaySum = formAwayModified.reduce((sum, current) => {
        return sum + current;
    }, 0);
    
    const allForm = formHomeSum + formAwaySum;
    const percentHome = formHomeSum * 100 / allForm;
    const percentAway = formAwaySum * 100 / allForm;

    return {
        percentHome: percentHome,
        percentAway: percentAway,
    }
}