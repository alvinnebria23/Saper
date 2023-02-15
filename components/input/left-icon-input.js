import { Icon, Input } from 'native-base';

const LeftIconInput = ({ 
    placeholder, 
    onChange, 
    type = 'text' ,
    inputLeftElement = '',
    inputRightElement = '',
    value,
}) => {
    return (
        <Input 
            variant={'rounded'}
            placeholder={placeholder}
            shadow={'4'}
            focusOutlineColor={'#FF4E00'}
            backgroundColor={'white'}
            type={type}
            onChangeText={onChange}
            InputLeftElement={inputLeftElement}
            InputRightElement={inputRightElement}
            value={value}
        />
    );
}

export default LeftIconInput;