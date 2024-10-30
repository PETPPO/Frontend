import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function CustomModal({ isVisible, onClose, message, message2, headerText, cancel, confirm, onConfirm }) {
  return (
    <Modal transparent={true} visible={isVisible} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.headerText}>{headerText}</Text>
          <Text style={styles.modalText}>{message}</Text>
          <Text style={styles.modalUnderText}>{message2}</Text>
          <View style={styles.buttonContainer}>
            {cancel && (
              <TouchableOpacity style={styles.button} onPress={onClose}>
                <Text style={styles.cancelText}>{cancel}</Text>
              </TouchableOpacity>
            )}
            {confirm && (
              <TouchableOpacity style={styles.button} onPress={onConfirm}>
                <Text style={styles.confirmText}>{confirm}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 340,
    height: 153,
    padding: 25,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  headerText: {
    fontSize: 20,
    padding: 15,
    color: '#black',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  modalText: {
    fontSize: 15,
    textAlign: 'left',  
    marginTop: 40, 
    marginBottom: 1,
  },  
  modalUnderText: {
    fontSize: 15,
    textAlign: 'left',  
  },  
  buttonContainer: {
    position: 'absolute',
    right: 20,  
    bottom: 17,  
    flexDirection: 'row', 
  },
  cancelText: {
    color: '#848383',
    fontSize: 16,
    paddingRight: 15,
  },
  confirmText: {
    color: '#FC7E2F',
    fontSize: 16,
  },
});