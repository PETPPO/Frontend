import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DiagnosisRecordScreen from '../screens/History/DiagnosisRecordScreen'; 
import CommunityScreen from '../screens/community/CommunityScreen';
import UserScreen from '../screens/user/UserScreen';
import MainScreen from '../screens/MainScreen'; 


import UploadScreen from '../screens/Upload/UploadScreen';
import ResultScreen from '../screens/Upload/ResultScreen';
import FailResultScreen from '../screens/Upload/FailResultScreen';

import PostWriteScreen from '../screens/community/PostWriteScreen';

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

      {/* 이미지 진단 관련 스크린 추가 */}
      <Tab.Screen name="이미지 업로드" component={UploadScreen} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="진단 결과" component={ResultScreen} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="진단 실패" component={FailResultScreen} options={{ tabBarButton: () => null }} />

      {/* 커뮤니티 관련 스크린 */}
      <Tab.Screen name="게시글 작성하기" component={PostWriteScreen} options={{ tabBarButton: () => null }} />

    </Tab.Navigator>
  );
}

export default TabNavigator;