import { Image } from "native-base";

const ImageLogo = ({ source = require('../../assets/sapers-logo-edited.png'), size = 'xl' }) => {
    return (
        <Image 
            source={source}
            size={size}
            alt={'Sapers Logo'}
            mb={'10%'}
        />
    );
}

export default ImageLogo;