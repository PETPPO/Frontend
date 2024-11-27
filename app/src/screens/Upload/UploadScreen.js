import { useEffect, useState } from 'react';
import { Text, StyleSheet, Alert, TouchableOpacity, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'; 
import HeaderText from '../../components/HeaderText';
import Camera from '../../assets/images/icons/camera.svg';
import Line from '../../assets/images/icons/Line.svg';
import CustomModal from '../../components/CustomModal';  
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestDiagnosis } from '../../api/DiagnosisApi'; 
import { getToken } from '../../utils/storage'; 
import { fetchDogname } from '../../api/MypageApi';

export default function UploadScreen({ navigation }) {
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);  
  const [textInput, setTextInput] = useState(""); 
  const [dogName, setDogname] = useState("");

  useEffect(() => {
    const getDogname = async () => {
        const token = await getToken(); 
        const response = await fetchDogname(token);
        setDogname(response.data.dogName); 
    };
    
    getDogname();
  }, []);
  
  const isButtonEnabled = imageUri !== null;

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
      } else {
        console.log('Camera error: ', response.errorMessage);
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

  const startDiagnosis = async () => {
    setLoading(true);
  
    try {
      const token = await getToken(); 
  
      if (!token) {
        throw new Error('No authentication token found');
      }
  
      const diagnosisData = new FormData();
      diagnosisData.append('record', textInput);
      diagnosisData.append('imagePath', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'diagnosis_image.jpg',
      });
  
      const response = await requestDiagnosis(diagnosisData, token);
  
      setLoading(false);
      if (response && response.data) {
        navigation.navigate('진단 결과', { result: response.data.diagnosisDetail });
      } else {
        throw new Error('진단 실패');
      }
    } catch (error) {
      console.error('진단 오류:', error);
      setLoading(false);
      navigation.navigate('진단 실패');
    }
  };
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100} 
    >
      <ScrollView contentContainerStyle={styles.container}> 
        <HeaderText mainText={`${dogName}의 피부 건강을,\n간편하게 진단해 드려요.`} />
        <Line style={styles.line} />
        <Text style={styles.subTitle}>피부 환부가 선명하게 보이는 사진이 좋아요!</Text>
        <TouchableOpacity style={styles.imageBox} onPress={handleImagePicker}>
          {imageUri ? (
            <Image 
              source={{ uri: imageUri }} 
              style={styles.image} 
              resizeMode="cover"
            />
          ) : (
            <>
              <Camera style={styles.camera} />
              <Text style={styles.imagePlaceholder}>여기를 클릭해서</Text>
              <Text style={styles.imagePlaceholder}>사진을 추가해주세요!</Text>
            </>
          )}
        </TouchableOpacity>
        <TextInput 
          style={styles.input} 
          placeholder="피부 상태를 간단히 기록해요." 
          multiline 
          value={textInput}  
          onChangeText={setTextInput}  
        />
        <TouchableOpacity 
          style={[styles.button, isButtonEnabled ? styles.buttonEnabled : styles.buttonDisabled]} 
          disabled={!isButtonEnabled}  
          onPress={startDiagnosis} 
        >
          <Text style={styles.buttonText}>진단 시작하기</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 로딩 모달 */}
      <CustomModal 
        isVisible={loading}
        onClose={() => setLoading(false)}
        headerText="안내"
        message="진단중입니다."
        message2="잠시만 기다려 주세요!"
        cancel={null}
        confirm="확인"
        onConfirm={() => setLoading(false)}  
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  subTitle: {
    fontSize: 16,
    color: '#6F4E37',
    marginBottom: 8,
  },
  imageBox: {
    borderWidth: 2,
    borderColor: '#6F4E37',
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    color: '#6F4E37',
    fontSize: 14,
    textAlign: 'center',
  },
  input: {
    height: 128,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    padding: 12,
    marginBottom: 25,
  },
  button: {
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonEnabled: {
    backgroundColor: '#FF8800', 
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC', 
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  camera: {
    paddingBottom: 30,
  },
  line:{
    paddingVertical: 23,
  }
});