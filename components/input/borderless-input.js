import { TextInput } from 'react-native';

const BorderlessInput = ({ 
    label,
    value,
    onChange,
}) => {
    return (
      <TextInput
        key={label}
        style={{
          borderBottomWidth: 0.3, 
          borderBottomColor: '#FF4E00',
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderTopWidth: 0,
          elevation: 0,
          fontSize: 12,
          paddingTop: 0,
          paddingBottom: 0, 
          margin: 0,  
          minWidth: '100%',
        }}
        value={value}
        onChangeText={onChange}
      />
    );
}

export default BorderlessInput;
