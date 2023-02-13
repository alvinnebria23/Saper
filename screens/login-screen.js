import React, { useState } from 'react';
import { Button, Text, Row, Column, Image  } from 'native-base';
import { RoundedButton } from '../components/button';
import { View } from 'react-native';
import { onPress, onChangeText } from '../hooks/useLogin';
import { CENTER_VIEW, BOTTOM_VIEW  } from '../constants/view-component-styles.js';
import { LeftIconInput } from '../components/input';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <View style={CENTER_VIEW}>
        <Column space={2} alignItems="center">
            <Image 
                source={require('../assets/sapers-logo-edited.png')}
                size={'2xl'}
                alt={'Sapers Logo'}
            />
            <LeftIconInput 
                name={'username'}
                placeholder={'Username'}
                onChangeText={onChangeText.bind(this, 'username')}
                icon={'person'}
            />
            <LeftIconInput 
                name={'password'}
                placeholder={'Password'}
                onChangeText={onChangeText.bind(this, 'password')}
                icon={'lock-closed'}
            />
        </Column>
        <RoundedButton text={'Log in'} onPress={onPress} />
        <View style={BOTTOM_VIEW}>
            <Row alignItems={'center'}>
                <Text color={'gray.500'}>Don't have account yet ?</Text>
                <Button variant={'link'} colorScheme={'red'}> Register </Button>
            </Row>
        </View>
    </View>
  );
};

export default LoginScreen;