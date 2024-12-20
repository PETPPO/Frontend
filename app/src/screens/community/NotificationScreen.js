import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notification from '../../assets/images/icons/Notification.svg';
import { fetchAlarms, readAlarms } from '../../api/communityApi'; 
import { getToken } from '../../utils/storage';

export default function NotificationScreen({ navigation }) {
  const [notifications, setNotifications] = useState([]);
  const loadNotifications = async () => {
    try {
      const token = await getToken();
      const response = await fetchAlarms(token);
      if (response.data && Array.isArray(response.data.alarms)) {
        const alarms = response.data.alarms;
        const readStatus = await AsyncStorage.getItem('readAlarms');
        const readAlarms = readStatus ? JSON.parse(readStatus) : {};
        const updatedAlarms = alarms.map(alarm => ({
          ...alarm,
          isRead: readAlarms[alarm.alarmId] || alarm.isRead || false,
        }));

        setNotifications(updatedAlarms);
      }
    } catch (error) {
      console.error('알림 조회 오류:', error);
    }
  };

  const handleNotificationPress = async (alarmId) => {
    try {
      const token = await getToken();
      const response = await readAlarms(alarmId, token);

      if (response.data.success) {
        const postId = response.data.postId;

        setNotifications((prev) =>
          prev.map((notif) =>
            notif.alarmId === alarmId ? { ...notif, isRead: true } : notif
          )
        );

        const readStatus = await AsyncStorage.getItem('readAlarms');
        const readAlarms = readStatus ? JSON.parse(readStatus) : {};
        readAlarms[alarmId] = true;
        await AsyncStorage.setItem('readAlarms', JSON.stringify(readAlarms));

        navigation.navigate('게시글 상세보기', { postId });
      }
    } catch (error) {
      console.error('알림 읽음 처리 오류:', error);
    }
  };

  useEffect(() => {
    loadNotifications(); 
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month}.${day} ${hours}:${minutes}`;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationItem, !item.isRead && styles.unreadNotification]}
      onPress={() => handleNotificationPress(item.alarmId)}
    >
      <Notification style={styles.profileImage} />
      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.commentText} numberOfLines={1} ellipsizeMode="tail">
            {item.parentId === null ? '새로운 댓글이 달렸습니다!' : '새로운 답글이 달렸습니다:)'}
          </Text>
          <Text style={styles.postTitle} numberOfLines={1} ellipsizeMode="tail">
            {item.title}   
          </Text>
        </View>
        <Text style={styles.timeText}>{formatDate(item.commentDate)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList 
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item, index) => (item.alarmId ? item.alarmId.toString() : index.toString())}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    paddingTop: 10, 
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
