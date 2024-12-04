import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import CustomModal from '../../components/CustomModal';
import Petppo_1 from '../../assets/images/petppo_1.svg';
import { registerUser, sendVerificationLink, checkEmailVerificationStatus } from '../../api/userApi';

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
  const [showSendButton, setShowSendButton] = useState(false);
  const [isVerified, setIsVerified] = useState(false); 
  const [modalAction, setModalAction] = useState(() => () => setModalVisible(false));
  const [isVerificationLinkSent, setIsVerificationLinkSent] = useState(false); 
  const [verificationToken, setVerificationToken] = useState(''); 

  const handleSignUp = () => {
    if (!email || !password || !confirmPassword || !username || !dogname) {
      setHeaderText("주의!");
      setModalMessage("입력란을 모두 채워주세요 :)");
      setModalVisible(true);
    } else if (password !== confirmPassword) {
      setHeaderText("주의!");
      setModalMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      setModalVisible(true);
    } else if (!isVerified) {
      setHeaderText("이메일 인증 필요");
      setModalMessage("회원가입을 완료하려면 이메일 인증이 필요합니다.");
      setModalVisible(true);
    } else {
      const userData = {
        email,
        password,
        confirmPassword,
        username,
        dogName: dogname,
      };

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
            setModalVisible(true);
          }
        })
        .catch(error => {
          setHeaderText("오류 발생");
          setModalMessage("서버에 연결할 수 없습니다. 다시 시도해주세요.");
          setModalVisible(true);
        });
    }
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setShowSendButton(true);
    setEmailStatusMessage('');
    setIsVerified(false);
    setIsVerificationLinkSent(false);
  };

  // 이메일 인증 링크 발송 핸들러
const handleSendVerificationLink = () => {
  setEmailStatusMessage("발송 중...");
  sendVerificationLink(email)
    .then(response => {
      console.log("sendVerificationLink 응답:", response.data);
      setEmailStatusMessage("인증 링크가 이메일로 발송되었습니다.");
      setVerificationToken(response.data.token);
      setIsVerificationLinkSent(true);
      setTimeout(() => {
        handleCheckEmailVerificationStatus(); 
      }, 10000); 
    })
    .catch(error => {
      console.error("sendVerificationLink 오류:", error);
      setEmailStatusMessage("이미 사용중인 이메일입니다.");
    });
};

// 이메일 인증 상태 확인 핸들러
const handleCheckEmailVerificationStatus = () => {
  checkEmailVerificationStatus(email)
    .then(response => {
      console.log("Verification Status Response:", response.data);
      if (response.data.verified) {
        setIsVerified(true);
        setEmailStatusMessage("이메일 인증이 완료되었습니다.");
      } else {
        setEmailStatusMessage("이메일 인증을 진행해주세요!");
      }
    })
    .catch(error => {
      console.error("Verification Status Error:", error);
      setEmailStatusMessage("이메일 인증에 실패하였습니다. 다시 시도해주세요.");
    });
};

  useEffect(() => {
    if (email && isVerificationLinkSent && !isVerified) {
      const intervalId = setInterval(() => {
        handleCheckEmailVerificationStatus();
      }, 15000);

      return () => clearInterval(intervalId);
    }
  }, [email, isVerificationLinkSent, isVerified]);

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
          autoCorrect={false}       
          autoCapitalize="none"     
        />
      {showSendButton && (
        <TouchableOpacity 
          style={[styles.checkButton, isVerified && { backgroundColor: '#fff' }]} 
          onPress={handleSendVerificationLink}
          disabled={isVerified} 
        >
          <Text style={styles.checkButtonText}>
            {isVerified ? "인증 완료" : "발송하기"}
          </Text>
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
