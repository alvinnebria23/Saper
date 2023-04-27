
import React, { useEffect, useState } from 'react';
import { getClickTimeTree, getDashboardReport, getInitialData, getSubIdTree } from '../api/ShopeeApi';
import { getDefaultFilter } from '../util/DateUtil';
import { SUBID } from '../constants/conversion-report-constants';
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
    const [displayType, setDisplayType] = useState('1');

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
                let data;
                const parameters = `
                    purchaseTimeStart:${conversionFilterDate.startDate.unixtimestamp}, 
                    purchaseTimeEnd:${conversionFilterDate.endDate.unixtimestamp}, 
                    limit:500
                `;
                if(displayType === SUBID){
                    data = await getSubIdTree(parameters);
                } else {
                    data = await getClickTimeTree(parameters);
                }
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
    }, [conversionFilterDate, displayType]);

      

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
        isLoading,
        displayType,
        setDisplayType,
    }
}
