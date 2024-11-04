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

// 이미지 진단 결과 저장 API
export const saveDiagnosisResult = (diagnosisData, token) => {
  return apiClient.post('/diagnosis/save-from-diagnosis', diagnosisData, {
    headers: {
      Authorization: `Bearer ${token}`, 
      'Content-Type': 'application/json',
    },
  });
};

// 진단 결과 목록 조회
export const fetchDiagnosisList = (token) => {
  return apiClient.get('/diagnosis/list', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 진단 결과 목록 상세 조회
export const fetchDiagnosisDetail = (diagnosis_id, token) => {
  return apiClient.get(`/diagnosis/detail/${diagnosis_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// export const fetchDiagnosisDetail = (diagnosis_id, token) => {
//   console.log('diagnosis_id:', diagnosis_id);
//   console.log('Request URL:', `/diagnosis/detail/${diagnosis_id}`);
  
//   return apiClient.get(`/diagnosis/detail/${diagnosis_id}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };
