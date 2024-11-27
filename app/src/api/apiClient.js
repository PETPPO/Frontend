import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://ceprj.gachon.ac.kr:60017/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
