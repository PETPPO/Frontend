import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Notification from '../../assets/images/icons/Notification.svg';

export default function NotificationScreen({ navigation }) {
  // 알림 더미 데이터
  const [notifications, setNotifications] = useState([
    { id: 1, user: 'User1', comment: '새로운 댓글이 달렸어요!', time: '09.21 18:24', read: false, postTitle: '게시글 제목 1', },
    { id: 2, user: 'User2', comment: '새로운 답글이 달렸어요 :)', time: '09.21 9:14', read: true, postTitle: '게시글 제목 2', },
    { id: 3, user: 'User3', comment: '새로운 답글이 달렸어요 :)', time: '09.21 16:33', read: true, postTitle: '게시글 제목 3', },
    { id: 3, user: 'User3', comment: '새로운 답글이 달렸어요 :)', time: '09.21 16:33', read: true, postTitle: '게시글 제목 3', },
    { id: 3, user: 'User3', comment: '새로운 답글이 달렸어요 :)', time: '09.21 16:33', read: true, postTitle: '게시글 제목 3', },
    { id: 3, user: 'User3', comment: '새로운 답글이 달렸어요 :)', time: '09.21 16:33', read: true, postTitle: '게시글 제목 3', },
    { id: 3, user: 'User3', comment: '새로운 답글이 달렸어요 :)', time: '09.21 16:33', read: true, postTitle: '게시글 제목 3', },
    { id: 3, user: 'User3', comment: '새로운 답글이 달렸어요 :)', time: '09.21 16:33', read: true, postTitle: '게시글 제목 3', },
  ]);

  // 알림 클릭 시 읽음 처리
  const handleNotificationPress = (id) => {
    // 읽음 상태 변경
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    // 해당 게시물 페이지로 이동 (예시)
    navigation.navigate('PostDetail', { postId: id });  // 나중에 네비 한글명으로 변경해주기!
  };

  // 알림 아이템 렌더링
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.notificationItem, !item.read && styles.unreadNotification]} 
      onPress={() => handleNotificationPress(item.id)}
    >
      <Notification style={styles.profileImage} />
      <View style={styles.textContainer}>
        <Text style={styles.commentText} numberOfLines={1} ellipsizeMode="tail">
          {item.comment}
        </Text>
        <Text style={styles.postTitle} numberOfLines={1} ellipsizeMode="tail">
          {item.postTitle}
        </Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList 
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  unreadNotification: {
    backgroundColor: '#F0F8FF',
  },
  profileImage: {
    borderRadius: 20,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  commentText: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  postTitle: {
    fontSize: 13,
    color: '#333',
    marginBottom: 2,
  },
  timeText: {
    fontSize: 11,
    color: '#A5A5A5',
    textAlign: 'right',
  },
});
