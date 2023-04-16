
import React, { useState } from 'react';
import { 
    formatDateToString,
    formatDateToUnixTimestamp,
    getDateToday,
    getPastDate,
} from '../util/DateUtil.js';
import { YESTERDAY } from '../constants/dashboard-constants.js';
export default useDatePicker = (setFilterDate) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateFilter, setDateFilter] = useState({});
    const [isUpdated, setIsUpdated] = useState(false);
    const onRequestClose = ({ action, value }) => {
        let startDate;
        let endDate;

        if(action === 'button'){
            startDate = getPastDate(value);
            endDate = getDateToday();
            if(value === YESTERDAY){
                endDate.setDate(endDate.getDate() - 1);
            }
        }else{
            if(!dateFilter.startDate && !dateFilter.endDate){
                setShowDatePicker(false);
                return;
            }
            if(!isUpdated){
                setShowDatePicker(false);
                return;
            }
            startDate = new Date(dateFilter.startDate);
            endDate = new Date(dateFilter.endDate);
        }
        const startDateText = formatDateToString(startDate, '12:00 AM');
        startDate.setDate(startDate.getDate() - 1);
        startDate.setHours(16, 0, 0, 0);
        const endDateText = formatDateToString(endDate, '11:59 PM');
        endDate.setHours(15, 59, 59);
        setFilterDate({ startDate: { text: startDateText , unixtimestamp: formatDateToUnixTimestamp(startDate) }, endDate: { text: endDateText, unixtimestamp: formatDateToUnixTimestamp(endDate) }});
        setShowDatePicker(false);
        setIsUpdated(false);
    }

    const onSelectDateRange = (range) => {
        setIsUpdated(true);
        setDateFilter({ startDate: range.firstDate, endDate:range.secondDate })
    }
    
    return {
        showDatePicker,
        setShowDatePicker,
        onRequestClose,
        onSelectDateRange,
        dateFilter,
    }
}
