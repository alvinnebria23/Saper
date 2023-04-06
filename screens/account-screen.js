import React from 'react';
import { View } from 'react-native';
import useAccount from '../hooks/useAccount.js';
import { Avatar, Center, Heading,Row, ScrollView, Text } from 'native-base';
import useCommon from '../hooks/useCommon.js';
import DetailCard from '../components/card/detail-card.js';
import LinkButton from '../components/button/LinkButton.js';
import { TextInput } from 'react-native';
const AccountScreen =  ({ navigation }) => {
  const { 
    userData, 
    setuserData, 
    accountInfoFields, 
    apiInfoFields, 
    subscriptionInfoFields, 
    onPress,
    isEditing,
  } = useAccount(navigation);
  const { formatName } = useCommon();
  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: "30%"}}>
        <Center>
          <Avatar size={'xl'} bg="#FF4E00" mb={2}>
              {userData.name[0].toUpperCase()}
          </Avatar>
          <Heading size={'xs'}>
            {formatName(userData.name)}
          </Heading>
          <LinkButton onPress={onPress.bind(this, 'logout')} text={'Log out'} style={{ marginTop: 10 }} />
        </Center>
      </View>
      <ScrollView>
        <View style={{ flex: 2, marginRight: 30, marginLeft: 30, marginTop: 30, marginBottom: '25%' }}>
          <Row mb={2}>
            <Heading size="xs" >Account Information</Heading>
            <LinkButton onPress={onPress.bind(this, 'edit')} text={isEditing ? 'Update' : 'Edit'} style={{ right: 0, position: 'absolute'}} />
          </Row>
          <View style={{ marginBottom: 20 }}>
            {accountInfoFields.map(({ label, value, iconName }) => (
              <DetailCard fontSize='xs' isEditing={isEditing} withIcon={false} key={label} label={label} value={value} iconName={iconName} />
            ))}
          </View>
          <Row>
            <Heading size="xs" mb={2} mt={2}>Affiliate Open API</Heading>
          </Row>
          <View style={{ marginBottom: 20 }}>
            {apiInfoFields.map(({ label, value, iconName }) => (
              <DetailCard fontSize='xs' isEditing={isEditing} withIcon={false} key={label} label={label} value={value} iconName={iconName} />
            ))}
          </View>
          <Heading size="xs" mb={2} mt={2}>Subscription</Heading>
          <View style={{ marginBottom: 20 }}>
            {subscriptionInfoFields.map(({ label, value, iconName }) => (
              <DetailCard fontSize='xs' withIcon={false} key={label} label={label} value={value} iconName={iconName} />
            ))}
          </View>
          <View style={{ marginTop: 10 }}>
            <Text fontSize={'xs'} style={{ color: 'red', fontWeight: '300' }}> Do you need support ?</Text>
            <Text fontSize={'xs'} style={{ fontWeight: '300'}}> Email us at customer@sapers.ph</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

export default AccountScreen;