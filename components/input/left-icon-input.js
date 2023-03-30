import { Input, Text, View } from 'native-base';

const LeftIconInput = ({ 
    placeholder, 
    onChange, 
    type = 'text' ,
    inputLeftElement = '',
    inputRightElement = '',
    value,
    keyboardType='default',
    error=false,
    errorMessage=null,
}) => {
    return (
        <>
            <Input 
                size='sm'
                h={'35'}
                variant={'rounded'}
                placeholder={placeholder}
                shadow={'4'}
                focusOutlineColor={'#FF4E00'}
                backgroundColor={'white'}
                type={type}
                keyboardType={keyboardType}
                onChangeText={onChange}
                InputLeftElement={inputLeftElement}
                InputRightElement={inputRightElement}
                value={value}
                borderColor={error ? 'red.500' : 'white'}
            />
            {error && 
            <View ml={4}>
                <Text fontSize={'xs'} style={{ color: 'red' }}>
                    * {errorMessage}
                </Text>
            </View>}
        </>
    );
}

export default LeftIconInput;