import { View, StyleSheet, Text, Image, } from 'react-native';

export default function WithdrawalScreen({ }) {
 
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/petppo_2.jpg')}
        style={styles.iconImage}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.message}>
          진단 기록이 없습니다. {"\n"}
          반려견의 피부 상태를 체크해 보세요!{"\n"}
          건강한 피부를 유지하는 첫걸음이에요!{"\n"}
        </Text>
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
    lineHeight: 27
  },
});