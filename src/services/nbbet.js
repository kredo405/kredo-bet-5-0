import axios from 'axios';

export const nbbetServices = {
    async getAllMatches() {
        const timestamp = Date.now();
        const dateFix = Number(String(timestamp).slice(3, 8)) + 300;
        const newTimestamp = +`${String(timestamp).slice(0, 3)}${dateFix}99999`;

        const options = {
            method: 'GET',
            url: 'https://node-api-ochre.vercel.app/nbbetMatches',
            params: {
                timestamp: newTimestamp,
            }
        };

        return axios.request(options);
    },
    async getMatchInfo() {
        const options = {
            method: 'GET',
            url: 'https://node-api-ochre.vercel.app/nbbetMatch',
            params: {
                link: `${sessionStorage.getItem('link')}`
            }
        };

        return axios.request(options);
    },
}