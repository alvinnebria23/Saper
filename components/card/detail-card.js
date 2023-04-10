import React from 'react';
import { StyleSheet } from 'react-native';
import { Flex, Center, Icon, Text } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BorderlessInput } from '../input';
const DetailCard = ({ onChange, iconName, label, value, style, withIcon = true, fontSize = "sm", isEditing = false, name }) => {
  return (
    <Flex direction="row" mt="1" style={{ ...styles.card, ...style }}>
        {withIcon && 
          <Center size="10">
            <Icon size={6} mb={4} color={'#FF4E00'} as={<MaterialCommunityIcons  name={iconName} />} />
          </Center>}
        <Center >
          <Flex pl={withIcon ? 0 : 5} pr={withIcon ? 0 : 5} direction='column'>
            <Text color={'gray.400'} fontSize="xs" >{label}</Text>
            {isEditing ? 
              <BorderlessInput onChange={onChange} label={label} value={value} name={name} /> :
              <Text pt={1.5} pb={1.6} fontSize={fontSize} >{value}</Text>
            }
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