import React  from 'react';
import {  Box, Text, Icon, HStack, Center, Heading } from 'native-base';
import { View, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DashboardCardView } from '../components/card';
import { RangeDatePickerModal } from '../components/modal';
import useDashboard from '../hooks/useDashboard';
const DashboardScreen = ({ navigation, dashboardFilterDate, setDashboardFilterDate, dashboardData }) => {
    const { showDatePicker, setShowDatePicker, onRequestClose, onSelectDateRange }= useDashboard(setDashboardFilterDate);
    const keyExtractor = (item) => item.id;
    const renderItem = ({item}) => {
        return (
            <DashboardCardView key={item.id} name={item.name} value={item.value} />
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
    return (
        <View bg="white" width="100%" height={'100%'}>
            {renderDatePicker()}
            <View>
                <Heading ml='5%' mt='25%' mb={'4%'} size='md' color={'primary.50'}>Welcome to SAPERS!</Heading>
            </View>
            <View style={{ marginLeft: '4%' , marginRight: '4%' }}>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <Box bg="#f6f7f9" pt='1' pb='1' pr='2' pl='2' h={'auto'} borderColor='black' borderWidth={'0.5'}>
                        <HStack mb={'0.5'} mt={'0.5'}>
                            <Icon mr={'3%'} as={<AntDesign name={'calendar'} />} color={'gray.600'} size="sm" />
                            <Text fontSize={'xs'} color={'gray.600'}>{dashboardFilterDate.startDate.text + " - " + dashboardFilterDate.endDate.text}</Text>
                            <Icon style={{ position: 'absolute', right:0 }}  as={<AntDesign name={'down'} />} color={'gray.600'} size="sm" />
                        </HStack>
                    </Box>
                </TouchableOpacity>
                {dashboardData &&  
                    <FlatList
                        contentContainerStyle={{ paddingTop: '5%' , marginBottom: '10%' }}
                        data={dashboardData}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        numColumns={2}
                    />}
                <TouchableOpacity>
                    <Box bg={'#f6f7f9'} pt='1' pb='1' pr='2' pl='2' h={'auto'}>
                        <HStack mb={'0.5'} mt={'0.5'}>
                            <Center mt={'2'} mb={'2'}>
                                <Text color={'black'}>View Top 5 Sub-ID {'(Commision)'}</Text>
                            </Center>
                        </HStack>
                    </Box>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DashboardScreen;