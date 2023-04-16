import { Box, Text, Row, Icon } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
const DatePickerButton = ({ 
    setShowDatePicker, 
    startDateText,
    endDateText,
}) => {
    return (
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Box bg="#f6f7f9" mb={'3%'} pt='1' pb='1' pr='2' pl='2' h={'auto'} borderColor='black' borderWidth={'0.5'}>
            <Row mb={'0.5'} mt={'0.5'}>
                <Icon mr={'3%'} as={<AntDesign name={'calendar'} />} color={'gray.600'} size="sm" />
                <Text fontSize={'xs'} color={'gray.600'}>{startDateText + " - " + endDateText}</Text>
                <Icon style={{ position: 'absolute', right:0 }}  as={<AntDesign name={'down'} />} color={'gray.600'} size="sm" />
            </Row>
        </Box>
      </TouchableOpacity>
    );
}

export default DatePickerButton;
