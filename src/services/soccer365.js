import axios from 'axios';

export const Soccer365Services = {
    async getAllMatches() {
        const options = {
            method: 'GET',
            url: 'https://node-api-ochre.vercel.app/matches',
        };

        return axios.request(options);
    },
    async getMatchInfo(id) {
        const options = {
            method: 'GET',
            url: 'https://node-api-ochre.vercel.app/matchInfo',
            params: {
                id: `games/${id}`
              }
        };

        return axios.request(options);
    },
    async getH2h() {
        const options = {
            method: 'GET',
            url: 'https://node-api-ochre.vercel.app/h2h',
            params: {
                id: `games/${sessionStorage.getItem('id')}`
              }
        };

        return axios.request(options);
    },
    async getForm(id) {
        const options = {
            method: 'GET',
            url: 'https://node-api-ochre.vercel.app/form',
            params: {
                id: `games/${id}`
              }
        };

        return axios.request(options);
    },
    async getLineups() {
        const options = {
            method: 'GET',
            url: 'https://node-api-ochre.vercel.app/lineups',
            params: {
                id: `games/${sessionStorage.getItem('id')}`
              }
        };

        return axios.request(options);
    }
}