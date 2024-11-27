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

// 게시글 상세보기 삭제 API
export const deletePostDetails = async (postId, token) => {
  try {
    const response = await apiClient.delete(`/community/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('게시글 삭제 오류:', error);
    throw error;
  }
};

// 댓글 작성 API
export const createComment = async (postId, commentData, token) => {
  try {
    const response = await apiClient.post(`/community/posts/${postId}/comments`, commentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('댓글 작성 오류:', error);
    throw error;
  }
};

// 답글 작성 API
export const createReply = async (parentId, replyData, token) => {
  try {
    const response = await apiClient.post(`/community/comments/${parentId}/reply`, replyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('답글 작성 오류:', error);
    throw error;
  }
};

// 댓글 삭제 API
export const deleteComment = async (commentId, token) => {
  try {
    const response = await apiClient.delete(`/community/comments/${commentId}`, { 
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('댓글 삭제 오류:', error);
    throw error;
  }
};

// 답글 삭제 API
export const deleteReply = async (commentId, token) => {
  try {
    const response = await apiClient.delete(`/community/comments/${commentId}/reply`, { 
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('답글 삭제 오류:', error);
    throw error;
  }
};

// 댓글/답글 알림 조회 API
export const fetchAlarms = (token) => {
  return apiClient.get('community/alarms', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 댓글/답글 알림 읽음 처리 
export const readAlarms = (alarmId, token) => {
  return apiClient.put(`community/alarms/${alarmId}/read`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
