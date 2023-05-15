import axios from "axios";

export const predictionsServices = {
    async getOddsRu() {
        const options = {
            method: "GET",
            url: "https://node-api-ochre.vercel.app/oddsRu",
        };

        return axios.request(options);
    },
    async getOddsRuPredict(link) {
        const options = {
            method: "GET",
            url: "https://node-api-ochre.vercel.app/oddsRuPredict",
            params: {
                link: `${link}`,
            },
        };

        return axios.request(options);
    },

    async getOnlineBookmaker() {
        const options = {
            method: "GET",
            url: "https://node-api-ochre.vercel.app/onlineBookmaker",
        };

        return axios.request(options);
    },
    async getBetzona() {
        const options = {
            method: "GET",
            url: "https://node-api-ochre.vercel.app/betzona",
        };

        return axios.request(options);
    },
    async getBetzonaPredict(link) {
        const options = {
            method: "GET",
            url: "https://node-api-ochre.vercel.app/betzonaPredict",
            params: {
                link: `${link}`,
            },
        };

        return axios.request(options);
    },
    async getSportAndBets() {
        const options = {
            method: "GET",
            url: "https://node-api-ochre.vercel.app/sportAndBets",
        };

        return axios.request(options);
    },
    async getSportAndBetsPredict(link) {
        const options = {
            method: "GET",
            url: "https://node-api-ochre.vercel.app/sportAndBetsPredict",
            params: {
                link: `${link}`,
            },
        };

        return axios.request(options);
    },
    async getLegalbet() {
        const options = {
            method: "GET",
            url: "https://node-api-ochre.vercel.app/legalbet",
        };

        return axios.request(options);
    },
    async getLeagalbetPredict(link) {
        const options = {
            method: "GET",
            url: "https://node-api-ochre.vercel.app/leagalbetPredict",
            params: {
                link: `${link}`,
            },
        };

        return axios.request(options);
    },
    async getLiveresult() {
        const options = {
            method: "GET",
            url: "https://node-api-ochre.vercel.app/liveresult",
        };

        return axios.request(options);
    },
    async getLiveresultPredict(link) {
        const options = {
            method: "GET",
            url: "https://node-api-ochre.vercel.app/liveresultPredict",
            params: {
                link: `${link}`,
            },
        };

        return axios.request(options);
    },
    async getStavkiprognozy() {
        const options = {
            method: "GET",
            url: "https://node-api-ochre.vercel.app/stavkiprognozy",
        };

        return axios.request(options);
    },
    async getStavkiprognozyPredict(link) {
        const options = {
            method: "GET",
            url: "https://node-api-ochre.vercel.app/stavkiprognozyPredict",
            params: {
                link: `${link}`,
            },
        };

        return axios.request(options);
    },
    async getEuroFootball() {
        const options = {
            method: "GET",
            url: "https://node-api-ochre.vercel.app/euroFootball",
        };

        return axios.request(options);
    },
    async getEuroFootballPredict(link) {
        const options = {
            method: "GET",
            url: "https://node-api-ochre.vercel.app/euroFootballPredict",
            params: {
                link: `${link}`,
            },
        };

        return axios.request(options);
    },
};
