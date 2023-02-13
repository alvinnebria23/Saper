import { Button, Text } from 'native-base';

const RoundedButton = ({ text, onPress }) => {

    return (
        <Button 
            bg={'primary.50'} 
            color={'white'} 
            style={{ width: '100%', marginTop: '20%' }} 
            variant={'rounded'} 
            shadow={4}
            onPress={onPress}
        >
            <Text style={{ color: 'white', fontWeight: "bold" }}>{text}</Text>
        </Button>
    );
}

export default RoundedButton;
