import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './screens/auth/LoginScreen';
import DashboardScreen from './screens/dashboard/DashboardScreen';
import UserManageScreen from './screens/userManage/UserManageScreen';
import DiseaseManageScreen from './screens/diseaseManage/DiseaseManageScreen';
import PostManageScreen from './screens/postManage/PostManageScreen';
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* 로그인 페이지 */}
          <Route path="/" element={<LoginScreen />} />
          
          {/* 대시보드 페이지 */}
          <Route path="/dashboard" element={<DashboardScreen />} />

          {/* 사용자 관리 페이지 */}
          <Route path="/user-management" element={<UserManageScreen />} />

          {/* 질환 관리 페이지 */}
          <Route path="/disease-management" element={<DiseaseManageScreen />} />

          {/* 게시글 관리 페이지 */}
          <Route path="/post-management" element={<PostManageScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
