import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import CommunityBox from '../../assets/images/icons/Community_Box.svg'; 
import ChatCircle from '../../assets/images/icons/Chat_Circle.svg'; 
import Dot3 from '../../assets/images/icons/Dot3.svg'; 
import WriteButton from '../../assets/images/icons/WriteButton.svg'; 

const posts = [
  {
    id: '1',
    title: '여드름 극복 후기!!',
    author: '정희연',
    date: '2024.05.07',
    tags: ['# 기타'],
    content: '저희집 강아지 피부에 빨개지며 여드름 진단...',
    comments: 10,
    image: 'https://blog.malcang.com/wp-content/uploads/2024/02/2-20.png',
  },
  {
    id: '2',
    title: '여드름 극복 후기!!',
    author: '정희연',
    date: '2024.05.07',
    tags:  ['# 결정/종괴'],
    content: '저희집 강아지 피부에 빨개지며 여드름 진단 받았습니다. 저희집 강아지 피부에 빨개지며 여드름 진단 받았습니다. 저희집 강아지 피부에 빨개지며 여드름 진단 받았습니다.',
    comments: 10,
    image: '', // 이미지가 없는 경우
  },
  {
    id: '3',
    title: '여드름 극복 후기!!',
    author: '정희연',
    date: '2024.05.07',
    tags:  ['# 결정/종괴'],
    content: '저희집 강아지 피부에 빨개지며 여드름 진단 받았습니다. 저희집 강아지 피부에 빨개지며 여드름 진단 받았습니다. 저희집 강아지 피부에 빨개지며 여드름 진단 받았습니다.',
    comments: 10,
    image: '', // 이미지가 없는 경우
  },
  {
    id: '4',
    title: '여드름 극복 후기!!',
    author: '정희연',
    date: '2024.05.07',
    tags:  ['# 결정/종괴'],
    content: '저희집 강아지 피부에 빨개지며 여드름 진단 받았습니다. 저희집 강아지 피부에 빨개지며 여드름 진단 받았습니다. 저희집 강아지 피부에 빨개지며 여드름 진단 받았습니다.',
    comments: 10,
    image: '', // 이미지가 없는 경우
  },
];

const hashtags = [
  '# 미란/계양', '# 결정/종괴', '# 농포/여드름', '# 구진/플라크', 
  '# 태선화/과다색소침착', '# 비듬/각질/상피성잔고리', '# 기타'
];


export default function CommunityScreen({ navigation }) {
  // const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState(['# 미란/계양']); // 초기 선택된 해시태그 설정
  const [showWriteButton, setShowWriteButton] = useState(false);

  const filteredPosts = selectedTags.length > 0 
    ? posts.filter(post => post.tags.some(tag => selectedTags.includes(tag)))
    : posts; // 선택된 태그가 없으면 모든 게시물 표시

  const handleHashtagClick = (hashtag) => {
    if (selectedTags.includes(hashtag)) {
      setSelectedTags([]); // 선택된 해시태그 클릭 시 전체 해제
    } else {
      setSelectedTags([hashtag]); // 새로운 해시태그 선택
    }
  };

  const handleDot3Click = () => {
    setShowWriteButton(!showWriteButton);
  };

  useEffect(() => {
    console.log('showWriteButton:', showWriteButton);
  }, [showWriteButton]);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={handleDot3Click} style={styles.dot3}>
        <Dot3 />
      </TouchableOpacity>

      <View style={styles.hashtagContainer}>
        <View style={styles.hashtagRow}>
          {hashtags.slice(0, 4).map((hashtag) => (
            <TouchableOpacity
              key={hashtag}
              style={[
                styles.hashtag,
                selectedTags.includes(hashtag) && styles.selectedHashtag,  
              ]}
              onPress={() => handleHashtagClick(hashtag)}  
            >
              <Text style={[
                styles.hashtagText,
                selectedTags.includes(hashtag) && styles.selectedHashtagText,  
              ]}>
                {hashtag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.hashtagRow}>
          {hashtags.slice(4).map((hashtag) => (
            <TouchableOpacity
              key={hashtag}
              style={[
                styles.hashtag,
                selectedTags.includes(hashtag) && styles.selectedHashtag,  
              ]}
              onPress={() => handleHashtagClick(hashtag)}  
            >
              <Text style={[
                styles.hashtagText,
                selectedTags.includes(hashtag) && styles.selectedHashtagText,  
              ]}>
                {hashtag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.postList}>
        {/* {posts.map((item) => ( */}
        {filteredPosts.map((item) => (
          <View key={item.id} style={styles.cardContainer}>
            <View style={styles.communityBoxWrapper}>
              {/* <CommunityBox width={393} style={styles.communityBox}/> */}
              <CommunityBox width={415} style={styles.communityBox}/>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('게시글 상세보기', { postId: item.id })}>
                  <Text style={styles.title}>{item.title}</Text>
                </TouchableOpacity>
                <Text style={styles.author}>  |  {item.author}</Text>
              </View>
              <View style={styles.tagContainer}>
                {item.tags.map((tag, index) => (
                  <View key={index} style={styles.tagWrapper}>  
                    <Text style={styles.tagText}>{tag}</Text>  
                  </View>
                ))}
              </View>

              <View style={[styles.contentWrapper, item.image ? styles.contentWithImage : styles.contentWithoutImage]}>
                <View style={[
                  styles.textBox, 
                  { width: item.image ? 205 : 305 }
                ]}>
                  <Text style={styles.content} numberOfLines={2} ellipsizeMode="tail">
                    {item.content}
                  </Text>
                </View>

                {item.image && (
                  <Image source={{ uri: item.image }} style={styles.postImage} />
                )}
              </View>

              <View style={styles.footer}>
                <View style={styles.contentBox}>
                  <ChatCircle />
                  <Text style={styles.comments}> {item.comments}</Text>
                </View>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
      {showWriteButton && (
        <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('게시글 작성하기')} >
          <WriteButton />
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentWrapper: {
    marginTop: -2, 
  },
  contentWithImage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentWithoutImage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hashtagContainer: {
    paddingTop: 35,
    paddingHorizontal: 24,
  },
  hashtagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dot3: {
    position: 'absolute',
    top: 15,
    right: 12,
    zIndex: 10,
  },
  hashtag: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF8800',
    paddingVertical: 7.5,
    paddingHorizontal: 7.4,
    marginRight: 10,
    marginBottom: 12,
  },
  hashtagText: {
    color: '#FF8800', 
    fontSize: 12,
  },
  selectedHashtag: {
    backgroundColor: '#FF8800',  
  },
  selectedHashtagText: {
    color: '#fff',  
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
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
  },
  tagText: {  
    color: '#fff',
    fontSize: 10,
  },
  textBox: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 10,
    maxHeight: 47,
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
    marginLeft: 10, // 텍스트와 이미지 사이 간격 조정
    marginTop: -8,
  },
  hiddenImage: {
    opacity: 0, // 이미지가 없는 경우 공간만 차지하게 설정
  },
  floatingButton: {
    position: 'absolute',
    top: 52,
    right: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});
