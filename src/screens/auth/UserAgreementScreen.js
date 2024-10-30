import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import HeaderText from '../../components/HeaderText';
import Line from '../../assets/images/icons/Line.svg';

export default function UserAgreementScreen({navigation}) {
  const [allChecked, setAllChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);

  const handleAllChecked = (newValue) => {
    setAllChecked(newValue);
    setTermsChecked(newValue);
    setPrivacyChecked(newValue);
  };

  const handleIndividualCheck = (newValue, type) => {
    if (type === 'terms') {
      setTermsChecked(newValue);
    } else if (type === 'privacy') {
      setPrivacyChecked(newValue);
    }

    if (newValue === false) {
      setAllChecked(false);
    } else if (termsChecked && privacyChecked && newValue) {
      setAllChecked(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../../assets/images/petppo_2.jpg')}
        style={styles.iconImage}
      />
      <View style={styles.contentBox}>
        <HeaderText mainText={"펫뽀에 오신 것을 환영합니다.\n이용 약관에 먼저 동의해 주세요!"} />
        <Line style={styles.line} />
        <View style={styles.checkboxSection}>
            {/* 전체 동의 체크박스 */}
            <View style={styles.allTermsBox}>
                <View style={styles.checkboxBackground}>
                    <CheckBox
                    value={allChecked}
                    onValueChange={handleAllChecked}
                    tintColors={{ true: '#FC7E2F', false: '#A5A5A5' }}
                    onCheckColor="#FC7E2F"
                    onTintColor="#FC7E2F"
                    />
                    <View style={styles.textBox}>
                    <Text style={styles.checkboxLabel}>약관 전체 동의하기</Text>
                    <Text style={styles.checkboxSubLabel}>{"*동의를 거부할 수 있습니다.\n단, 동의 거부 시에는 회원가입이 제한됩니다.\n이용 약관 동의 후 회원가입 진행이 가능합니다."}</Text>
                    </View>
                </View>
            </View>

            {/* 이용 약관 동의 */}
            <View style={styles.termBox}>
                <CheckBox
                    value={termsChecked}
                    onValueChange={(newValue) => handleIndividualCheck(newValue, 'terms')}
                    tintColors={{ true: '#FC7E2F', false: '#A5A5A5' }}
                    onCheckColor="#FC7E2F"
                    onTintColor="#FC7E2F"
                />
                <View style={styles.termDetail} >
                    <Text style={styles.checkboxLabel}>이용 약관 동의(필수)</Text>
                    <TouchableOpacity>
                        <Text style={styles.detailLink} onPress={() => navigation.navigate('이용 약관 동의')}>내용보기</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* 개인정보 수집 및 이용 동의 */}
            <View style={styles.termBox}>
                <CheckBox
                    value={privacyChecked}
                    onValueChange={(newValue) => handleIndividualCheck(newValue, 'privacy')}
                    tintColors={{ true: '#FC7E2F', false: '#A5A5A5' }}
                    onCheckColor="#FC7E2F"
                    onTintColor="#FC7E2F"
                />
                <View style={styles.termDetail} >
                    <Text style={styles.checkboxLabel}>개인정보 수집 및 이용 동의(필수)</Text>
                    <TouchableOpacity>
                        <Text style={styles.detailLink} onPress={() => navigation.navigate('개인정보 동의')}>내용보기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

        {/* 다음 버튼 */}
        <TouchableOpacity
            style={[styles.nextButton, (termsChecked && privacyChecked) ? styles.activeButton : styles.inactiveButton]}
            disabled={!(termsChecked && privacyChecked)}
            onPress={() => navigation.navigate('회원가입')}
        >
            <Text style={styles.nextButtonText} >다음</Text>
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
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    marginTop: -38,
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
  checkboxSection: {
    marginBottom: 25,
    paddingTop: 25,
  },
  allTermsBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  checkboxBackground: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#FFF2D7',
    flexGrow: 1,
  },
  textBox: {
    marginLeft: 13,
  },
  termBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 15,
    marginTop: 8,
  },
  checkboxLabel: {
    fontSize: 15,
    color: '#333',
  },
  checkboxSubLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 10,
  },
  termDetail: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 13,
  },
  detailLink: {
    fontSize: 14,
    color: '#A5A5A5',
  },
  nextButton: {
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 25,
  },
  inactiveButton: {
    backgroundColor: '#CCCCCC',
  },
  activeButton: {
    backgroundColor: '#FC7E2F',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});