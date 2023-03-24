import React , { useState } from "react";
import { clearLocalStorage } from "../helpers/storageHelper";
export default useBottomNavigator = () => {
    const [selected, setSelected] = useState(0);
    const onPressTab = (index) => {
        if(index === 3){
            clearLocalStorage();
        }
        setSelected(index);
    }

    return {
        selected,
        onPressTab,
    };
}