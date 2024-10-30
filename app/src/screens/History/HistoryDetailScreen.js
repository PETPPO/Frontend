import { StyleSheet, ScrollView, View, Text, Image } from 'react-native';  
import HeaderText from '../../components/HeaderText';
import Line from '../../assets/images/icons/Line.svg';

export default function HistoryDetailScreen( ) {
  const imageUri = 'https://blog.malcang.com/wp-content/uploads/2024/02/2-20.png'; 

  return (
    <ScrollView>
      <View style={styles.container}> 
        <HeaderText mainText={"쿠키의 피부 질환\n결과가 나왔어요."} />
        <Line style={styles.line} />

        {/* 진단 결과 */}
        <View style={styles.sectionContain}>
          <Text style={styles.label}>진단 결과</Text>
          <ScrollView style={styles.textScroll}>
            <Text style={styles.diseaseResult}>감염성 피부염(으)로 의심돼요.</Text>
          </ScrollView>
        </View>

        {/* 세부 설명 */}
        <View style={styles.sectionContain}>
          <Text style={styles.label}>세부 설명</Text>
          <ScrollView style={styles.textScroll}>
            <Text style={styles.content}>블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~블라블라~~ 블라블라~~ 
            블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~블라블라~~ 
            블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~~ 블라블라~~ 블라블라~~ 블라블라~~블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~~</Text>
          </ScrollView>
        </View>

        {/* 건강 조치 */}
        <View style={styles.sectionContain}>
          <Text style={styles.label}>건강 조치</Text>
          <ScrollView style={styles.textScroll}>
            <Text style={styles.content}>블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~블라블라~~ 블라블라~~ 
            블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~블라블라~~ 
            블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~~ 블라블라~~ 블라블라~~ 블라블라~~블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~~
            </Text>
          </ScrollView>
        </View>

        {/* 업로드 된 이미지 */}
        <View style={styles.sectionContain}>
          <Text style={styles.label}>업로드 된 이미지</Text>
          <View style={styles.imageBox}>
            <Image 
              source={{ uri: imageUri }} 
              style={styles.image} 
              resizeMode="cover"
            />
          </View>
        </View>

        {/* 피부 상태 기록 */}
        <View style={styles.sectionContain2}>
          <Text style={styles.label}>피부 상태 기록</Text>
          <ScrollView style={styles.textScroll2}>
            <Text style={styles.historyContent}>
              블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~
              블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라~~ 블라블라
            </Text>
          </ScrollView>
        </View>

    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  line: {
    paddingVertical: 23,
  },
  sectionContain: {
    marginBottom: 50,
  },
  sectionContain2: {
    marginBottom: 25,
    flex: 1, // 스크롤을 위해 flex 1 사용
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6F4E37',
  },
  textScroll: {
    maxHeight: 150, 
  },
  textScroll2: {
    maxHeight: 200, 
    flexGrow: 1, // 스크롤이 가능하도록 공간을 최대한 활용
  },
  diseaseResult: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 17,
  },
  historyContent: {
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#C3C3C3',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
  },
  imageBox: {
    borderWidth: 2,
    borderColor: '#6F4E37',
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
