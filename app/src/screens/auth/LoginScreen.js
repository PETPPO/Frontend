// import React, { useState } from 'react';
// import { View, StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';
// import InputField from '../../components/InputField';  
// import Button from '../../components/Button';  
// import Petppo_1 from '../../assets/images/petppo_1.svg';  
// import CustomModal from '../../components/CustomModal';  

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [modalMessage, setModalMessage] = useState('');
//   const [headerText, setHeaderText] = useState('');

//   const handleSignIn = () => {
//     if (!email || !password) {
//       setHeaderText("주의!");
//       setModalMessage("사용자 정보가 일치하지 않습니다.");
//       setModalVisible(true);
//     // } else if (email !== 'Wjdgmldus28@naver.com' || password !== 'example02!!') {
//     } else if (email !== '1' || password !== '1') {
//       // 예시 이메일/비밀번호와 다를 경우 사용자 정보 불일치 모달 띄움 (임의의 데이터 사용)
//       setHeaderText("주의!");
//       setModalMessage("사용자 정보가 일치하지 않습니다.\n다시 시도해 주세요!");
//       setModalVisible(true);
//     } else {
//       navigation.navigate('홈');
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       keyboardVerticalOffset={100} // iOS에서 키보드가 가리는 문제 방지
//     >
//     <View style={styles.container}>
//       <Petppo_1 width={274} height={305} marginTop={40} marginBottom={50}/>  
//       <InputField
//         placeholder="이메일"
//         value={email}
//         onChangeText={setEmail} // 이메일 값 설정
//       />
//       <InputField
//         placeholder="비밀번호"
//         secureTextEntry={true}
//         value={password}
//         onChangeText={setPassword} // 비밀번호 값 설정
//       />
//       <Button title="로그인" onPress={handleSignIn} />
//       <Text style={styles.linkText} onPress={() => navigation.navigate('가입 동의')}>
//         계정이 없으신가요? 회원가입하기
//       </Text>

//       <CustomModal
//         isVisible={isModalVisible}
//         onClose={() => setModalVisible(false)}
//         headerText={headerText}
//         message={modalMessage}
//         confirm="확인"
//         onConfirm={() => setModalVisible(false)}
//       />
//     </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     paddingBottom: 75,
//   },
//   linkText: {
//     color: "#FF8800",
//     marginTop: 15,
//     textDecorationLine: 'underline',
//     textDecorationLine: 'none',
//   },
// });



// import React, { useState } from 'react';
// import { View, StyleSheet, Text, KeyboardAvoidingView, Platform, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';  // AsyncStorage 임포트
// import axios from 'axios';
// import InputField from '../../components/InputField';  
// import Button from '../../components/Button';  
// import Petppo_1 from '../../assets/images/petppo_1.svg';  
// import CustomModal from '../../components/CustomModal';  

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [modalMessage, setModalMessage] = useState('');
//   const [headerText, setHeaderText] = useState('');

//   // 로그인 처리 함수
//   const handleSignIn = async () => {
//     if (!email || !password) {
//       setHeaderText("주의!");
//       setModalMessage("이메일과 비밀번호를 입력해 주세요.");
//       setModalVisible(true);
//       return;
//     }

//     try {
//       // 로그인 API 호출
//       const response = await axios.post('https://2352-210-119-237-59.ngrok-free.app/api/user/login', {
//         email: email,
//         password: password,
//       });

//       // 로그인 성공 시
//       if (response.data.success) {
//         const token = response.data.token;
        
//         // AsyncStorage에 토큰 저장
//         await AsyncStorage.setItem('token', token);

//         // 성공적인 로그인 알림
//         Alert.alert('로그인 성공!', '환영합니다!', [
//           { text: '확인', onPress: () => navigation.navigate('홈') },  // 홈 화면으로 이동
//         ]);
//       } else {
//         // 로그인 실패 시 경고
//         setHeaderText("주의!");
//         setModalMessage("로그인 정보가 일치하지 않습니다.\n다시 시도해 주세요.");
//         setModalVisible(true);
//       }
//     } catch (error) {
//       // 서버 오류 발생 시 처리
//       setHeaderText("서버 오류!");
//       setModalMessage("서버와 통신에 실패했습니다.\n다시 시도해 주세요.");
//       setModalVisible(true);
//       console.error('Login error:', error);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       keyboardVerticalOffset={100} // iOS에서 키보드 가림 방지
//     >
//       <View style={styles.container}>
//         <Petppo_1 width={274} height={305} marginTop={40} marginBottom={50}/>  
//         <InputField
//           placeholder="이메일"
//           value={email}
//           onChangeText={setEmail} // 이메일 값 설정
//         />
//         <InputField
//           placeholder="비밀번호"
//           secureTextEntry={true}
//           value={password}
//           onChangeText={setPassword} // 비밀번호 값 설정
//         />
//         <Button title="로그인" onPress={handleSignIn} />
//         <Text style={styles.linkText} onPress={() => navigation.navigate('가입 동의')}>
//           계정이 없으신가요? 회원가입하기
//         </Text>

//         <CustomModal
//           isVisible={isModalVisible}
//           onClose={() => setModalVisible(false)}
//           headerText={headerText}
//           message={modalMessage}
//           confirm="확인"
//           onConfirm={() => setModalVisible(false)}
//         />
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     paddingBottom: 75,
//   },
//   linkText: {
//     color: "#FF8800",
//     marginTop: 15,
//     textDecorationLine: 'underline',
//     textDecorationLine: 'none',
//   },
// });





//진짜 코드 !!!!
import React, { useState } from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';
import InputField from '../../components/InputField';  
import Button from '../../components/Button';  
import Petppo_1 from '../../assets/images/petppo_1.svg';  
import CustomModal from '../../components/CustomModal';  
import { loginUser } from '../../api/userApi';  
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveToken } from '../../utils/storage'; // 토큰 저장하기 함수 가져오기

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [headerText, setHeaderText] = useState('');

  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('authToken', token);
      console.log('Token stored successfully');
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
        email,
        password,
      };

      // 로그인 API 호출
      loginUser(userData)
        .then(response => {
          const { message, token, user } = response.data;
          if (message === "로그인 성공") {
            //토큰 및 사용자 정보를 처리
            console.log("토큰:", token);
            console.log("사용자 정보:", user);
            saveToken(token);   // 로그인 성공 시 토큰 저장
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
      keyboardVerticalOffset={100} // iOS에서 키보드가 가리는 문제 방지
    >
    <View style={styles.container}>
      <Petppo_1 width={274} height={305} marginTop={40} marginBottom={50}/>  
      <InputField
        placeholder="이메일"
        value={email}
        onChangeText={setEmail} // 이메일 값 설정
      />
      <InputField
        placeholder="비밀번호"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword} // 비밀번호 값 설정
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
