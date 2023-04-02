import { Button, Text } from 'native-base';

const RoundedButton = ({ 
    text, 
    onPress, 
    isLoading = false, 
    isLoadingText = ''
}) => {
    return (
        <Button 
            bg={'primary.50'} 
            color={'white'} 
            size={'35'}
            style={{ width: '100%', marginTop: '40%' }} 
            variant={'rounded'} 
            shadow={4}
            onPress={onPress}
            isLoading={isLoading}
            isLoadingText={isLoadingText}
        >
            <Text style={{ color: 'white', fontWeight: "bold" }}>{text}</Text>
        </Button>
    );
}

export default RoundedButton;
