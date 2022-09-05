const findTeam = (array, team, type = 'stats', homeOrAway = '') => {
    const element = array.filter(el => {
        let arrTeamName;
        let arrTeamNameHyphen;
        let arrTeamNameSpace;
        let arrName;
        let arrNameSpace;
        let arrNameHyphen; 

        if(type === 'stats') {
            arrTeamName = el.team.split('');
            arrTeamNameHyphen = el.team.split('-');
            arrTeamNameSpace = el.team.split(' ');
            arrName = team.split('');
            arrNameSpace = team.split(' ');
            arrNameHyphen = team.split('-'); 
        } 
        if(type === 'arb') {
            if(homeOrAway === 'home') {
                arrTeamName = el.homeName.split('');
                arrTeamNameHyphen = el.homeName.split('-');
                arrTeamNameSpace = el.homeName.split(' ');
                arrName = team.split('');
                arrNameSpace = team.split(' ');
                arrNameHyphen = team.split('-');  
            }
            if(homeOrAway === 'away') {
                arrTeamName = el.awayName.split('');
                arrTeamNameHyphen = el.awayName.split('-');
                arrTeamNameSpace = el.awayName.split(' ');
                arrName = team.split('');
                arrNameSpace = team.split(' ');
                arrNameHyphen = team.split('-'); 
            }
            
        }


        if (arrTeamNameHyphen.length > 1 && arrTeamNameHyphen.length < 3 && arrNameSpace.length > 1 && arrNameSpace.length < 3) {
            if (arrTeamNameHyphen[0].length > 2) {
                if (arrTeamNameHyphen[0].slice(0, 3) === arrNameSpace[0].slice(0, 3) &&
                    arrTeamNameHyphen[1].slice(0, 3) === arrNameSpace[1].slice(0, 3)) {
                    return el
                }
            }
            else {
                if (arrTeamNameHyphen[0].slice(0, 1) === arrNameSpace[0].slice(0, 1) &&
                    arrTeamNameHyphen[1].slice(0, 3) === arrNameSpace[1].slice(0, 3)) {
                    return el
                }
            }
        }
        if (arrTeamNameHyphen.length < 2 && arrNameSpace.length > 1 || arrTeamNameHyphen.length < 2 && arrNameHyphen.length > 1) {
            if (arrTeamNameHyphen[0].length > 3) {
                if (arrTeamNameHyphen[0] === arrNameSpace[0] ||
                    arrTeamNameHyphen[0] === arrNameSpace[1] || arrTeamNameHyphen[0] === arrNameHyphen[0] || arrTeamNameHyphen[0] === arrNameHyphen[1]) {
                    return el;
                }
            }
        }
        if (arrTeamNameHyphen.length > 1 && arrTeamNameHyphen.length < 3 && arrNameSpace.length > 1 && arrNameSpace.length < 3) {
            if (arrTeamNameHyphen[1].length < 4 && arrNameSpace[1].length < 4) {
                if (arrTeamNameHyphen[0].slice(0, 4) === arrNameSpace[0].slice(0, 4)) {
                    return el
                }
            }
        }
        if (arrTeamNameHyphen.length === 3 && arrNameSpace.length === 3) {
            if (arrTeamNameHyphen[0].toLowerCase() === arrNameSpace[0].toLowerCase() &&
                arrTeamNameHyphen[1].toLowerCase() === arrNameSpace[1].toLowerCase() &&
                arrTeamNameHyphen[2].toLowerCase() === arrNameSpace[2].toLowerCase()) {
                return el
            }
        }
        if (arrNameSpace.length === 1 && arrTeamNameHyphen.length === 1) {
            let index = arrNameSpace[0].includes("'");
            if (index) {
                let acc0 = 0;
                let percent0 = 0;
                arrNameSpace[0].split('').forEach((item) => {
                    if (arrTeamName.includes(item)) {
                        arrTeamName.splice(arrTeamName.indexOf(item), 1)
                        acc0++;
                    }
                });
                percent0 = acc0 * 100 / arrNameSpace[0].split('').length;

                if (percent0 > 80) {
                    return el;
                }

            }
        }
        if (arrTeamNameHyphen.length > 1 && arrTeamNameHyphen.length < 3 && arrNameSpace.length > 1 && arrNameSpace.length < 3) {
            if (arrTeamNameHyphen[1].length < 4 && arrNameSpace[1].length > 4) {
                if (arrTeamNameHyphen[0] === arrNameSpace[0] && arrTeamNameHyphen[1].slice(0, 1).toLowerCase() === arrNameSpace[1].slice(0, 1).toLowerCase()) {
                    return el
                }
            }
        }
        if (arrTeamNameHyphen.length > 1 && arrTeamNameHyphen.length < 3 && arrNameHyphen.length > 1 && arrNameHyphen.length < 3) {
            if (arrTeamNameHyphen[1].length > 4 && arrNameHyphen[1].length < 4) {
                if (arrTeamNameHyphen[0] === arrNameHyphen[0] && arrTeamNameHyphen[1].slice(0, 1).toLowerCase() === arrNameHyphen[1].slice(0, 1).toLowerCase()) {
                    return el
                }
            }
        }
        if (arrTeamNameHyphen.length === 3 && arrNameSpace.length === 3) {
            if (arrTeamNameHyphen[0] === arrNameSpace[0] && arrTeamNameHyphen[1] === arrNameSpace[1]) {
                return el
            }
        }
        if (arrTeamNameHyphen.length === 2 && arrNameSpace.length === 1) {
            if (arrTeamNameHyphen[0].length > 3) {
                if (arrTeamNameHyphen[0] === arrNameSpace[0]) {
                    return el;
                }
            }
        }
        if (arrTeamNameHyphen.length === 2 && arrNameSpace.length === 2) {
            if (arrNameSpace[1].length < 4) {
                if (arrTeamNameHyphen[0] === arrNameSpace[0] && arrTeamNameHyphen[1].slice(0, 1).toLowerCase() === arrNameSpace[1].slice(0, 1).toLowerCase()) {
                    return el;
                }
            }
        }
        if (arrTeamNameHyphen.length === 2 && arrNameSpace.length === 3) {
                if (arrTeamNameHyphen[0] === arrNameSpace[1] && arrTeamNameHyphen[1].toLowerCase() === arrNameSpace[2].toLowerCase()) {
                    return el;
                }
        }
        if (arrTeamNameHyphen.length === 2 && arrNameSpace.length === 3) {
            if (arrTeamNameHyphen[0].length < 3 && arrTeamNameHyphen[1].toLowerCase() === arrNameSpace[2].toLowerCase()) {
                return el;
            }
        }
        if (arrTeamNameHyphen.length === 3 && arrNameSpace.length === 2) {
            if (arrTeamNameHyphen[0].toLowerCase() === arrNameSpace[0].toLowerCase() && arrTeamNameHyphen[1].toLowerCase() === arrNameSpace[1].toLowerCase()) {
                return el;
            }
        }
        if (el.team === 'Wolverhampton-Wanderers' && team === 'Wolves') {
            return el;
        }

    });

    return element[0];
}

export default findTeam;


// if(arrTeamNameHyphen.length > 1 && arrNameSpace.length < 2) {   
//     if(arrTeamNameHyphen[0].length > 2) {
//         if(arrTeamNameHyphen[0].slice(0, 2) === team.slice(0, 2 || 
//             arrTeamNameHyphen[1].slice(0, 2) === team.slice(0, 2))) {
//             return el;
//         }
//     }
// } else if(arrTeamNameHyphen.length > 1 && arrNameSpace.length > 1) {   
//     if(arrTeamNameHyphen[0].length > 2 && arrNameSpace[0].length > 2) {
//         if(arrTeamNameHyphen[0].slice(0, 2) === arrNameSpace[0].slice(0, 2) && 
//         arrTeamNameHyphen[1].slice(0, 2) === arrNameSpace[1].slice(0, 2)) {
//             return el;
//         }
//     }
// }
//  else if (arrTeamNameSpace.length < 2 && arrNameSpace.length > 1) {
//     let acc0 = 0;
//     let percent0 = 0;
//     let acc1 = 0;
//     let percent1 = 0;

//     arrNameSpace[0].split('').forEach((item) => {
//         if (arrTeamName.includes(item)) {
//             arrTeamName.splice(arrTeamName.indexOf(item), 1)
//             acc0++;
//         }
//     });
//     arrNameSpace[1].split('').forEach((item) => {
//         if (arrTeamName.includes(item)) {
//             arrTeamName.splice(arrTeamName.indexOf(item), 1)
//             acc1++;
//         }
//     });
//     percent0 = acc0 * 100 / arrNameSpace[0].split('').length;
//     percent1 = acc1 * 100 / arrNameSpace[1].split('').length;

//     if (percent0 > 80) {
//         return el;
//     } else if (percent1 > 80) {
//         return el;
//     } else {
//         return null;
//     }
// } else {
//     let acc = 0;
//     let percent = 0;
//     arrName.forEach((item) => {

//         if (arrTeamName.includes(item)) {
//             arrTeamName.splice(arrTeamName.indexOf(item), 1)
//             acc++;
//         }
//     });
//     percent = acc * 100 / arrName.length;

//     if (percent > 80) {
//         return el;
//     } else {
//         return null;
//     }
// }