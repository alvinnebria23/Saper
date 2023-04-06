import React  from 'react';
import {  Box, Text, Icon, HStack, Center, Heading, VStack, Divider } from 'native-base';
import { View, FlatList, ScrollView, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DashboardCardView } from '../components/card';
import { RangeDatePickerModal } from '../components/modal';
import { DASHBOARD_CARD_STYLE, EMPTY_DASHBOARD_VALUE } from '../constants/dashboard-constants';
import useDashboard from '../hooks/useDashboard';
const DashboardScreen = ({ navigation, dashboardFilterDate, setDashboardFilterDate, dashboardData, isLoading, topFiveSubIds }) => {
    const { showDatePicker, setShowDatePicker, onRequestClose, onSelectDateRange }= useDashboard(setDashboardFilterDate);
    const keyExtractor = (item) => item.id;
    const renderItem = ({item}) => {
        return (
            <View key={item.id} style={{...DASHBOARD_CARD_STYLE.card}}>
                <DashboardCardView type={item.type} name={item.name} value={item.value} isLoading={isLoading} />
            </View>
        )
    };
    const renderDatePicker = () => {
        return (
            <RangeDatePickerModal 
                showDatePicker={showDatePicker} 
                onRequestClose={onRequestClose}
                onSelectDateRange={onSelectDateRange}
            />
        )
    };
    const renderSubIds = () => {
        return (
            <VStack>
              <Center mt={'2'} mb={'2'}>
                <Text fontWeight={'bold'} color={'black'} mb={2}> Top 5 Sub-ID {'(Commission)'}</Text>
                <Divider/>
              </Center>
                {topFiveSubIds.map((item, index) => (
                    <HStack key={index}>
                            <Text flex={1} key={Math.random()}>{`${index + 1}. ${item.subId}`}</Text>
                            <Text style={{ right: 0 , position: 'absolute', marginRight: '4%'}} flex={1} key={Math.random()}>&#8369;{` ${item.totalCommission}`}</Text>
                    </HStack>
                ))}
            </VStack>
          );
    };
    return (
        <View bg="white" width="100%" height={'100%'}>
            {renderDatePicker()}
            <View >
                <Heading ml='5%' mt='25%' mb={'4%'} size='md' color={'primary.50'}>Welcome to SAPERS!</Heading>
            </View>
            <View style={{ marginLeft: '4%' , marginRight: '4%', flex: 2 }}>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <Box bg="#f6f7f9" pt='1' pb='1' pr='2' pl='2' h={'auto'} borderColor='black' borderWidth={'0.5'}>
                        <HStack mb={'0.5'} mt={'0.5'}>
                            <Icon mr={'3%'} as={<AntDesign name={'calendar'} />} color={'gray.600'} size="sm" />
                            <Text fontSize={'xs'} color={'gray.600'}>{dashboardFilterDate.startDate.text + " - " + dashboardFilterDate.endDate.text}</Text>
                            <Icon style={{ position: 'absolute', right:0 }}  as={<AntDesign name={'down'} />} color={'gray.600'} size="sm" />
                        </HStack>
                    </Box>
                </TouchableOpacity>
                <FlatList
                    contentContainerStyle={{ paddingTop: '5%' , marginBottom: '2%' }}
                    data={isLoading ? EMPTY_DASHBOARD_VALUE : dashboardData}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    numColumns={2}
                    scrollEnabled={true}
                    style={{ height: '53%'}}
                />
            </View>
            <View style={{ flex: 1, marginLeft: '4%' , marginRight: '4%'}}>
                <Box bg={'#f6f7f9'} pr='2' pl='2' h={'auto'}>
                    {!isLoading && renderSubIds()}
                </Box>
            </View>
        </View>
    );
};



export default DashboardScreen;