import { FIVE_PERCENT, TEN_PERCENT } from "../constants/dashboard-constants";

export const onPressNavigate = (navigation, screen) => {
    if(!navigation){
        return;
    }
    navigation.navigate(screen);
}
export const capitalizeFirstLetter = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
}
export const formatName = (value) => {
    let words = value.split(' ');
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    let formattedName = words.join(' ');
    return formattedName;
};
export const getTax = (isToggled, grandTotal) => {
    const taxPercentage = isToggled ? FIVE_PERCENT : TEN_PERCENT;
    return parseFloat(grandTotal * taxPercentage).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 5});;
}
export const getNetProfit = (isToggled, grandTotal) => {
    const taxPercentage = isToggled ? FIVE_PERCENT : TEN_PERCENT;

    return parseFloat(grandTotal - (grandTotal * taxPercentage)).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 5});;
}