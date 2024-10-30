import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function InputField({ placeholder, secureTextEntry, onChangeText, style }) {
  return (
    <TextInput
      style={[styles.input, style]}  // 외부 스타일과 기본 스타일 병합
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
