import React, { useState, useEffect } from 'react';
import { View, useWindowDimensions } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { 
  Button, 
  Column, 
  Heading, 
  Icon, 
  KeyboardAvoidingView, 
  Row, 
  ScrollView, 
  TextArea, 
  Text, 
  Input, 
  IconButton, 
  InputGroup, 
  InputLeftAddon,
  Modal,
  Divider,  
} from 'native-base';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Controller, useForm } from 'react-hook-form';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { DEFAULT_SUBIDS } from '../constants/conversion-report-constants';
import { generateAndSaveLink, retrieveGeneratedLinks } from '../api/LinkApi';
import { CARD_VIEW } from '../constants/view-component-styles.js';
import { formatDateToString } from '../util/DateUtil';


const GenerateLinkScreen =  ({ navigation, setIsLoading }) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [originalUrl, setOriginalUrl] = useState([]);
  const [subIds, setSubIds] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [generatedLinks, setGeneratedLinks] = useState([]);
  const [retrievedLinks, setRetrievedLinks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [routes] = useState([
    { key: 'first', title: 'Convert' },
    { key: 'second', title: 'History' },
  ]);

  useEffect(() => {
    const retrieveLinks = async () => {
      setIsLoading(true);
      setRetrievedLinks(await retrieveGeneratedLinks());
      setIsLoading(false);
    };
    retrieveLinks();
  }, [])

  const { control, setValue } = useForm();
  
  const addSubId = () => {
    if(subIds.length < 5){
      const newSubId = subIds.length + 1;
      setSubIds([...subIds, newSubId]);
    }
  }
  const removeSubId = (subIdToRemove) => {
    const updatedSubIds = subIds.filter((subId) => subId !== subIdToRemove);
    setValue(`subId-${subIdToRemove}`, "");
    setSubIds(updatedSubIds);
  }
  const clearAll = (formValues) => {
    for (const key in formValues){
      setValue(key, "");
    }
    setIsError(false);
    setOriginalUrl([]);
    setSubIds([]);
  }
  const pasteFromClipboard = async () => {
    if(originalUrl.length === 5){
      setIsError(true);
      setErrorMessage('Please input 1 - 5 shopee links only.')
      return;
    }
    const text = await Clipboard.getStringAsync();
    if(!text.startsWith('https://shopee.ph/') && !text.startsWith('https://shopee.ee/')){
      setIsError(true);
      setErrorMessage('Please input valid shopee link.');
    }
    const originalUrlString = originalUrl?.length > 0 ? originalUrl?.join(`\n`) + `\n` : "";
    setValue("originalUrl",  originalUrlString + text);;
    setOriginalUrl([...originalUrl, text.trim()]);
  }
  const onPressConvert = async (formValues) => {
    if(originalUrl.length == 0){
      setIsError(true);
      setErrorMessage('Please input 1 - 5 shopee links only.')
      return;
    }
    setIsLoading(true);
    for(const link of originalUrl){
      if(!link.startsWith('https://shopee.ph/') && !link.startsWith('https://shopee.ee/')){
        setIsError(true);
        setErrorMessage('Please input valid shopee link.');
        setIsLoading(false);
        return;
      }
    }
    const subIdValuesArray = [];
    for(const subid of DEFAULT_SUBIDS){
      const value = formValues[`subId-${subid}`] || "";
      subIdValuesArray.push(value);
    }
    const response = await generateAndSaveLink(originalUrl, subIdValuesArray);
    setGeneratedLinks(response.shopeeLinks);
    setModalVisible(true);
    setIsError(false);
    setIsLoading(false);
  }
  const onPressCopyAll = () => {
    Clipboard.setStringAsync(generatedLinks.join(`\n`));
    setModalVisible(false);
  }
  const ConvertRoute = () => (
    <KeyboardAvoidingView style={{ flex: 1, marginRight: '5%', marginLeft: '5%' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
            onPress={clearAll.bind(this, control._formValues)}
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
            <Column marginBottom={'10%'}>
              <InputGroup>
                <TextArea 
                  width={'100%'}
                  padding={0}
                  fontSize={10}
                  onChangeText={onChange} 
                  mt={'2%'} 
                  value={value} 
                  placeholder={`  If you wish to convert multiple links, please input up to 5 links in different lines\n\nExample:\nhttps://shopee.ph/sapers/firstLink\nhttps://shopee.ph/sapers/secondLink`}
                  rightElement={ <IconButton 
                    size={'sm'} 
                    style={{ right: 0,  bottom: 0, position: 'absolute' }}
                    colorScheme="gray" 
                    key={'iconButton'} 
                    variant={'ghost'} 
                    _icon={{
                      as: MaterialCommunityIcons,
                      name: "content-paste"
                    }}
                    onPress={pasteFromClipboard}
                  />}
                />
              </InputGroup>
              {isError && <Text style={{ color: 'red', fontSize: 10}}> * {errorMessage}</Text>}
            </Column>
          )
        }}/>
        {subIds.map((subId) => {
          return (
            <Controller
              key={subId}
              name={`subId-${subId}`}
              control={control}
              render={({ field : { onChange, value }}) => {
                value = value ? value : "";
                return (
                  <View>
                  <Column>
                    <InputGroup marginRight={'24%'} marginBottom={'5%'} >
                        <InputLeftAddon                           
                          children={`Sub Id ${subId}`} 
                          height={8} 
                          pt={0} 
                          pb={0}
                        />
                        <Input w={'90%'} height={8} value={value} onChangeText={onChange}/>
                        {subId === subIds.length && 
                          <IconButton 
                          size={'sm'} 
                          colorScheme="gray" 
                          key={'iconButton'} 
                          variant={'ghost'} 
                          _pressed={{
                            bgColor: 'white'
                          }}
                          _icon={{
                            as: AntDesign,
                            name: "delete"
                          }}
                          onPress={removeSubId.bind(this, subId)}
                        />}
                    </InputGroup>
                  </Column>
                  </View>
                )
            }}/>)
        })}
        
        <View style={{ marginBottom: '5%' }}>
          <Button 
            size={'sm'} 
            colorScheme={'gray'}
            leftIcon={<Icon as={AntDesign} name="plus" size={'xs'} />}
            width={'40%'}
            variant={'link'}
            onPress={addSubId}
          >
            {`Add Sub Id (${subIds?.length}/5)`}
          </Button>
        </View>
        <View  marginBottom={'20%'}>
          <Button colorScheme={'orange'} size={'md'} onPress={onPressConvert.bind(this, control._formValues)}>
            Convert
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
  
  const HistoryRoute = () => (
    <Column style={{ flex: 1, marginBottom: '20%' }}>
      <View style= {{ marginRight: '5%', marginLeft: '5%' }}>
      <Input 
        variant="outline" 
        placeholder="Search link name" 
        mt={'5%'}
        mb={'5%'}
        InputLeftElement={<Icon as={AntDesign} name="search1" size={'md'} ml={'5%'} />}
      />
      </View>
      <ScrollView>
        {retrievedLinks?.length > 0 && retrievedLinks.map((link) => (
          <Row style={CARD_VIEW} key={link?.name}>
              <Column flex={1}>
                <Text fontWeight={'semibold'}>{link?.name}</Text>
                <Text fontWeight={'light'} style={{ fontSize: 12 }}>{link?.shortLink}</Text>
                <Text style={{ fontSize: 10, marginTop: '5%', color: 'green' }}> 
                  Created at: {formatDateToString(new Date(link?.createdAt))}
                </Text>
              </Column>
              <Row flex={0} alignItems={'center'} margin={0}>
                <View>
                  <IconButton colorScheme="gray" key={'delete'} size={'sm'} variant={'ghost'} _icon={{
                    as: AntDesign,
                    name: "delete"
                  }} />
                </View>
                <View>
                  <IconButton colorScheme="gray" key={'copy'} size={'sm'} variant={'ghost'} _icon={{
                    as: AntDesign,
                    name: "copy1"
                  }} />
                </View>
              </Row>
          </Row>
        ))}
      </ScrollView>
    </Column>
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
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} avoidKeyboard size="lg">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Generated Short Link</Modal.Header>
          <Modal.Body>
            <TextArea 
              width={'100%'}
              padding={0}
              fontSize={10}
              value={generatedLinks.join(`\n`)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button colorScheme={'orange'} flex="1" onPress={onPressCopyAll}>
              Copy All
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <View>
          <Heading ml='5%' mt='5%' size='md' color={'primary.50'}>Shopee Affiliate Link</Heading>
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