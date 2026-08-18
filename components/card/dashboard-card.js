import { FontAwesome5 } from '@expo/vector-icons';
import { Column, Heading, Text, Row } from 'native-base';
import React from 'react';
const DashboardCardView = ({ type, name, value, showQuestionIcon = false , style = {} }) => {
  return (
      <Column style={showQuestionIcon ? style : {}}>
          <Row alignItems={'center'}>
            <Text fontSize={'xs'} color={'black'}>{name}</Text>
            {showQuestionIcon && <FontAwesome5 style={{ marginLeft: '3%' }} name={"question-circle"} size={12} color={'orange'} />}
          </Row>
          <Row>
            {type === 'amount' && <Text style={{fontSize: 12, lineHeight: 18, color: '#FF4E00'}}>&#8369;</Text>}
            <Heading size='md' color={'black'}>{`${parseInt(value).toLocaleString()}`}</Heading>
            {type === 'amount' && <Text style={{fontSize: 12, lineHeight: 25 }}>.{value.toFixed(2).split('.')[1] || ''}</Text>}
          </Row>
      </Column>
  );
};
export default DashboardCardView;