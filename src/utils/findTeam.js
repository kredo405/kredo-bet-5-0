const findTeam = (name1, name2) => {
    let arrTeamName1 = name1.split('');
    let arrTeamNameHyphen1 = name1.split('');
    let arrTeamNameSpace1 = name1.split(' ');
    let arrTeamName2 = name2.split('');
    let arrTeamNameSpace2 = name2.split(' ');
    let arrTeamNameHyphen2 = name2.split('-');



    if (name1.toLowerCase() === name2.toLowerCase()) {
        return true
    }

    else if (arrTeamNameSpace1.length > 1 && arrTeamNameSpace2.length > 1) {
        if (arrTeamNameSpace1[0].toLowerCase() === arrTeamNameSpace2[0].toLowerCase() && arrTeamNameSpace1[1].toLowerCase() === arrTeamNameSpace2[1].toLowerCase()) {
            return true
        }
    }

    else if(arrTeamNameSpace1.length > 1 && arrTeamNameSpace2.length > 1) {
        if(arrTeamNameSpace1[0].toLowerCase() === arrTeamNameSpace2[0].toLowerCase() && 
            arrTeamNameSpace1[1][0].toLowerCase() === arrTeamNameSpace2[1][0].toLowerCase()) {
                return true
        }
    }
    else if(arrTeamNameSpace1.length === 1 && arrTeamNameSpace2.length === 2) {
        if(arrTeamNameSpace1[0].toLowerCase() === arrTeamNameSpace2[1].toLowerCase() && arrTeamNameSpace2[0].toLowerCase() === 'club' || 
        arrTeamNameSpace1[0].toLowerCase() === arrTeamNameSpace2[1].toLowerCase() && arrTeamNameSpace2[0].toLowerCase() === 'fc' ) {
                return true
        }
    }

    else if (arrTeamNameSpace1.length === 2 && arrTeamNameSpace2.length === 1) {
        if (arrTeamNameSpace1[0].toLowerCase() === arrTeamNameSpace2[0].toLowerCase() || arrTeamNameSpace1[1].toLowerCase() === arrTeamNameSpace2[0].toLowerCase()) {
            return true
        }
    } else if (arrTeamNameSpace1.length === 1 && arrTeamNameSpace2.length === 2) {
        if (arrTeamNameSpace1[0].toLowerCase() === arrTeamNameSpace2[0].toLowerCase() || arrTeamNameSpace1[0].toLowerCase() === arrTeamNameSpace2[1].toLowerCase()) {
            return true
        }
    }
    else if (arrTeamNameSpace1.length === 2 && arrTeamNameSpace2.length === 2) {
        if (arrTeamNameSpace1[1].toLowerCase() === arrTeamNameSpace2[1].toLowerCase() && arrTeamNameSpace1[0].toLowerCase() !== arrTeamNameSpace2[0].toLowerCase()) {
            if (arrTeamName1[0].toLowerCase() === arrTeamName2[0].toLowerCase() && arrTeamName1[1].toLowerCase() === arrTeamName2[1].toLowerCase() &&
                arrTeamName1[2].toLowerCase() === arrTeamName2[2].toLowerCase()) {
                return true
            }
        }
    }
    else if (arrTeamNameSpace1.length > 1 && arrTeamNameHyphen1.length < 3 && arrTeamNameSpace2.length > 1 && arrTeamNameSpace2.length < 3) {
        if (arrTeamNameHyphen1[0].length > 2) {
            if (arrTeamNameHyphen1[0].slice(0, 3) === arrTeamNameSpace2[0].slice(0, 3) &&
                arrTeamNameHyphen1[1].slice(0, 3) === arrTeamNameSpace2[1].slice(0, 3)) {
                return true
            }
        }
        else {
            if (arrTeamNameHyphen1[0].slice(0, 1) === arrTeamNameSpace2[0].slice(0, 1) &&
                arrTeamNameHyphen1[1].slice(0, 3) === arrTeamNameSpace2[1].slice(0, 3)) {
                return true
            }
        }
    }
    else if (arrTeamNameHyphen1.length < 2 && arrTeamNameSpace2.length > 1 || arrTeamNameHyphen1.length < 2 && arrTeamNameHyphen1.length > 1) {
        if (arrTeamNameHyphen1[0].length > 3) {
            if (arrTeamNameHyphen1[0] === arrTeamNameSpace2[0] ||
                arrTeamNameHyphen1[0] === arrTeamNameSpace2[1] || arrTeamNameHyphen1[0] === arrTeamNameHyphen2[0] || arrTeamNameHyphen1[0] === arrTeamNameHyphen2[1]) {
                return true
            }
        }
    }
    else if (arrTeamNameHyphen1.length > 1 && arrTeamNameHyphen1.length < 3 && arrTeamNameSpace2.length > 1 && arrTeamNameSpace2.length < 3) {
        if (arrTeamNameHyphen1[1].length < 4 && arrTeamNameSpace2[1].length < 4) {
            if (arrTeamNameHyphen1[0].slice(0, 4) === arrTeamNameSpace2[0].slice(0, 4)) {
                return true
            }
        }
    }
    else if (arrTeamNameHyphen1.length === 3 && arrTeamNameSpace2.length === 3) {
        if (arrTeamNameHyphen1[0].toLowerCase() === arrTeamNameSpace2[0].toLowerCase() &&
            arrTeamNameHyphen1[1].toLowerCase() === arrTeamNameSpace2[1].toLowerCase() &&
            arrTeamNameHyphen1[2].toLowerCase() === arrTeamNameSpace2[2].toLowerCase()) {
            return true
        }
    }
    else if (arrTeamNameSpace2.length === 1 && arrTeamNameHyphen1.length === 1) {
        let index = arrTeamNameSpace2[0].includes("'");
        if (index) {
            let acc0 = 0;
            let percent0 = 0;
            arrTeamNameSpace2[0].split('').forEach((item) => {
                if (arrTeamName1.includes(item)) {
                    arrTeamName1.splice(arrTeamName1.indexOf(item), 1)
                    acc0++;
                }
            });
            percent0 = acc0 * 100 / arrTeamNameSpace2[0].split('').length;

            if (percent0 > 80) {
                return true;
            }
        }
    }


    else {
        return false
    }
}

export default findTeam;


