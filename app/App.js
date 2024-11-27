import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query'; // React Query 설정
import AppNavigator from './src/navigation/AppNavigator';
import TabNavigator from './src/navigation/TabNavigator';
import authStore from './src/stores/authStore'; // Zustand 스토어 가져오기
import { LogBox } from 'react-native';

// React Query 클라이언트 설정
const queryClient = new QueryClient();
LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered']);

export default function App() {
  // Zustand로 로그인 상태 관리
  const { isLoggedIn, setIsLoggedIn } = authStore();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          {isLoggedIn ? <TabNavigator /> : <AppNavigator />}
        </NavigationContainer>
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,  
    backgroundColor: '#fff',
  },
});



