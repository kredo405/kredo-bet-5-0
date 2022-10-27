import axios from 'axios';

export const oddsServices = {
    async getAllOdds() {
        const options = {
            method: 'GET',
            url: 'https://api.betting-api.com/1xbet/football/line/all',
            headers: {
                'Authorization': '607dd97bdb064627ae260a8ce06dacdabd03340591d44029b9f1c66230381afc'
            }
        };

        return axios.request(options);
    }
}