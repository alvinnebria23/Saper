import { TextInput } from 'react-native';

const BorderlessInput = ({ 
    label,
    value,
    onChange,
    name,
    passwordType = false,
}) => {
    return (
      <TextInput
        key={label}
        style={{
          borderBottomWidth: 0.4, 
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
        keyboardType={name === 'contactNumber' ? 'numeric' : 'default'}
        name={name}
        value={value}
        onChangeText={onChange}
        secureTextEntry={passwordType}
      />
    );
}

export default BorderlessInput;
