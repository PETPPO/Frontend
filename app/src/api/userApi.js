// import axios from 'axios';

// const apiClient = axios.create({
//   baseURL: 'https://6adc-125-132-234-28.ngrok-free.app/api',  // 실제 서버 주소로 변경 필요!
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // 회원가입 API
// export const registerUser = (userData) => {
//   return apiClient.post('/user/register', userData);
// };

// // 로그인 API
// export const loginUser = (userData) => {
//   return apiClient.post('/user/login', userData);
// };

// // 이메일 중복 확인 API
// export const checkEmail = (email) => {
//   return apiClient.post('/user/check-email', { email });
// };


import apiClient from './apiClient';

// 회원가입 API
export const registerUser = (userData) => {
  return apiClient.post('/user/register', userData);
};

// 로그인 API
export const loginUser = (userData) => {
  return apiClient.post('/user/login', userData);
};

// 이메일 중복 확인 API
// export const checkEmail = (email) => {
//   return apiClient.post('/user/check-email', { userEmail: email });
// };

// 이메일 중복 확인 API
// export const checkEmail = (userData) => {
//   return apiClient.post('/user/check-email', userData);
// };

// 이메일 중복 확인 API
export const checkEmail = (email) => {
  return apiClient.post('/user/check-email', { email });
};
