import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import InputField from '../../components/InputField';  
import Button from '../../components/Button';  
import CustomModal from '../../components/CustomModal';  
import Petppo_1 from '../../assets/images/petppo_1.svg';  
import { registerUser, checkEmail } from '../../api/userApi';  

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [dogname, setDogname] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [headerText, setHeaderText] = useState('');
  const [emailStatusMessage, setEmailStatusMessage] = useState('');
  const [showCheckButton, setShowCheckButton] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [isEmailChecked, setIsEmailChecked] = useState(false); 

  const handleSignUp = () => {
    if (!email || !password || !confirmPassword || !username || !dogname) {
      setHeaderText("주의!");
      setModalMessage("입력란을 모두 채워주세요 :)");
      setModalAction(() => () => setModalVisible(false));
      setModalVisible(true);
    } else if (!isEmailChecked) {
      setHeaderText("주의!");
      setModalMessage("이메일 중복확인을 해주세요.");
      setModalAction(() => () => setModalVisible(false));
      setModalVisible(true);
    } else if (password !== confirmPassword) {
      setHeaderText("주의!");
      setModalMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      setModalAction(() => () => setModalVisible(false));
      setModalVisible(true);
    } else {
      //요청하는 데이터
      const userData = {
        email,
        password,
        confirmPassword,
        username,
        dogName: dogname,
      }; 

      // 회원가입 API
      registerUser(userData)
        .then(response => {
          if (response.data.message === "회원가입이 완료되었습니다.") {
            setHeaderText("회원가입");
            setModalMessage("회원가입이 완료되었어요.\n가입을 축하합니다!");
            setModalAction(() => () => {
              setModalVisible(false);
              navigation.navigate('로그인');
            });
            setModalVisible(true);
          } else {
            setHeaderText("오류 발생");
            setModalMessage(response.data.message || "회원가입 중 오류가 발생했습니다.");
            setModalAction(() => () => setModalVisible(false));
            setModalVisible(true);
          }
        })
        .catch(error => {
          setHeaderText("오류 발생");
          setModalMessage("서버에 연결할 수 없습니다. 다시 시도해주세요.");
          setModalAction(() => () => setModalVisible(false));
          setModalVisible(true);
        });
    }
  };

  // 이메일 중복 확인 API
  const handleEmailCheck = () => {
    checkEmail(email)
      .then(response => {
        if (response.data.message === "이미 사용중인 이메일입니다.") {
          setEmailStatusMessage('이미 사용중인 이메일입니다.');
          setIsEmailChecked(false);  // 중복된 이메일이므로 false로 설정
        } else {
          setEmailStatusMessage('사용 가능한 이메일입니다.');
          setIsEmailChecked(true);  // 이메일이 사용 가능하므로 true로 설정
        }
      })
      .catch(error => {
        setEmailStatusMessage('이미 사용중인 이메일입니다.');
        setIsEmailChecked(false);  // 오류 발생 시 중복 확인을 실패로 처리
      });
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setShowCheckButton(true);
    setEmailStatusMessage('');
    setIsEmailChecked(false); 
  };

  return (
    <View style={styles.container}>
      <Petppo_1 width={274} height={305} style={styles.image} />
      
      <Text style={styles.emailStatus}>{emailStatusMessage}</Text>

      <View style={styles.emailContainer}>
        <InputField
          placeholder="이메일"
          value={email}
          onChangeText={handleEmailChange}
          style={styles.emailInput}
        />
        {showCheckButton && (
          <TouchableOpacity style={styles.checkButton} onPress={handleEmailCheck}>
            <Text style={styles.checkButtonText}>중복확인</Text>
          </TouchableOpacity>
        )}
      </View>

      <InputField
        placeholder="비밀번호"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <InputField
        placeholder="비밀번호 확인"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <View style={styles.row}>
        <InputField
          style={[styles.name, styles.inputMargin]}  
          placeholder="사용자 이름"
          value={username}
          onChangeText={setUsername}
        />
        <InputField
          style={styles.name}
          placeholder="반려견 이름"
          value={dogname}
          onChangeText={setDogname}
        />
      </View>
      <Button 
        title="회원가입" 
        onPress={handleSignUp} 
      />
      <CustomModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        headerText={headerText}
        message={modalMessage}
        confirm="확인"
        onConfirm={modalAction}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    marginVertical: 23,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  emailInput: {
    flex: 1,
    marginRight: 10,
  },
  emailStatus: {
    width: '80%',  
    textAlign: 'left',
    fontSize: 13,
    color: '#FC7E2F',
    marginBottom: 5,
  },
  checkButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderWidth: 1, 
    borderColor: '#FC7E2F',
    borderRadius: 50,
    marginBottom: 12,
  },
  checkButtonText: {
    color: '#FC7E2F',
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  name: {
    width: '47%',
  },
  inputMargin: {
    marginRight: 10,
  },
});
