// import React from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import Arrow from '../../assets/images/icons/Arrow.svg';

// // 더미 데이터
// const diagnosisRecords = [
//   {
//     id: '1',
//     title: '비듬, 각질',
//     description: '습진이 생긴 건지 최근 발을 핥거나 깨무는 행동을 자주한다..ㅠㅠ',
//     date: '2024.09.24',
//   },
//   {
//     id: '2',
//     title: '농포, 여드름',
//     description: '습진이 생긴 건지 최근 발을 핥거나 깨무는 행동을 자주한다..ㅠㅠ',
//     date: '2024.09.24',
//   },
// ];

// export default function DiagnosisRecordScreen() {
//   // 진단 기록을 렌더링하는 함수
//   const renderRecord = ({ item }) => (
//     <View style={styles.card}>
//       <View style={styles.cardContent}>
//         <Text style={styles.title}>{item.title}</Text>
//         {/* 두 줄까지만 표시하고 넘으면 말줄임표로 표시 */}
//         <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
//           {item.description}
//         </Text>
//         <Text style={styles.date}>{item.date}</Text>
//       </View>
//       <TouchableOpacity>
//         <Arrow height={30} />
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={diagnosisRecords}
//         keyExtractor={(item) => item.id}
//         renderItem={renderRecord}
//         contentContainerStyle={styles.list}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 24,
//   },
//   list: {
//     paddingBottom: 16,
//     paddingTop: 30,
//   },
//   card: {
//     backgroundColor: '#FFF2D7',
//     borderRadius: 15,
//     paddingHorizontal: 25,
//     paddingVertical: 12,
//     marginBottom: 24,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   cardContent: {
//     flex: 1,
//     paddingRight: 12,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 5,
//   },
//   description: {
//     fontSize: 12.5,
//     color: '#666',
//     marginBottom: 10,
//     paddingRight: 11,
//   },
//   date: {
//     fontSize: 12,
//     color: '#A9A9A9',
//   },
// });

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Arrow from '../../assets/images/icons/Arrow.svg';

// 1. 진단 기록 없을 경우
// const diagnosisRecords = []; 

// 2. 진단 기록 있을 경우 화면
const diagnosisRecords =
   [ {
      id: '1',
      title: '비듬, 각질',
      description: '습진이 생긴 건지 최근 발을 핥거나 깨무는 행동을 자주한다..ㅠㅠ',
      date: '2024.09.24',
    },
    {
      id: '2',
      title: '농포, 여드름',
      description: '습진이 생긴 건지 최근 발을 핥거나 깨무는 행동을 자주한다..ㅠㅠ',
      date: '2024.09.24',
    },
  ];

export default function DiagnosisRecordScreen( {navigation} ) {
  // 진단 기록이 없는 경우
  if (diagnosisRecords.length === 0) {
    return (
      <View style={styles.container2}>
        <Image
          source={require('../../assets/images/petppo_2.jpg')}
          style={styles.iconImage}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.message}>
            진단 기록이 없습니다. {"\n"}
            반려견의 피부 상태를 체크해 보세요!{"\n"}
            건강한 피부를 유지하는 첫걸음이에요!{"\n"}
          </Text>
        </View>
      </View>
    );
  }

  // 진단 기록이 있는 경우 렌더링하는 함수
  const renderRecord = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
          {item.description}
        </Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('진단 기록 상세', { recordId: item.id })}>
        <Arrow height={30} />
      </TouchableOpacity>
    </View>
  );

  // 진단 기록 리스트
  return (
    <View style={styles.container}>
      <FlatList
        data={diagnosisRecords}
        keyExtractor={(item) => item.id}
        renderItem={renderRecord}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  list: {
    paddingBottom: 16,
    paddingTop: 30,
  },
  card: {
    backgroundColor: '#FFF2D7',
    borderRadius: 15,
    paddingHorizontal: 25,
    paddingVertical: 12,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 12.5,
    color: '#666',
    marginBottom: 10,
    paddingRight: 11,
  },
  date: {
    fontSize: 12,
    color: '#A9A9A9',
  },
  iconImage: {
    width: '100%',
    height: 137,
    marginBottom: 70,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    marginBottom: 215,
    padding: 24,
    lineHeight: 27,
  },
});