
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
        console.log(" ------- DASHBOARD FILTER DATE -------");
        console.log("Start Date Unix: " + dashboardFilterDate.startDate.unixtimestamp);
        console.log("End Date Unix: " + dashboardFilterDate.endDate.unixtimestamp);
        console.log(" ------- DASHBOARD FILTER DATE -------");
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
        let grossCommission = 0;
        let cappedCommission = 0;
        let estimatedTotalCommission = 0;
        let shopeeCommissionCapped = 0;
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

                    grossCommission += parseFloat(item.grossCommission);
                    cappedCommission += parseFloat(item.cappedCommission);
                    estimatedTotalCommission += parseFloat(item.estimatedTotalCommission);
                    shopeeCommissionCapped += parseFloat(item.shopeeCommissionCapped);

                    switch(item.conversionStatus){
                        case "CANCELLED":
                            totalCancelled += parseFloat(item.totalCommission);
                            break;
                        case "COMPLETED":
                            totalCompleted += parseFloat(item.totalCommission);
                            break;
                        case "PENDING":
                            totalPending =+ parseFloat(item.totalCommission);
                            break
                        default:
                            break;
                    }
                }
                if(item.utmContent === subId){
                    total += parseFloat(item.totalCommission);
                }
            })
            totalCommissionOfSubIds.push({ subId : subId, totalCommission: Math.round(total).toLocaleString() });
        });
        totalCommissionOfSubIds.sort((a, b) => b.totalCommission - a.totalCommission);
        const topFiveSubIds = totalCommissionOfSubIds.slice(0 , 5);
        console.log(" --------------- TOTAL VALUES -------------------");
        console.log("totalCommission: " + parseInt(totalCommission).toLocaleString());
        console.log("totalBrandCommission: " + parseInt(totalBrandCommission).toLocaleString());
        console.log("totalShopeeCommission: " + parseInt(totalShopeeCommission).toLocaleString());
        console.log("totalSellerCommission: " + parseInt(totalSellerCommission).toLocaleString());
        console.log("grossCommission: " + parseInt(grossCommission).toLocaleString());
        console.log("cappedCommission: " + parseInt(cappedCommission).toLocaleString());
        console.log("estimatedTotalCommission: " + parseInt(estimatedTotalCommission).toLocaleString());
        console.log("shopeeCommissionCapped: " + parseInt(shopeeCommissionCapped).toLocaleString());
        console.log(" --------------- TOTAL VALUES -------------------");
        return { overAllTotal: [
                { type: 'amount', id: 1, name: "Total Commission", value: parseInt(totalCommission).toLocaleString()},
                { type: 'number', id: 2, name: "Total Order", value: totalOrder.toLocaleString()},
                { type: 'amount', id: 3, name: "Total Brand Commission", value: parseInt(totalBrandCommission).toLocaleString()},
                { type: 'amount', id: 4, name: "Shopee Commission", value: parseInt(totalShopeeCommission).toLocaleString()},
                { type: 'amount', id: 5, name: "Seller Commission", value: parseInt(totalSellerCommission).toLocaleString()},
                { type: 'amount', id: 6, name: "Cancelled", value: parseInt(totalCancelled).toLocaleString()},
                { type: 'amount', id: 7, name: "Completed", value: parseInt(totalCompleted).toLocaleString()},
                { type: 'amount', id: 8, name: "Pending", value: parseInt(totalPending).toLocaleString()},
                { type: 'number', id: 9, name: "Total Clicks", value: 0},
                { type: 'amount', id: 10, name: "Net Profit (Less Adspent/Tax 10%)", value: 0},
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
