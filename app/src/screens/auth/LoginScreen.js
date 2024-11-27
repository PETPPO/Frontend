import React, { useState } from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';
import InputField from '../../components/InputField';  
import Button from '../../components/Button';  
import Petppo_1 from '../../assets/images/petppo_1.svg';  
import CustomModal from '../../components/CustomModal';  
import { loginUser } from '../../api/userApi';  
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveToken } from '../../utils/storage'; 

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [headerText, setHeaderText] = useState('');

  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('authToken', token);
      console.log('토큰이 성공적으로 저장되었습니다!');
    } catch (error) {
      console.error('Error storing token:', error);
    }
  };

  const handleSignIn = () => {
    if (!email || !password) {
      setHeaderText("주의!");
      setModalMessage("이메일과 비밀번호를 입력해 주세요.");
      setModalVisible(true);
    } else {
      const userData = {
        userEmail: email,   
        userPW: password,   
      };

      // 로그인 API 호출
      loginUser(userData)
        .then(response => {
          const { message, token, user } = response.data;
          if (message === "로그인 성공") {
            console.log("토큰:", token);
            console.log("사용자 정보:", user);
            saveToken(token); 
            navigation.navigate('홈');
          } else {
            setHeaderText("로그인 실패");
            setModalMessage(message || "로그인 중 오류가 발생했습니다.");
            setModalVisible(true);
          }
        })
        .catch(error => {
          setHeaderText("주의!");
          setModalMessage("사용자 정보가 일치하지 않습니다.\n다시 시도해 주세요!");
          setModalVisible(true);
        });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100} 
    >
    <View style={styles.container}>
      <Petppo_1 width={274} height={305} marginTop={40} marginBottom={50}/>  
      <InputField
        placeholder="이메일"
        value={email}
        onChangeText={setEmail} 
        autoCorrect={false}      
        autoCapitalize="none"    
      />
      <InputField
        placeholder="비밀번호"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword} 
      />
      <Button title="로그인" onPress={handleSignIn} />
      <Text style={styles.linkText} onPress={() => navigation.navigate('가입 동의')}>
        계정이 없으신가요? 회원가입하기
      </Text>

      <CustomModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        headerText={headerText}
        message={modalMessage}
        confirm="확인"
        onConfirm={() => setModalVisible(false)}
      />
    </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 75,
  },
  linkText: {
    color: "#FF8800",
    marginTop: 15,
    textDecorationLine: 'underline',
    textDecorationLine: 'none',
  },
});
