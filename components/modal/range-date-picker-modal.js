import { Modal, View, StyleSheet } from "react-native";
import { DASHBOARD_DATE_BUTTONS } from "../../constants/dashboard-constants";
import DateRangePicker from "rn-select-date-range";
import moment from "moment";
import { Button, FlatList, Row } from "native-base";
const RangeDatePickerModal = ({
    showDatePicker,
    onRequestClose,
    onSelectDateRange,
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
                    />
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
        marginTop: '25%', 
        padding: '5%', 
        backgroundColor: 'white'
    },
});

export default RangeDatePickerModal;