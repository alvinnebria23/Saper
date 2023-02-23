import React , { useState } from "react";
export default useBottomNavigator = () => {
    const [selected, setSelected] = useState(1);
    const onPressTab = (index) => {
        setSelected(index);
    }

    return {
        selected,
        onPressTab,
    };
}