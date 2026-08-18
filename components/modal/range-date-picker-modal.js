import { Modal, View, StyleSheet, Dimensions } from "react-native";
import { DASHBOARD_DATE_BUTTONS } from "../../constants/dashboard-constants";
import DateRangePicker from "rn-select-date-range";
import moment from "moment";
import { Button, FlatList, Text, Row, ScrollView } from "native-base";
import { formatDateToString } from "../../util/DateUtil";
const RangeDatePickerModal = ({
    showDatePicker,
    onRequestClose,
    onSelectDateRange,
    dateRange,
}) => {
    const keyExtractor = (item) => item.id;
    const renderItem = ({item}) => {
        return (
            <Button 
                mt={1} 
                mb={1} 
                mr={5} 
                ml={5} 
                flex={1} 
                key={item.id} 
                size="sm" 
                variant="subtle" 
                colorScheme="orange"
                onPress={onRequestClose.bind(this, {action: 'button', value: item.value})}
            >
                {item.name}
            </Button>
        )
    };

    return (
        <View>
            <Modal 
                visible={showDatePicker} 
                onRequestClose={onRequestClose.bind(this, {action: 'close'})}
                animationType='fade'
                transparent={true}
            >
                <View style={styles.modal}>
                    <View style={styles.container}>
                        <View>
                            <FlatList
                                data={DASHBOARD_DATE_BUTTONS}
                                renderItem={renderItem}
                                keyExtractor={keyExtractor}
                                numColumns={2}
                            />
                        </View>
                        <ScrollView>
                            <View style={{ marginBottom: '5%', marginTop: '5%' }}>
                                <Row>
                                    <Text fontWeight={'bold'}>Start Date:&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                                     <Text>{dateRange?.startDate ? formatDateToString(new Date(dateRange?.startDate),  '12:00 AM') : "First tap"}</Text>
                                </Row>
                                <Row>
                                    <Text fontWeight={'bold'}>End Date:&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                                     <Text>{dateRange?.endDate ? formatDateToString(new Date(dateRange?.endDate), '11:59 PM') : "Second tap"}</Text>
                                </Row>
                            </View>
                            <DateRangePicker
                                onSelectDateRange={onSelectDateRange}
                                responseFormat="YYYY-MM-DD"
                                maxDate={moment()}
                                minDate={moment().subtract(90, "days")}
                                clearBtnTitle={'Reset'}
                                confirmBtnTitle={dateRange?.endDate ? 'Filter' : 'Cancel'}
                                onConfirm={onRequestClose.bind(this, {action: 'close'})}
                            />
                        </ScrollView>

                    </View>
                </View>
            </Modal>
        </View>
    )
}
const screenHeight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: '100%',
    },
    container: {
        borderRadius: 10, 
        marginLeft: '5%', 
        marginRight: '5%', 
        marginTop: '10%', 
        padding: '5%', 
        backgroundColor: 'white',
        height: screenHeight > 700 ? 'auto' : screenHeight * .8
    },
});

export default RangeDatePickerModal;