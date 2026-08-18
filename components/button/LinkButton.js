import { Link } from 'native-base';

const LinkButton = ({ 
    text, 
    onPress, 
    style,
    fontColor = "#FF4E00",
    fontSize = "xs"
}) => {
    return (
      <Link 
        color="red" 
        style={style}
        _text={{
          fontSize: fontSize,
          _light: {
            color: fontColor
          },
        }}
        onPress={onPress}
      >
        {text}
      </Link>
    );
}

export default LinkButton;
