import React from 'react';
import { StyleSheet } from 'react-native';
import { Flex, Center, Icon, Text } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const DetailCard = ({ iconName, label, value, style }) => {
  return (
    <Flex direction="row" mt="1" style={{ ...styles.card, ...style }}>
        <Center size="10">
          <Icon size={6} mb={4} color={'#FF4E00'} as={<MaterialCommunityIcons  name={iconName} />} />
        </Center>
        <Center >
          <Flex direction='column'>
            <Text color={'gray.400'} fontSize="xs" >{label}</Text>
            <Text>{value}</Text>
          </Flex>
        </Center>
    </Flex>
  );
};
const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 1,
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    borderRadius: 10
  }
});
export default DetailCard;