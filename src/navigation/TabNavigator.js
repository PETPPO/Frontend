// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HistoryScreen from '../screens/History/HistoryListScreen'; 
// import CommunityScreen from '../screens/community/CommunityScreen';
// import UserScreen from '../screens/user/UserScreen';
// import HomeIcon from '../assets/images/icons/tab/HomeTab'; 
// import HomeIconActive from '../assets/images/icons/tab/HomeColorTab'; 
// import HistoryIcon from '../assets/images/icons/tab/HistoryTab'; 
// import HistoryIconActive from '../assets/images/icons/tab/HistoryColorTab';
// import CommunityIcon from '../assets/images/icons/tab/communityTab.svg'; 
// import CommunityIconActive from '../assets/images/icons/tab/communityColorTab.svg'; 
// import MyPageIcon from '../assets/images/icons/tab/MyPageTab'; 
// import MyPageIconActive from '../assets/images/icons/tab/MyPageColorTab'; 
// import MainScreen from '../screens/MainScreen';

// const Tab = createBottomTabNavigator();

// function TabNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, size }) => {
//           if (route.name === '홈') {
//             return focused ? (
//               <HomeIconActive width={size} height={size} />
//             ) : (
//               <HomeIcon width={size} height={size} />
//             );
//           } else if (route.name === '진단 기록') {
//             return focused ? (
//               <HistoryIconActive width={size} height={size} />
//             ) : (
//               <HistoryIcon width={size} height={size} />
//             );
//           } else if (route.name === '커뮤니티') {
//             return focused ? (
//               <CommunityIconActive width={size} height={size} />
//             ) : (
//               <CommunityIcon width={size} height={size} />
//             );
//           } else if (route.name === '마이페이지') {
//             return focused ? (
//               <MyPageIconActive width={size} height={size} />
//             ) : (
//               <MyPageIcon width={size} height={size} />
//             );
//           }
//         },
//         tabBarActiveTintColor: '#FC7E2F', // 활성화된 탭의 색상 설정
//         tabBarInactiveTintColor: '#A5A5A5', // 비활성화된 탭의 색상 설정
//         tabBarLabelStyle: { fontSize: 11, fontWeight: 'bold' },
//       })}
//     >
//       <Tab.Screen
//         name="홈"
//         component={MainScreen}
//         options={{ headerShown: false }}
//       />
//       <Tab.Screen 
//         name="진단 기록" 
//         component={HistoryScreen} 
//       />
//       <Tab.Screen
//         name="커뮤니티"
//         component={CommunityScreen}
//       />
//       <Tab.Screen name="마이페이지" component={UserScreen} />
//     </Tab.Navigator>
//   );
// }

// export default TabNavigator;

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DiagnosisRecordScreen from '../screens/History/DiagnosisRecordScreen'; 
import CommunityScreen from '../screens/community/CommunityScreen';
import UserScreen from '../screens/user/UserScreen';
import MainScreen from '../screens/MainScreen'; // 메인 스크린

import HomeIcon from '../assets/images/icons/tab/HomeTab'; 
import HomeIconActive from '../assets/images/icons/tab/HomeColorTab'; 
import HistoryIcon from '../assets/images/icons/tab/HistoryTab'; 
import HistoryIconActive from '../assets/images/icons/tab/HistoryColorTab';
import CommunityIcon from '../assets/images/icons/tab/communityTab.svg'; 
import CommunityIconActive from '../assets/images/icons/tab/communityColorTab.svg'; 
import MyPageIcon from '../assets/images/icons/tab/MyPageTab'; 
import MyPageIconActive from '../assets/images/icons/tab/MyPageColorTab'; 

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          if (route.name === '홈') {
            return focused ? (
              <HomeIconActive width={size} height={size} />
            ) : (
              <HomeIcon width={size} height={size} />
            );
          } else if (route.name === '진단 기록') {
            return focused ? (
              <HistoryIconActive width={size} height={size} />
            ) : (
              <HistoryIcon width={size} height={size} />
            );
          } else if (route.name === '커뮤니티') {
            return focused ? (
              <CommunityIconActive width={size} height={size} />
            ) : (
              <CommunityIcon width={size} height={size} />
            );
          } else if (route.name === '마이페이지') {
            return focused ? (
              <MyPageIconActive width={size} height={size} />
            ) : (
              <MyPageIcon width={size} height={size} />
            );
          }
        },
        tabBarActiveTintColor: '#FC7E2F',
        tabBarInactiveTintColor: '#A5A5A5',
        tabBarLabelStyle: { fontSize: 11, fontWeight: 'bold' },
      })}
    >
      <Tab.Screen name="홈" component={MainScreen} options={{ headerShown: false }} />
      <Tab.Screen name="진단 기록" component={DiagnosisRecordScreen} />
      <Tab.Screen name="커뮤니티" component={CommunityScreen} />
      <Tab.Screen name="마이페이지" component={UserScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
