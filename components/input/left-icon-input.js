import { Input, Text, View } from 'native-base';

const LeftIconInput = ({ 
    placeholder, 
    onChange, 
    type = 'text' ,
    inputLeftElement = '',
    inputRightElement = '',
    value,
    keyboardType = 'default',
    error = false,
    errorMessage = null,
    marginBottom = 0,
    marginTop = 0,
}) => {
    return (
        <>
            <Input 
                size='sm'
                h={'35'}
                variant={'filled'}
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
                marginBottom={marginBottom}
                marginTop={marginTop}
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