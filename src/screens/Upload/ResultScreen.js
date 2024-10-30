// import { StyleSheet, ScrollView, View, Text, Image } from 'react-native'; 
// import React, { useState } from 'react';  
// import HeaderText from '../../components/HeaderText';
// import Line from '../../assets/images/icons/Line.svg';
// import MainButton from '../../components/MainButton';  
// import CustomModal from '../../components/CustomModal'; 

// export default function UploadScreen({ navigation }) {
//   const imageUri = 'https://blog.malcang.com/wp-content/uploads/2024/02/2-20.png'; 
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [isFinalModalVisible, setFinalModalVisible] = useState(false);

//   // 결과 저장 모달 닫기
//   const handleModalClose = () => {
//     setModalVisible(false);
//   };

//   // 최종 모달 닫기 및 진단 기록 페이지로 이동
//   const handleFinalModalClose = () => {
//     setFinalModalVisible(false);
//     navigation.navigate('진단 기록'); 
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

//   return (
//     <ScrollView>
//       <View style={styles.container}> 
//         <HeaderText mainText={"쿠키의 피부 질환\n결과가 나왔어요."} />
//         <Line style={styles.line} />

//         {/* 진단 결과 */}
//         <View style={styles.sectionContain}>
//           <Text style={styles.label}>진단 결과</Text>
//           <ScrollView style={styles.textScroll}>
//             <Text style={styles.diseaseResult}>감염성 피부염(으)로 의심돼요.</Text>
//           </ScrollView>
//         </View>

//         {/* 세부 설명 */}
//         <View style={styles.sectionContain}>
//           <Text style={styles.label}>세부 설명</Text>
//           <ScrollView style={styles.textScroll}>
//             <Text style={styles.content}>블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~블라블라~~ 블라블라~~ 
//             블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~블라블라~~ 
//             블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~~ 블라블라~~ 블라블라~~ 블라블라~~블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~~</Text>
//           </ScrollView>
//         </View>

//         {/* 건강 조치 */}
//         <View style={styles.sectionContain}>
//           <Text style={styles.label}>건강 조치</Text>
//           <ScrollView style={styles.textScroll}>
//             <Text style={styles.content}>블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~블라블라~~ 블라블라~~ 
//             블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~블라블라~~ 
//             블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~~ 블라블라~~ 블라블라~~ 블라블라~~블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~~
//             </Text>
//           </ScrollView>
//         </View>

//         {/* 업로드 된 이미지 */}
//         <View style={styles.sectionContain}>
//           <Text style={styles.label}>업로드 된 이미지</Text>
//           <View style={styles.imageBox}>
//             <Image 
//               source={{ uri: imageUri }} 
//               style={styles.image} 
//               resizeMode="cover"
//             />
//           </View>
//         </View>

//         {/* 피부 상태 기록 */}
//         <View style={styles.sectionContain2}>
//           <Text style={styles.label}>피부 상태 기록</Text>
//           <ScrollView style={styles.textScroll2}>
//             <Text style={styles.historyContent}>
//               블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~
//               블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라
//             </Text>
//           </ScrollView>
//         </View>

//         <MainButton title="진단 결과 저장하기" onPress={handleSaveResult} />

//         {/* 결과 저장 모달 */}
//         <CustomModal
//           isVisible={isModalVisible}
//           onClose={handleModalClose}
//           headerText="결과 저장"
//           message="진단 결과를 저장하시겠습니까?"
//           cancel="취소"
//           confirm="확인"
//           onConfirm={handleConfirm}
//         />

//         {/* 최종 확인 모달 */}
//         <CustomModal
//           isVisible={isFinalModalVisible}
//           headerText="결과 저장"
//           message="성공적으로 저장되었어요!"
//           confirm="확인"
//           onConfirm={handleFinalModalClose}
//         />
//     </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 24,
//     backgroundColor: '#fff',
//   },
//   line: {
//     paddingVertical: 23,
//   },
//   sectionContain: {
//     marginBottom: 50,
//   },
//   sectionContain2: {
//     marginBottom: 25,
//     flex: 1, // 스크롤을 위해 flex 1 사용
//   },
//   label: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#6F4E37',
//   },
//   textScroll: {
//     maxHeight: 150, 
//   },
//   textScroll2: {
//     maxHeight: 200, 
//     flexGrow: 1, // 스크롤이 가능하도록 공간을 최대한 활용
//   },
//   diseaseResult: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   content: {
//     fontSize: 17,
//   },
//   historyContent: {
//     fontSize: 15,
//     borderWidth: 1,
//     borderColor: '#C3C3C3',
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     paddingVertical: 14,
//   },
//   imageBox: {
//     borderWidth: 2,
//     borderColor: '#6F4E37',
//     borderRadius: 12,
//     overflow: 'hidden',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 140,
//     width: '100%',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//   },
// });


// 10/27 진단 기록 무증상일 경우 변수 추가한 코드 
// import { StyleSheet, ScrollView, View, Text, Image } from 'react-native'; 
// import React, { useState } from 'react';  
// import HeaderText from '../../components/HeaderText';
// import Line from '../../assets/images/icons/Line.svg';
// import MainButton from '../../components/MainButton';  
// import CustomModal from '../../components/CustomModal'; 

// export default function UploadScreen({ navigation }) {
//   const imageUri = 'https://blog.malcang.com/wp-content/uploads/2024/02/2-20.png'; 
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [isFinalModalVisible, setFinalModalVisible] = useState(false);
//   const { result } = route.params; // 전달된 진단 결과 데이터
//   const { diagnosisResult, description, health, imagePath, record } = result;

//   // 예시: 무증상 여부를 체크하는 변수 (DB에서 가져온 데이터로 설정)
//   const isNoSymptoms = true; // 이 값을 DB에서 받아온 데이터로 설정하세요.

//   // 결과 저장 모달 닫기
//   const handleModalClose = () => {
//     setModalVisible(false);
//   };

//   // 최종 모달 닫기 및 진단 기록 페이지로 이동
//   const handleFinalModalClose = () => {
//     setFinalModalVisible(false);
//     navigation.navigate('진단 기록'); 
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

//   return (
//     <ScrollView>
//       <View style={styles.container}> 
//         <HeaderText mainText={"쿠키의 피부 질환\n결과가 나왔어요."} />
//         <Line style={styles.line} />

//         {/* 진단 결과 */}
//         <View style={styles.sectionContain}>
//           <Text style={styles.label}>진단 결과</Text>
//           <ScrollView style={styles.textScroll}>
//             <Text style={styles.diseaseResult}>
//               {isNoSymptoms ? '피부 상태가 양호합니다.' : '감염성 피부염(으)로 의심돼요.'}
//             </Text>
//           </ScrollView>
//         </View>

//         {/* 세부 설명 섹션 - 무증상일 경우 숨기기 */}
//         {!isNoSymptoms && (
//           <View style={styles.sectionContain}>
//             <Text style={styles.label}>세부 설명</Text>
//             <ScrollView style={styles.textScroll}>
//               <Text style={styles.content}>
//                 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~
//               </Text>
//             </ScrollView>
//           </View>
//         )}

//         {/* 건강 조치 섹션 - 무증상일 경우 숨기기 */}
//         {!isNoSymptoms && (
//           <View style={styles.sectionContain}>
//             <Text style={styles.label}>건강 조치</Text>
//             <ScrollView style={styles.textScroll}>
//               <Text style={styles.content}>
//                 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~
//               </Text>
//             </ScrollView>
//           </View>
//         )}

//         {/* 업로드 된 이미지 */}
//         <View style={styles.sectionContain}>
//           <Text style={styles.label}>업로드 된 이미지</Text>
//           <View style={styles.imageBox}>
//             <Image 
//               source={{ uri: imageUri }} 
//               style={styles.image} 
//               resizeMode="cover"
//             />
//           </View>
//         </View>

//         {/* 피부 상태 기록 */}
//         <View style={styles.sectionContain2}>
//           <ScrollView style={styles.textScroll2}>
//             <Text style={styles.historyContent}>
//               블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~
//             </Text>
//           </ScrollView>
//         </View>

//         <MainButton title="진단 결과 저장하기" onPress={handleSaveResult} />

//         {/* 결과 저장 모달 */}
//         <CustomModal
//           isVisible={isModalVisible}
//           onClose={handleModalClose}
//           headerText="결과 저장"
//           message="진단 결과를 저장하시겠습니까?"
//           cancel="취소"
//           confirm="확인"
//           onConfirm={handleConfirm}
//         />

//         {/* 최종 확인 모달 */}
//         <CustomModal
//           isVisible={isFinalModalVisible}
//           headerText="결과 저장"
//           message="성공적으로 저장되었어요!"
//           confirm="확인"
//           onConfirm={handleFinalModalClose}
//         />
//     </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 24,
//     backgroundColor: '#fff',
//   },
//   line: {
//     paddingVertical: 23,
//   },
//   sectionContain: {
//     marginBottom: 50,
//   },
//   sectionContain2: {
//     marginBottom: 25,
//     flex: 1,
//   },
//   label: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#6F4E37',
//   },
//   textScroll: {
//     maxHeight: 150, 
//   },
//   textScroll2: {
//     maxHeight: 200, 
//     flexGrow: 1,
//   },
//   diseaseResult: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   content: {
//     fontSize: 17,
//   },
//   historyContent: {
//     fontSize: 15,
//     borderWidth: 1,
//     borderColor: '#C3C3C3',
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     paddingVertical: 14,
//   },
//   imageBox: {
//     borderWidth: 2,
//     borderColor: '#6F4E37',
//     borderRadius: 12,
//     overflow: 'hidden',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 140,
//     width: '100%',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//   },
// });

import { StyleSheet, ScrollView, View, Text, Image } from 'react-native'; 
import React, { useState } from 'react';  
import HeaderText from '../../components/HeaderText';
import Line from '../../assets/images/icons/Line.svg';
import MainButton from '../../components/MainButton';  
import CustomModal from '../../components/CustomModal'; 

export default function ResultScreen({ route, navigation }) {
  // 진단 결과 데이터는 진단 요청 페이지에서 navigation으로 전달받습니다.
  const { result } = route.params || {}; // 초기에는 undefined 방지를 위해 빈 객체로 설정
  const { diagnosisResult, description, health, imagePath, record } = result || {};

  // 데이터를 콘솔에 출력하여 확인(나중에 지우기)
  console.log("Image Path:", imagePath);
  console.log("Record:", record);
  
  // 무증상 여부 체크: API 응답 값에 따라 무증상인 경우
  const isNoSymptoms = diagnosisResult === '피부 상태가 양호합니다.';

  const [isModalVisible, setModalVisible] = useState(false);
  const [isFinalModalVisible, setFinalModalVisible] = useState(false);

  // 결과 저장 모달 닫기
  const handleModalClose = () => {
    setModalVisible(false);
  };

  // 최종 모달 닫기 및 진단 기록 페이지로 이동
  const handleFinalModalClose = () => {
    setFinalModalVisible(false);
    navigation.navigate('진단 기록'); 
  };

  // 첫 번째 결과 저장 모달의 확인 버튼을 눌렀을 때
  const handleConfirm = () => {
    setModalVisible(false);
    setFinalModalVisible(true); 
  };

  // 진단 결과 저장 버튼 눌렀을 때
  const handleSaveResult = () => {
    setModalVisible(true);  
  };

  return (
    <ScrollView>
      <View style={styles.container}> 
        <HeaderText mainText={"쿠키의 피부 질환\n결과가 나왔어요."} />
        <Line style={styles.line} />

        {/* 진단 결과 */}
        <View style={styles.sectionContain}>
          <Text style={styles.label}>진단 결과</Text>
          <ScrollView style={styles.textScroll}>
            <Text style={styles.diseaseResult}>
              {diagnosisResult} {/* API에서 전달된 진단 결과 표시 */}
            </Text>
          </ScrollView>
        </View>

        {/* 세부 설명 섹션 - 무증상일 경우 숨기기 */}
        {!isNoSymptoms && (
          <View style={styles.sectionContain}>
            <Text style={styles.label}>세부 설명</Text>
            <ScrollView style={styles.textScroll}>
              <Text style={styles.content}>
                {description} {/* API에서 전달된 설명 표시 */}
              </Text>
            </ScrollView>
          </View>
        )}

        {/* 건강 조치 섹션 - 무증상일 경우 숨기기 */}
        {!isNoSymptoms && (
          <View style={styles.sectionContain}>
            <Text style={styles.label}>건강 조치</Text>
            <ScrollView style={styles.textScroll}>
              <Text style={styles.content}>
                {health} 
              </Text>
            </ScrollView>
          </View>
        )}

        {/* 업로드 된 이미지 */}
        <View style={styles.sectionContain}>
          <Text style={styles.label}>업로드 된 이미지</Text>
          <View style={styles.imageBox}>
            <Image 
              source={{ uri: imagePath }} 
              style={styles.image} 
              resizeMode="cover"
            />
          </View>
        </View>

        {/* 피부 상태 기록 */}
        <View style={styles.sectionContain2}>
          <ScrollView style={styles.textScroll2}>
            <Text style={styles.historyContent}>
              {record} {/* 사용자가 입력한 피부 상태 기록 */}
            </Text>
          </ScrollView>
        </View>

        <MainButton title="진단 결과 저장하기" onPress={handleSaveResult} />

        {/* 결과 저장 모달 */}
        <CustomModal
          isVisible={isModalVisible}
          onClose={handleModalClose}
          headerText="결과 저장"
          message="진단 결과를 저장하시겠습니까?"
          cancel="취소"
          confirm="확인"
          onConfirm={handleConfirm}
        />

        {/* 최종 확인 모달 */}
        <CustomModal
          isVisible={isFinalModalVisible}
          headerText="결과 저장"
          message="성공적으로 저장되었어요!"
          confirm="확인"
          onConfirm={handleFinalModalClose}
        />
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  line: {
    paddingVertical: 23,
  },
  sectionContain: {
    marginBottom: 50,
  },
  sectionContain2: {
    marginBottom: 25,
    flex: 1,
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6F4E37',
  },
  textScroll: {
    maxHeight: 150, 
  },
  textScroll2: {
    maxHeight: 200, 
    flexGrow: 1,
  },
  diseaseResult: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 17,
  },
  historyContent: {
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#C3C3C3',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
  },
  imageBox: {
    borderWidth: 2,
    borderColor: '#6F4E37',
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
