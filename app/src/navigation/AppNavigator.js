import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  LOGIN_SCREEN,
  USERAGREEMENT_SCREEN,
  TERMSDETAILS_SCREEN,
  PRIVACYDETAILS_SCREEN,
  SIGNUP_SCREEN,
  DIAGNOSISRECORD_SCREEN,
  HISTORYDETAIL_SCREEN,
  COMMUNITY_SCREEN,
  POSTWRITE_SCREEN,
  POSTEDETAIL_SCREEN,
  MYPOST_SCREEN,
  USER_SCREEN,
  UPLOAD_SCREEN,
  RESULT_SCREEN,
  FAILRESULT_SCREEN,
  WITHDRAWAL_SCREEN,
  NOTIFICATION_SCREEN
} from '../constants/screenNames';

import LoginScreen from '../screens/auth/LoginScreen';
import UserAgreementScreen from '../screens/auth/UserAgreementScreen';
import TermsDetailsScreen from '../screens/auth/TermsDetailsScreen';
import PrivacyDetailsScreen from '../screens/auth/PrivacyDetailsScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import DiagnosisRecordScreen from '../screens/History/DiagnosisRecordScreen';
import HistoryDetailScreen from '../screens/History/HistoryDetailScreen';
import CommunityScreen from '../screens/community/CommunityScreen';
import PostWriteScreen from '../screens/community/PostWriteScreen';
import PostDetailScreen from '../screens/community/PostDetailScreen';
import MyPostScreen from '../screens/community/MyPostScreen';
import UserScreen from '../screens/user/UserScreen';
import ResultScreen from '../screens/Upload/ResultScreen';
import FailResultScreen from '../screens/Upload/FailResultScreen';
import UploadScreen from '../screens/Upload/UploadScreen';
import WithdrawalScreen from '../screens/user/WithdrawalScreen';
import NotificationScreen from '../screens/community/NotificationScreen';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName={LOGIN_SCREEN}>
      {/* 사용자 인증 */}
      <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen}  options={{ headerBackTitleVisible: false }}/>
      <Stack.Screen name={USERAGREEMENT_SCREEN} component={UserAgreementScreen}  options={{ headerBackTitleVisible: false }}/>
      <Stack.Screen name={TERMSDETAILS_SCREEN} component={TermsDetailsScreen}  options={{ headerBackTitleVisible: false }}/>
      <Stack.Screen name={PRIVACYDETAILS_SCREEN} component={PrivacyDetailsScreen}  options={{ headerBackTitleVisible: false }}/>
      <Stack.Screen name={SIGNUP_SCREEN} component={SignUpScreen}  options={{ headerBackTitleVisible: false }}/>

      {/* 진단 기록 */}
      <Stack.Screen name={DIAGNOSISRECORD_SCREEN} component={DiagnosisRecordScreen}  options={{ headerBackTitleVisible: false }}/>
      <Stack.Screen name={HISTORYDETAIL_SCREEN} component={HistoryDetailScreen}  options={{ headerBackTitleVisible: false }}/>

      {/* 커뮤니티 */}
      <Stack.Screen name={COMMUNITY_SCREEN} component={CommunityScreen}  options={{ headerBackTitleVisible: false }}/>
      <Stack.Screen name={POSTWRITE_SCREEN} component={PostWriteScreen}  options={{ headerBackTitleVisible: false }}/>
      <Stack.Screen name={POSTEDETAIL_SCREEN} component={PostDetailScreen}  options={{ headerBackTitleVisible: false }}/>
      <Stack.Screen name={USER_SCREEN} component={UserScreen}  options={{ headerBackTitleVisible: false }}/>
      <Stack.Screen name={MYPOST_SCREEN} component={MyPostScreen}  options={{ headerBackTitleVisible: false }}/>

      {/* 이미지 진단 */}
      <Stack.Screen name={UPLOAD_SCREEN} component={UploadScreen}  options={{ headerBackTitleVisible: false }}/>
      <Stack.Screen name={RESULT_SCREEN} component={ResultScreen}  options={{ headerBackTitleVisible: false }}/>
      <Stack.Screen name={FAILRESULT_SCREEN} component={FailResultScreen}  options={{ headerBackTitleVisible: false }}/>

      {/* 마이페이지 */}
      <Stack.Screen name={WITHDRAWAL_SCREEN} component={WithdrawalScreen}  options={{ headerBackTitleVisible: false }}/>
      <Stack.Screen name={NOTIFICATION_SCREEN} component={NotificationScreen}  options={{ headerBackTitleVisible: false }}/>

      {/* 로그인 후 TabNavigator로 이동 */}
      <Stack.Screen name="홈" component={TabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default AppNavigator;

