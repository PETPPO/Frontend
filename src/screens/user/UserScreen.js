import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import HeaderText from '../../components/HeaderText';
import CustomModal from '../../components/CustomModal';

export default function UserScreen({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFinalModalVisible, setFinalModalVisible] = useState(false);

  // 첫 번째 모달 닫기
  const handleModalClose = () => {
    setModalVisible(false);
  };

  // 최종 확인 모달 닫기
  const handleFinalModalClose = () => {
    setFinalModalVisible(false);
    navigation.navigate('로그인');
  };

  // 첫 번째 모달의 확인 버튼 눌렀을 때
  const handleConfirm = () => {
    setModalVisible(false);

    setTimeout(() => {
      setFinalModalVisible(true); // 최종 확인 모달 열기
    }, 1000); 
  };

  return (
    <View style={styles.container}>
      <HeaderText mainText={"정희연님 안녕하세요.\n좋은 하루 보내세요!"} />
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

      {/* 로그아웃 모달 */}
      <CustomModal
        isVisible={isModalVisible}
        onClose={handleModalClose}
        headerText="로그아웃"
        message="로그아웃 하시겠습니까?"
        cancel="취소"
        confirm="확인"
        onConfirm={handleConfirm}
      />

      {/* 로그아웃 확인 모달 */}
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
