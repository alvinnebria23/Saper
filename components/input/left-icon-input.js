import { Icon, Input } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const LeftIconInput = ({ 
    placeholder, 
    onChangeText, 
    type = 'text' ,
    inputLeftElement = '',
    inputRightElement = '',
}) => {

    return (
        <Input 
            variant={'rounded'}
            placeholder={placeholder}
            onChangeText={onChangeText}
            shadow={'4'}
            focusOutlineColor={'#FF4E00'}
            backgroundColor={'white'}
            type={type}
            InputLeftElement={inputLeftElement}
            InputRightElement={inputRightElement}
        />
    );
}

export default LeftIconInput;