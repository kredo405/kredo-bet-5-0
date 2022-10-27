import axios from 'axios';

export const predictionsServices = {
    async getOnlineBookmaker() {
        const options = {
            method: 'GET',
            url: 'https://node-api-ochre.vercel.app/onlineBookmaker',
        };

        return axios.request(options);
    },
    async getBetzona() {
        const options = {
            method: 'GET',
            url: 'https://node-api-ochre.vercel.app/betzona',
        };

        return axios.request(options);
    },
    async getVpluse() {
        const options = {
            method: 'GET',
            url: 'https://node-api-ochre.vercel.app/vpluse',
        };

        return axios.request(options);
    },
    async getOddsRu() {
        const options = {
            method: 'GET',
            url: 'https://node-api-ochre.vercel.app/oddsRu',
        };

        return axios.request(options);
    },
}