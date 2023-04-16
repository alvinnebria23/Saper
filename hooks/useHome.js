
import React, { useEffect, useState } from 'react';
import { getConversionReport, getDashboardReport, getInitialData } from '../api/ShopeeApi';
import { EMPTY_DASHBOARD_VALUE } from '../constants/dashboard-constants';
import { getDefaultFilter } from '../util/DateUtil';
export default useHome = () => {
    const [status, setStatus] = useState({});
    const [dashboardData, setDashboardData] = useState([]);
    const [conversionData, setConversionData] = useState([]);
    const [dashboardFilterDate, setDashboardFilterDate] = useState(getDefaultFilter());
    const [conversionFilterDate, setConversionFilterDate] = useState(getDefaultFilter());
    const [topFiveSubIds, setTopFiveSubIds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialRender, setIsInitialRender] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const data = await getInitialData(`
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
                setConversionData([]);
            }else{
                setTopFiveSubIds(data.topFiveSubIds)
                setDashboardData(data.overAllTotal);
                setConversionData(data.conversionData);
            }
            setIsLoading(false);
        };
            fetchData();
    }, []);

    useEffect(() => {
        if(!isInitialRender){
            console.log('dashboard');
            const fetchData = async () => {
                setIsLoading(true);
                const data = await getDashboardReport(`
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
        }
      }, [dashboardFilterDate]);

    useEffect(() => {
        if(!isInitialRender){
            console.log('conversion');
            const fetchData = async () => {
                setIsLoading(true);
                const data = await getConversionReport(`
                    purchaseTimeStart:${conversionFilterDate.startDate.unixtimestamp}, 
                    purchaseTimeEnd:${conversionFilterDate.endDate.unixtimestamp}, 
                    limit:500
                `);
                setIsLoading(false);
                };
                fetchData();
        }
        setIsInitialRender(false);
    }, [conversionFilterDate]);
      

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
        topFiveSubIds,
        conversionFilterDate,
        setConversionFilterDate,
        conversionData
    }
}
