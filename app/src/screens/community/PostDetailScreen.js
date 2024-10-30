// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView, KeyboardAvoidingView } from 'react-native';
// import SendIcon from '../../assets/images/icons/SendIcon.svg'; 
// import CommentIcon from '../../assets/images/icons/CommentIcon.svg'; 
// import TrashIcon from '../../assets/images/icons/TrashIcon.svg'; 
// import ReplyIcon from '../../assets/images/icons/ReplyIcon.svg'; 
// import ChatCircle from '../../assets/images/icons/Chat_Circle.svg'; 
// import CustomModal from '../../components/CustomModal'; 

// import Dot3 from '../../assets/images/icons/Dot3.svg'; 
// import DeleteButton from '../../assets/images/icons/DeleteButton.svg'; 

// const initialPost = {
//   title: '여드름 극복 후기!!',
//   author: '정희연',
//   date: '09.21 18:24',
//   tags: ['#결정/종괴'],
//   content: '저희집 강아지 피부에 빨개지며 여드름 진단을 받았습니다. 여러 치료 방법을 시도해봤는데 드디어 효과를 보았습니다!',
//   image: 'https://blog.malcang.com/wp-content/uploads/2024/02/2-20.png',
//   comments: [
//     { id: '1', author: '김현우', date: '09.21 18:24', content: '헉, 플라스틱 그릇으로도 여드름이 발생할 수 있대요.', isReply: false, isMine: false },
//     { id: '2', author: '정희연', date: '09.21 18:24', content: '플라스틱 그릇 쓰신다면 바꾸시는 게 좋아요!', isReply: true, isMine: true },
//   ],
// };

// export default function PostDetailScreen( ) {
//   const [post, setPost] = useState(initialPost); // 초기 게시글 상태
//   const [newComment, setNewComment] = useState(''); // 새 댓글 상태
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [isFinalModalVisible, setFinalModalVisible] = useState(false);
//   const [isReplying, setIsReplying] = useState(false);
//   const [replyTo, setReplyTo] = useState(null);
  

//   const handleDot3Click = () => {
//     setShowDeleteButton(!showDeleteButton);
//   };

//   useEffect(() => {
//     console.log('showDeleteButton:', showDeleteButton);
//   }, [showDeleteButton]);

//   // 결과 저장 모달 닫기
//   const handleModalClose = () => {
//     setModalVisible(false);
//   };

//   // 최종 모달 닫기 및 진단 기록 페이지로 이동
//   const handleFinalModalClose = () => {
//     setFinalModalVisible(false);
//   };

//   // 첫 번째 결과 저장 모달의 확인 버튼을 눌렀을 때
//   const handleConfirm = () => {
//     setModalVisible(false);
//     setFinalModalVisible(true); 
//   };

//   // 진단 결과 저장 버튼 눌렀을 때
//   const handleSaveResult = () => {
//     setModalVisible(true);  
//   };

//   // const handleSendComment = () => {
//   //   if (newComment.trim()) {
//   //     console.log(isReplying ? `답글 전송: ${newComment}` : `댓글 전송: ${newComment}`);
//   //     setNewComment('');
//   //     setIsReplying(false);
//   //     setReplyTo(null);
//   //   }
//   // };

//   const handleSendComment = () => {
//     if (newComment.trim()) {
//       const newCommentData = {
//         id: `${post.comments.length + 1}`, // 고유한 id
//         author: '현재 사용자', // 실제 프로젝트에서 사용자 이름을 대체하세요
//         date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString().slice(0, 5),
//         content: newComment,
//         isReply: !!replyTo,
//         isMine: true,
//       };
      
//       setPost(prevPost => ({
//         ...prevPost,
//         comments: replyTo
//           ? [
//               ...prevPost.comments,
//               { ...newCommentData, parentId: replyTo }, // 답글에 parentId 추가
//             ]
//           : [...prevPost.comments, newCommentData],
//       }));
      
//       setNewComment('');
//       setIsReplying(false);
//       setReplyTo(null);
//     }
//   };
  
//   // 답글 작성 
//   const handleReply = (commentId) => {
//     setIsReplying(true);
//     setReplyTo(commentId);
//   };
  
//   const renderComment = ({ item }) => (
//     <View style={[styles.commentContainer, item.isReply && styles.replyContainer]}>
//       <View style={styles.commentView}>
//         {item.isReply && <ReplyIcon style={styles.replyIcon} width={18} height={18} />}
//         <View style={styles.commentContain}>
//           {/* 작성자와 날짜를 한쪽에 */}
//           <View style={styles.commentView2}>
//             <Text style={styles.commentAuthor}>{item.author}</Text>
//             <Text style={styles.commentDate}>  | {item.date}</Text>
//           </View>
//           {/* 조건부로 TrashIcon을 다른 쪽 끝에 정렬 */}
//           <View style={styles.commentView3}>
//             <TouchableOpacity onPress={() => handleReply(item.id)}>
//               <CommentIcon style={styles.icon} width={18} height={18} />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={item.isMine ? handleSaveResult : null}>
//               {item.isMine && (
//                 <TrashIcon style={styles.icon} width={18} height={18} />
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//       <Text style={[styles.commentContent, item.isReply && styles.replyContent]}>{item.content}</Text>
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={92}>
//       <ScrollView>
//         {/* 게시글 정보 */}
//         <View style={styles.postContainer}>
//           <View style={styles.header}>
//             <Text style={styles.author}>{post.author}</Text>
//             <Text style={styles.date}>| {post.date}</Text>
//           </View>

//           <View style={styles.tagContainer}>
//             {post.tags.map((tag, index) => (
//               <View key={index} style={styles.tag}>
//                 <Text style={styles.tagText}>{tag}</Text>
//               </View>
//             ))}
//           </View>
          
//           <View style={styles.titleContainer}>
//             <Text style={styles.title}>{post.title}</Text>
//           </View>

//           <Text style={styles.content}>{post.content}</Text>
//           <Image source={{ uri: post.image }} style={styles.postImage} />
//         </View>

//         {/* 댓글 및 답글 수 표시 */}
//         <View style={styles.commentCountContainer}>
//           <ChatCircle width={18} height={18} />
//           <Text style={styles.commentCount}>{post.comments.length}</Text>
//         </View>

//         {/* 댓글 목록 */}
//         <FlatList
//           data={post.comments}
//           keyExtractor={(item) => item.id}
//           renderItem={renderComment}
//           style={styles.commentList}
//           scrollEnabled={false} // FlatList는 ScrollView 내부에서 스크롤되지 않도록 설정
//         />
//       </ScrollView>
//         <View style={styles.commentInputContainer}>
//         <TextInput
//           style={styles.commentInput}
//           placeholder={isReplying ? "답글을 입력해 보세요!" : "댓글을 입력해 보세요!"}
//           value={newComment}
//           onChangeText={setNewComment}
//         />
//           <TouchableOpacity style={styles.sendButton} onPress={handleSendComment}>
//             <SendIcon width={24} height={24} />
//           </TouchableOpacity>
//         </View>

//         {/* 결과 저장 모달 */}
//         <CustomModal
//           isVisible={isModalVisible}
//           onClose={handleModalClose}
//           headerText="삭제"
//           message="해당 게시글을 삭제하시겠습니까?"
//           cancel="취소"
//           confirm="확인"
//           onConfirm={handleConfirm}
//         />

//         {/* 최종 확인 모달 */}
//         <CustomModal
//           isVisible={isFinalModalVisible}
//           headerText="삭제"
//           message="해당 댓글이 삭제 되었어요!"
//           confirm="확인"
//           onConfirm={handleFinalModalClose}
//         />
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingTop: 34,
//   },
//   postContainer: {
//     backgroundColor: '#fff',
//     paddingHorizontal: 24,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   author: {
//     fontSize: 17,
//     fontWeight: 'bold',
//   },
//   date: {
//     fontSize: 14,
//     color: '#ADADAD',
//     marginLeft: 10,
//   },
//   commentCountContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 24,
//     borderBottomWidth: 1,
//     borderBottomColor: '#DDDDDD',
//     borderTopWidth: 1,
//     borderTopColor: '#DDDDDD',
//     paddingBottom: 8,
//     marginBottom: 20,
//     paddingTop: 9,
//   },
//   commentCount: {
//     fontSize: 14,
//     color: '#ADADAD',
//     marginLeft: 4,
//   },
//   tagContainer: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   tag: {
//     backgroundColor: '#FF8800',
//     borderRadius: 30,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     marginRight: 8,
//   },
//   tagText: {
//     color: '#fff',
//     fontSize: 10,
//   },
//   titleContainer: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#7D7C7C',
//     paddingBottom: 5,
//     marginBottom: 12,
//     paddingTop: 8,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   content: {
//     fontSize: 14,
//     lineHeight: 20,
//     marginBottom: 20,
//   },
//   postImage: {
//     width: '100%',
//     height: 180,
//     borderRadius: 12,
//     marginBottom: 25,
//   },
//   commentList: {
//     paddingHorizontal: 34,
//   },
//   commentContainer: {
//     marginBottom: 37,
//   },
//   replyContainer: {
//     marginTop: -18,
//     paddingRight: 26,
//   },
//   commentView: {
//     flexDirection: 'row',
//     marginBottom: 5,
//   },
//   commentContain: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '100%',
//   },
//   commentView2: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   commentView3: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   replyIcon: {
//     marginRight: 8,
//   },
//   replyContent: {
//     marginLeft: 26,
//   },
//   commentAuthor: {
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   commentDate: {
//     fontSize: 12,
//     color: '#ADADAD',
//     marginBottom: 4,
//   },
//   commentContent: {
//     fontSize: 14,
//     lineHeight: 20,
//   },
//   commentInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 24,
//     paddingVertical: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#EDEDED',
//   },
//   commentInput: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#EDEDED',
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     fontSize: 14,
//   },
//   sendButton: {
//     marginLeft: 10,
//   },
//   icon: {
//     marginLeft: 10,
//   },
// });

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView, KeyboardAvoidingView } from 'react-native';
import SendIcon from '../../assets/images/icons/SendIcon.svg'; 
import CommentIcon from '../../assets/images/icons/CommentIcon.svg'; 
import TrashIcon from '../../assets/images/icons/TrashIcon.svg'; 
import ReplyIcon from '../../assets/images/icons/ReplyIcon.svg'; 
import ChatCircle from '../../assets/images/icons/Chat_Circle.svg'; 
import CustomModal from '../../components/CustomModal'; 
import Dot3 from '../../assets/images/icons/Dot3.svg'; 
import DeleteButton from '../../assets/images/icons/DeleteButton.svg'; 
import authStore from '../../stores/authStore';

const initialPost = {
  title: '여드름 극복 후기!!',
  author: '정희연',
  date: '09.21 18:24',
  tags: ['#결정/종괴'],
  content: '저희집 강아지 피부에 빨개지며 여드름 진단을 받았습니다. 여러 치료 방법을 시도해봤는데 드디어 효과를 보았습니다!',
  image: 'https://blog.malcang.com/wp-content/uploads/2024/02/2-20.png',
  comments: [
    { id: '1', author: '김현우', date: '09.21 18:24', content: '헉, 플라스틱 그릇으로도 여드름이 발생할 수 있대요.', isReply: false, isMine: false },
    { id: '2', author: '정희연', date: '09.21 18:24', content: '플라스틱 그릇 쓰신다면 바꾸시는 게 좋아요!', isReply: true, isMine: true },
  ],
};

export default function PostDetailScreen() {
  const [post, setPost] = useState(initialPost);
  const [newComment, setNewComment] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  // 모달 상태와 타입 관리
  const [modalType, setModalType] = useState(null); // "comment" 또는 "post" 타입을 저장

  const handleDot3Click = () => {
    setShowDeleteButton(!showDeleteButton);
  };

  // 모달 열기 (삭제 확인 모달)
  const openModal = (type) => {
    setModalType(type);
  };

  // 모달 닫기
  const closeModal = () => {
    setModalType(null);
  };

  // 삭제 완료 모달을 위한 상태 및 함수
  const [isFinalModalVisible, setFinalModalVisible] = useState(false);

  const handleFinalModalClose = () => {
    setFinalModalVisible(false);
  };

  // 삭제 확인 모달의 확인 버튼 클릭
  const handleConfirm = () => {
    closeModal();
    setFinalModalVisible(true);
  };

  // // 현재 사용자가 작성한 글인지 확인
  const user = authStore((state) => state.user); // 현재 로그인한 사용자 정보 가져오기
  const isMyPost = user && post.author === user.username;; // 로그인한 사용자 이름과 게시물 작성자 비교

  const handleSendComment = () => {
    if (newComment.trim()) {
      const newCommentData = {
        id: `${post.comments.length + 1}`,
        author: '현재 사용자',
        date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString().slice(0, 5),
        content: newComment,
        isReply: !!replyTo,
        isMine: true,
      };
      
      setPost(prevPost => ({
        ...prevPost,
        comments: replyTo
          ? [
              ...prevPost.comments,
              { ...newCommentData, parentId: replyTo },
            ]
          : [...prevPost.comments, newCommentData],
      }));
      
      setNewComment('');
      setIsReplying(false);
      setReplyTo(null);
    }
  };
  
  const handleReply = (commentId) => {
    setIsReplying(true);
    setReplyTo(commentId);
  };
  
  const renderComment = ({ item }) => (
    <View style={[styles.commentContainer, item.isReply && styles.replyContainer]}>
      <View style={styles.commentView}>
        {item.isReply && <ReplyIcon style={styles.replyIcon} width={18} height={18} />}
        <View style={styles.commentContain}>
          <View style={styles.commentView2}>
            <Text style={styles.commentAuthor}>{item.author}</Text>
            <Text style={styles.commentDate}>  | {item.date}</Text>
          </View>
          <View style={styles.commentView3}>
            <TouchableOpacity onPress={() => handleReply(item.id)}>
              <CommentIcon style={styles.icon} width={18} height={18} />
            </TouchableOpacity>
            <TouchableOpacity onPress={item.isMine ? () => openModal("comment") : null}>
              {item.isMine && (
                <TrashIcon style={styles.icon} width={18} height={18} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Text style={[styles.commentContent, item.isReply && styles.replyContent]}>{item.content}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={92}>
      <ScrollView>
        {isMyPost && (
          <TouchableOpacity onPress={handleDot3Click} style={styles.dot3}>
            <Dot3 />
          </TouchableOpacity>
        )}
        
        <View style={styles.postContainer}>
          <View style={styles.header}>
            <Text style={styles.author}>{post.author}</Text>
            <Text style={styles.date}>| {post.date}</Text>
          </View>

          <View style={styles.tagContainer}>
            {post.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{post.title}</Text>
          </View>

          <Text style={styles.content}>{post.content}</Text>
          <Image source={{ uri: post.image }} style={styles.postImage} />
        </View>

        <View style={styles.commentCountContainer}>
          <ChatCircle width={18} height={18} />
          <Text style={styles.commentCount}>{post.comments.length}</Text>
        </View>

        <FlatList
          data={post.comments}
          keyExtractor={(item) => item.id}
          renderItem={renderComment}
          style={styles.commentList}
          scrollEnabled={false}
        />

        {isMyPost && showDeleteButton && (
          <TouchableOpacity style={styles.floatingButton} onPress={() => openModal("post")}>
            <DeleteButton />
          </TouchableOpacity>
        )}
      </ScrollView>
      
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder={isReplying ? "답글을 입력해 보세요!" : "댓글을 입력해 보세요!"}
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendComment}>
          <SendIcon width={24} height={24} />
        </TouchableOpacity>
      </View>

      {/* 삭제 확인 모달 */}
      <CustomModal
        isVisible={modalType === "comment" || modalType === "post"}
        onClose={closeModal}
        headerText="삭제"
        message={`해당 ${modalType === "comment" ? "댓글" : "게시글"}을 삭제하시겠습니까?`}
        cancel="취소"
        confirm="확인"
        onConfirm={handleConfirm}
      />

      {/* 삭제 완료 모달 */}
      <CustomModal
        isVisible={isFinalModalVisible}
        headerText="삭제"
        message={`해당 ${modalType === "comment" ? "댓글" : "게시글"}이 삭제되었습니다!`}
        confirm="확인"
        onConfirm={handleFinalModalClose}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 34,
  },
  postContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  author: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#ADADAD',
    marginLeft: 10,
  },
  commentCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
    paddingBottom: 8,
    marginBottom: 20,
    paddingTop: 9,
  },
  commentCount: {
    fontSize: 14,
    color: '#ADADAD',
    marginLeft: 4,
  },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tag: {
    backgroundColor: '#FF8800',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
  },
  tagText: {
    color: '#fff',
    fontSize: 10,
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#7D7C7C',
    paddingBottom: 5,
    marginBottom: 12,
    paddingTop: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  postImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 25,
  },
  commentList: {
    paddingHorizontal: 34,
  },
  commentContainer: {
    marginBottom: 37,
  },
  replyContainer: {
    marginTop: -18,
    paddingRight: 26,
  },
  commentView: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  commentContain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  commentView2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentView3: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyIcon: {
    marginRight: 8,
  },
  replyContent: {
    marginLeft: 26,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  commentDate: {
    fontSize: 12,
    color: '#ADADAD',
    marginBottom: 4,
  },
  commentContent: {
    fontSize: 14,
    lineHeight: 20,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EDEDED',
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#EDEDED',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 14,
  },
  sendButton: {
    marginLeft: 10,
  },
  icon: {
    marginLeft: 10,
  },
  dot3: {
    position: 'absolute',
    top: 6,
    right: 18,
    zIndex: 10,
  },
  floatingButton: {
    position: 'absolute',
    top: 41,
    right: 14,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});