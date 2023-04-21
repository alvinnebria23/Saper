import React , { useState }  from 'react';
import { Text, Center, Heading, Divider, Row, Switch, Column, ScrollView } from 'native-base';
import { View, FlatList } from 'react-native';
import { DashboardCardView } from '../components/card';
import { RangeDatePickerModal } from '../components/modal';
import { DatePickerButton } from '../components/button';
import { DASHBOARD_CARD_STYLE, EMPTY_DASHBOARD_VALUE } from '../constants/dashboard-constants';
import useDatePicker from '../hooks/useDatePicker';
import { NoDataFound } from '../components/image';
const DashboardScreen = ({ 
    dashboardFilterDate, 
    setDashboardFilterDate, 
    dashboardData, 
    isLoading, 
    topFiveSubIds,
    isToggled,
    setIsToggled,
}) => {
    const {
        showDatePicker, 
        setShowDatePicker, 
        onRequestClose, 
        onSelectDateRange, 
        dateFilter,
    } = useDatePicker(setDashboardFilterDate);
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
            <Column style={{ ...DASHBOARD_CARD_STYLE.box, marginBottom: "17%" }}>
                <Center mt={1}>
                    <Text fontWeight={'bold'} color={'black'}> Top 5 Sub-ID {'(Commission)'}</Text>
                    <Divider m={1}/>
                </Center>
                {topFiveSubIds.map((item, index) => (
                    <Row key={index}>
                            <Text style={{ marginLeft: '2%'}} flex={1} key={index}>{`${index + 1}. ${item.subId}`}</Text>
                            <Text style={{ right: 0 , position: 'absolute', marginRight: '2%'}} flex={1} key={Math.random()}>&#8369;{` ${parseInt(item.totalCommission).toLocaleString()}`}</Text>
                    </Row>
                ))}
            </Column>
          );
    };
    const renderNetProfit = () => {
        return (
            <Column style={{...DASHBOARD_CARD_STYLE.box, marginBottom: "1%" }}>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text fontWeight={'bold'} color={'black'}> 
                        NET PROFIT
                        <Text fontSize={12} fontWeight={'normal'}>{isToggled ? '( less 5% )' : '( less 10% )'}</Text>
                    </Text>
                    <Row style={{ alignItems: 'center'}}>
                        <Text fontSize={12}>B.I.R. Registered</Text>
                        <Switch size="sm" colorScheme="primary" onTrackColor={'#FF4E00'} onToggle={() => setIsToggled(!isToggled)} isChecked={isToggled} />
                    </Row>
                </Row>
                <Divider />
                <Row p={'2%'}>
                    <Text style={{fontSize: 12, lineHeight: 18, color: '#FF4E00'}}>&#8369;</Text>
                    <Heading size={'md'}>
                    {!isLoading && dashboardData[0]?.value ? displayNetProfit() : '0'}
                    </Heading>
                </Row>
            </Column>
          );
    };
    const displayNetProfit = () => {
        const totalCommission = dashboardData[0]?.value;
        const tax = isToggled ? totalCommission * 0.05 : totalCommission * 0.1;
        const netProft =  totalCommission - tax;
        return parseFloat(netProft).toLocaleString();
    }
    return (
        <>
            {renderDatePicker()}
            <View width="100%" height={'100%'}>
                <View>
                    <Heading ml='5%' mt='5%' mb={'4%'} size='md' color={'primary.50'}>Dashboard</Heading>
                </View>
                <View style={{ marginLeft: '4%' , marginRight: '4%', flex: 2 }}>
                    <DatePickerButton 
                        setShowDatePicker={setShowDatePicker} 
                        startDateText={dashboardFilterDate.startDate.text} 
                        endDateText={dashboardFilterDate.endDate.text}
                    />
                    {dashboardData.length ? 
                        <FlatList
                            data={isLoading ? EMPTY_DASHBOARD_VALUE : dashboardData}
                            renderItem={renderItem}
                            keyExtractor={keyExtractor}
                            numColumns={2}
                            ListFooterComponent={                   
                                <View style={{ height: 'auto', marginBottom: '5%' }}>
                                    {!isLoading && renderNetProfit()}
                                    {!isLoading && renderSubIds()}
                                </View>
                            }
                        /> : <NoDataFound />}
                </View>
            </View>
        </>
    );
};



export default DashboardScreen;