import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import CustomModal from '../../components/CustomModal';

export default function WithdrawalScreen({ navigation }) {
  const [isChecked, setChecked] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFinalModalVisible, setFinalModalVisible] = useState(false);

  // 탈퇴 확인 모달 닫기
  const handleModalClose = () => {
    setModalVisible(false);
  };

  // 최종 모달 닫기 및 로그인 페이지로 이동
  const handleFinalModalClose = () => {
    setFinalModalVisible(false);
    navigation.navigate('로그인');
  };

  // 첫 번째 탈퇴 확인 모달의 확인 버튼을 눌렀을 때
  const handleConfirm = () => {
    setModalVisible(false);
    setFinalModalVisible(true); // 최종 확인 모달 열기
  };

  // 탈퇴 버튼 클릭 시 처리
  const handleWithdrawal = () => {
    if (isChecked) {
      setModalVisible(true);
    } else {
      alert('이에 동의합니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/petppo_2.jpg')}
        style={styles.iconImage}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.message}>
          회원 탈퇴 시 더 이상 펫뽀 서비스 사용이 불가능하며 탈퇴 처리됩니다.
        </Text>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkbox, isChecked && styles.checkboxChecked]}
            onPress={() => setChecked(!isChecked)}
          >
            {isChecked && <Text style={styles.checkmark}>✔</Text>}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>이에 동의합니다.</Text>
        </View>

        <TouchableOpacity
          style={[styles.withdrawalButton, !isChecked && styles.disabledButton]}
          onPress={handleWithdrawal}
          disabled={!isChecked}
        >
          <Text style={styles.withdrawalButtonText}>탈퇴</Text>
        </TouchableOpacity>

        {/* 첫 번째 탈퇴 확인 모달 */}
        <CustomModal
          isVisible={isModalVisible}
          onClose={handleModalClose}
          headerText="회원탈퇴"
          message="회원탈퇴 하시겠습니까?"
          cancel="취소"
          confirm="확인"
          onConfirm={handleConfirm}
        />

        {/* 최종 탈퇴 완료 모달 */}
        <CustomModal
          isVisible={isFinalModalVisible}
          headerText="회원탈퇴 완료"
          message="다음엔 꼭 다시 만나요!"
          message2="더 나은 모습으로 기다릴게요."
          confirm="확인"
          onConfirm={handleFinalModalClose}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
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
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: '#A5A5A5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    borderColor: '#999999',
    backgroundColor: '#fff',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  withdrawalButton: {
    backgroundColor: '#FC7E2F',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCC',
  },
  withdrawalButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});