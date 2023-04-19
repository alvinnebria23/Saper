import { Modal, View, StyleSheet } from "react-native";
import { DASHBOARD_DATE_BUTTONS } from "../../constants/dashboard-constants";
import DateRangePicker from "rn-select-date-range";
import moment from "moment";
import { Button, FlatList, Heading, Text, Row } from "native-base";
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
        <Modal 
            visible={showDatePicker} 
            onRequestClose={onRequestClose.bind(this, {action: 'close'})}
            animationType='fade'
            transparent={true}
        >
            <View style={styles.modal}>
                <View style={styles.container}>
                    <FlatList
                        data={DASHBOARD_DATE_BUTTONS}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        numColumns={2}
                        scrollEnabled={true}
                        style={{ marginBottom: 15 }}
                    />
                    <Row>
                        <Text fontWeight={'bold'}>Start Date:&nbsp;</Text>
                        {dateRange?.startDate && <Text>{formatDateToString(new Date(dateRange?.startDate),  '12:00 AM')}</Text>}
                    </Row>
                    <Row>
                        <Text fontWeight={'bold'}>End Date:&nbsp;</Text>
                        {dateRange?.endDate && <Text>{formatDateToString(new Date(dateRange?.endDate), '11:59 PM')}</Text>}
                    </Row>
                    <View style={{ marginTop: 10,}}>
                        <DateRangePicker
                            onSelectDateRange={onSelectDateRange}
                            responseFormat="YYYY-MM-DD"
                            maxDate={moment()}
                            minDate={moment().subtract(90, "days")}
                            clearBtnTitle={'Reset'}
                            confirmBtnTitle={'Done'}
                            onConfirm={onRequestClose.bind(this, {action: 'close'})}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    container: {
        borderRadius: 10, 
        marginLeft: '5%', 
        marginRight: '5%', 
        marginBottom: '50%', 
        marginTop: '10%', 
        padding: '5%', 
        backgroundColor: 'white'
    },
});

export default RangeDatePickerModal;