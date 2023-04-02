import React, { useState } from 'react';
import { Text, Icon, HStack, Center, Pressable, View } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BOTTOM_TAB_NAVIGATOR_OBJECT } from '../../constants/bottom-navigator-constants';
import useCommon from '../../hooks/useCommon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Animated, Dimensions } from 'react-native';

const BottomTabNavigator = ({ navigation, onPressTab, selected }) => {
  const { capitalizeFirstLetter } = useCommon();
  const screenHeight = Dimensions.get('screen').height;
  const buttonHeight = screenHeight * 0.07;
  const [animated, setAnimated] = useState(BOTTOM_TAB_NAVIGATOR_OBJECT.map(() => new Animated.Value(1)));
  const [selectedTab, setSelectedTab] = useState(null);
  const fadeIn = (index) => {
    setSelectedTab(index);
    Animated.timing(animated[index], {
      toValue: 1.2,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  
  const fadeOut = (index) => {
    setSelectedTab(null);
    Animated.timing(animated[index], {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <HStack bg="white" alignItems="center" safeAreaBottom style= {{ elevation: 24 }}>
      {BOTTOM_TAB_NAVIGATOR_OBJECT.map((item, index) => (
        <View key={item['name']} style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => onPressTab(index)}
            style={{
              backgroundColor: 'white',
              flex: 1,
              height: buttonHeight,
            }}
            onPressIn={() => fadeIn(index)}
            onPressOut={() => fadeOut(index)}
            extraButtonProps={{
              rippleColor: 'white',
            }}
          >
          <Animated.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', transform: [{ scale: selectedTab === index ? 1.2 : 1 }] }}>
              <Icon mb="1" as={
                <MaterialCommunityIcons 
                  name={selected === index ? item['selectedIconName'] : item['iconName']} />} 
                  color={selected === index ? '#FF4E00' : 'gray.300'} 
                  size={selected === index ? 'xl'  : 'md'}
                />
                <Text fontWeight={selected === index ? 'extrabold' : 'normal'} color={selected === index ? '#FF4E00' : 'gray.300'} fontSize="12">
                  {capitalizeFirstLetter(item['name'])}
                </Text>
          </Animated.View>
          </TouchableOpacity>
        </View>
      ))}
    </HStack>
  );
};

export default BottomTabNavigator;
