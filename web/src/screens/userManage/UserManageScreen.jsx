// import React, { useState } from 'react';
// import './UserManageScreen.css';
// import Sidebar from '../../components/Sidebar';
// import TableComponent from '../../components/TableComponent';
// import PaginationComponent from '../../components/PaginationComponent';
// import Modal from '../components/Modal';
// import ConfirmModal from '../components/ConfirmModal';

// function UserManageScreen() {
//   const [users, setUsers] = useState([
//     { id: '001', name: '정희연', email: 'wjdgmldus28@naver.com', password: 'hy23!' },
//     { id: '002', name: '정희연', email: 'wjdgmldus28@naver.com', password: 'hy23!' },
//     { id: '002', name: '정희연', email: 'wjdgmldus28@naver.com', password: 'hy23!' },
//     { id: '002', name: '정희연', email: 'wjdgmldus28@naver.com', password: 'hy23!' },
//     { id: '002', name: '정희연', email: 'wjdgmldus28@naver.com', password: 'hy23!' },
//     { id: '002', name: '정희연', email: 'wjdgmldus28@naver.com', password: 'hy23!' },
//     { id: '002', name: '정희연', email: 'wjdgmldus28@naver.com', password: 'hy23!' },
//     { id: '002', name: '정희연', email: 'wjdgmldus28@naver.com', password: 'hy23!' },
//     { id: '002', name: '정희연', email: 'wjdgmldus28@naver.com', password: 'hy23!' },
//     { id: '002', name: '정희연', email: 'wjdgmldus28@naver.com', password: 'hy23!' },
//     { id: '002', name: '정희연', email: 'wjdgmldus28@naver.com', password: 'hy23!' },
//     { id: '002', name: '정희연', email: 'wjdgmldus28@naver.com', password: 'hy23!' },
//     { id: '002', name: '정희연', email: 'wjdgmldus28@naver.com', password: 'hy23!' },
//   ]);

//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 12; // 페이지당 사용자 수
//   const totalPages = Math.ceil(users.length / usersPerPage);

//   // 현재 페이지의 사용자 데이터
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

//   // 페이지 변경 핸들러
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // 사용자 삭제 핸들러
//   const handleDelete = (userId) => {
//     const filteredUsers = users.filter((user) => user.id !== userId);
//     setUsers(filteredUsers);
//   };

//   // 테이블 열 정의
//   const columns = ['사용자 ID', '사용자명', '이메일', '비밀번호', '계정 삭제'];

//   //모달 상태관리 
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalContent, setModalContent] = useState('');
//   const [confirmModalVisible, setConfirmModalVisible] = useState(false);
//   const [confirmModalMessage, setConfirmModalMessage] = useState('');
//   const [modalActions, setModalActions] = useState({
//     text1: '',
//     text2: '',
//     onCancel: () => {},
//     onConfirm: () => {}
//   });

//   const handleDeleteClick = () => {
//     setModalContent('해당 사용자를 삭제하시겠습니까?');
//     setModalActions({
//       text1: '취소',
//       text2: '확인',
//       onCancel: () => setModalVisible(false),
//       onConfirm: confirmDelete
//     });
//     setModalVisible(true);
//   };

//   const  confirmDelete = () => {
//     setModalContent('해당 사용자가 삭제 되었어요!');
//     setModalActions({
//       text1: '확인',
//       onCancel: () => setModalVisible(false),
//       onConfirm: confirmDeletion
//     });
//     setModalVisible(true);
//   };

//   return (
//     <div className="user-manage-container">
//       <Sidebar />
//       <main className="user-manage-content">
//         <h2 className="user-manage-title">사용자 관리</h2>
//         <TableComponent columns={columns} data={currentUsers} onDelete={handleDelete} />
//         <PaginationComponent
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         />
//       </main>
//       {modalVisible && (
//         <Modal
//           msg={modalContent}
//           text1={modalActions.text1}
//           text2={modalActions.text2}
//           onCancel={modalActions.onCancel}
//           onConfirm={modalActions.onConfirm}
//         />
//       )}
//       {confirmModalVisible && (
//         <ConfirmModal
//           msg={confirmModalMessage}
//           onConfirm={handleCloseConfirmModal}
//         />
//       )}
//     </div>
//   );
// }

// export default UserManageScreen;

// import React, { useState } from 'react';
// import './UserManageScreen.css';
// import Sidebar from '../../components/Sidebar';
// import TableComponent from '../../components/UserTableComponent';
// import PaginationComponent from '../../components/PaginationComponent';
// import Modal from '../../components/Modal';
// import ConfirmModal from '../../components/ConfirmModal';

// function UserManageScreen() {
//   const [users, setUsers] = useState([
//     { id: '001', name: '정희연', email: 'wjdgmldus28@naver.com', password: 'hy23!' },
//     { id: '002', name: '정희연', email: 'wjdgmldus28@naver.com', password: 'hy23!' },
//     { id: '003', name: '정희연', email: 'wjdgmldus28@naver.com', password: 'hy23!' },
//     // 나머지 데이터...
//   ]);

//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 12;
//   const totalPages = Math.ceil(users.length / usersPerPage);

//   // 현재 페이지의 사용자 데이터
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

//   // 페이지 변경 핸들러
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // 모달 상태 관리
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalContent, setModalContent] = useState('');
//   const [confirmModalVisible, setConfirmModalVisible] = useState(false);
//   const [confirmModalMessage, setConfirmModalMessage] = useState('');
//   const [modalActions, setModalActions] = useState({
//     text1: '',
//     text2: '',
//     onCancel: () => {},
//     onConfirm: () => {},
//   });

//   // 사용자 삭제 핸들러
//   const handleDelete = (userId) => {
//     const filteredUsers = users.filter((user) => user.id !== userId);
//     setUsers(filteredUsers);
//     setModalVisible(false); // 삭제 후 모달 닫기
//   };

//   // 테이블 열 정의
//   const columns = ['사용자 ID', '사용자명', '이메일', '비밀번호', '계정 삭제'];

//   // 삭제 모달
//   const handleDeleteClick = (postId) => {
//     setModalContent('해당 사용자를 삭제하시겠습니까?');
//     setModalActions({
//       text1: '취소',
//       text2: '확인',
//       onCancel: () => setModalVisible(false),
//       onConfirm: () => confirmDelete(postId), // 삭제 확인 함수 호출
//     });
//     setModalVisible(true);
//   };

//   // 삭제 확인 모달 
//   const confirmDelete = (postId) => {
//     handleDelete(postId);
//     setConfirmModalMessage('해당 사용자가 삭제되었어요!');
//     setConfirmModalVisible(true);
//   };

//   // 삭제 확인 모달 닫기 
//   const handleCloseConfirmModal = () => {
//     setConfirmModalVisible(false);
//   };

//   return (
//     <div className="user-manage-container">
//       <Sidebar />
//       <main className="user-manage-content">
//         <h2 className="user-manage-title">사용자 관리</h2>
//         <TableComponent columns={columns} data={currentUsers} onDelete={handleDeleteClick} />
//         <PaginationComponent
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         />
//       </main>
//       {modalVisible && (
//         <Modal
//           msg={modalContent}
//           text1={modalActions.text1}
//           text2={modalActions.text2}
//           onCancel={modalActions.onCancel}
//           onConfirm={modalActions.onConfirm}
//         />
//       )}
//       {confirmModalVisible && (
//         <ConfirmModal
//           msg={confirmModalMessage}
//           onConfirm={handleCloseConfirmModal}
//         />
//       )}
//     </div>
//   );
// }

// export default UserManageScreen;

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
