import React from 'react';
import { View } from 'react-native';
import { Column, Heading, Icon, Radio, Row, ScrollView, Menu, Switch, Text, Button, Center } from 'native-base';
import { DatePickerButton } from '../components/button';
import { RangeDatePickerModal } from '../components/modal';
import useDatePicker from '../hooks/useDatePicker';
import TreeView from 'react-native-final-tree-view';
import { DASHBOARD_CARD_STYLE } from '../constants/dashboard-constants';
import { NoDataFound } from '../components/image';
import { TwoColumnLabel } from '../components/label';
import { AntDesign } from '@expo/vector-icons';
import useConversion from '../hooks/useConversion';
import { CLICKTIME, SUBID_SELECT_ITEMS } from '../constants/conversion-report-constants';
const ConversionReportScreen =  ({ 
  conversionData,
  conversionFilterDate,
  setConversionFilterDate,
  isToggled,
  setIsToggled,
  isLoading,
}) => {
  const {
    showDatePicker, 
      setShowDatePicker, 
      onRequestClose, 
      onSelectDateRange, 
      dateFilter,
  } = useDatePicker(setConversionFilterDate);
  const {
    selectedSubIds,
    setSelectedSubIds,
    getIndicator, 
    getTax, 
    getNetProft,
    setDisplayType,
    displayData,
    displayType,
    onClose
  } = useConversion(conversionData.conversionReport);
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
  const triggerProps = (props) => {
    return <Button 
            isDisabled={displayType === "clicktime"}
            variant={"outline"} 
            size={'xs'}
            width={'40%'}
            height={'80%'}
            {...props}
            leftIcon={<Icon size={3} ml={'80%'} color={'black'} as={<AntDesign  name={'down'} />} />}
          />;
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
        {conversionData.conversionReport?.length ? 
        <ScrollView style={{ flex: 2, marginBottom: "20%" }}>
          <Row style={{ alignItems: 'center', alignSelf: 'flex-end' }}>
            <Text fontSize={12}>B.I.R. Registered</Text>
            <Switch size="sm" colorScheme="primary" onTrackColor={'#FF4E00'} onToggle={() => setIsToggled(!isToggled)} isChecked={isToggled} />
          </Row>
          <Row style={{ ...DASHBOARD_CARD_STYLE.box, padding: '2%', borderWidth: displayType ? 0 : 1 }}>
            <Radio.Group 
              name="myRadioGroup" 
              accessibilityLabel="Pick your favorite number"
              onChange={(value) => setDisplayType(value)}
              defaultValue='1'
            >
              <Row alignItems="center">
                <Radio value="1" my={1} size="sm" colorScheme={'warning'}>
                  <Text fontSize={12}>Sub-ID</Text>
                  <Menu 
                    closeOnSelect={false} 
                    w="auto" 
                    trigger={triggerProps}
                    onClose={onClose}
                  >
                        <Menu.OptionGroup 
                          title="Select" 
                          type="checkbox" 
                          defaultValue={selectedSubIds}
                          onChange={(value) => setSelectedSubIds(value)}
                        >
                          {SUBID_SELECT_ITEMS.map((item) => (
                            <Menu.ItemOption value={item.value}>{item.label}</Menu.ItemOption>
                          ))}
                        </Menu.OptionGroup>
                    </Menu>
                </Radio>
              </Row>
              <Row style={{ alignItems: 'center', alignSelf: 'flex-start' }}>
                <Radio value="2" my={1} size="sm" colorScheme={'warning'} style={{ alignSelf: 'flex-start' }}>
                  <Text fontSize={12}>Click Time</Text>
                </Radio>
              </Row>
            </Radio.Group>
          </Row>
          {displayType ? 
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
              data={!isLoading ? displayData : []} 
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
                      leftLabel={`${getIndicator(isExpanded, hasChildrenNodes)} ${node.level} ${node.name}`}
                      leftLabelStyle={{ alignSelf: 'flex-start', marginLeft: 25 * level }}
                      rightLabel={node.totalCommission?.toLocaleString() || 0 }
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
                rightLabel={getTax(isToggled, conversionData.grandTotal)}
              />
            </Row>
            <Row mt={'1%'}>
              <TwoColumnLabel 
                leftLabel={`Net Proft`} 
                rightLabel={getNetProft(isToggled, conversionData.grandTotal)}
              />
            </Row>
          </Column> :
           <Center>
            <Text fontSize={'2xs'} style={{ color: 'red' }}>{'Please Select (Click Time or Sub-Id)'}</Text>
           </Center>}
          </ScrollView> : < NoDataFound />}
    </View>
</View>
  );
};

export default ConversionReportScreen;