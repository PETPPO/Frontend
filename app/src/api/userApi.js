import apiClient from './apiClient';

// 회원가입 API
export const registerUser = (userData) => {
  return apiClient.post('/user/register', userData);
};

// 로그인 API
export const loginUser = (userData) => {
  return apiClient.post('/user/login', userData);
};

// 이메일 인증 링크 발송 API
export const sendVerificationLink = (email) => {
  return apiClient.post('/user/send-verification-link', { userEmail: email });
};

 // 이메일 인증 상태 확인 API
export const checkEmailVerificationStatus = (email) => {
  return apiClient.get(`/user/verify-status/${encodeURIComponent(email)}`);
};
