
import React, { useEffect, useState } from 'react';
import { getConversionReport } from '../api/ShopeeApi';
import useCommon from './useCommon';
import { EMPTY_DASHBOARD_VALUE } from '../constants/dashboard-constants';
export default useHome = () => {
    const { getDefaultFilter } = useCommon();
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
                const processedData = await processData(data);
                setTopFiveSubIds(processedData.topFiveSubIds)
                setDashboardData(processedData.overAllTotal);
            }
            setIsLoading(false);
        };
        fetchData();
      }, [dashboardFilterDate]);

    const processData = async (data) => {
        let totalCommission = 0;
        let totalOrder = data.length;
        let totalBrandCommission = 0;
        let totalShopeeCommission = 0;
        let totalSellerCommission = 0;
        let totalCancelled = 0;
        let totalCompleted = 0;
        let totalPending = 0;

        let clone = [ ...data ];
        let uniqueSubIds = Object.values(clone.reduce((acc, cur) => {
            if (!acc.includes(cur.utmContent)) {
              acc.push(cur.utmContent);
            }
            return acc;
        }, []));
        let totalCommissionOfSubIds = [];
        uniqueSubIds.forEach((subId, index) => {
            let total = 0;
            data.forEach((item) => {
                if(index === 0) {
                    totalCommission += parseFloat(item.totalCommission);
                    totalBrandCommission += parseFloat(item.totalBrandCommission);
                    totalShopeeCommission += parseFloat(item.shopeeCommissionCapped);
                    totalSellerCommission += parseFloat(item.sellerCommission);
                    switch(item.conversionStatus){
                        case "CANCELLED":
                            totalCancelled++;
                            break;
                        case "COMPLETED":
                            totalCompleted++;
                            break;
                        case "PENDING":
                            totalPending++;
                            break
                        default:
                            break;
                    }
                }
                if(item.utmContent === subId){
                    total += parseFloat(item.totalCommission);
                }
            })
            totalCommissionOfSubIds.push({ subId : subId, totalCommission: Math.round(total) });
        });
        totalCommissionOfSubIds.sort((a, b) => b.totalCommission - a.totalCommission);
        const topFiveSubIds = totalCommissionOfSubIds.slice(0 , 5);
        return { overAllTotal: [
                { id: 1, name: "Total Commission", value: parseInt(totalCommission)},
                { id: 2, name: "Total Order", value: totalOrder},
                { id: 3, name: "Total Brand Commission", value: parseInt(totalBrandCommission)},
                { id: 4, name: "Shopee Commission", value: parseInt(totalShopeeCommission)},
                { id: 5, name: "Seller Commission", value: parseInt(totalSellerCommission)},
                { id: 6, name: "Cancelled", value: totalCancelled},
                { id: 7, name: "Completed", value: totalCompleted},
                { id: 8, name: "Pending", value: totalPending},
                { id: 9, name: "Total Clicks", value: 0},
                { id: 10, name: "Net Profit (Less Adspent/Tax 10%)", value: 0},
            ], topFiveSubIds: topFiveSubIds, 
        };
    };
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
