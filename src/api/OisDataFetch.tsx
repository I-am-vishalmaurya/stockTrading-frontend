import axios from "axios";
import authHeader from "../services/authHeader";
const API_URL = process.env.REACT_APP_LOCAL_API_URL;


const authToken: {Authorization: string} | {} = authHeader();


class OisDataFetch {
  optionChainAnalysis(pageNumber: number) {
    return axios
      .get(`${API_URL}/ois/option_chain_analysis/?page=${pageNumber}`,
        { headers: authToken })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

  premiumReport(pageNumber: number) {
    return axios
      .get(`${API_URL}/ois/premium_report/?page=${pageNumber}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

  deltaReport(pageNumber: number) {
    return axios
      .get(`${API_URL}/ois/delta_report/?page=${pageNumber}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

  signalReport(pageNumber: number) {
    return axios
      .get(`${API_URL}/ois/signal_report/?page=${pageNumber}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

  greekReport(pageNumber: number) {
    return axios
      .get(`${API_URL}/ois/greek_report/?page=${pageNumber}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }
}

export default OisDataFetch;
