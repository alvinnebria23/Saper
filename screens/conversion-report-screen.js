import React from 'react';
import { View } from 'react-native';
import { Column, Heading, Icon, Radio, Row, ScrollView, Menu, Switch, Text, Button } from 'native-base';
import { DatePickerButton } from '../components/button';
import { RangeDatePickerModal } from '../components/modal';
import useDatePicker from '../hooks/useDatePicker';
import TreeView from 'react-native-final-tree-view';
import { DASHBOARD_CARD_STYLE } from '../constants/dashboard-constants';
import { NoDataFound } from '../components/image';
import { TwoColumnLabel } from '../components/label';
import { AntDesign } from '@expo/vector-icons';
import useConversion from '../hooks/useConversion';
import { CLICKTIME, SUBID, SUBID_SELECT_ITEMS } from '../constants/conversion-report-constants';
import { getTax, getNetProfit } from '../util/CommonUtil.js';
const ConversionReportScreen =  ({ 
  conversionData,
  conversionFilterDate,
  setConversionFilterDate,
  isToggled,
  setIsToggled,
  isLoading,
  displayType,
  setDisplayType,
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
    displayData,
    onChange,
    onPress,
    isOpen
  } = useConversion(conversionData?.conversionReport, displayType, setDisplayType);
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
    return (<Button 
              {...props}
              isDisabled={displayType !== SUBID}
              variant={"outline"} 
              size={'xs'}
              width={'40%'}
              height={'80%'}
              onPress={onPress}
              leftIcon={<Icon size={3} ml={'80%'} color={'black'} as={<AntDesign  name={'down'} />} />}
            />)
  }
  const getIndicator = (isExpanded, hasChildrenNodes, level) => {
    if (!hasChildrenNodes) {
      return (
        <View>
          {displayType === SUBID ? 
          <Icon 
          size={4}
          alignSelf={'center'} 
          color={'black'}
          as={<AntDesign  name={displayType === CLICKTIME ? 'clockcircleo' : 'minus'} />} /> :
          <Text>:</Text>}
        </View>)
    } else if (isExpanded) {
      return (
        <View>
          <Icon 
            size={4}
            alignSelf={'center'} 
            color={'black'}
            as={<AntDesign  name={'minus'} />} />
        </View>
      )
    } else {
      return (
        <View>
          <Icon 
            size={4}
            alignSelf={'center'} 
            color={'#FF4E00'}
            as={<AntDesign  name={'pluscircle'} />} />
        </View>
      )
    }
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
        <ScrollView style={{ flex: 2, marginBottom: "20%" }}>
          <Row style={{ alignItems: 'center', alignSelf: 'flex-end' }}>
            <Text fontSize={12}>B.I.R. Registered</Text>
            <Switch size="sm" colorScheme="primary" onTrackColor={'#FF4E00'} onToggle={() => setIsToggled(!isToggled)} isChecked={isToggled} />
          </Row>
          <Row style={{ ...DASHBOARD_CARD_STYLE.box, padding: '2%' }}>
            <Radio.Group 
              name="myRadioGroup" 
              accessibilityLabel="Pick your favorite number"
              onChange={onChange.bind(this, 'radio')}
              defaultValue='1'
            >
              <Radio value="1" my={1} size="sm" colorScheme={'warning'} alignItems={'center'}>
                <Text fontSize={12}>Sub-ID</Text>
                <Menu 
                  closeOnSelect={false} 
                  w="auto" 
                  trigger={triggerProps}
                  isOpen={isOpen}
                >
                  <Menu.OptionGroup 
                    title="Select" 
                    type="checkbox" 
                    defaultValue={selectedSubIds}
                    onChange={onChange.bind(this, 'menu')}
                  >
                    {SUBID_SELECT_ITEMS.map((item) => (
                      <Menu.ItemOption key={item.value} value={item.value}>{item.label}</Menu.ItemOption>
                    ))}
                     <Button colorScheme={'orange'} variant={'ghost'} onPress={onPress}>CLOSE</Button>
                  </Menu.OptionGroup>
                </Menu>
              </Radio>
              <Radio value="2" my={1} size="sm" colorScheme={'warning'} style={{ alignSelf: 'flex-start' }}>
                <Text fontSize={12}>Click Time</Text>
              </Radio>
            </Radio.Group>
          </Row>
          {!isLoading && displayData?.length ? <Column style={{...DASHBOARD_CARD_STYLE.box, 
            marginBottom: "1%", 
            paddingLeft: '4%', 
            paddingRight: '6%',
            paddingTop: '7%',
            paddingBottom: '7%',
          }}>
            <TwoColumnLabel 
              leftLabelStyle={{ marginBottom: '5%', marginLeft: '1%' }}
              rightLabelStyle={{ marginBottom: '5%' }}
              leftLabel={'Description'} 
              rightLabel={'Total Commission'} 
            />
            <TreeView
              data={displayData} 
              renderNode={({ node, level, isExpanded, hasChildrenNodes }) => {
                return (
                  <Row 
                    key={node.name}
                    style={{ 
                      alignItems: 'center', 
                      paddingRight: level === 3 ? 13.5 : 25,
                      paddingLeft: 25 * level,
                      marginBottom: '1%',
                    }}>
                    {getIndicator(isExpanded, hasChildrenNodes, level)}
                      <TwoColumnLabel 
                        type='text'
                        fontSize={15}
                        leftLabel={` ${node.name}`}
                        rightLabel={node.totalCommission?.toLocaleString() || 0 }
                      />
                  </Row>
                )
              }}
            /> 
              <TwoColumnLabel 
                leftLabelStyle={{ marginTop: '5%', marginLeft: '2%' }}
                rightLabelStyle={{ marginTop: '5%' }}
                leftLabel={'Grand Total'} 
                rightLabel={conversionData.grandTotal?.toLocaleString()}
              />
              <TwoColumnLabel 
                type='text'
                fontSize={13}
                leftLabel={`${isToggled ? '(5%)' : '(10%)'} Tax`} 
                leftLabelStyle={{ marginLeft: '2%' }}
                rightLabel={getTax(isToggled, conversionData.grandTotal)}
              />
              <TwoColumnLabel 
                leftLabel={`Net Proft`} 
                leftLabelStyle={{ marginLeft: '2%' }}
                rightLabel={getNetProfit(isToggled, conversionData.grandTotal)}
              />
          </Column> : !isLoading && <NoDataFound screenType={'conversionReport'}/>}
          </ScrollView>
    </View>
</View>
  );
};

export default ConversionReportScreen;