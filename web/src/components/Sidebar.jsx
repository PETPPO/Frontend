import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import LogoImage from '../assets/images/Petppo_logo_web.svg';
import ConfirmModal from './ConfirmModal';
import Modal from './Modal';
import LogoutIcon from '../assets/images/logoutIcon.svg';

function Sidebar() {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const [modalContent, setModalContent] = useState('');
  const [confirmModalMessage, setConfirmModalMessage] = useState('');

  const [modalActions, setModalActions] = useState({
    text1: '취소',
    text2: '확인',
    onCancel: () => {},
    onConfirm: () => {},
  });

  const handleLogoutClick = () => {
    setModalContent('로그아웃 하시겠습니까?');
    setModalActions({
      text1: '취소',
      text2: '확인',
      onCancel: () => setModalVisible(false),
      onConfirm: confirmLogout,
    });
    setModalVisible(true);
  };

  const confirmLogout = () => {
    setModalVisible(false);
    setConfirmModalMessage('로그아웃 처리되었습니다!');
    setConfirmModalVisible(true);

    setTimeout(() => {
      navigate('/'); // 로그인 페이지로 리디렉션
    }, 2000);
  };

  const handleCloseConfirmModal = () => {
    setConfirmModalVisible(false);
  };

  return (
    <SidebarWrapper>
      <Logo src={LogoImage} alt="Petppo Logo" />
      <SidebarContainer>
        <Menu>
          <MenuItem to="/dashboard">대시보드</MenuItem>
          <MenuItem to="/user-management">사용자 관리</MenuItem>
          <MenuItem to="/disease-management">질환 관리</MenuItem>
          <MenuItem to="/post-management">게시글 관리</MenuItem>
          <LogoutButton onClick={handleLogoutClick}>
            <LogoutIconStyled src={LogoutIcon} alt="LogoutIcon" />
            로그아웃
          </LogoutButton>
        </Menu>
      </SidebarContainer>
      {modalVisible && (
        <Modal
          msg={modalContent}
          text1={modalActions.text1}
          text2={modalActions.text2}
          onCancel={modalActions.onCancel}
          onConfirm={modalActions.onConfirm}
        />
      )}
      {confirmModalVisible && (
        <ConfirmModal
          msg={confirmModalMessage}
          onConfirm={handleCloseConfirmModal}
        />
      )}
    </SidebarWrapper>
  );
}

export default Sidebar;

const SidebarWrapper = styled.div`
  background-color: #FFF2D7;
  width: 298px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  padding-top: 30px;
`;

const SidebarContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const MenuItem = styled(NavLink)`
  display: block;
  padding: 30px 15px;
  text-align: center;
  font-weight: bold;
  font-size: 28px;
  color: #6F4E37;
  border-bottom: 2px solid #BFAFA4;
  cursor: pointer;
  transition: background 0.3s;
  text-decoration: none;

  &:hover {
    background: #FC7E2F;
    color: #fff;
  }

  &.active {
    background: #FC7E2F;
    color: #fff;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 30px 15px;
  text-align: center;
  font-weight: bold;
  font-size: 28px;
  color: #e74c3c;
  border: none;
  border-bottom: 2px solid #BFAFA4;
  cursor: pointer;
  background: transparent;
  transition: background 0.3s;
  margin: 0 auto;

  &:hover {
    background: #FC7E2F;
    color: #fff;
  }

  &:active {
    background: #FC7E2F;
    color: #fff;
  }
`;


const LogoutIconStyled = styled.img`
  width: 39px;
  height: 34px;
`;
