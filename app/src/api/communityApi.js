import apiClient from './apiClient';

// 게시글 작성 API 
export const createPost = (postData, token) => {
  return apiClient.post('/community/post', postData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 게시글 목록 조회 API
export const fetchPosts = (diseaseTag, token) => {
  return apiClient.get('/community/posts', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { diseaseTag }, 
  });
};

// 게시글 상세보기 API
export const fetchPostDetails = (postId, token) => {
  return apiClient.get(`/community/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};