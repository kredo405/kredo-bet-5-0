export class TeamRang {
    constructor(table) {
        this.table = table
    }

    calcOutsiderRange() {
        const arrTeam = this.table.filter(el => {
            if(el[10] - el[11] <= -5) {
                return el;
            }
        });

        return arrTeam;
    }

    calcMidleRange() {
        const arrTeam = this.table.filter(el => {
            if(el[10] - el[11] > -5 && el[10] - el[11] <= 3) {
                return el;
            }
        });

        return arrTeam;
    }

    calcPretendersRange() {
        const arrTeam = this.table.filter(el => {
            if(el[10] - el[11] > 3 && el[10] - el[11] <= 10) {
                return el;
            }
        });

        return arrTeam;
    }

    calcGrandRange() {
        const arrTeam = this.table.filter(el => {
            if(el[10] - el[11] > 10) {
                return el;
            }
        });

        return arrTeam;
    }
}