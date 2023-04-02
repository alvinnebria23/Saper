import { Modal, View, StyleSheet } from "react-native";
import DateRangePicker from "rn-select-date-range";
import moment from "moment";
const RangeDatePickerModal = ({
    showDatePicker,
    onRequestClose,
    onSelectDateRange,
}) => {

    return (
        <Modal 
            visible={showDatePicker} 
            onRequestClose={onRequestClose}
            animationType='fade'
            transparent={true}
        >
            <View style={styles.modal}>
                <View style={styles.container}>
                    <DateRangePicker
                        onSelectDateRange={onSelectDateRange}
                        responseFormat="YYYY-MM-DD"
                        maxDate={moment()}
                        minDate={moment().subtract(90, "days")}
                        clearBtnTitle={'Reset'}
                        confirmBtnTitle={'Done'}
                        onConfirm={onRequestClose}
                    />
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
        marginTop: '50%', 
        padding: '5%', 
        backgroundColor: 'white'
    },
});

export default RangeDatePickerModal;