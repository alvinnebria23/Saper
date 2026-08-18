import { Image } from "native-base";

const ImageLogo = ({ style, source = require('../../assets/sapers-logo-edited.png'), size = 'xl', mb = '10%', ...props }) => {
    return (
        <Image 
            source={source}
            size={size}
            alt={'Sapers Logo'}
            mb={mb}
            style={style}
            props
        />
    );
}

export default ImageLogo;