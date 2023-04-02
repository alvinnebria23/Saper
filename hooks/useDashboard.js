
import React, { useState } from 'react';
import useCommon from './useCommon';
export default useDashboard = (setDashboardFilterDate) => {
    const { formatDateToString, formatDateToUnixTimestamp } = useCommon();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateFilter, setDateFilter] = useState({});
    
    const onRequestClose = () => {
        const startDate = new Date(dateFilter.startDate);
        const endDate = new Date(dateFilter.endDate);
        const startDateText = formatDateToString(startDate);
        const endDateText = formatDateToString(endDate);
        setDashboardFilterDate({ startDate: { text: startDateText , unixtimestamp: formatDateToUnixTimestamp(startDate) }, endDate: { text: endDateText, unixtimestamp: formatDateToUnixTimestamp(endDate) }});
        setShowDatePicker(false);
    }

    const onSelectDateRange = (range) => {
        setDateFilter({ startDate: range.firstDate, endDate: range.secondDate })
    }
    
    return {
        showDatePicker,
        setShowDatePicker,
        onRequestClose,
        onSelectDateRange,
    }
}
