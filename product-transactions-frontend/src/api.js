import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const fetchTransactions = (month, page = 1, perPage = 10, search = '') => {
  return axios.get(`${API_BASE_URL}/transactions`, {
    params: { month, page, perPage, search }
  });
};

export const fetchStatistics = (month) => {
  return axios.get(`${API_BASE_URL}/statistics`, { params: { month } });
};

export const fetchBarChart = (month) => {
  return axios.get(`${API_BASE_URL}/bar-chart`, { params: { month } });
};

export const fetchPieChart = (month) => {
  return axios.get(`${API_BASE_URL}/pie-chart`, { params: { month } });
};

export const fetchCombinedData = (month) => {
  return axios.get(`${API_BASE_URL}/combined`, { params: { month } });
};
