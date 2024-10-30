// import React from 'react';
// import logo from '../../assets/images/petppo_1.svg'; 
// import './LoginScreen.css'; 

// function LoginScreen() {

  
//   return (
//     <div className="login-container">
//       <img src={logo} alt="Petppo Logo" className="logo" />
//       <h2 className="login-title">관리자 전용 로그인</h2>
//       <form className="login-form">
//         <input type="email" placeholder="이메일" required className="input-field" />
//         <input type="password" placeholder="비밀번호" required className="input-field" />
//         <button type="submit" className="login-button">로그인</button>
//       </form>
//     </div>
//   );
// }

// export default LoginScreen;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import logo from '../../assets/images/petppo_1.svg'; 
import './LoginScreen.css'; 

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지
    try {
      const response = await axios.post('http://ceprj.gachon.ac.kr:60017/admin/login_process', {
        adminEmail: email,
        adminPw: password, 
      });

      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem('token', token); // JWT 토큰 로컬 스토리지에 저장
        alert('로그인 성공!');
        navigate('/dashboard'); 
      } else {
        // 로그인 실패 시 경고창 표시
        alert('로그인 정보가 올바르지 않습니다.');
      }

    } catch (error) {
      // 오류 발생 시 경고창 표시
      alert('서버와 통신에 실패했습니다. 다시 시도해주세요.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Petppo Logo" className="logo" />
      <h2 className="login-title">관리자 전용 로그인</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="이메일"
          required
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // 이메일 입력값 업데이트
        />
        <input
          type="password"
          placeholder="비밀번호"
          required
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // 비밀번호 입력값 업데이트
        />
        <button type="submit" className="login-button">로그인</button>
      </form>
    </div>
  );
}

export default LoginScreen;
