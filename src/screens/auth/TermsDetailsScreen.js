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
            <HeaderText mainText={"이용 약관 동의 상세"} />
            <Line style={styles.line} />
            <View style={styles.contentSection}>
                <Text style={styles.contentTitle}>제1조 (목적)</Text>
                <Text style={styles.contentText}>
                이 약관은 [펫뽀] (이하 "서비스")가 제공하는 AI 기반 반려동물 질환 진단 서비스의 이용과 관련하여 회사와 회원 간의 권리, 의무, 책임 사항 및 기타 필요한 사항을 규정함을 목적으로 합니다.
                </Text>

                <Text style={styles.contentTitle}>제2조 (서비스의 내용)</Text>
                <Text style={styles.contentText}>
                1. 이 서비스는 AI 기술을 이용하여 반려동물의 피부 질환을 진단하는 기능을 제공합니다.
                {'\n'}2. 이 서비스는 참고용으로만 제공되며, 진단 결과의 정확성과 신뢰성을 보장하지 않습니다.
                {'\n'}3. 사용자는 AI 진단 결과를 의료 전문가의 상담 없이 진단의 근거로 사용해서는 안 됩니다.
                </Text>

                <Text style={styles.contentTitle}>제3조 (회원의 의무)</Text>
                <Text style={styles.contentText}>
                1. 회원은 서비스 이용 시 정확한 정보를 제공해야 하며, 허위 정보를 제공하여 발생하는 모든 책임은 회원에게 있습니다.
                {'\n'}2. 회원은 AI 진단 결과가 실제 질환을 정확하게 반영하지 않을 수 있음을 이해하고, 진단 결과에 따른 의사 결정을 회원 본인이 책임집니다.
                </Text>

                <Text style={styles.contentTitle}>제4조 (회사의 면책 사항)</Text>
                <Text style={styles.contentText}>
                1. 회사는 AI 진단 결과의 완전성에 대해 책임을 지지 않습니다.
                {'\n'}2. 회사의 AI 진단 결과를 기반으로 반려동물의 건강 및 치료와 관련된 결정을 내린 경우 발생하는 문제에 대해 회사가 책임지지 않습니다.
                {'\n'}3. 회사는 기술적 오류, 데이터 누락, 서비스 중단 등에 대해 면책됩니다.
                </Text>

                <Text style={styles.contentTitle}>제5조 (개인정보 처리)</Text>
                <Text style={styles.contentText}>
                1. 회사는 서비스를 제공하기 위해 필요한 최소한의 개인정보를 수집하며, 회원은 개인정보 처리에 동의해야 서비스를 이용할 수 있습니다.
                {'\n'}2. 회원은 개인정보 처리에 동의하지 않을 수 있으며, 이 경우 서비스 이용이 제한될 수 있습니다.
                </Text>

                <Text style={styles.contentTitle}>제6조 (서비스의 변경 및 중단)</Text>
                <Text style={styles.contentText}>
                1. 회사는 서비스의 개선을 위해 사전 공지 없이 서비스의 내용을 변경하거나 일시 중단할 수 있습니다.
                {'\n'}2. 회사는 이러한 변경 또는 중단으로 인해 발생하는 문제에 대해 책임지지 않습니다.
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