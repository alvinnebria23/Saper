import { Center, Modal } from 'native-base';
import React from 'react';
import { Text, ActivityIndicator, StyleSheet } from 'react-native';

const CustomModalSpinner = ({ message = "Please wait..."}) => {

  return (
    <Modal isOpen={true}>
        <Center style={styles.modal}>
        <ActivityIndicator size="large" color="#FF4E00" />
          <Text style={styles.text}>
              {message}
          </Text>
        </Center>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    height: '15%',
    marginTop: '75%',
    marginRight: '30%',
    marginLeft: '30%'
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
  },
});

export default CustomModalSpinner;