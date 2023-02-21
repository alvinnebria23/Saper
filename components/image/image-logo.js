import { Image } from "native-base";

const ImageLogo = () => {
    return (
        <Image 
            source={require('../../assets/sapers-logo-edited.png')}
            size={'xl'}
            alt={'Sapers Logo'}
            mb={'10%'}
        />
    );
}

export default ImageLogo;