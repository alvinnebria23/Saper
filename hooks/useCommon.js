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
    return {
        onPressNavigate,
        capitalizeFirstLetter,
    };
}