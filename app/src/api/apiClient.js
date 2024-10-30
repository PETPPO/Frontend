import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://ceprj.gachon.ac.kr:60017/api',  // 학과 서버 주소로 변경함 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
