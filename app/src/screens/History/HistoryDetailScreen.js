import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, ActivityIndicator, } from 'react-native';
import HeaderText from '../../components/HeaderText';
import Line from '../../assets/images/icons/Line.svg';
import { fetchDiagnosisDetail } from '../../api/DiagnosisApi';
import { getToken } from '../../utils/storage';
import { fetchDogname } from '../../api/MypageApi';

export default function HistoryDetailScreen({ route }) {
  const [dogName, setDogname] = useState("");

  useEffect(() => {
    const getDogname = async () => {
        const token = await getToken(); 
        const response = await fetchDogname(token);
        setDogname(response.data.dogName); 
    };
    
    getDogname();
  }, []);

  const { diagnosis_id } = route.params || {}; 
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
        <HeaderText mainText={`과거 ${dogName}의 피부\n진단 결과를 보여드려요.`} />
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
