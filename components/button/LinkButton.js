import { Link } from 'native-base';

const LinkButton = ({ 
    text, 
    onPress, 
    style,
}) => {
    return (
      <Link 
        color="red" 
        style={style}
        _text={{
          fontSize: "xs",
          _light: {
            color: "#FF4E00"
          },
        }}
        onPress={onPress}
      >
        {text}
      </Link>
    );
}

export default LinkButton;
