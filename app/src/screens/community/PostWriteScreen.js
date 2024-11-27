import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert, TouchableHighlight } from 'react-native';
import ArrowDown from '../../assets/images/icons/ArrowDown.svg'; 
import HeaderText from '../../components/HeaderText';
import Line from '../../assets/images/icons/Line.svg';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { createPost } from '../../api/communityApi'; 
import { getToken } from '../../utils/storage'; 

// const tags = ['# 미란/계양', '# 결정/중괴', '# 농포/여드름', '# 구진/플라크', '# 태선화/과다색소침착', '# 비듬/각질/상피성잔고리', '# 기타'];
const tags = ['미란/궤양', '결정/종괴', '농포/여드름', '구진/플라크', '태선화/과다색소침착', '비듬/각질/상피성잔고리', '기타'];
export default function CreatePostScreen({ navigation }) {
  const [highlightedTag, setHighlightedTag] = useState(''); 
  const [selectedTag, setSelectedTag] = useState(''); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const [title, setTitle] = useState(''); 
  const [content, setContent] = useState(''); 
  const [imageUri, setImageUri] = useState(null); 

  const isButtonEnabled = title && content && selectedTag;

  const handleImagePicker = () => {
    Alert.alert(
      "사진 업로드",
      "이미지를 추가할 방법을 선택하세요.",
      [
        { text: "카메라로 촬영하기", onPress: openCamera },
        { text: "앨범에서 선택하기", onPress: openGallery },
        { text: "취소", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const openCamera = () => {
    launchCamera({ mediaType: 'photo', cameraType: 'back' }, (response) => {
      if (!response.didCancel && !response.errorCode) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && !response.errorCode) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = async () => {
    try {
      const token = await getToken(); 
    
      if (!token) {
        throw new Error('No authentication token found');
      }
    
      const formData = new FormData(); 
      formData.append('title', title); 
      formData.append('content', content); 
      formData.append('diseaseTag', selectedTag); 
      // formData.append('imagePath', {
      //   uri: imageUri,
      //   type: 'image/jpeg',
      //   name: 'upload_image.jpg',
      // });
      // 이미지가 있는 경우에만 imagePath를 추가
    if (imageUri) {
      formData.append('imagePath', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'upload_image.jpg',
      });
    }
      formData.append('commentContent', ''); // 빈 문자열로 설정
  
      const response = await createPost(formData, token);
      console.log('API Response:', response.data); // 응답 데이터 로그 출력
      if (response.data.success) {
        Alert.alert('성공', '게시글이 작성되었습니다.');
        navigation.navigate('커뮤니티');
      } else {
        Alert.alert('실패', response.data.message || '게시글 작성에 실패했습니다.');
      }
    } catch (error) {
      console.error('게시글 작성 오류:', error);
      Alert.alert('에러', '게시글 작성 중 오류가 발생했습니다.');
    }
  };
  
    const handleTagSelect = (tag) => {
    setSelectedTag(tag);
    setIsDropdownOpen(false); // 태그 선택 후 드롭다운 닫기
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderText mainText={"우리 아이의 피부 고민,\n함께 나누고 해결해요!"} />
      <Line style={styles.line} />
      <View style={styles.textBox}>
        <View style={styles.tagSection}>
          <Text style={styles.label}>태그</Text>
          <TouchableOpacity style={styles.dropdown} onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
            <Text style={styles.dropdownText}>{selectedTag || '질환 태그를 선택해 주세요.'}</Text>
            <ArrowDown height={20} />
          </TouchableOpacity>
          {isDropdownOpen && (
            <View style={styles.tagDropdown}>
             {tags.map((tag, index) => (
                <TouchableHighlight 
                  key={tag} 
                  style={[
                    styles.tagItem, 
                    index === 0 && styles.firstTagItem,       
                    index === tags.length - 1 && styles.lastTagItem, 
                    highlightedTag === tag && { backgroundColor: '#FFF7F2' },
                    selectedTag === tag && { backgroundColor: '#FFF7F2' }
                  ]} 
                  onPress={() => handleTagSelect(tag)} 
                  underlayColor="#FFF7F2"
                  onShowUnderlay={() => setHighlightedTag(tag)}
                  onHideUnderlay={() => setHighlightedTag('')}
                >
                  <Text style={[
                    styles.tagText,
                    highlightedTag === tag && { color: '#FC7E2F' },
                    selectedTag === tag && { color: '#FC7E2F' }
                  ]}>
                    {tag}
                  </Text>
                </TouchableHighlight>
              ))}
            </View>
          )}
        </View>
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.label}>제목</Text>
        <TextInput
          style={styles.input}
          placeholder="제목을 입력해 주세요."
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.label}>내용</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="내용을 입력해 주세요."
          value={content}
          onChangeText={setContent}
          multiline
        />
      </View>

      <View style={styles.imageSection}>
        <Text style={styles.imageInfo}>이미지는 1개만 첨부할 수 있어요.</Text>
        <TouchableOpacity style={styles.imageUpload} onPress={handleImagePicker}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <Text style={styles.plusIcon}>+</Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.submitButton, isButtonEnabled ? styles.activeButton : styles.inactiveButton]}
        disabled={!isButtonEnabled}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>작성 완료하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  tagText: {
    fontSize: 14,
    color: '#333', 
  },
  textBox: {
    paddingTop: 27,
  },
  tagSection: {
    marginBottom: 25,
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6F4E37',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#C3C3C3',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    color: '#A232323',
  },
  tagDropdown: {
    borderWidth: 1,
    borderColor: '#C3C3C3',
    borderRadius: 10,
    marginTop: 10,
  },
  tagItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#C3C3C3',
  },
  firstTagItem: {
    borderTopWidth: 0, 
    borderTopLeftRadius: 10,  
    borderTopRightRadius: 10, 
  },
  lastTagItem: {
    borderBottomWidth: 0, 
    borderBottomLeftRadius: 10, 
    borderBottomRightRadius: 10, 

  },
  tagText: {
    fontSize: 14,
    color: '#333',
  },
  inputSection: {
    marginBottom: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: '#C3C3C3',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 14,
  },
  textArea: {
    height: 120,
  },
  imageSection: {
    marginBottom: 25,
  },
  imageInfo: {
    fontSize: 12,
    color: '#A9A9A9',
    marginBottom: 10,
  },
  imageUpload: {
    width: 100,
    height: 100,
    backgroundColor: '#E2E2E2',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    fontSize: 38,
    color: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  submitButton: {
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  inactiveButton: {
    backgroundColor: '#E2E2E2',
  },
  activeButton: {
    backgroundColor: '#FF8800',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  line: {
    paddingVertical: 23,
  },
})

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert, KeyboardAvoidingView, TouchableHighlight } from 'react-native';
// import ArrowDown from '../../assets/images/icons/ArrowDown.svg'; 
// import HeaderText from '../../components/HeaderText';
// import Line from '../../assets/images/icons/Line.svg';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker'; 

// const tags = ['# 미란/계양', '# 결정/중괴', '# 농포/여드름', '# 구진/플라크', '# 태선화/과다색소침착', '# 비듬/각질/상피성잔고리', '# 기타'];

// export default function CreatePostScreen({ navigation }) {
//   const [selectedTag, setSelectedTag] = useState(''); 
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
//   const [highlightedTag, setHighlightedTag] = useState(''); 
//   const [title, setTitle] = useState(''); 
//   const [content, setContent] = useState(''); 
//   const [imageUri, setImageUri] = useState(null); 

//   // 버튼 활성화 로직
//   const isButtonEnabled = title && content && selectedTag && imageUri;

//   const handleImagePicker = () => {
//     Alert.alert(
//       "사진 업로드",
//       "이미지를 추가할 방법을 선택하세요.",
//       [
//         { text: "카메라로 촬영하기", onPress: openCamera },
//         { text: "앨범에서 선택하기", onPress: openGallery },
//         { text: "취소", style: "cancel" },
//       ],
//       { cancelable: true }
//     );
//   };

//   const openCamera = () => {
//     launchCamera({ mediaType: 'photo', cameraType: 'back' }, (response) => {
//       if (!response.didCancel && !response.errorCode) {
//         setImageUri(response.assets[0].uri);
//       }
//     });
//   };

//   const openGallery = () => {
//     launchImageLibrary({ mediaType: 'photo' }, (response) => {
//       if (!response.didCancel && !response.errorCode) {
//         setImageUri(response.assets[0].uri);
//       }
//     });
//   };

//   const handleTagSelect = (tag) => {
//     setSelectedTag(tag);
//     setIsDropdownOpen(false); // 태그 선택 후 드롭다운 닫기
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <HeaderText mainText={"우리 아이의 피부 고민,\n함께 나누고 해결해요!"} />
//       <Line style={styles.line} />
//       <View style={styles.textBox}>
//         {/* 태그 선택 */}
//         <View style={styles.tagSection}>
//           <Text style={styles.label}>태그</Text>
//           <TouchableOpacity style={styles.dropdown} onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
//             <Text style={styles.dropdownText}>{selectedTag || '질환 태그를 선택해 주세요.'}</Text>
//             <ArrowDown height={20} />
//           </TouchableOpacity>
//           {isDropdownOpen && (
//             <View style={styles.tagDropdown}>
//               {tags.map((tag, index) => (
//                 <TouchableHighlight 
//                   key={tag} 
//                   style={[
//                     styles.tagItem, 
//                     index === 0 && styles.firstTagItem,       
//                     index === tags.length - 1 && styles.lastTagItem, 
//                     highlightedTag === tag && { backgroundColor: '#FFF7F2' },
//                     selectedTag === tag && { backgroundColor: '#FFF7F2' }
//                   ]} 
//                   onPress={() => handleTagSelect(tag)} 
//                   underlayColor="#FFF7F2"
//                   onShowUnderlay={() => setHighlightedTag(tag)}
//                   onHideUnderlay={() => setHighlightedTag('')}
//                 >
//                   <Text style={[
//                     styles.tagText,
//                     highlightedTag === tag && { color: '#FC7E2F' },
//                     selectedTag === tag && { color: '#FC7E2F' }
//                   ]}>
//                     {tag}
//                   </Text>
//                 </TouchableHighlight>
//               ))}
//             </View>
//           )}
//         </View>
//       </View>

//       {/* 제목 입력 */}
//       <View style={styles.inputSection}>
//         <Text style={styles.label}>제목</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="제목을 입력해 주세요."
//           value={title}
//           onChangeText={setTitle}
//         />
//       </View>

//       {/* 내용 입력 */}
//       <View style={styles.inputSection}>
//         <Text style={styles.label}>내용</Text>
//         <TextInput
//           style={[styles.input, styles.textArea]}
//           placeholder="내용을 입력해 주세요."
//           value={content}
//           onChangeText={setContent}
//           multiline
//         />
//       </View>

//       {/* 이미지 추가 */}
//       <View style={styles.imageSection}>
//         <Text style={styles.imageInfo}>이미지는 1개만 첨부할 수 있어요.</Text>
//         <TouchableOpacity style={styles.imageUpload} onPress={handleImagePicker}>
//           {imageUri ? (
//             <Image source={{ uri: imageUri }} style={styles.image} />
//           ) : (
//             <Text style={styles.plusIcon}>+</Text>
//           )}
//         </TouchableOpacity>
//       </View>

//       {/* 작성 완료 버튼 */}
//       <TouchableOpacity
//         style={[styles.submitButton, isButtonEnabled ? styles.activeButton : styles.inactiveButton]}
//         disabled={!isButtonEnabled}
//         onPress={() => navigation.navigate('커뮤니티')}
//       >
//         <Text style={styles.submitButtonText}>작성 완료하기</Text>
//       </TouchableOpacity>

//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 24,
//     backgroundColor: '#fff',
//   },
//   tagText: {
//     fontSize: 14,
//     color: '#333', 
//   },
//   textBox: {
//     paddingTop: 27,
//   },
//   tagSection: {
//     marginBottom: 25,
//   },
//   label: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#6F4E37',
//   },
//   dropdown: {
//     borderWidth: 1,
//     borderColor: '#C3C3C3',
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   dropdownText: {
//     color: '#A232323',
//   },
//   tagDropdown: {
//     borderWidth: 1,
//     borderColor: '#C3C3C3',
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   tagItem: {
//     padding: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#C3C3C3',
//   },
//   firstTagItem: {
//     borderTopWidth: 0, 
//     borderTopLeftRadius: 10,  
//     borderTopRightRadius: 10, 
//   },
//   lastTagItem: {
//     borderBottomWidth: 0, 
//     borderBottomLeftRadius: 10, 
//     borderBottomRightRadius: 10, 

//   },
//   tagText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   inputSection: {
//     marginBottom: 25,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#C3C3C3',
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     paddingVertical: 14,
//     fontSize: 14,
//   },
//   textArea: {
//     height: 120,
//   },
//   imageSection: {
//     marginBottom: 25,
//   },
//   imageInfo: {
//     fontSize: 12,
//     color: '#A9A9A9',
//     marginBottom: 10,
//   },
//   imageUpload: {
//     width: 100,
//     height: 100,
//     backgroundColor: '#E2E2E2',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   plusIcon: {
//     fontSize: 38,
//     color: '#fff',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 12,
//   },
//   submitButton: {
//     paddingVertical: 15,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   inactiveButton: {
//     backgroundColor: '#E2E2E2',
//   },
//   activeButton: {
//     backgroundColor: '#FF8800',
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   line: {
//     paddingVertical: 23,
//   },
// })


// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert, TouchableHighlight } from 'react-native';
// import ArrowDown from '../../assets/images/icons/ArrowDown.svg'; 
// import HeaderText from '../../components/HeaderText';
// import Line from '../../assets/images/icons/Line.svg';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import { createPost } from '../../api/communityApi'; 
// import { getToken } from '../../utils/storage'; 


// const tags = ['# 미란/계양', '# 결정/중괴', '# 농포/여드름', '# 구진/플라크', '# 태선화/과다색소침착', '# 비듬/각질/상피성잔고리', '# 기타'];

// export default function CreatePostScreen({ navigation }) {
//   const [selectedTag, setSelectedTag] = useState(''); 
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
//   const [highlightedTag, setHighlightedTag] = useState(''); 
//   const [title, setTitle] = useState(''); 
//   const [content, setContent] = useState(''); 
//   const [imageUri, setImageUri] = useState(null); 

//   // 버튼 활성화 로직
//   const isButtonEnabled = title && content && selectedTag && imageUri;

//   // 이미지 선택 옵션
//   const handleImagePicker = () => {
//     Alert.alert(
//       "사진 업로드",
//       "이미지를 추가할 방법을 선택하세요.",
//       [
//         { text: "카메라로 촬영하기", onPress: openCamera },
//         { text: "앨범에서 선택하기", onPress: openGallery },
//         { text: "취소", style: "cancel" },
//       ],
//       { cancelable: true }
//     );
//   };

//   // 카메라로 사진 촬영
//   const openCamera = () => {
//     launchCamera({ mediaType: 'photo', cameraType: 'back' }, (response) => {
//       if (!response.didCancel && !response.errorCode) {
//         setImageUri(response.assets[0].uri);
//       }
//     });
//   };

//   // 갤러리에서 사진 선택
//   const openGallery = () => {
//     launchImageLibrary({ mediaType: 'photo' }, (response) => {
//       if (!response.didCancel && !response.errorCode) {
//         setImageUri(response.assets[0].uri);
//       }
//     });
//   };

//   // 화면이 로드될 때 사용자 정보 가져오기
//   useEffect(() => {
//     const fetchUserData = async () => {
//       const data = await getUserData(); // 저장된 사용자 정보 가져오기
//       // setUserData(data); // 사용자 정보를 상태에 저장
//     };
//     fetchUserData();
//   }, []);

//   // 게시글 작성 API 호출 함수
//   const handleSubmit = async () => {
//     try {
//       // 사용자 정보가 없을 때 에러 표시
//       if (!userData) {
//         Alert.alert('에러', '사용자 정보가 없습니다. 다시 로그인 해주세요.');
//         return;
//       }

//       const token = await getToken(); 
//       const formData = new FormData(); 

//       // 게시글에 필요한 정보 추가
//       formData.append('userId', userData.userId); 
//       formData.append('userName', userData.userName); 
//       formData.append('title', title); 
//       formData.append('content', content); 
//       formData.append('diseaseTag', selectedTag); 
//       formData.append('imagePath', {
//         uri: imageUri,
//         type: 'image/jpeg', 
//         name: 'uploaded_image.jpg', 
//       });

//       console.log("FormData:", formData); 

//       // API 호출로 게시글 작성 요청
//       const response = await createPost(formData, token);
//       if (response.data.success) {
//         Alert.alert('성공', '게시글이 작성되었습니다.');
//         navigation.navigate('커뮤니티'); // 커뮤니티 화면으로 이동
//       } else {
//         Alert.alert('실패', '게시글 작성에 실패했습니다.');
//       }
//     } catch (error) {
//       console.error('게시글 작성 오류:', error);
//       Alert.alert('에러', '게시글 작성 중 오류가 발생했습니다.');
//     }
//   };

//   // 태그 선택 함수
//   const handleTagSelect = (tag) => {
//     setSelectedTag(tag);
//     setIsDropdownOpen(false);
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <HeaderText mainText={"우리 아이의 피부 고민,\n함께 나누고 해결해요!"} />
//       <Line style={styles.line} />
//       <View style={styles.textBox}>
//         {/* 태그 선택 */}
//         <View style={styles.tagSection}>
//           <Text style={styles.label}>태그</Text>
//           <TouchableOpacity style={styles.dropdown} onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
//             <Text style={styles.dropdownText}>{selectedTag || '질환 태그를 선택해 주세요.'}</Text>
//             <ArrowDown height={20} />
//           </TouchableOpacity>
//           {isDropdownOpen && (
//             <View style={styles.tagDropdown}>
//               {tags.map((tag, index) => (
//                 <TouchableHighlight 
//                   key={tag} 
//                   style={[
//                     styles.tagItem, 
//                     index === 0 && styles.firstTagItem,       
//                     index === tags.length - 1 && styles.lastTagItem, 
//                     highlightedTag === tag && { backgroundColor: '#FFF7F2' },
//                     selectedTag === tag && { backgroundColor: '#FFF7F2' }
//                   ]} 
//                   onPress={() => handleTagSelect(tag)} 
//                   underlayColor="#FFF7F2"
//                   onShowUnderlay={() => setHighlightedTag(tag)}
//                   onHideUnderlay={() => setHighlightedTag('')}
//                 >
//                   <Text style={[
//                     styles.tagText,
//                     highlightedTag === tag && { color: '#FC7E2F' },
//                     selectedTag === tag && { color: '#FC7E2F' }
//                   ]}>
//                     {tag}
//                   </Text>
//                 </TouchableHighlight>
//               ))}
//             </View>
//           )}
//         </View>
//       </View>

//       {/* 제목 입력 */}
//       <View style={styles.inputSection}>
//         <Text style={styles.label}>제목</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="제목을 입력해 주세요."
//           value={title}
//           onChangeText={setTitle}
//         />
//       </View>

//       {/* 내용 입력 */}
//       <View style={styles.inputSection}>
//         <Text style={styles.label}>내용</Text>
//         <TextInput
//           style={[styles.input, styles.textArea]}
//           placeholder="내용을 입력해 주세요."
//           value={content}
//           onChangeText={setContent}
//           multiline
//         />
//       </View>

//       {/* 이미지 추가 */}
//       <View style={styles.imageSection}>
//         <Text style={styles.imageInfo}>이미지는 1개만 첨부할 수 있어요.</Text>
//         <TouchableOpacity style={styles.imageUpload} onPress={handleImagePicker}>
//           {imageUri ? (
//             <Image source={{ uri: imageUri }} style={styles.image} />
//           ) : (
//             <Text style={styles.plusIcon}>+</Text>
//           )}
//         </TouchableOpacity>
//       </View>

//       {/* 작성 완료 버튼 */}
//       <TouchableOpacity
//         style={[styles.submitButton, isButtonEnabled ? styles.activeButton : styles.inactiveButton]}
//         disabled={!isButtonEnabled}
//         onPress={handleSubmit} // 게시글 작성 API 호출
//       >
//         <Text style={styles.submitButtonText}>작성 완료하기</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 24,
//     backgroundColor: '#fff',
//   },
//   tagText: {
//     fontSize: 14,
//     color: '#333', 
//   },
//   textBox: {
//     paddingTop: 27,
//   },
//   tagSection: {
//     marginBottom: 25,
//   },
//   label: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#6F4E37',
//   },
//   dropdown: {
//     borderWidth: 1,
//     borderColor: '#C3C3C3',
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   dropdownText: {
//     color: '#A232323',
//   },
//   tagDropdown: {
//     borderWidth: 1,
//     borderColor: '#C3C3C3',
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   tagItem: {
//     padding: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#C3C3C3',
//   },
//   firstTagItem: {
//     borderTopWidth: 0, 
//     borderTopLeftRadius: 10,  
//     borderTopRightRadius: 10, 
//   },
//   lastTagItem: {
//     borderBottomWidth: 0, 
//     borderBottomLeftRadius: 10, 
//     borderBottomRightRadius: 10, 

//   },
//   tagText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   inputSection: {
//     marginBottom: 25,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#C3C3C3',
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     paddingVertical: 14,
//     fontSize: 14,
//   },
//   textArea: {
//     height: 120,
//   },
//   imageSection: {
//     marginBottom: 25,
//   },
//   imageInfo: {
//     fontSize: 12,
//     color: '#A9A9A9',
//     marginBottom: 10,
//   },
//   imageUpload: {
//     width: 100,
//     height: 100,
//     backgroundColor: '#E2E2E2',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   plusIcon: {
//     fontSize: 38,
//     color: '#fff',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 12,
//   },
//   submitButton: {
//     paddingVertical: 15,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   inactiveButton: {
//     backgroundColor: '#E2E2E2',
//   },
//   activeButton: {
//     backgroundColor: '#FF8800',
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   line: {
//     paddingVertical: 23,
//   },
// })