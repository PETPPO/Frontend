import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://6c35-125-132-234-28.ngrok-free.app/api',  // 실제 서버 주소로 변경 필요!
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
