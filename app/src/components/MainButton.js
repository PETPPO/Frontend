import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function MainButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FC7E2F',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
