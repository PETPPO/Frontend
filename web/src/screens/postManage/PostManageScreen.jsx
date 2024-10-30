// import React, { useState } from 'react';
// import './PostManageScreen.css';
// import Sidebar from '../../components/Sidebar';
// import TableComponent from '../../components/PostTableComponent';
// import PaginationComponent from '../../components/PaginationComponent';
// import Modal from '../../components/Modal';
// import ConfirmModal from '../../components/ConfirmModal';

// function PostManageScreen() {
//   const [posts, setPosts] = useState([
//     { postId: '001', name: '정희연', postDate: '2024.05.04', title: '보통 여름철 샴푸 어떤 거 쓰시나요? ', commentCount: '5' },
//     { postId: '002', name: '정희연', postDate: '2024.05.04', title: '보통 여름철 샴푸 어떤 거 쓰시나요?', commentCount: '5' },
//     { postId: '002', name: '정희연', postDate: '2024.05.04', title: '보통 여름철 샴푸 어떤 거 쓰시나요?', commentCount: '5' },
//     { postId: '002', name: '정희연', postDate: '2024.05.04', title: '보통 여름철 샴푸 어떤 거 쓰시나요?', commentCount: '5' },
//     { postId: '002', name: '정희연', postDate: '2024.05.04', title: '보통 여름철 샴푸 어떤 거 쓰시나요?', commentCount: '5' },
//     { postId: '002', name: '정희연', postDate: '2024.05.04', title: '보통 여름철 샴푸 어떤 거 쓰시나요?', commentCount: '5' },
//     { postId: '002', name: '정희연', postDate: '2024.05.04', title: '보통 여름철 샴푸 어떤 거 쓰시나요?', commentCount: '5' },
//     { postId: '002', name: '정희연', postDate: '2024.05.04', title: '보통 여름철 샴푸 어떤 거 쓰시나요?', commentCount: '5' },
//     // 나머지 데이터...
//   ]);

//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = 12;
//   const totalPages = Math.ceil(posts.length / postsPerPage);

//   // 현재 페이지의 게시글 데이터
//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

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

//   // 페이지 변경 핸들러
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };


//   // 게시글 삭제 핸들러
//   const handleDelete = (postId) => {
//     const filteredPosts = posts.filter((post) => post.postId !== postId);
//     setPosts(filteredPosts);
//     setModalVisible(false); // 삭제 후 모달 닫기
//   };

//   //삭제 모달
//   const handleDeleteClick = (postId) => {
//     setModalContent('해당 게시글을 삭제하시겠습니까?');
//     setModalActions({
//       text1: '취소',
//       text2: '확인',
//       onCancel: () => setModalVisible(false),
//       onConfirm: () => confirmDelete(postId), // 삭제 확인 함수 호출
//     });
//     setModalVisible(true);
//   };
  
//   //삭제 확인 모달
//   const confirmDelete = (postId) => {
//     handleDelete(postId);
//     setConfirmModalMessage('해당 게시글이 삭제되었습니다.');
//     setConfirmModalVisible(true);
//   };
  
//   //삭제 확인 모달 닫기 
//   const handleCloseConfirmModal = () => {
//     setConfirmModalVisible(false);
//   };

//   // 테이블 열 정의
//   const columns = ['게시글 ID', '작성자명', '작성일자', '제목', '댓글수', '계정 삭제'];

//   return (
//     <div className="post-manage-container">
//       <Sidebar />
//       <main className="post-manage-content">
//         <h2 className="post-manage-title">게시글 관리</h2>
//         <TableComponent columns={columns} data={currentPosts} onDelete={handleDeleteClick} />
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

// export default PostManageScreen;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostManageScreen.css';
import Sidebar from '../../components/Sidebar';
import TableComponent from '../../components/PostTableComponent';
import PaginationComponent from '../../components/PaginationComponent';
import Modal from '../../components/Modal';
import ConfirmModal from '../../components/ConfirmModal';

function PostManageScreen() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://ceprj.gachon.ac.kr:60017/admin/community/posts');
        if (response.data.success) {
          const fetchedPosts = response.data.ports.map(post => ({
            postId: post.postId,
            // userId: post.userId,
            name: post.userName,
            postDate: new Date(post.postDate).toLocaleDateString(),
            title: post.title,
            commentCount: post.commentContent,
          }));
          setPosts(fetchedPosts);
        } else {
          console.error('게시글 데이터를 불러오지 못했습니다.');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://ceprj.gachon.ac.kr:60017/admin/community/post/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.postId !== postId));
      setModalVisible(false);
      setConfirmModalMessage('해당 게시글이 삭제되었습니다.');
      setConfirmModalVisible(true);
    } catch (error) {
      console.error('Error deleting post:', error);
      setModalContent('게시글 삭제에 실패했습니다.');
      setModalVisible(true);
    }
  };

  const handleDeleteClick = (postId) => {
    setModalContent('해당 게시글을 삭제하시겠습니까?');
    setModalActions({
      text1: '취소',
      text2: '확인',
      onCancel: () => setModalVisible(false),
      onConfirm: () => confirmDelete(postId),
    });
    setModalVisible(true);
  };

  const confirmDelete = (postId) => {
    handleDelete(postId);
  };

  const handleCloseConfirmModal = () => {
    setConfirmModalVisible(false);
  };

  const columns = ['게시글 ID', '작성자명', '작성일자', '제목', '댓글수', '계정 삭제'];

  return (
    <div className="post-manage-container">
      <Sidebar />
      <main className="post-manage-content">
        <h2 className="post-manage-title">게시글 관리</h2>
        <TableComponent columns={columns} data={currentPosts} onDelete={handleDeleteClick} />
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

export default PostManageScreen;
