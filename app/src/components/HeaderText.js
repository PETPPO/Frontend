import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const HeaderText = ({ mainText }) => {
  return (
    <View>
      <Text style={styles.headerText}>{mainText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 37,
  },
});

export default HeaderText;
