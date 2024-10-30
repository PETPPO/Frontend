import apiClient from './apiClient';

// 이미지 진단 API 
export const requestDiagnosis = (diagnosisData, token) => {
  return apiClient.post('/diagnosis/diagnosis-request', diagnosisData, {
    headers: {
      Authorization: `Bearer ${token}`, 
      'Content-Type': 'multipart/form-data',
    },
  });
};
