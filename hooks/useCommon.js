export default useCommon = () => {
    const onPressNavigate = (navigation, screen) => {
        if(!navigation){
            return;
        }
        navigation.navigate(screen);
    }
    const capitalizeFirstLetter = (value) => {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
    const formatName = (value) => {
        let words = value.split(' ');
        for (let i = 0; i < words.length; i++) {
          words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }
        let formattedName = words.join(' ');
        return formattedName;
    };
    return {
        onPressNavigate,
        capitalizeFirstLetter,
        formatName,
    };
}