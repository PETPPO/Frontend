// import { StyleSheet, ScrollView, View, Text, Image } from 'react-native';  
// import HeaderText from '../../components/HeaderText';
// import Line from '../../assets/images/icons/Line.svg';

// export default function HistoryDetailScreen( ) {
//   const imageUri = 'https://blog.malcang.com/wp-content/uploads/2024/02/2-20.png'; 

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


// import React, { useEffect, useState } from 'react';
// import { StyleSheet, ScrollView, View, Text, Image, ActivityIndicator } from 'react-native';
// import HeaderText from '../../components/HeaderText';
// import Line from '../../assets/images/icons/Line.svg';
// import { fetchDiagnosisDetail } from '../../api/DiagnosisApi'; // 진단 상세 조회 API 불러오기
// import { getToken } from '../../utils/storage'; // 토큰 불러오기 함수
// import useDiagnosisStore from '../../stores/diagnosisStore'; // Zustand 상태 불러오기

// export default function HistoryDetailScreen({ route }) {
//   const { diagnosisDetail } = useDiagnosisStore(); // Zustand에서 상태 관리
//   const { recordId } = route.params; // 진단 ID 가져오기
//   // const { diagnosisDetail, setDiagnosisDetail } = useDiagnosisStore(); 
//   const [loading, setLoading] = useState(!diagnosisDetail);

//   // 진단 상세 정보 불러오기 함수
//   const loadDiagnosisDetail = async () => {
//     try {
//       const token = await getToken(); // 저장된 토큰 불러오기
//       console.log('Fetched Token:', token); // 토큰 확인 로그

//       const response = await fetchDiagnosisDetail(recordId, token); // API 호출
//       console.log('API Response:', response); // API 응답 로그

//       if (response && response.data && response.data.diagnosisDetail) {
//         setDiagnosisDetail(response.data.diagnosisDetail); // diagnosisDetail 필드만 저장
//         console.log('Diagnosis Detail Stored in Zustand:', response.data.diagnosisDetail); // 상태 업데이트 확인
//       }
//     } catch (error) {
//       console.error('Error fetching diagnosis detail:', error); // 에러 발생 시 로그
//     } finally {
//       setLoading(false); // 로딩 종료
//     }
//   };

//   // 컴포넌트 마운트 시 진단 상세 정보 불러오기
//   useEffect(() => {
//     if (!diagnosisDetail) {
//       loadDiagnosisDetail();
//     }
//   }, [diagnosisDetail]);

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#FF8800" />
//       </View>
//     );
//   }

//   if (!diagnosisDetail) {
//     return (
//       <View style={styles.container}>
//         <Text>진단 정보를 불러올 수 없습니다.</Text>
//       </View>
//     );
//   }

//   const { diagnosisResult, description, health, imagePath, record } = diagnosisDetail;

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         <HeaderText mainText={"과거 쿠기의 피부\n진단 결과를 보여드요."} />
//         <Line style={styles.line} />

//         {/* 진단 결과 */}
//         <View style={styles.sectionContain}>
//           <Text style={styles.label}>진단 결과</Text>
//           <ScrollView style={styles.textScroll}>
//             <Text style={styles.diseaseResult}>{diagnosisResult}</Text>
//           </ScrollView>
//         </View>

//         {/* 세부 설명 */}
//         <View style={styles.sectionContain}>
//           <Text style={styles.label}>세부 설명</Text>
//           <ScrollView style={styles.textScroll}>
//             <Text style={styles.content}>{description}</Text>
//           </ScrollView>
//         </View>

//         {/* 건강 조치 */}
//         <View style={styles.sectionContain}>
//           <Text style={styles.label}>건강 조치</Text>
//           <ScrollView style={styles.textScroll}>
//             <Text style={styles.content}>{health}</Text>
//           </ScrollView>
//         </View>

//         {/* 업로드 된 이미지 */}
//         <View style={styles.sectionContain}>
//           <Text style={styles.label}>업로드 된 이미지</Text>
//           <View style={styles.imageBox}>
//             <Image 
//               source={{ uri: imagePath }} 
//               style={styles.image} 
//               resizeMode="cover"
//             />
//           </View>
//         </View>

//         {/* 피부 상태 기록 */}
//         <View style={styles.sectionContain2}>
//           <Text style={styles.label}>피부 상태 기록</Text>
//           <ScrollView style={styles.textScroll2}>
//             <Text style={styles.historyContent}>{record}</Text>
//           </ScrollView>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 24,
//     backgroundColor: '#fff',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
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









import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, ActivityIndicator, } from 'react-native';
import HeaderText from '../../components/HeaderText';
import Line from '../../assets/images/icons/Line.svg';
import { fetchDiagnosisDetail } from '../../api/DiagnosisApi';
import { getToken } from '../../utils/storage';

export default function HistoryDetailScreen({ route }) {
  const { diagnosis_id } = route.params || {}; // diagnosis_id를 route에서 전달받음
  const [diagnosisData, setDiagnosisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        if (!token) {
          throw new Error('인증 토큰을 찾을 수 없습니다!');
        }
        if (!diagnosis_id) {
          throw new Error('유효하지 않은 진단 ID입니다.');
        }
        const response = await fetchDiagnosisDetail(diagnosis_id, token);
        // diagnosisDetail 안의 데이터를 상태로 설정
        setDiagnosisData(response.data.diagnosisDetail);
      } catch (err) {
        console.error('Error fetching diagnosis detail:', err);
        setError('진단 데이터를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [diagnosis_id]);
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6F4E37" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!diagnosisData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>데이터가 없습니다.</Text>
      </View>
    );
  }

  const { diagnosisResult, description, health, imagePath, record } = diagnosisData;

  return (
    <ScrollView>
      <View style={styles.container}>
        <HeaderText mainText={"과거 쿠기의 피부\n진단 결과를 보여드요."} />
        <Line style={styles.line} />

        <View style={styles.sectionContain}>
          <Text style={styles.label}>진단 결과</Text>
          <ScrollView style={styles.textScroll}>
            <Text style={styles.diseaseResult}>{diagnosisResult}</Text>
          </ScrollView>
        </View>

        {description && (
          <View style={styles.sectionContain}>
            <Text style={styles.label}>세부 설명</Text>
            <ScrollView style={styles.textScroll}>
              <Text style={styles.content}>{description}</Text>
            </ScrollView>
          </View>
        )}

        {health && (
          <View style={styles.sectionContain}>
            <Text style={styles.label}>건강 조치</Text>
            <ScrollView style={styles.textScroll}>
              <Text style={styles.content}>{health}</Text>
            </ScrollView>
          </View>
        )}

        <View style={styles.sectionContain}>
          <Text style={styles.label}>업로드 된 이미지</Text>
          <View style={styles.imageBox}>
            <Image source={{ uri: imagePath }} style={styles.image} resizeMode="cover" />
          </View>
        </View>

        <View style={styles.sectionContain2}>
          <Text style={styles.label}>피부 상태 기록</Text>
          <ScrollView style={styles.textScroll2}>
            <Text style={styles.historyContent}>{record}</Text>
          </ScrollView>
        </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
