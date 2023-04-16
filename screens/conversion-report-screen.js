import React from 'react';
import { View } from 'react-native';
import { Heading, Text } from 'native-base';
import { DatePickerButton } from '../components/button';
import { RangeDatePickerModal } from '../components/modal';
import useDatePicker from '../hooks/useDatePicker';
import useConversion from '../hooks/useConversion';
import TreeView from 'react-native-final-tree-view'
const ConversionReportScreen =  ({ 
  navigation, 
  conversionData,
  conversionFilterDate,
  setConversionFilterDate,
  setConversionData,
}) => {
  const {
    showDatePicker, 
      setShowDatePicker, 
      onRequestClose, 
      onSelectDateRange, 
      dateFilter,
  } = useDatePicker(setConversionFilterDate);
  const conversion = [
    {
      id: 'subid1',
      name: 'subid1',
      age: 78,
      children: [
        {
          id: 'subid2',
          name: 'subid2',
          age: 30,
          children: [
            {
              id: 'subid3',
              name: 'subid3',
              age: 10,
            },
            {
              id: 'subid3-2',
              name: 'subid3-2',
              age: 12,
            },
          ],
        },
      ],
    },
  ]

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
  function getIndicator(isExpanded, hasChildrenNodes) {
    if (!hasChildrenNodes) {
      return ''
    } else if (isExpanded) {
      return '-'
    } else {
      return '+'
    }
  }
  return (
    <View bg="white" width="100%" height={'100%'} style={{ paddingTop: '10%'}}>
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
        <TreeView
          data={conversion} // defined above
          renderNode={({ node, level, isExpanded, hasChildrenNodes }) => {
            return (
              <View>
                <Text
                  style={{
                    marginLeft: 25 * level,
                  }}
                >
                  {getIndicator(isExpanded, hasChildrenNodes)} {node.name}
                </Text>
              </View>
            )
          }}
        />
    </View>
</View>
  );
};

export default ConversionReportScreen;