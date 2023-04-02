import React , { useState } from "react";
import { clearLocalStorage } from "../helpers/storageHelper";
export default useBottomNavigator = (navigation) => {
    const [selected, setSelected] = useState(0);
    const onPressTab = (index) => {
        if(index === 3){
            clearLocalStorage();
            navigation.navigate('Login');
        }
        setSelected(index);
    }

    return {
        selected,
        onPressTab,
    };
}