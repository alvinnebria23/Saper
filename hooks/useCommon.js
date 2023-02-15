export default useCommon = () => {
    const onPressNavigate = (navigation, screen) => {
        if(!navigation){
            return;
        }
        navigation.navigate(screen);
    }

    return {
        onPressNavigate,
    };
}