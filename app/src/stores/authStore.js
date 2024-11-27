//주스탠드 사용 -> 클라이언트 쪽 상태 관리를 효율적으로 처리하는 라이브러리

import { create } from 'zustand';
import { login } from '../api/userApi';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  token: null, 

  loginUser: async (email, password) => {
    try {
      const response = await login(email, password);
      const { user, token } = response; // 응답에서 user와 token 추출
      set({ user, token, isAuthenticated: true }); // 상태에 저장
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  },

  clearUser: () => set({ user: null, isAuthenticated: false, token: null }),
}));

export default useAuthStore;


