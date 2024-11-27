import { StyleSheet, ScrollView, View, Text, Image, Alert } from 'react-native'; 
import React, { useState, useEffect } from 'react';  
import HeaderText from '../../components/HeaderText';
import Line from '../../assets/images/icons/Line.svg';
import MainButton from '../../components/MainButton';  
import CustomModal from '../../components/CustomModal'; 
import { saveDiagnosisResult } from '../../api/DiagnosisApi'; 
import { getToken } from '../../utils/storage';
import { fetchDogname } from '../../api/MypageApi';

export default function ResultScreen({ route, navigation }) {
  const [dogName, setDogname] = useState("");

  useEffect(() => {
    const getDogname = async () => {
        const token = await getToken(); 
        const response = await fetchDogname(token);
        setDogname(response.data.dogName); 
    };
    
    getDogname();
  }, []);

  const { result } = route.params || {}; 
  const { diagnosisResult, description, health, imagePath, record } = result || {};

  const isNoSymptoms = diagnosisResult === '피부 상태가 양호합니다.';

  const [isModalVisible, setModalVisible] = useState(false);
  const [isFinalModalVisible, setFinalModalVisible] = useState(false);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleFinalModalClose = () => {
    setFinalModalVisible(false);
    navigation.navigate('진단 기록'); 
  };

  const handleConfirm = async () => {
    setModalVisible(false);

    const handleSaveResult = () => {
      setDiagnosisDetail(result);
      setModalVisible(true);
    };
  
    try {
      const token = await getToken(); 
      
      if (!token) {
        throw new Error('인증 토큰을 찾을 수 없습니다!');
      }

      const diagnosisResultData = {
        diagnosisResult,
        description,
        health,
        imagePath,
        record,
      };

      const response = await saveDiagnosisResult(diagnosisResultData, token);

      if (response && response.data) {
        console.log("진단 결과 저장 성공:", response.data.message);
        setFinalModalVisible(true);
      } else {
        throw new Error('진단 결과 저장 실패');
      }
    } catch (error) {
      console.error('Error saving diagnosis result:', error);
      Alert.alert("오류", "진단 결과 저장에 실패했습니다.");
    }
  };

  const handleSaveResult = () => {
    setModalVisible(true);  
  };

  return (
    <ScrollView>
      <View style={styles.container}> 
        <HeaderText mainText={`${dogName}의 피부 질환\n결과가 나왔어요.`} />
        <Line style={styles.line} />

        <View style={styles.sectionContain}>
          <Text style={styles.label}>진단 결과</Text>
          <ScrollView style={styles.textScroll}>
            <Text style={styles.diseaseResult}>
              {diagnosisResult}
            </Text>
          </ScrollView>
        </View>

        {!isNoSymptoms && (
          <View style={styles.sectionContain}>
            <Text style={styles.label}>세부 설명</Text>
            <ScrollView style={styles.textScroll}>
              <Text style={styles.content}>
                {description}
              </Text>
            </ScrollView>
          </View>
        )}

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

        <View style={styles.sectionContain2}>
          <ScrollView style={styles.textScroll2}>
            <Text style={styles.historyContent}>
              {record}
            </Text>
          </ScrollView>
        </View>

        <MainButton title="진단 결과 저장하기" onPress={handleSaveResult} />

        <CustomModal
          isVisible={isModalVisible}
          onClose={handleModalClose}
          headerText="결과 저장"
          message="진단 결과를 저장하시겠습니까?"
          cancel="취소"
          confirm="확인"
          onConfirm={handleConfirm}
        />

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