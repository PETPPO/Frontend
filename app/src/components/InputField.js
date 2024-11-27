import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function InputField({ placeholder, secureTextEntry, onChangeText, style }) {
  return (
    <TextInput
      style={[styles.input, style]}  
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 8,
    padding: 14,
    marginBottom: 15,
    width: '80%',
  },
});
