import axios from 'axios';

export const arbworldServices = {
    async getMoneyWay1x2() {
        const options = {
            method: 'GET',
            url: 'https://node-api-ochre.vercel.app/moneyWay1x2',
        };

        return axios.request(options);
    },
    async getMoneyWayUnderOver() {
        const options = {
            method: 'GET',
            url: 'https://node-api-ochre.vercel.app/moneyWayUnderOver',
        };

        return axios.request(options);
    },
    async getcorrectScore() {
        const options = {
            method: 'GET',
            url: 'https://node-api-ochre.vercel.app/correctScore',
        };

        return axios.request(options);
    },
    async getDroppingOdds1X2() {
        const options = {
            method: 'GET',
            url: 'https://node-api-ochre.vercel.app/droppingOdds1X2',
        };

        return axios.request(options);
    },
    async getDroppingOddsUnderOver() {
        const options = {
            method: 'GET',
            url: 'https://node-api-ochre.vercel.app/droppingOddsUnderOver',
        };

        return axios.request(options);
    },
}