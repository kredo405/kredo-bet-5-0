import axios from "axios";

export const stavkatvServices = {
  async getAllMatches(limit, dateFrom, dateTo, sport) {
    const options = {
      method: "GET",
      url: "http://localhost:8000/stavkatv/matches",
      params: {
        limit,
        dateFrom,
        dateTo,
        sport,
      },
    };

    return axios.request(options);
  },
};
