import axios from 'axios';

export const nbbetServices = {
    async getAllMatches() {
        const timestamp = Date.now();
        const dateFix = Number(String(timestamp).slice(0, 8)) + 180;
        const newTimestamp = +`${dateFix}99999`;

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
    async getLastMatchInfo(link) {
        const options = {
            method: 'GET',
            url: 'https://node-api-ochre.vercel.app/nbbetMatch',
            params: {
                link: link
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