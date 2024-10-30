// import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
// import CommunityBox from '../../assets/images/icons/Community_Box.svg'; 
// import ChatCircle from '../../assets/images/icons/Chat_Circle.svg'; 

// // 더미 데이터
// const posts = [
//   {
//     id: '1',
//     title: '여드름 극복 후기!!',
//     author: '정희연',
//     date: '2024.05.07',
//     tags: ['#결정/종괴'],
//     content: '저희집 강아지 피부에 빨개지며 여드름 진단...',
//     comments: 10,
//     image: 'https://blog.malcang.com/wp-content/uploads/2024/02/2-20.png',
//   },
//   {
//     id: '2',
//     title: '여드름 극복 후기!!',
//     author: '정희연',
//     date: '2024.05.07',
//     tags:  ['#결정/종괴'],
//     content: '저희집 강아지 피부에 빨개지며 여드름 진단 받았습니다. 저희집 강아지 피부에 빨개지며 여드름 진단 받았습니다. 저희집 강아지 피부에 빨개지며 여드름 진단 받았습니다. ',
//     comments: 10,
//     image: 'https://example.com/image1.jpg',
//   },
//   {
//     id: '3',
//     title: '여드름 극복 후기!!',
//     author: '정희연',
//     date: '2024.05.07',
//     tags:  ['#결정/종괴'],
//     content: '저희집 강아지 피부에 빨개지며 여드름 진단 받았습니다. 저희집 강아지 피부에 빨개지며 여드름 진단 받았습니다. 저희집 강아지 피부에 빨개지며 여드름 진단 받았습니다. ',
//     comments: 10,
//     image: 'https://example.com/image1.jpg',
//   },
// ];

// export default function CommunityScreen({ navigation }) {

//   // 게시물 렌더링 함수
//   const renderPost = ({ item }) => (
//     <View style={styles.cardContainer}>
//       <View style={styles.communityBoxWrapper}>
//         <CommunityBox width={415} style={styles.communityBox}/>
//       {/* </View> */}
//       <View style={styles.cardContent}>
//         <View style={styles.header}>
//           <Text style={styles.title}>{item.title}</Text>
//           <Text style={styles.author}>  |  {item.author}</Text>
//         </View>
//         <View style={styles.tagContainer}>
//           {item.tags.map((tag, index) => (
//             <View key={index} style={styles.tagWrapper}>  
//               <Text style={styles.tagText}>{tag}</Text>  
//             </View>
//           ))}
//         </View>
//         <View style={styles.textBox}>
//           <Text style={styles.content}>{item.content}</Text>
//         </View>
//         <View style={styles.footer}>
//           <View style={styles.contentBox}>
//             <View>
//               <ChatCircle />
//             </View>
//             <Text style={styles.comments}> {item.comments}</Text>
//           </View>
//           <Image source={{ uri: item.image }} style={styles.postImage} />
//           <Text style={styles.date}>{item.date}</Text>
//         </View>
//       </View>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={posts}
//         keyExtractor={(item) => item.id}
//         renderItem={renderPost}
//         contentContainerStyle={styles.postList}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   postList: {
//     padding: 16,
//   },
//   cardContainer: {
//     backgroundColor: '#fff',
//     marginBottom: -17,
//   },
//   communityBoxWrapper: {
//     position: 'relative',
//   },
//   communityBox: {
//     position: 'absolute',
//     top: 0,
//     left: -28,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 4,
//   },
//   cardContent: {
//     padding: 27,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   title: {
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   author: {
//     color: '#636366',
//     fontSize: 11,
//     paddingRight: 158,
//   },
//   tagContainer: {
//     flexDirection: 'row',
//     marginBottom: 8,
//   },
//   tagWrapper: { 
//     backgroundColor: '#FF8800',
//     borderRadius: 30, 
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     marginRight: 8,
//   },
//   tagText: {  
//     color: '#fff',
//     fontSize: 10,
//   },
//   textBox: {
//     backgroundColor: '#F8F9FA',
//     borderRadius: 12,
//     paddingHorizontal: 8,
//     paddingVertical: 12,
//     maxHeight: 37,
//   },
//   content: {
//     color: '#333',
//     fontSize: 11,
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 5,
//     paddingTop: 10,
//     paddingBottom: 0,
//   },
//   contentBox: {
//     flexDirection: 'row', 
//   },
//   comments: {
//     color: '#3A3A3C',
//     fontSize: 10,
//   },
//   date: {
//     color: '#ADADAD',
//     fontSize: 10,
//   },
//   postImage: {
//     width: 84,
//     height: 55.3,
//     borderRadius: 12,
//   },
// });

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import CommunityBox from '../../assets/images/icons/Community_Box.svg'; 
import ChatCircle from '../../assets/images/icons/Chat_Circle.svg'; 

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
    content: '저희집 강아지 피부에 빨개지며 여드름 진단 받았습니다...',
    comments: 10,
    image: '', // 이미지가 없는 경우
  },
  {
    id: '3',
    title: '여드름 극복 후기!!',
    author: '정희연',
    date: '2024.05.07',
    tags:  ['# 결정/종괴'],
    content: '저희집 강아지 피부에 빨개지며 여드름 진단 받았습니다...',
    comments: 10,
    image: '', // 이미지가 없는 경우
  },
  {
    id: '4',
    title: '여드름 극복 후기!!',
    author: '정희연',
    date: '2024.05.07',
    tags:  ['# 결정/종괴'],
    content: '저희집 강아지 피부에 빨개지며 여드름 진단 받았습니다...',
    comments: 10,
    image: '', // 이미지가 없는 경우
  },
];

export default function MyPostsScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.postList}>
        {posts.map((item) => (
          <View key={item.id} style={styles.cardContainer}>
            <View style={styles.communityBoxWrapper}>
              <CommunityBox width={398} style={styles.communityBox}/>
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
  postList: {
    padding: 16,
  },
  cardContainer: {
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    paddingBottom: 28,
    padding: 12,
    marginLeft: -4,
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
});

