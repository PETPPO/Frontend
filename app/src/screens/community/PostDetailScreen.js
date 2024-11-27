import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import SendIcon from '../../assets/images/icons/SendIcon.svg';
import CommentIcon from '../../assets/images/icons/CommentIcon.svg';
import TrashIcon from '../../assets/images/icons/TrashIcon.svg';
import ReplyIcon from '../../assets/images/icons/ReplyIcon.svg';
import ChatCircle from '../../assets/images/icons/Chat_Circle.svg';
import CustomModal from '../../components/CustomModal';
import Dot3 from '../../assets/images/icons/Dot3.svg';
import DeleteButton from '../../assets/images/icons/DeleteButton.svg';
import authStore from '../../stores/authStore';
import { fetchPostDetails, createComment, createReply, deleteComment, deleteReply, deletePostDetails } from '../../api/communityApi';
import { getToken } from '../../utils/storage';

export default function PostDetailScreen({ route, navigation }) {
  const { postId } = route.params;
  // const [postDetails, setPostDetails] = useState({ comments: [] });
  const [postDetails, setPostDetails] = useState({ commentCount: 0, comments: [] });
  const [newComment, setNewComment] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [parentId, setParentId] = useState(null);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState(null);
  const [isFinalModalVisible, setFinalModalVisible] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [comments, setComments] = useState([]);
  const [isMyPost, setIsMyPost] = useState(false); 
  const user = authStore((state) => state.user);
  const [finalModalType, setFinalModalType] = useState(null); 
  const MemoizedImage = React.memo(({ uri }) => (
    <Image source={{ uri }} style={styles.postImage} />
  ));
  
  
  
  useEffect(() => {
    const loadPostDetails = async () => {
      try {
        const token = await getToken();
        const response = await fetchPostDetails(postId, token);
        
        if (response.data.success) {

          // setPostDetails({
          //   ...response.data.postDetail,
          //   comments: response.data.comments,
          //   login_userId: response.data.login_userId,
          // });
          // setComments(response.data.comments); 

          setPostDetails({
            ...response.data.postDetail,
            commentCount: response.data.postDetail.commentCount, // 댓글 수 저장
            comments: response.data.comments, // 댓글 배열
            login_userId: response.data.login_userId,
          });
          
          setComments(response.data.comments);
          setPostDetails((prevDetails) => ({
            ...prevDetails,
          }));


          
          setIsMyPost(response.data.login_userId === response.data.postDetail.postUserId);
        } else {
          console.error("게시글 상세 정보를 불러오지 못했습니다.");
        }
      } catch (error) {
        console.error("게시글 상세 조회 오류:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadPostDetails();
  }, [postId, user]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month}.${day} ${hours}:${minutes}`;
  };

  const handleDot3Click = () => setShowDeleteButton(!showDeleteButton);

  const openModal = (type, commentId) => {
    setModalType(type);
    setSelectedCommentId(commentId);
  };

  const handleConfirm = async () => {
    setFinalModalType(modalType); 
    setModalType(null); 
  
    try {
      if (modalType === "comment") {
        await handleDeleteComment(selectedCommentId);
      } else if (modalType === "reply") {
        await handleDeleteReply(selectedCommentId);
      } else if (modalType === "post") {
        await handleDeletePost();
      }
  
      await refreshComments();
  
      setNewComment('');
      setIsReplying(false);
      setParentId(null);
  
      setFinalModalVisible(true);
    } catch (error) {
      console.error("확인 처리 중 오류:", error);
    }
  };

  const closeModal = () => setModalType(null); 

  const handleFinalModalClose = () => setFinalModalVisible(false); 

  const handleCreateCommentOrReply = async () => {
    const token = await getToken();
    const commentData = {
      userID: user?.id,
      commentContent: newComment.trim(),
    };
  
    if (!commentData.commentContent) {
      console.warn("댓글 내용을 입력해주세요.");
      return;
    }
  
    try {
      let response;
      if (isReplying && parentId) {
        response = await createReply(parentId, commentData, token);
      } else {
        response = await createComment(postId, commentData, token);
      }
      await refreshComments();
      setNewComment('');
      setIsReplying(false);
      setParentId(null);
    } catch (error) {
      console.error(`${isReplying ? '답글' : '댓글'} 작성 실패:`, error);
    }
  };

  const refreshComments = async () => {
    try {
      const token = await getToken();
      const response = await fetchPostDetails(postId, token);
      if (response.data.success) {
        setComments(response.data.comments);
        setPostDetails((prevDetails) => ({
          ...prevDetails,
          commentCount: response.data.postDetail.commentCount, 
        }));
      } else {
        console.error("댓글 목록을 불러오지 못했습니다.");
      }
    } catch (error) {
      console.error("댓글 목록 조회 실패:", error);
    }
  };
  
  
  const handleDeleteComment = async (commentId) => {
    const token = await getToken();
    try {
      const result = await deleteComment(commentId, token);
      if (result.success) {
        setComments(comments.filter((comment) => comment.id !== commentId));
        setPostDetails((prevDetails) => ({
          ...prevDetails,
          commentCount: prevDetails.commentCount - 1, // 댓글 수 감소
        }));
      }
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
    }
  };
  

  const handleDeleteReply = async (replyId) => {
    const token = await getToken();
    try {
      const result = await deleteReply(replyId, token);
      if (result.success) {
        setComments(comments.filter((comment) => comment.id !== replyId));
        setPostDetails((prevDetails) => ({
          ...prevDetails,
          commentCount: prevDetails.commentCount - 1, // 댓글 수 감소
        }));
      }
    } catch (error) {
      console.error('답글 삭제 실패:', error);
    }
  };
  

  const handleReply = (parentId) => {
    console.log("Reply 버튼 클릭, parentId:", parentId);
    setIsReplying(true);
    setParentId(parentId);
  };

  const handleDeletePost = async () => {
    try {
      const token = await getToken();
      const response = await deletePostDetails(postId, token);
      if (response.success) {
        navigation.goBack(); 
      } else {
        console.error("게시글 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("게시글 삭제 오류:", error);
    }
  };

  const renderHeader = () => (
    <View>
      <View style={styles.postContainer}>
        {isMyPost && (
          <TouchableOpacity onPress={handleDot3Click} style={styles.dot3}>
            <Dot3 />
          </TouchableOpacity>
        )}
        {isMyPost && showDeleteButton && (
          <TouchableOpacity style={styles.floatingButton} onPress={() => openModal("post")}>
            <DeleteButton />
          </TouchableOpacity>
        )}
  
        <View style={styles.header}>
          <Text style={styles.author}>{postDetails.userName}</Text>
          <Text style={styles.date}>| {formatDate(postDetails.createdAt)}</Text>
        </View>
        <View style={styles.tagContainer}>
          <View style={styles.tag}>
            <Text style={styles.tagText}># {postDetails.diseaseTag}</Text>
          </View>            
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{postDetails.title}</Text>
        </View>
        <Text style={styles.content}>{postDetails.content}</Text>
        {/* {postDetails.imagePath && (
          <Image source={{ uri: postDetails.imagePath }} style={styles.postImage} />
        )} */}
        {postDetails.imagePath && <MemoizedImage uri={postDetails.imagePath} />}
      </View>
      <View style={styles.commentCountContainer}>
        <ChatCircle width={18} height={18} />
        <Text style={styles.commentCount}>
          {postDetails.commentCount || 0} {/* 총 댓글 수 표시 */}
        </Text>
      </View>
    </View>
  );
  

  const renderComment = ({ item }) => {
    const isMine = item.commentUserId === postDetails.login_userId;
  
    return (
      <View>
        <View style={styles.commentContainer}>
          <View style={styles.commentView}>
            <View style={styles.commentContain}>
              <View style={styles.commentView2}>
                <Text style={styles.commentAuthor}>{item.commentUserName}</Text>
                <Text style={styles.commentDate}> | {formatDate(item.createdAt)}</Text>
              </View>
              <View style={styles.commentView3}>
                <TouchableOpacity onPress={() => handleReply(item.commentId)}>
                  <CommentIcon style={styles.icon} width={18} height={18} />
                </TouchableOpacity>
                {isMine && (
                  <TouchableOpacity onPress={() => openModal("comment", item.commentId)}>
                    <TrashIcon style={styles.icon} width={18} height={18} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
          <Text style={styles.commentContent}>{item.commentContent}</Text>
        </View>
        {item.replies && item.replies.map((reply) => renderReply(reply))}
      </View>
    );
  };

  const renderReply = (reply) => {
    const isMine = reply.commentUserId === postDetails.login_userId;
    return (
      <View style={styles.replyContainerrr}>
      <View key={reply.commentId} style={styles.replyContainer}>
        <View style={styles.commentView}>
          <ReplyIcon style={styles.replyIcon} width={18} height={18} />
          <View style={styles.commentContain}>
            <View style={styles.commentView2}>
              <Text style={styles.commentAuthor}>{reply.commentUserName}</Text>
              <Text style={styles.commentDate}> | {formatDate(reply.createdAt)}</Text>
            </View>
            <View style={styles.commentView3}>
              {isMine && (
                <TouchableOpacity onPress={() => openModal("reply", reply.commentId)}>
                  <TrashIcon style={styles.icon} width={18} height={18} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <Text style={styles.commentContent}>{reply.commentContent}</Text>
      </View>
      </View>
    );
  };


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={92}>
      {/* <FlatList
        data={comments.filter((comment) => comment.parentId === null)}
        keyExtractor={(item) => item.commentId.toString()}
        renderItem={renderComment}
        ListHeaderComponent={renderHeader}
        extraData={comments}
      /> */}
      <FlatList
  data={comments.filter((comment) => comment.parentId === null)}
  keyExtractor={(item) => item.commentId.toString()} // 고유 ID
  renderItem={renderComment}
  ListHeaderComponent={renderHeader}
  extraData={comments} // 필요한 경우 상태를 전달
/>

      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder={isReplying ? "답글을 입력해 보세요!" : "댓글을 입력해 보세요!"}
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleCreateCommentOrReply}>
        <SendIcon width={24} height={24} />
        </TouchableOpacity>
      </View>

      {/* 삭제 확인 모달 */}
      <CustomModal
        isVisible={modalType === "comment"}
        onClose={closeModal}
        headerText="삭제"
        message="해당 댓글을 삭제하시겠습니까?"
        cancel="취소"
        confirm="확인"
        onConfirm={handleConfirm}
      />

      <CustomModal
        isVisible={modalType === "reply"}
        onClose={closeModal}
        headerText="삭제"
        message="해당 답글을 삭제하시겠습니까?"
        cancel="취소"
        confirm="확인"
        onConfirm={handleConfirm}
      />

      <CustomModal
        isVisible={modalType === "post"}
        onClose={closeModal}
        headerText="삭제"
        message="해당 게시글을 삭제하시겠습니까?"
        cancel="취소"
        confirm="확인"
        onConfirm={handleDeletePost}
      />

      
      {/* 삭제 완료 모달 */}
      <CustomModal
        isVisible={isFinalModalVisible && finalModalType === "comment"}
        onClose={handleFinalModalClose}
        headerText="삭제 완료"
        message="해당 댓글이 삭제되었습니다!"
        confirm="확인"
        onConfirm={handleFinalModalClose}
      />

      <CustomModal
        isVisible={isFinalModalVisible && finalModalType === "reply"}
        onClose={handleFinalModalClose}
        headerText="삭제 완료"
        message="해당 답글이 삭제되었습니다!"
        confirm="확인"
        onConfirm={handleFinalModalClose}
      />

      <CustomModal
        isVisible={isFinalModalVisible && finalModalType === "post"}
        onClose={handleFinalModalClose}
        headerText="삭제 완료"
        message="해당 게시글이 삭제되었습니다!"
        confirm="확인"
        onConfirm={handleFinalModalClose}
      />
    </KeyboardAvoidingView>
  );
}




const styles = StyleSheet.create({
  replyContainerrr: {
    paddingHorizontal: 34,
  },
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
    marginTop: 10,
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
    paddingHorizontal: 34,

  },
  replyContainer: {
    marginTop: -14,
    paddingRight: 26, 
    marginBottom: 25,
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
    color: '#555', 
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
    zIndex: 10, 
  },
});