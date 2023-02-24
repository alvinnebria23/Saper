import React from 'react';
import {  Box, Text, Icon, HStack, Center, Pressable, NativeBaseProvider, Heading, Column } from 'native-base';
import { Button, View, ScrollView, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { STATIC_DASHBOARD_DATA } from '../constants/dashboard-constants';
import { DashboardCardView } from '../components/card';
const DashboardScreen = ({ navigation }) => {

const keyExtractor = (item) => item.id;
const renderItem = ({item}) => {
    return (
        <DashboardCardView name={item.name} value={item.value} />
    )
}
return (
<View flex={1} bg="white" width="100%" height={'100%'}>
    <View>
        <Heading ml='5%' mt='25%' mb={'4%'} size='md' color={'primary.50'}>Welcome to SAPERS!</Heading>
    </View>
    <View style={{ marginLeft: '4%' , marginRight: '4%' }}>
        <TouchableOpacity>
            <Box bg="#f6f7f9" pt='1' pb='1' pr='2' pl='2' h={'auto'} borderColor='black' borderWidth={'0.5'}>
                <HStack mb={'0.5'} mt={'0.5'}>
                    <Icon mr={'3%'} as={<AntDesign name={'calendar'} />} color={'gray.600'} size="sm" />
                    <Text fontSize={'xs'} color={'gray.600'}>2023 Feb 1 - 2023 Feb 22</Text>
                    <Icon style={{ position: 'absolute', right:0 }}  as={<AntDesign name={'down'} />} color={'gray.600'} size="sm" />
                </HStack>
            </Box>
        </TouchableOpacity>
        <FlatList
            contentContainerStyle={{ paddingTop: '5%'}}
            data={STATIC_DASHBOARD_DATA}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            numColumns={2}
        />
        <View style={{ marginTop: '3%' }}>
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
</View>
);
};

export default DashboardScreen;