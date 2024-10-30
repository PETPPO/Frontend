import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Button({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FC7E2F',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 12,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
