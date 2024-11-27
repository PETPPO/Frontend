import { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import HeaderText from '../components/HeaderText';  
import Banner from '../assets/images/main/banner.svg';  
import MainIcon from '../assets/images/main/mainIcon.svg';
import MainIcon2 from '../assets/images/main/mainIcon2.svg';
import { fetchDogname } from '../api/MypageApi';
import { getToken } from '../utils/storage';

export default function MainScreen({ navigation }) {
  const [dogName, setDogname] = useState("");

  useEffect(() => {
    const getDogname = async () => {
        const token = await getToken(); 
        const response = await fetchDogname(token);
        setDogname(response.data.dogName); 
    };
    
    getDogname();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/petppo_2.jpg')}
        style={styles.iconImage}
      />
      <View style={styles.contentContainer}>
        <HeaderText mainText={`${dogName}의 피부 건강,\n지금 바로 확인해 보세요.`} />
        <View style={styles.banner}>
          <Banner width={370} height={178} />  
          <TouchableOpacity style={styles.communityButton} onPress={() => navigation.navigate('커뮤니티')} >
            <Text style={styles.communityLink}>고민 나누러 가기 ↗</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsRow}>
          <TouchableOpacity onPress={() => navigation.navigate('이미지 업로드')} >
            <MainIcon width={164} height={171} />  
          </TouchableOpacity>
          <TouchableOpacity>
            <MainIcon2 width={164} height={171} onPress={() => navigation.navigate('진단 기록')} />  
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  iconImage: {
    width: '100%',
    height: 137,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 35,
    paddingBottom: 35,
    backgroundColor: '#fff',
  },
  banner: {
    paddingTop: 35,
    paddingBottom: 30,
    alignItems: 'center',
    position: 'relative',
    paddingLeft: 15,
  },
  communityButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 50,
    position: 'absolute',  
    right: 20,  
    bottom: 50, 
    width: 161,
  },
  communityLink: {
    fontSize: 16,
    color: '#FC7E2F',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
