import { Button, Text } from 'native-base';

const RoundedButton = ({ 
    text, 
    onPress, 
    isLoading = false, 
    isLoadingText = '',
    style = { width: '100%', marginTop: '40%' },
    isDisabled = false,
    buttonColor = 'primary.50',
    textColor = 'white',
}) => {
    return (
        <Button 
            bg={buttonColor} 
            color={'white'} 
            size={'35'}
            style={style} 
            variant={'rounded'} 
            shadow={4}
            onPress={onPress}
            isLoading={isLoading}
            isLoadingText={isLoadingText}
            isDisabled={isDisabled}
        >
            <Text style={{ color: textColor, fontWeight: "bold" }}>{text}</Text>
        </Button>
    );
}

export default RoundedButton;
