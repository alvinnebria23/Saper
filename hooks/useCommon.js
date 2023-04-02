export default useCommon = () => {
    const getDefaultFilter = () => {
        // get the first day of last months date
        const today = new Date();
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const firstDayOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1);
        const formattedFirstDayDate = formatDateToString(firstDayOfLastMonth);
        // get the last day of last months date
        const lastDayOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0);
        const formattedLastDayDate = formatDateToString(lastDayOfLastMonth);

        return { startDate: { text: formattedFirstDayDate , unixtimestamp: formatDateToUnixTimestamp(firstDayOfLastMonth) }, endDate: { text: formattedLastDayDate, unixtimestamp: formatDateToUnixTimestamp(lastDayOfLastMonth) }};
    };
    const formatDateToString = (date) => {
        const dateArray = date.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'}).replace(',', '').split(' ')
        return `${dateArray[2]} ${dateArray[0]} ${dateArray[1]}`;
    };
    const formatDateToUnixTimestamp = (date) => {
        return Math.floor(date.getTime() / 1000);
    };
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
        getDefaultFilter,
        formatDateToString,
        formatDateToUnixTimestamp,
    };
}