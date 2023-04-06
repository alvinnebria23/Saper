
import React, { useState } from 'react';
import { NINETY_DAYS_AGO, SEVEN_DAYS_AGO, THIRTY_DAYS_AGO, YESTERDAY } from '../constants/dashboard-constants';
import { 
    formatDateToString, 
    getYesterdayDateRange, 
    getSevenDaysAgoDate, 
    getThiryDaysAgoDate, 
    getNinetyDaysAgoDate, 
    getLocalCurrentDate,
    formatDateToUnixTimestamp,
    getDateToday,
} from '../util/DateUtil.js';
export default useDashboard = (setDashboardFilterDate) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateFilter, setDateFilter] = useState({});
    const [updated, setUpdated] = useState(false);
    const onRequestClose = ({ action, value }) => {
        let startDate;
        let endDate;
        if(!updated){
            setShowDatePicker(false);
            return;
        }
        if(action === 'button'){
            if(value === YESTERDAY){
                const { yesterdayStart, yesterdayEnd } = getYesterdayDateRange();
                startDate = yesterdayStart;
                endDate = yesterdayEnd;
            }
            if(value === SEVEN_DAYS_AGO){
                startDate = getSevenDaysAgoDate();
                endDate = getDateToday();
            }
            if(value === THIRTY_DAYS_AGO){
                startDate = getThiryDaysAgoDate();
                endDate = getDateToday();
            }
            if(value === NINETY_DAYS_AGO){
                startDate = getNinetyDaysAgoDate();
                endDate = getDateToday();
            }
        }else{
            if(dateFilter.startDate && dateFilter.endDate){
                startDate = new Date(dateFilter.startDate);
                endDate = new Date(dateFilter.endDate);
                endDate.setHours(12);
                endDate.setMinutes(59);
                endDate.setSeconds(59);
            }else{
                setShowDatePicker(false);
                return;
            }
        }
        const startDateText = formatDateToString(startDate);
        const endDateText = formatDateToString(endDate);
        setDashboardFilterDate({ startDate: { text: startDateText , unixtimestamp: formatDateToUnixTimestamp(startDate) }, endDate: { text: endDateText, unixtimestamp: formatDateToUnixTimestamp(endDate) }});
        setUpdated(false);
        setShowDatePicker(false);
    }

    const onSelectDateRange = (range) => {
        setUpdated(true);
        setDateFilter({ startDate: range.firstDate, endDate:range.secondDate })
    }
    
    return {
        showDatePicker,
        setShowDatePicker,
        onRequestClose,
        onSelectDateRange,
    }
}
