
import React, { useEffect, useState } from 'react';
import { getConversionReport } from '../api/ShopeeApi';
import { EMPTY_DASHBOARD_VALUE } from '../constants/dashboard-constants';
import { getDefaultFilter } from '../util/DateUtil';
export default useHome = () => {
    const [status, setStatus] = useState({});
    const [dashboardData, setDashboardData] = useState([]);
    const [dashboardFilterDate, setDashboardFilterDate] = useState(getDefaultFilter());
    const [topFiveSubIds, setTopFiveSubIds] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const data = await getConversionReport(`
                purchaseTimeStart:${dashboardFilterDate.startDate.unixtimestamp}, 
                purchaseTimeEnd:${dashboardFilterDate.endDate.unixtimestamp}, 
                limit:500
            `);
            if(data?.error){
                const status = {
                    header: 'Error message',
                    body: data?.message,
                    isOpen: true,
                };
                setStatus(status);
                setDashboardData(EMPTY_DASHBOARD_VALUE);
            }else{
                setTopFiveSubIds(data.topFiveSubIds)
                setDashboardData(data.overAllTotal);
            }
            setIsLoading(false);
        };
        fetchData();
      }, [dashboardFilterDate]);
    const onCloseDialog = () => {
        setStatus(prevState => ({
            ...prevState,
            isOpen: false
        }));
    };
    return {
        onCloseDialog,
        status,
        dashboardData,
        dashboardFilterDate,
        setDashboardFilterDate,
        isLoading,
        topFiveSubIds
    }
}
