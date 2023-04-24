import React from 'react';
import { View } from 'react-native';
import { Heading, Row, Text } from 'native-base';

const TwoColumnLabel = ({ 
  type = 'heading', 
  fontSize,
  leftLabel, 
  rightLabel, 
  leftLabelStyle = { alignSelf: 'flex-start' }, 
  rightLabelStyle = { alignSelf: 'flex-end' },
}) => {
  return (
    <>
      {type === 'heading' ? 
        <Row alignItems={'center'}>
          <View style={{ flex: 1 }}>
            <Heading size={'sm'} style={{ ...leftLabelStyle }}>
              {leftLabel}
            </Heading>
          </View>
          <View style={{ flex: 0 }}>
            <Heading size={'sm'} style={{ ...rightLabelStyle }}>
              {rightLabel}
            </Heading>
          </View>
        </Row> :
      <Row>
        <View style={{ flex: 1 }}>
          <Text style={{ ...leftLabelStyle, fontSize: fontSize }}>
            {leftLabel}
          </Text>
        </View>
        <View style={{ flex: 0 }}>
          <Text style={{ ...rightLabelStyle, fontSize: fontSize }}>
            {rightLabel}
          </Text>
        </View>
      </Row>}
    </>
)
};

export default TwoColumnLabel;
