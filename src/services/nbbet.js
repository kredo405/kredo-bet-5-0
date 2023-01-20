import axios from 'axios';

export const nbbetServices = {
    async getAllMatches() {
        const timestamp = Date.now();
        const dateFix = Number(String(timestamp).slice(3, 8)) + 740;
        const newTimestamp = +`${String(timestamp).slice(0, 3)}${dateFix}99999`;

        // 1672014253276
        // 1672044299999
        // 1672088399999

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
                // link: '972530-manchester-siti-tottenhem-hotspur-prognoz-na-match'
            }
        };

        return axios.request(options);
    },

    async getMatchPredictions() {
        const options = {
            method: 'GET',
            url: 'https://node-api-ochre.vercel.app/nbbetPredict',
            params: {
                link: `${sessionStorage.getItem('link')}`
                // link: '972530-manchester-siti-tottenhem-hotspur-prognoz-na-match'
            }
        };

        return axios.request(options);
    },
}