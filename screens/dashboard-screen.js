import React  from 'react';
import {  Box, Text, Icon, HStack, Center, Heading, VStack, Divider, Row, Switch, Pressable } from 'native-base';
import { View, FlatList, ScrollView, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DashboardCardView } from '../components/card';
import { RangeDatePickerModal } from '../components/modal';
import { DASHBOARD_CARD_STYLE, EMPTY_DASHBOARD_VALUE } from '../constants/dashboard-constants';
import useDashboard from '../hooks/useDashboard';
const DashboardScreen = ({ navigation, dashboardFilterDate, setDashboardFilterDate, dashboardData, isLoading, topFiveSubIds }) => {
    const { 
        showDatePicker, 
        setShowDatePicker, 
        onRequestClose, 
        onSelectDateRange, 
        dateFilter, 
        onPressSwitch, 
        isToggled,
        onPressView,
        viewTopFive,
    }= useDashboard(setDashboardFilterDate);
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
                dateRange={dateFilter}
            />
        )
    };
    const renderSubIds = () => {
        return (
            <Pressable onPress={onPressView}>
                {({ isPressed }) => {
                return <Box pr={2}  pl={2} mr={2} ml={2} h={'auto'} pb={'3%'} mb={'20%'} shadow="3" bg={isPressed ? 'coolGray.200' : 'coolGray.100'} p="5" rounded="8" style={{
                            transform: [{
                            scale: isPressed ? 0.96 : 1
                            }]
                        }}>
                            <VStack>
                                <Center mb={'2'}>
                                    <Text fontWeight={'bold'} color={'black'} mb={viewTopFive ? 2 : 0}> {viewTopFive || 'View'} Top 5 Sub-ID {'(Commission)'}</Text>
                                    {viewTopFive && <Divider/>}
                                </Center>
                                    {viewTopFive && topFiveSubIds.map((item, index) => (
                                        <HStack key={index}>
                                                <Text flex={1} key={index}>{`${index + 1}. ${item.subId}`}</Text>
                                                <Text style={{ right: 0 , position: 'absolute', marginRight: '2%'}} flex={1} key={Math.random()}>&#8369;{` ${item.totalCommission}`}</Text>
                                        </HStack>
                                    ))}
                            </VStack>
                        </Box>
                }}
            </Pressable>

          );
    };
    const renderNetProfit = () => {
        return (
            <View style={{...DASHBOARD_CARD_STYLE.box}}>
                <VStack>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text fontWeight={'bold'} color={'black'}> 
                            NET PROFIT
                            <Text fontSize={12} fontWeight={'normal'}>{isToggled ? '( less 5% )' : '( less 10% )'}</Text>
                        </Text>
                        <Row style={{ alignItems: 'center'}}>
                            <Text fontSize={12}>B.I.R. Registered</Text>
                            <Switch size="sm" colorScheme="primary" onTrackColor={'#FF4E00'} onToggle={onPressSwitch} isChecked={isToggled} />
                        </Row>
                    </Row>
                    <Divider/>
                    <Row p={'2%'}>
                        <Text style={{fontSize: 12, lineHeight: 18, color: '#FF4E00'}}>&#8369;</Text>
                        <Heading size={'md'}>
                        {!isLoading && dashboardData[0]?.value ? displayNetProfit() : '0'}
                        </Heading>
                    </Row>
                </VStack>
            </View>
          );
    };
    const displayNetProfit = () => {
        const totalCommission = parseInt(dashboardData[0]?.value?.replace(',', ""));
        const tax = isToggled ? totalCommission * 0.05 : totalCommission * 0.1;
        const netProft =  totalCommission - tax;
        return netProft?.toLocaleString() || '';
    }
    return (
        <View bg="white" width="100%" height={'100%'} style={{ paddingTop: '10%'}}>
            {renderDatePicker()}
            <View>
                <Heading ml='5%' mt='5%' mb={'4%'} size='md' color={'primary.50'}>Welcome to SAPERS!</Heading>
            </View>
            <View style={{ marginLeft: '4%' , marginRight: '4%', flex: 2 }}>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <Box bg="#f6f7f9" mb={'3%'} pt='1' pb='1' pr='2' pl='2' h={'auto'} borderColor='black' borderWidth={'0.5'}>
                        <HStack mb={'0.5'} mt={'0.5'}>
                            <Icon mr={'3%'} as={<AntDesign name={'calendar'} />} color={'gray.600'} size="sm" />
                            <Text fontSize={'xs'} color={'gray.600'}>{dashboardFilterDate.startDate.text + " - " + dashboardFilterDate.endDate.text}</Text>
                            <Icon style={{ position: 'absolute', right:0 }}  as={<AntDesign name={'down'} />} color={'gray.600'} size="sm" />
                        </HStack>
                    </Box>
                </TouchableOpacity>
                <FlatList
                    data={isLoading ? EMPTY_DASHBOARD_VALUE : dashboardData}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    numColumns={2}
                    scrollEnabled={true}
                />
                <Box pr='2' pl='2' h={'auto'} mt={'3%'} mb={'3%'}>
                    {!isLoading && renderNetProfit()}
                </Box>
                {!isLoading && renderSubIds()}
            </View>
        </View>
    );
};



export default DashboardScreen;