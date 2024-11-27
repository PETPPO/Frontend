// 댓글 작성 및 알림 생성 API
// export const createComment = (token, data) => {
//   return apiClient.post('/mypage/comment', data, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

import apiClient from './apiClient';

// 사용자 이름 조회
export const fetchUsername = (token) => {
  try {
    return apiClient.get(`/mypage/username`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("사용자 이름 조회 오류:", error);
    throw error;
  }
};

// 반려견 이름 조회
export const fetchDogname = (token) => {
  try {
    return apiClient.get(`/mypage/dogname`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("반려견 이름 조회 오류:", error);
    throw error;
  }
};

// 내가 쓴 글 조회
export const fetchUserPosts = async (token) => {
  try {
    return apiClient.get(`/mypage/userpost`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("내가 쓴 글 조회 오류:", error);
    throw error;
  }
};

// 회원 탈퇴
export const withdrawUser = async (userId, token) => {
  try {
    return await apiClient.delete(`/mypage/withdraw`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        userId,
      },
    });
  } catch (error) {
    console.error("회원 탈퇴 오류:", error);
    throw error;
  }
};

