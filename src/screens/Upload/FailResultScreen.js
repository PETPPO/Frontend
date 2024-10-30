import { StyleSheet, View, TouchableOpacity, } from 'react-native';
import HeaderText from '../../components/HeaderText';
import Line from '../../assets/images/icons/Line.svg';
import Guide1 from '../../assets/images/icons/Guide1.svg';
import Guide2 from '../../assets/images/icons/Guide2.svg';
import Guide3 from '../../assets/images/icons/Guide3.svg';
import Choice from '../../assets/images/icons/Choice.svg';
import Choice2 from '../../assets/images/icons/Choice2.svg';

export default function UploadScreen({ navigation }) {
 
  return (
    <View style={styles.container} >
        <HeaderText mainText={"이미지 인식에 실패했어요.\n사진을 다시 업로드 해주세요."} />
        <Line style={styles.line} />
        <Guide1 style={styles.guide} />
        <TouchableOpacity>
          <Choice style={styles.choice} onPress={() => navigation.navigate('이미지 업로드')} />
        </TouchableOpacity>
        <Guide2 style={styles.guide} />
        <TouchableOpacity>
          <Choice2 style={styles.choice} onPress={() => navigation.navigate('커뮤니티')} />
        </TouchableOpacity>
        <Guide3 style={styles.guide3} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  line:{
    paddingVertical: 23,
  },
  guide: {
    marginBottom: 21,
    marginTop: 15,
  },
  choice: {
    marginBottom: 38,
  },
  guide3: {
    alignSelf: 'center', 
  },
});
