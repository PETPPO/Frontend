import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserManageScreen.css';
import Sidebar from '../../components/Sidebar';
import TableComponent from '../../components/UserTableComponent';
import PaginationComponent from '../../components/PaginationComponent';
import Modal from '../../components/Modal';
import ConfirmModal from '../../components/ConfirmModal';

function UserManageScreen() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 12;

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [confirmModalMessage, setConfirmModalMessage] = useState('');
  const [modalActions, setModalActions] = useState({
    text1: '',
    text2: '',
    onCancel: () => {},
    onConfirm: () => {},
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://ceprj.gachon.ac.kr:60017/admin/users');
        if (response.data.success) {
          setUsers(response.data.users);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://ceprj.gachon.ac.kr:60017/admin/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
      setModalVisible(false);
      setConfirmModalMessage('해당 사용자가 삭제되었어요!');
      setConfirmModalVisible(true);
    } catch (error) {
      console.error('Error deleting user:', error);
      setModalContent('사용자 삭제에 실패했어요.');
      setModalVisible(true);
    }
  };

  const handleDeleteClick = (userId) => {
    setModalContent('해당 사용자를 삭제하시겠습니까?');
    setModalActions({
      text1: '취소',
      text2: '확인',
      onCancel: () => setModalVisible(false),
      onConfirm: () => confirmDelete(userId),
    });
    setModalVisible(true);
  };

  const confirmDelete = (userId) => {
    handleDelete(userId);
  };

  const handleCloseConfirmModal = () => {
    setConfirmModalVisible(false);
  };

  const columns = ['사용자 ID', '사용자명', '이메일', '비밀번호', '반려견 이름', '계정 삭제'];

  const formattedUsers = currentUsers.map(user => ({
    id: user.userId,
    name: user.userName,
    email: user.userEmail,
    password: user.userPw,
    dogName: user.dogName,
  }));

  return (
    <div className="user-manage-container">
      <Sidebar />
      <main className="user-manage-content">
        <h2 className="user-manage-title">사용자 관리</h2>
        <TableComponent columns={columns} data={formattedUsers} onDelete={handleDeleteClick} />
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
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
    </div>
  );
}

export default UserManageScreen;
