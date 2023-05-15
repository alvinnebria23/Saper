import React, { useState } from 'react';
import { View, useWindowDimensions, FlatList } from 'react-native';
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
  Checkbox,
  useToast,
} from 'native-base';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Controller, useForm } from 'react-hook-form';
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { DEFAULT_SUBIDS } from '../constants/conversion-report-constants';
import { generateAndSaveLink, removeLinks, retrieveGeneratedLinks, updateLink } from '../api/LinkApi';
import { CARD_VIEW } from '../constants/view-component-styles.js';
import { formatDateToString } from '../util/DateUtil';
import { ImageLogo } from '../components/image';


const GenerateLinkScreen =  ({ navigation, setIsLoading }) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [subIds, setSubIds] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [generatedLinks, setGeneratedLinks] = useState([]);
  const [retrievedLinks, setRetrievedLinks] = useState([]);
  const [cloneLinks, setCloneLinks] = useState([]);
  const [modalType, setModalType] = useState('generate');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const selectedLinkIds = [];
  const toast = useToast();
  const [routes] = useState([
    { key: 'first', title: 'Convert' },
    { key: 'second', title: 'History' },
  ]);

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
    setSubIds([]);
  }
  const pasteFromClipboard = async (originalUrlString) => {
    setIsError(false);
    const text = await Clipboard.getStringAsync();
    if(!text.startsWith('https://shopee.ph/') && !text.startsWith('https://shopee.ee/')){
      setIsError(true);
      setErrorMessage('Please input valid shopee link.');
      return;
    }
    originalUrlString = originalUrlString ? originalUrlString + "\n" : "";
    setValue("originalUrl",  originalUrlString + text);
  }
  const onPressConvert = async (formValues) => {
    setIsError(false);
    const originalUrls = formValues.originalUrl?.split("\n");
    if(!originalUrls || originalUrls.length === 0 || originalUrls.length > 5){
      setIsError(true);
      setErrorMessage('Please input 1 - 5 shopee links only.')
      return;
    }
    setIsLoading(true);
    for(const link of originalUrls){
      if(link.length > 255){
        setIsError(true);
        setErrorMessage('Link too long. Please check the links or the format while inputting multiple links.');
        setIsLoading(false);
        return;
      }
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
    const response = await generateAndSaveLink(originalUrls, subIdValuesArray);
    setGeneratedLinks(response.shopeeLinks);
    setModalType('generate');
    setModalVisible(true);
    setIsError(false);
    setIsLoading(false);
  }
  const onPressFooterButton = async (type, { rename: inputValue }) => {
    if(type === 'secondary'){
      setModalVisible(false);
      return;
    }
    if(modalType === 'generate'){
      Clipboard.setStringAsync(generatedLinks.join(`\n`));
      clearAll(control?._formValues);
      setModalVisible(false);
    }else{
      setIsLoading(true);
      const tempLinks = [...retrievedLinks];
      const updatedLinkArray = tempLinks.map((link) => {
        if(link.id === selectedId){
          return {
            ...link,
            name: inputValue
          }
        }
        return link;
      });
      setRetrievedLinks([...updatedLinkArray]);
      setCloneLinks([...updatedLinkArray]);
      setModalVisible(false);
      await updateLink({name:inputValue}, { id: selectedId })
      setIsLoading(false);
    } 
  }
  const onPressDeleteSelected = async () => {
    setIsLoading(true);
    const tempLinks = [...retrievedLinks].filter((link) => !selectedLinkIds.includes(link.id))
    setRetrievedLinks([...tempLinks]);
    setCloneLinks([...tempLinks]);
    await removeLinks({id: selectedLinkIds })
    setIsLoading(false);
  }

  const onChange = async (id) => {
    if(selectedLinkIds.includes(id)){
      const index = selectedLinkIds.findIndex((num) => num === id);
      selectedLinkIds.splice(index, 1);
    }else{
      selectedLinkIds.push(id);
    }
  }
  const onPressCancel = () => {
    selectedLinkIds.splice(0, selectedLinkIds.length)
    setRetrievedLinks([...retrievedLinks]);
  }
  const onPressCopy = (shortLink) => {
    Clipboard.setStringAsync(shortLink);
    toast.show({
      title: `\t\tCopied to clipboard\n ${shortLink}`,
      placement: "bottom"
    })
  }
  const onPressEdit = (shortLinkName, id) => {
    setModalType('rename');
    setValue('rename', shortLinkName);
    setSelectedId(id);
    setModalVisible(true);
  }
  const onIndexChange = async (newIndex) => {
    if(newIndex === 1){
      setIsLoading(true);
      const tempLinks = await retrieveGeneratedLinks();
      setRetrievedLinks([...tempLinks]);
      setCloneLinks([...tempLinks]);
      setIsLoading(false);
    }
    setIndex(newIndex);
  }
  const onPressSearchBarButton = (value) => {
    if(retrievedLinks?.length === 0){
      setRetrievedLinks([...cloneLinks]);
      setValue('search', "");
      return;
    }
    if(value === ""){
      setRetrievedLinks([...cloneLinks]);
      return;
    }
    const tempArray = [...cloneLinks].filter((link) => link.name === value);
    setRetrievedLinks([...tempArray]);
  }
  const renderItem = ({ item }) => {
    return (
      <View 
        style={CARD_VIEW} 
        key={item.id}
      >
        <Row>
          <Column flex={1}>
            <Text fontWeight={'semibold'}>{item?.name}</Text>
            <Text fontWeight={'light'} style={{ fontSize: 12 }}>{item?.shortLink}</Text>
            <Text style={{ fontSize: 10, marginTop: '5%' }}> 
              Created at: {formatDateToString(new Date(item?.createdAt))}
            </Text>
          </Column>
          <Column flex={0} alignItems={'center'} margin={0}>
            <View style={{ position: 'absolute', right: 0, top: 0 }}>
              <Checkbox 
                aria-label={`${item.id}`} 
                value={item.id} 
                onChange={onChange.bind(this, item.id)}
                colorScheme={'orange'}
                margin={1}
              />
            </View>
            <Row style={{ position: 'absolute', right: 0, bottom: 0}}>
                <IconButton 
                  colorScheme="gray" 
                  key={'edit'} 
                  size={'md'} 
                  variant={'ghost'} 
                  padding={1}
                  onPress={onPressEdit.bind(this, item.name, item.id)}
                  _icon={{
                  as: Feather,
                  name: "edit"
                }} />
                <IconButton 
                  colorScheme="gray" 
                  key={'copy'} 
                  size={'md'} 
                  variant={'ghost'} 
                  padding={1}
                  onPress={onPressCopy.bind(this, item?.shortLink)}
                  _icon={{
                  as: AntDesign,
                  name: "copy1"
                }} />
            </Row>
          </Column>
        </Row>
      </View>
    )
  };
  const keyExtractor = (item) => item.id.toString();

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
                  placeholder={`  If you wish to convert multiple links, please input up to 5 links in different lines\n\nExample:\nhttps://shopee.ph/sapers/first-link\nhttps://shopee.ph/sapers/second-link`}
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
                    onPress={pasteFromClipboard.bind(this, control._formValues.originalUrl)}
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
      <Row style= {{ marginRight: '5%', marginLeft: '5%' }}>
        <Controller
          key={'search'}
          name={'search'}
          control={control}
          render={({ field : { onChange, value }}) => {
            return (
              <Input 
                variant="outline" 
                placeholder="Search link name" 
                mt={'5%'}
                width={'100%'}
                value={value}
                onChangeText={onChange}
                InputRightElement={  
                <IconButton 
                  colorScheme={'gray'} 
                  key={'edit'} 
                  size={'md'} 
                  variant={'ghost'} 
                  onPress={onPressSearchBarButton.bind(this, control?._formValues?.search)}
                  _icon={{
                    as: Ionicons,
                    name: retrievedLinks?.length  === 0 ? 'refresh' : 'search-outline'
                  }} />}
              />)
          }}
        />
      </Row>
      <Button.Group isAttached style= {{ marginRight: '5%', marginLeft: '5%', marginBottom: '5%' }}>
        <Button variant={'subtle'} colorScheme={'red'} width={'50%'} onPress={onPressDeleteSelected}>
          DELETE SELECTED
        </Button>
        <Button variant={'subtle'} colorScheme={'gray'} width={'50%'} onPress={onPressCancel}>
          UNSELECT ALL
        </Button>
      </Button.Group>
      <FlatList
        data={retrievedLinks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
      />
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
    <>
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} avoidKeyboard size="xl">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{modalType === 'generate' ? 'Generated Short Link' : 'Rename link'}</Modal.Header>
          <Modal.Body>
           {modalType === 'generate' ?
              <TextArea 
                width={'100%'}
                padding={0}
                fontSize={10}
                value={generatedLinks.join(`\n`)}
              /> :
                 <Controller
                  key={'rename'}
                  name={'rename'}
                  control={control}
                  render={({ field : { onChange, value }}) => {
                    return (<Input value={value} onChangeText={onChange}/>)
                  }}
                />
           }
          </Modal.Body>
          <Modal.Footer>
            <Button 
              colorScheme={'orange'} 
              flex="1" 
              onPress={onPressFooterButton.bind(this, 'primary', control?._formValues)}
              marginRight={1}
            >
              {modalType === 'generate' ? 'COPY ALL TO CLIPBOARD' : 'RENAME'}
            </Button>
            {modalType !== 'generate' && 
            <Button 
              colorScheme={'gray'} 
              flex="1" 
              onPress={onPressFooterButton.bind(this, 'secondary')}
              marginLeft={1}
              variant={'subtle'}
            >
              CANCEL
            </Button>}
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    <View width="100%" height={'100%'}>
      <Row alignItems={'center'} marginRight={'4%'}>
        <Heading 
          ml='5%' 
          mt='5%' 
          mb={'4%'} 
          size='md' 
          color={'primary.50'}
        >
          Shopee Affiliate Link
        </Heading>
        <ImageLogo 
          mb={0}  
          source={require('../assets/saper-icon.png')} 
          size={'2xs'}
          style={{ right: 0 , position: 'absolute' }}
        />
      </Row>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={onIndexChange}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
  </>
  );
};

export default GenerateLinkScreen;