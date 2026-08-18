import React, { useState } from 'react';
import { Text, Center, Heading, Divider, Row, Switch, Column } from 'native-base';
import { View, FlatList } from 'react-native';
import { DashboardCardView } from '../components/card';
import { RangeDatePickerModal } from '../components/modal';
import { DatePickerButton } from '../components/button';
import { DASHBOARD_CARD_STYLE, EMPTY_DASHBOARD_VALUE } from '../constants/dashboard-constants';
import useDatePicker from '../hooks/useDatePicker';
import { ImageLogo } from '../components/image';
import { getNetProfit, getTax } from '../util/CommonUtil';
import Tooltip from 'react-native-walkthrough-tooltip';
import UnauthorizedScreen from './unauthorized-screen';
import { TouchableOpacity } from 'react-native';
import { Platform } from 'react-native';
import { StatusBar } from 'react-native';
const DashboardScreen = ({ 
    dashboardFilterDate, 
    setDashboardFilterDate, 
    dashboardData, 
    isLoading, 
    topFiveSubIds,
    isToggled,
    setIsToggled,
    userType,
}) => {
    const {
        showDatePicker, 
        setShowDatePicker, 
        onRequestClose, 
        onSelectDateRange, 
        dateFilter,
    } = useDatePicker(setDashboardFilterDate);
    const [showTooltip, setShowTooltip] = useState(false);
    const keyExtractor = (item) => item.id;
    const renderItem = ({item}) => {
        return (
            <>
                {!isLoading && <View key={item.id} style={{...DASHBOARD_CARD_STYLE.card}}>
                    {item.id === 2 ? 
                        <Tooltip
                            isVisible={showTooltip}
                            content={<Text fontSize={11} color={'white'}>{`Based on exported conversion report (excel file).`}</Text>}
                            placement="top"
                            backgroundColor={'rgba(0,0,0,0)'}
                            onClose={() => setShowTooltip(false)}
                            showChildInTooltip={false}
                            contentStyle={{ width: '100%', height: '100%', backgroundColor: '#FF4E00' }}
                            topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
                        >
                            <TouchableOpacity onPress={() => setShowTooltip(true)}>
                                <DashboardCardView 
                                    type={item.type} 
                                    name={item.name} 
                                    value={item.value} 
                                    showQuestionIcon={item.id === 2} 
                                />
                            </TouchableOpacity>
                        </Tooltip>:                       
                    <DashboardCardView 
                        type={item.type} 
                        name={item.name} 
                        value={item.value} 
                        showQuestionIcon={item.id === 2} 
                    />}
                </View>}
            </>
        )
    };
    const renderSubIds = () => {
        return (
            <Column style={{ ...DASHBOARD_CARD_STYLE.box, marginBottom: "17%" }}>
                <Center mt={1}>
                    <Text fontWeight={'bold'} color={'black'}> Top 5 Sub-ID {'(Number of Orders)'}</Text>
                    <Divider m={1}/>
                </Center>
                {topFiveSubIds.map((item, index) => (
                    <Row key={index} mb={'3%'}>
                        <Text 
                            style={{ marginLeft: '2%', flexWrap: 'wrap', maxWidth: '50%' }} 
                            flex={1} 
                            key={index + 10}
                        >
                            {`${index + 1})${item.subId}`}
                        </Text>
                        <Text 
                            style={{ right: 0 , position: 'absolute', marginRight: '2%' }} 
                            flex={1} 
                            key={index + 20}
                        >
                            {` ${item.totalNumberOfOrders}`}
                        </Text>
                    </Row>
                ))}
            </Column>
          );
    };
    const renderNetProfit = () => {
        return (
            <Column style={{...DASHBOARD_CARD_STYLE.box, marginBottom: "1%" }}>
                <Row style={{ alignItems: 'center'}}>
                    <Text fontSize={12}>B.I.R. Registered</Text>
                    <Switch size="sm" colorScheme="primary" onTrackColor={'#FF4E00'} onToggle={() => setIsToggled(!isToggled)} isChecked={isToggled} />
                </Row>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text fontWeight={'bold'} color={'black'}> 
                        NET PROFIT
                        <Text 
                            fontSize={12} 
                            fontWeight={'normal'}
                        >
                            {dashboardData.length > 0 && `${isToggled ? '[ less 5%' : '[ less 10%'} ( ${getTax(isToggled, dashboardData[0]?.value)} ) ]`}
                        </Text>
                    </Text>
                </Row>
                <Divider />
                <Row p={'2%'}>
                    <Text style={{fontSize: 12, lineHeight: 18, color: '#FF4E00'}}>&#8369;</Text>
                    <Heading size={'md'}>
                    {!isLoading && dashboardData[0]?.value ? getNetProfit(isToggled, dashboardData[0]?.value) : '0'}
                    </Heading>
                </Row>
            </Column>
          );
    };
    return (
        <>
            <RangeDatePickerModal 
                showDatePicker={showDatePicker} 
                onRequestClose={onRequestClose}
                onSelectDateRange={onSelectDateRange}
                dateRange={dateFilter}
            />
            <View width="100%" height={'100%'}>
                <Row alignItems={'center'} marginRight={'4%' }>
                    <Heading ml='5%' mt='5%' mb={'4%'} size='md' color={'primary.50'}>Dashboard</Heading>
                    <ImageLogo 
                        mb={0}  
                        source={require('../assets/saper-icon.png')} 
                        size={'2xs'}
                        style={{ right: 0 , position: 'absolute'  }}
                    />
                </Row>
                {userType !== "free" ? 
                    <View style={{ marginLeft: '4%' , marginRight: '4%', flex: 2 }}>
                        <DatePickerButton 
                            setShowDatePicker={setShowDatePicker} 
                            startDateText={dashboardFilterDate.startDate.text} 
                            endDateText={dashboardFilterDate.endDate.text}
                        />
                        <FlatList
                            data={dashboardData.length > 0 ? dashboardData : EMPTY_DASHBOARD_VALUE}
                            renderItem={renderItem}
                            keyExtractor={keyExtractor}
                            numColumns={2}
                            style={{ marginTop: '3%' }}
                            showsVerticalScrollIndicator={false}
                            ListFooterComponent={                   
                                <View style={{ height: 'auto', marginBottom: '5%' }}>
                                    {!isLoading && renderNetProfit()}
                                    {!isLoading && dashboardData.length > 0 && renderSubIds()}
                                </View>
                            }
                        /> 
                    </View> :
                    <UnauthorizedScreen message={`Free users can't view this screen.`}/>
                }
            </View>
        </>
    );
};



export default DashboardScreen;