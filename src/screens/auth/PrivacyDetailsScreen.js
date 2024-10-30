import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import HeaderText from '../../components/HeaderText';
import Line from '../../assets/images/icons/Line.svg';

export default function TermsDetailsScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Image
            source={require('../../assets/images/petppo_2.jpg')}
            style={styles.iconImage}
        />
        <View style={styles.contentBox}>
            <HeaderText mainText={"개인정보 수집 및 이용 동의 상세"} />
            <Line style={styles.line} />
            <View style={styles.contentSection}>
                <Text style={styles.contentTitle}>제1조 (개인정보 수집의 목적)</Text>
                <Text style={styles.contentText}>
                 회사는 회원의 개인정보를 다음의 목적을 위해 수집 및 이용합니다:
                  {'\n'}1. 회원가입 및 서비스 제공, 고객 관리
                  {'\n'}2. AI 기반 진단 결과 제공 및 맞춤형 서비스 제공
                  {'\n'}3. 서비스 이용 분석 및 개선을 위한 데이터 활용
                </Text>

                <Text style={styles.contentTitle}>제2조 (수집하는 개인정보의 항목)</Text>
                <Text style={styles.contentText}>
                 회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다:
                {'\n'}-필수항목: 이름, 이메일 주소, 비밀번호, 반려동물 정보 (이름, 사진)
                {'\n'}-선택항목: 반려동물의 병력, 기타 건강 정보
                </Text>

                <Text style={styles.contentTitle}>제3조 (개인정보의 보유 및 이용기간)</Text>
                <Text style={styles.contentText}>
                 회사는 회원이 서비스를 이용하는 동안 개인정보를 보유하며, 회원 탈퇴 시 또는 법적 보유 기간이 만료된 경우 해당 정보를 지체 없이 삭제합니다.
                </Text>

                <Text style={styles.contentTitle}>제4조 (개인정보의 제3자 제공)</Text>
                <Text style={styles.contentText}>
                1. 회사는 법령에 따른 경우를 제외하고 회원의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.
                {'\n'}2. 제휴 서비스 제공 시, 별도의 동의를 받은 경우에만 회원의 개인정보를 제공할 수 있습니다.
                </Text>

                <Text style={styles.contentTitle}>제5조 (개인정보 보호 및 관리)</Text>
                <Text style={styles.contentText}>
                1. 회사는 회원의 개인정보를 안전하게 관리하기 위해 암호화 등 보안 기술을 사용합니다.
                {'\n'}2. 회원의 개인정보가 외부로 유출되거나 훼손되지 않도록 기술적, 관리적 보호 조치를 시행합니다.
                </Text>

                <Text style={styles.contentTitle}>제6조 (개인정보 처리방침 변경)</Text>
                <Text style={styles.contentText}>
                 회사는 개인정보 처리방침을 변경할 경우, 변경된 내용과 시행일을 서비스 내 또는 웹사이트를 통해 사전에 공지합니다.
                </Text>
            </View>

            <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.confirmButtonText}>확인</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  contentBox: {
    flexGrow: 1,
    paddingHorizontal: 24,
    marginTop: -35,
    backgroundColor: '#fff',
  },
  iconImage: {
    width: '100%',
    height: 137,
    marginBottom: 70,
  },
  line: {
    height: 1,
    marginVertical: 17,
  },
  contentSection: {
    marginBottom: 20,
  },
  contentTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
  },
  contentText: {
    fontSize: 12,
    color: '#555',
    marginTop: 8,
    lineHeight: 20,
  },
  confirmButton: {
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#FC7E2F',
    marginTop: 20,
    marginBottom: 30,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});