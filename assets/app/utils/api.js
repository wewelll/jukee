import axios from 'axios';

const API = '/api';

function headers() {
  const token = JSON.parse(localStorage.getItem('token'));

  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer: ${token}`,
  };
}

export default {
  get(url, params = {}) {
    return axios.get(`${API}${url}`, { headers: headers(), params });
  },

  post(url, data) {
    return axios.post(`${API}${url}`, data, { headers: headers() });
  },

  patch(url, data) {
    return axios.patch(`${API}${url}`, data, { headers: headers() });
  },

  delete(url) {
    return axios.delete(`${API}${url}`, { headers: headers() });
  },
};
