import React from 'react';
import { View } from 'react-native';
import { Column, Heading, Row, ScrollView, Switch, Text } from 'native-base';
import { DatePickerButton } from '../components/button';
import { RangeDatePickerModal } from '../components/modal';
import useDatePicker from '../hooks/useDatePicker';
import TreeView from 'react-native-final-tree-view';
import { DASHBOARD_CARD_STYLE } from '../constants/dashboard-constants';
import { NoDataFound } from '../components/image';
import { TwoColumnLabel } from '../components/label';
import { useState } from 'react';
const ConversionReportScreen =  ({ 
  conversionData,
  conversionFilterDate,
  setConversionFilterDate,
}) => {
  const [isToggled, setIsToggled] = useState(false);
  const {
    showDatePicker, 
      setShowDatePicker, 
      onRequestClose, 
      onSelectDateRange, 
      dateFilter,
  } = useDatePicker(setConversionFilterDate);

  const renderDatePicker = () => {
    return (
      <RangeDatePickerModal 
          showDatePicker={showDatePicker} 
          onRequestClose={onRequestClose}
          onSelectDateRange={onSelectDateRange}
          dateRange={dateFilter}
      />
    )
  };
  const getIndicator = (isExpanded, hasChildrenNodes) => {
    if (!hasChildrenNodes) {
      return '-'
    } else if (isExpanded) {
      return '-'
    } else {
      return '+'
    }
  }
  const getTax = () => {
    const taxPercentage = isToggled ? 0.05 : 0.1;
    return parseInt(parseInt(conversionData.grandTotal) * taxPercentage).toLocaleString();
  }
  const getNetProft = () => {
    const grandTotal = parseInt(conversionData.grandTotal);
    const taxPercentage = isToggled ? 0.05 : 0.1;

    return parseInt(grandTotal - (grandTotal * taxPercentage)).toLocaleString();
  }
  return (
    <View bg="white" width="100%" height={'100%'}>
    {renderDatePicker()}
    <View>
        <Heading ml='5%' mt='5%' mb={'4%'} size='md' color={'primary.50'}>Conversion Report</Heading>
    </View>
    <View style={{ marginLeft: '4%' , marginRight: '4%', flex: 2 }}>
        <DatePickerButton 
            setShowDatePicker={setShowDatePicker} 
            startDateText={conversionFilterDate.startDate.text} 
            endDateText={conversionFilterDate.endDate.text}
        />
        {conversionData.conversionReport.length ? 
        <ScrollView style={{ flex: 2, marginBottom: "20%" }}>
          <Row style={{ alignItems: 'center', alignSelf: 'flex-end', }}>
              <Text fontSize={12}>B.I.R. Registered</Text>
              <Switch size="sm" colorScheme="primary" onTrackColor={'#FF4E00'} onToggle={() => setIsToggled(!isToggled)} isChecked={isToggled} />
          </Row>
          <Column style={{...DASHBOARD_CARD_STYLE.box, 
            marginBottom: "1%", 
            paddingLeft: '5%', 
            paddingRight: '5%',
            paddingTop: '7%',
            paddingBottom: '7%',
          }}>
            <Row style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3%' }}>
              <TwoColumnLabel leftLabel={'Description'} rightLabel={'Total Commission'} />
            </Row>
            <TreeView
              data={conversionData.conversionReport} 
              renderNode={({ node, level, isExpanded, hasChildrenNodes }) => {
                return (
                  <Row style={{ 
                    flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    borderBottomWidth: isExpanded ? 0.5 : 0,
                    marginBottom: '1%'
                  }}>
                    <TwoColumnLabel 
                      type='text'
                      fontSize={15}
                      leftLabel={`${getIndicator(isExpanded, hasChildrenNodes)} ${node.name}`}
                      leftLabelStyle={{ alignSelf: 'flex-start', marginLeft: 25 * level }}
                      rightLabel={parseInt(node.totalCommission).toLocaleString()}
                      rightLabelStyle={{ alignSelf: 'flex-end', marginLeft: 10 }}
                    />
                  </Row>
                )
              }}
            /> 
            <Row mt={'5%'}>
              <TwoColumnLabel 
                type='text'
                fontSize={15}
                leftLabel={'Grand Total'} 
                rightLabel={parseInt(conversionData.grandTotal).toLocaleString()}
              />
            </Row>
            <Row mt={'1%'}>
              <TwoColumnLabel 
                type='text'
                fontSize={15}
                leftLabel={`${isToggled ? '(5%)' : '(10%)'} Tax`} 
                rightLabel={getTax()}
              />
            </Row>
            <Row mt={'1%'}>
              <TwoColumnLabel 
                leftLabel={`Net Proft`} 
                rightLabel={getNetProft()}
              />
            </Row>
          </Column> 
          </ScrollView> : < NoDataFound />}
    </View>
</View>
  );
};

export default ConversionReportScreen;