import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import HeaderText from '../../components/HeaderText';
import CustomModal from '../../components/CustomModal';
import { removeToken } from '../../utils/storage'; 
import useAuthStore from '../../stores/authStore';
import { fetchUsername } from '../../api/MypageApi';
import { getToken } from '../../utils/storage';

export default function UserScreen({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFinalModalVisible, setFinalModalVisible] = useState(false);
  const { clearUser } = useAuthStore(); 
  const [userName, setUsername] = useState("");
  
  useEffect(() => {
    const getUsername = async () => {
      try {
        const token = await getToken(); 
        const response = await fetchUsername(token);
        setUsername(response.data.userName); 
      } catch (error) {
        console.error("사용자 이름 조회 오류:", error);
      }
    };
    
    getUsername();
  }, []);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleFinalModalClose = () => {
    setFinalModalVisible(false);
    navigation.navigate('로그인');
  };

  const handleConfirm = async () => {
    setModalVisible(false);

    console.log("로그아웃 시작"); 
    clearUser(); 
    console.log("사용자 상태 초기화 완료"); 

    await removeToken(); 
    console.log("토큰 삭제 완료"); 

    setTimeout(() => {
      setFinalModalVisible(true); 
      console.log("로그아웃 완료, 확인 모달 표시"); 
    }, 1000);
  };


  return (
    <View style={styles.container}>
      <HeaderText mainText={`${userName}님 안녕하세요.\n좋은 하루 보내세요!`} />
      <View style={styles.content}>
        <View style={styles.box}>
          <Text style={styles.text} onPress={() => navigation.navigate('내가 쓴 글')}>
            📝  내가 쓴 글
          </Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text} onPress={() => navigation.navigate('댓글 알림')}>
            🔔  댓글 알림
          </Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text} onPress={() => setModalVisible(true)}>
            🚪  로그아웃
          </Text>
        </View>
          <Text style={styles.text} onPress={() => navigation.navigate('회원 탈퇴')}>
            ❌  회원 탈퇴
          </Text>
      </View>

      <CustomModal
        isVisible={isModalVisible}
        onClose={handleModalClose}
        headerText="로그아웃"
        message="로그아웃 하시겠습니까?"
        cancel="취소"
        confirm="확인"
        onConfirm={handleConfirm}
      />

      <CustomModal
        isVisible={isFinalModalVisible}
        onClose={handleFinalModalClose}
        headerText="로그아웃"
        message="로그아웃 처리 되었어요!"
        confirm="확인"
        onConfirm={handleFinalModalClose}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    paddingBottom: 75,
  },
  content: {
    paddingTop: 40,
    width: '100%',
    paddingBottom: 3,
  },
  text: {
    fontSize: 17,
    textAlign: 'flex-start',
    marginBottom: 18,
    marginTop: 18,
    width: '100%',
  },
  box: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
});
