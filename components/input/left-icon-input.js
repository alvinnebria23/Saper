import { Icon, Input } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const LeftIconInput = ({ placeholder, onChangeText, icon }) => {

    return (
        <Input 
            variant={'rounded'}
            placeholder={placeholder}
            onChangeText={onChangeText}
            InputLeftElement={<Icon size={5} ml={4} color={'#FF4E00'} as={<Ionicons  name={icon} />} />}
            shadow={'4'}
            focusOutlineColor={'#FF4E00'}
            backgroundColor={'white'}
        />
    );
}

export default LeftIconInput;