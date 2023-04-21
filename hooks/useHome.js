
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
    const [isToggled, setIsToggled] = useState(false);
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
                setDashboardData([]);
                setConversionData([]);
            }else{
                setTopFiveSubIds(data.topFiveSubIds);
                setDashboardData(data.totals);
                setConversionData(data.conversionReport?.conversionReport || []);
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
                        header: 'Dashboard Error message',
                        body: data?.message,
                        isOpen: true,
                    };
                    setStatus(status);
                    setDashboardData([]);
                }else{
                    setTopFiveSubIds(data.topFiveSubIds)
                    setDashboardData(data.totals);
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
                if(data?.errors){
                    const status = {
                        header: 'Conversion Report Error message',
                        body: data?.message,
                        isOpen: true,
                    };
                    setStatus(status);
                    setConversionData([]);
                }else{
                    setConversionData(data.conversionReport || []);
                }
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
        conversionData,
        isToggled,
        setIsToggled,
    }
}
