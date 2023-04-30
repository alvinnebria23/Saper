import React, { useState } from 'react';
import { View, useWindowDimensions, Text } from 'react-native';
import { Button, Column, Heading, Icon, KeyboardAvoidingView, Row, ScrollView, TextArea } from 'native-base';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Controller, useForm } from 'react-hook-form';
import { AntDesign } from '@expo/vector-icons';


const GenerateLinkScreen =  ({ navigation }) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [originalUrl, setOriginalUrl] = useState('');
  const [subIds, setSubIds] = useState([]);
  const [routes] = useState([
    { key: 'first', title: 'Convert' },
    { key: 'second', title: 'History' },
  ]);

  const { control, setValue } = useForm();
  
  const ConvertRoute = () => (
    <ScrollView style={{ flex: 1, marginRight: '5%', marginLeft: '5%' }}>
      <Row alignItems={'center'} mt={'5%'}>
        <View style={{ flex: 1 }}>
          <Heading size={'xs'} fontWeight={'light'}>Shopee Link</Heading>
        </View>
        <View style={{ flex: 0 }}>
          <Button 
              variant={'link'} 
              colorScheme={'gray'} 
              size={'xs'} 
              pr={0}
              leftIcon={<Icon as={AntDesign} name="delete" size={'sm'} />}
            >
            Clear All
          </Button>
        </View>
      </Row>
      <Controller
        key={'originalUrl'}
        name={'originalUrl'}
        control={control}
        render={({ field : { onChange, value }}) => {
          return (
            <Column mb={'60%'}>
              <TextArea  
                onChangeText={onChange} 
                mt={'2%'} 
                value={value} 
                placeholder='Paste shopee link here ...'
              />
              <Button 
                size={'sm'} 
                colorScheme={'gray'}
                leftIcon={<Icon as={AntDesign} name="plus" size={'xs'} />}
                width={'40%'}
                variant={'link'}
              >
                {`Add Sub Id (2/5)`}
              </Button>
            </Column>
          )
        }}/>
        <KeyboardAvoidingView>
          <Button 
            colorScheme={'orange'} 
            size={'md'} 
            style={{ 
              bottom: 0, 
              position: 'absolute', 
              width: '100%'
            }}>
            Convert
          </Button>
        </KeyboardAvoidingView>
    </ScrollView>
  );
  
  const HistoryRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
  );
  
  const renderScene = SceneMap({
    first: ConvertRoute,
    second: HistoryRoute,
  });
  
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#FF4E00' }}
      style={{ backgroundColor: 'white' }}
      renderLabel={({ route }) => (
        <Text style={{ color: '#FF4E00', margin: 8 }}>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <View width="100%" height={'100%'}>
      <View>
          <Heading ml='5%' mt='5%' size='md' color={'primary.50'}>Short Link</Heading>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

export default GenerateLinkScreen;