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
    <HStack bg="primary.50" alignItems="center" safeAreaBottom>
      {BOTTOM_TAB_NAVIGATOR_OBJECT.map((item, index) => (
        <View key={item['name']} style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => onPressTab(index)}
            style={{
              backgroundColor: selected === index ? 'white' : '#FF4E00',
              flex: 1,
              height: buttonHeight
            }}
            onPressIn={() => fadeIn(index)}
            onPressOut={() => fadeOut(index)}
            extraButtonProps={{
              rippleColor: '#FF4E00',
            }}
          >
          <Animated.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', transform: [{ scale: selectedTab === index ? 1.2 : 1 }] }}>
              <Icon mb="1" as={<MaterialCommunityIcons name={item['iconName']} />} color={selected === index ? '#FF4E00' : 'white'} size={selected === index ? 'xl'  : 'md'}/>

            {selected !== index && (
              <Text color='white' fontSize="12">
                {capitalizeFirstLetter(item['name'])}
              </Text>
            )}
          </Animated.View>
          </TouchableOpacity>
        </View>
      ))}
    </HStack>
  );
};

export default BottomTabNavigator;
