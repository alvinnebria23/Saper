import React from 'react';
import { Text, Icon, HStack, Center, Pressable } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BOTTOM_TAB_NAVIGATOR_OBJECT } from '../../constants/bottom-navigator-constants';
import useCommon from '../../hooks/useCommon';
import useBottomNavigator from '../../hooks/useBottomNavigator';
const BottomTabNavigator = ({ navigation }) => {
  const { selected, onPressTab } = useBottomNavigator();
  const { capitalizeFirstLetter } = useCommon();
  return (
    <HStack bg="#FF4E00" alignItems="center" safeAreaBottom shadow={6}>
      {BOTTOM_TAB_NAVIGATOR_OBJECT.map((item, index) => (
        <Pressable  
          bg={selected === index ? 'white' : '#ffa780'} 
          key={item['name']} 
          cursor="pointer" 
          opacity={selected === index ? 1 : 0.5} 
          py="3" 
          flex={1} 
          onPress={onPressTab.bind(this, index)}
        >
          <Center>
            <Icon mb="1" as={<MaterialCommunityIcons name={item['iconName']} />} color={selected === index ? '#FF4E00' : 'white'} size="md" />
            <Text color={selected === index ? '#FF4E00' : 'white'} fontSize="12">
              {capitalizeFirstLetter(item['name'])}
            </Text>
          </Center>
        </Pressable>
      ))}
    </HStack>
  );
};

export default BottomTabNavigator;