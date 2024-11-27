import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Arrow from '../../assets/images/icons/Arrow.svg';
import { fetchDiagnosisList } from '../../api/DiagnosisApi'; 
import { getToken } from '../../utils/storage'; 

export default function DiagnosisRecordScreen({ navigation }) {
  const [diagnosisRecords, setDiagnosisRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // 진단 기록 불러오기 함수
  const loadDiagnosisRecords = async () => {
    try {
      const token = await getToken(); 
      const response = await fetchDiagnosisList(token);

      if (response && response.data) {
        setDiagnosisRecords(response.data.diagnosisHistory);
      }
    } catch (error) {
      console.error('진단 기록 목록 가져오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDiagnosisRecords();
  }, []);

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
        <Text style={styles.title}>{item.diagnosisResult}</Text>
        <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
          {item.description}
        </Text>
        <Text style={styles.date}>{new Date(item.diagnosisDate).toLocaleDateString()}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('진단 기록 상세', { diagnosis_id: item.diagnosisId })}>
        <Arrow height={30} />
      </TouchableOpacity>
    </View>
  );

  // 진단 기록 리스트
  return (
    <View style={styles.container}>
      <FlatList
        data={diagnosisRecords}
        keyExtractor={(item) => item.diagnosisId.toString()}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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