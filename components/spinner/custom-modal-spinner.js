import { Row } from 'native-base';
import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal } from 'react-native';

const CustomModalSpinner = ({ message }) => {

  return (
      <View style={styles.modal}>
        <Row>
          <ActivityIndicator size="large" color="#FF4E00" />
          <Text style={styles.text}>
              {message}
          </Text>
        </Row>
      </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    height: '15%',
    marginTop: '75%',
    marginLeft: '5%',
    marginRight: '5%',
    zIndex: 1,

  },
  text: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    margin: 30,
  },
});

export default CustomModalSpinner;