import React from 'react';
import { View } from 'react-native';
import useAccount from '../hooks/useAccount.js';
import { Alert, Avatar, Button, Center, Heading, Input, Modal,Row, ScrollView, Text } from 'native-base';
import DetailCard from '../components/card/detail-card.js';
import LinkButton from '../components/button/LinkButton.js';
import { useForm, Controller } from 'react-hook-form';
import { formatName } from '../util/CommonUtil.js';
const AccountScreen =  ({ navigation, setIsLoading }) => {
  const { control, setValue } = useForm();
  const { 
    userData,
    accountInfoFields, 
    apiInfoFields, 
    subscriptionInfoFields, 
    onPress,
    isEditing,
    CHANGE_PASSWORD_FIELDS,
    modalVisible,
    setModalVisible,
    errorMessage,
    isError,
    modalType,
  } = useAccount(navigation, setValue, setIsLoading);
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <Modal 
        closeOnOverlayClick={false} 
        isOpen={modalVisible} 
        onClose={() => setModalVisible(false)} 
        avoidKeyboard 
        size={'xl'}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{modalType === 'password' ? 'Change Password' : 'Update Secret key'}</Modal.Header>
          <Modal.Body>
            {modalType === 'password' ? CHANGE_PASSWORD_FIELDS.map(({ name, label }) => {
              return (
                <Controller 
                  key={name}
                  name={name}
                  control={control}
                  render={({ field: { onChange, value }}) => {
                    return (
                      <Row key={name}>
                        <Input mt={1} 
                          placeholder={label} 
                          w={'100%'} 
                          type={'password'} 
                          onChangeText={onChange} 
                          value={value} 
                        />
                      </Row>
                    )
                  }} 
                />
              )
            }) :
            <Controller 
                key={'secretKey'}
                name={'secretKey'}
                control={control}
                render={({ field: { onChange, value }}) => {
                  return (
                    <Row key={'secretKey'}>
                      <Input mt={1} 
                        placeholder={'Secret Key'}
                        w={'100%'} 
                        type={'password'} 
                        onChangeText={onChange} 
                        value={value} 
                      />
                    </Row>
                  )
                }} 
              />
            }
            {isError && 
            <Alert w={'100%'} status={'error'} m={0} variant={'outline-light'} mt={'5%'}>
              <Row space={3}>
                <Alert.Icon mt="1" />
                <Text style={{ fontSize: 10 }}>
                  {errorMessage}
                </Text>
              </Row>
            </Alert>}
          </Modal.Body>
          <Modal.Footer>
            <Button 
              colorScheme={'orange'} 
              flex="1" 
              onPress={onPress.bind(this, modalType === 'password' ?  'updatePassword' : 'updateSecretKey', control?._formValues)}
              marginRight={1}
            >
              Update
            </Button>
            <Button 
              colorScheme={'gray'} 
              flex="1" 
              onPress={onPress.bind(this, 'cancel')}
              marginLeft={1}
              variant={'subtle'}
            >
              CANCEL
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <View style={{ marginTop: "10%"}}>
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
        <View style={{ flex: 2, marginRight: 30, marginLeft: 30, marginTop: 30, marginBottom: '25%' }}>
          <Row mb={2}>
            <Heading size="xs" >Account Information</Heading>
            <LinkButton onPress={onPress.bind(this, 'edit', control._formValues)} text={isEditing ? 'Update' : 'Edit'} style={{ right: 0, position: 'absolute'}} />
          </Row>
          <View style={{ marginBottom: 20 }}>
            {accountInfoFields.map(({ name, label, value: initialValue, iconName }) => {
                return (
                  <Controller 
                    key={name}
                    name={name}
                    control={control}
                    render={({ field: { onChange, value }}) => {
                      if(name === 'contactNumber'){
                        value = value?.replace(/[^0-9]/g, '');
                      }
                      if(name === 'fullName'){
                        value = value?.replace(/[1230-9]/g, '');
                      }
                      if(!isEditing){
                        value = initialValue;
                      }
                      return (
                        <DetailCard 
                          onChange={onChange} 
                          fontSize='xs' 
                          isEditing={['email', 'password'].includes(name) ? false : isEditing} 
                          withIcon={false} 
                          key={label} 
                          label={label} 
                          value={value} 
                          name={name}
                          iconName={iconName} 
                        />
                      )
                    }} 
                  />
                );
              })}
            <Center mt={3}>
              <LinkButton 
                onPress={onPress.bind(this, 'password')} 
                text={'Change password'} 
              />
            </Center>
          </View>
          <Row>
            <Heading size="xs" mb={2} mt={2}>Affiliate Open API</Heading>
          </Row>
          <View style={{ marginBottom: 20 }}>
            {apiInfoFields.map(({ name, label, value: initialValue, iconName }) => {
              return (
                <Controller 
                  key={name}
                  name={name}
                  control={control}
                  render={({ field: { onChange, value }}) => {
                    if(!isEditing){
                      value = initialValue;
                    }
                    return (
                      <DetailCard 
                        onChange={onChange} 
                        fontSize='xs' 
                        isEditing={false} 
                        withIcon={false} 
                        key={label} 
                        label={label} 
                        value={value} 
                        name={name}
                        iconName={iconName} 
                      />
                    )
                  }} 
                />
              );
            })}
            <Center mt={3}>
              <LinkButton 
                onPress={onPress.bind(this, 'secretKey')} 
                text={'Change secret key'} 
              />
            </Center>
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
  );
};

export default AccountScreen;