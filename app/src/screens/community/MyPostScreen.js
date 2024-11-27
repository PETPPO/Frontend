import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import CommunityBox from '../../assets/images/icons/Community_Box.svg';
import ChatCircle from '../../assets/images/icons/Chat_Circle.svg';
import { fetchUserPosts } from '../../api/MypageApi'; 
import { useFocusEffect } from '@react-navigation/native';
import { getToken } from '../../utils/storage';

export default function MyPostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  const loadUserPosts = async () => {
    try {
      const token = await getToken(); 
      const response = await fetchUserPosts(token); 
      if (response.data.success && Array.isArray(response.data.posts)) {
        setPosts(response.data.posts);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error("내가 쓴 글 조회 오류:", error);
      setPosts([]);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadUserPosts();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.postList}>
        {posts.map((item) => (
          <View key={item.postId} style={styles.cardContainer}>
            <View style={styles.communityBoxWrapper}>
              <CommunityBox width={415} style={styles.communityBox}/>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('게시글 상세보기', { postId: item.postId })}>
                  <Text style={[styles.title, { maxWidth: 250 }]} numberOfLines={1} ellipsizeMode="tail">
                    {item.title}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.author}> | {item.userName}</Text>
              </View>
              <View style={styles.tagContainer}>
                <View style={styles.tagWrapper}>
                  <Text style={styles.tagText}>#{item.diseaseTag}</Text>
                </View>
              </View>
              <View style={[styles.contentWrapper, item.imagePath ? styles.contentWithImage : styles.contentWithoutImage]}>
                <View style={[
                  styles.textBox, 
                  { width: item.imagePath ? 205 : 305 },
                ]}>
                  <Text style={styles.content} numberOfLines={2} ellipsizeMode="tail">
                    {item.content}
                  </Text>
                </View>
                {item.imagePath && (
                  <Image source={{ uri: item.imagePath }} style={styles.postImage} />
                )}
              </View>
              <View style={styles.footer}>
                <View style={styles.contentBox}>
                  <ChatCircle />
                  <Text style={styles.comments}> {item.commentCount || 0}</Text>
                </View>
                <Text style={styles.date}>{new Date(item.postDate).toLocaleDateString()}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  postList: {
    padding: 16,
  },
  cardContainer: {
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 5,
    padding: 12,
    marginLeft: -11.5,
  },
  communityBoxWrapper: {
    position: 'relative',
  },
  communityBox: {
    position: 'absolute',
    top: 0,
    left: -28,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  cardContent: {
    padding: 27,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  author: {
    color: '#636366',
    fontSize: 11,
  },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    marginTop: -3,
  },
  tagWrapper: { 
    backgroundColor: '#FF8800',
    borderRadius: 30, 
    paddingHorizontal: 7.5,
    paddingVertical: 4,
    marginRight: 8,
  },
  tagText: {  
    color: '#fff',
    fontSize: 10,
  },
  contentWrapper: {
    marginTop: -2, 
  },
  contentWithImage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentWithoutImage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBox: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 10,
    maxHeight: 47,
    minHeight: 47, 
  },
  content: {
    color: '#333',
    fontSize: 11,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingTop: 5,
  },
  contentBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  comments: {
    color: '#3A3A3C',
    fontSize: 9,
  },
  date: {
    color: '#ADADAD',
    fontSize: 9,
  },
  postImage: {
    width: 84,
    height: 55,
    borderRadius: 12,
    marginLeft: 15,
    marginTop: -8,
  },
});