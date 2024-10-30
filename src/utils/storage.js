import AsyncStorage from '@react-native-async-storage/async-storage';

// 토큰 저장
export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem('authToken', token);
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

// 토큰 불러오기
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('authToken');
  } catch (error) {
    console.error('Error getting token:', error);
  }
};

// 토큰 삭제
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
  } catch (error) {
    console.error('Error removing token:', error);
  }
};
