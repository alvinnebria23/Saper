import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
const ClickReportScreen =  ({ navigation }) => {
  async function pickDocument() {
    try {
      const { type, uri: csvUri, name } = await DocumentPicker.getDocumentAsync({
        type: "text/comma-separated-values",
        copyToCacheDirectory: false,
      });
      if(type === 'success'){
        const content = await FileSystem.readAsStringAsync(csvUri, { encoding: FileSystem.EncodingType.UTF8, });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View flex={1} style={{ backgroundColor: 'white'}}>
        <TouchableOpacity onPress={pickDocument}>
            <Text>Select Document</Text>
        </TouchableOpacity>
    </View>
  );
};

export default ClickReportScreen;