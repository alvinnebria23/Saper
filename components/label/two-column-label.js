import React from 'react';
import { View } from 'react-native';
import { Row, Text } from 'native-base';

const TwoColumnLabel = ({ 
  leftLabel, 
  rightLabel, 
  leftLabelStyle = { alignSelf: 'flex-start' }, 
  rightLabelStyle = { alignSelf: 'flex-end' },
}) => {
  return (
    <Row>
      <View style={{ flex: 1 }}>
        <Text style={{ ...leftLabelStyle }}>
          {leftLabel}
        </Text>
      </View>
      <View style={{ flex: 0 }}>
        <Text style={{ ...rightLabelStyle }}>
          {rightLabel}
        </Text>
      </View>
    </Row>
  )
};

export default TwoColumnLabel;
