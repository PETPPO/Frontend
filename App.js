// import React from 'react';
// import { SafeAreaView, StyleSheet } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import TabNavigator from './src/navigation/TabNavigator';

// export default function App() {
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <NavigationContainer>
//         <TabNavigator />
//       </NavigationContainer>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,  
//     backgroundColor: '#fff',
//   },
// });

// import React from 'react';
// import { SafeAreaView, StyleSheet } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import AppNavigator from './src/navigation/AppNavigator'; // AppNavigator로 변경

// export default function App() {
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <NavigationContainer>
//         <AppNavigator />
//       </NavigationContainer>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });

// import React, { useState } from 'react';
// import { SafeAreaView, StyleSheet } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import AppNavigator from './src/navigation/AppNavigator';
// import TabNavigator from './src/navigation/TabNavigator';

// export default function App() {
//   // 로그인 상태를 관리하기 위해 useState 사용 (예시로 boolean 값 사용)
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <NavigationContainer>
//         {isLoggedIn ? <TabNavigator /> : <AppNavigator />}
//       </NavigationContainer>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,  
//     backgroundColor: '#fff',
//   },
// });

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query'; // React Query 설정
import AppNavigator from './src/navigation/AppNavigator';
import TabNavigator from './src/navigation/TabNavigator';
import authStore from './src/stores/authStore'; // Zustand 스토어 가져오기

// React Query 클라이언트 설정
const queryClient = new QueryClient();

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

