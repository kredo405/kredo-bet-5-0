import axios from "axios";

export const nbbetServices = {
  async getAllMatches() {
    const timestamp = Date.now();
    const dateFix = Number(String(timestamp).slice(0, 8)) + 180;

    const newTimestamp = +`${+dateFix + 300}99999`;
    console.log(newTimestamp);

    console.log(newTimestamp);

    const options = {
      method: "GET",
      url: "https://node-api-ochre.vercel.app/nbBet/nbbetMatches",
      params: {
        timestamp: newTimestamp,
      },
    };

    return axios.request(options);
  },
  async getMatchInfo(link = sessionStorage.getItem("link")) {
    const options = {
      method: "GET",
      url: "https://node-api-ochre.vercel.app/nbBet/nbbetMatch",
      params: {
        link: `${link}`,
        // link: '972530-manchester-siti-tottenhem-hotspur-prognoz-na-match'
      },
    };

    return axios.request(options);
  },
  async getLastMatchInfo(link) {
    const options = {
      method: "GET",
      url: "https://node-api-ochre.vercel.app/nbBet/nbbetMatch",
      params: {
        link: link,
        // link: '972530-manchester-siti-tottenhem-hotspur-prognoz-na-match'
      },
    };

    return axios.request(options);
  },

  async getMatchPredictions(id) {
    const options = {
      method: "GET",
      url: "https://node-api-ochre.vercel.app/nbBet/nbbetPredict",
      params: {
        link: `${sessionStorage.getItem("link")}/${id}`,
      },
    };

    return axios.request(options);
  },
  async getSummary() {
    const options = {
      method: "GET",
      url: `https://node-api-ochre.vercel.app/nbBet/nbbetSummary`,
      params: {
        link: `${sessionStorage.getItem("link")}`,
      },
    };

    return axios.request(options);
  },
  async getHistoryOdds() {
    const options = {
      method: "GET",
      url: `https://node-api-ochre.vercel.app/nbBet/historyOdds`,
      params: {
        link: `${sessionStorage.getItem("link")}`,
      },
    };

    return axios.request(options);
  },
  async getLastMatches() {
    const options = {
      method: "GET",
      url: `https://node-api-ochre.vercel.app/nbBet/nbbetLastMatches`,
      params: {
        link: `${sessionStorage.getItem("link")}`,
      },
    };

    return axios.request(options);
  },
};
