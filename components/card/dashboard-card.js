import { Column, Heading, Text, Row } from 'native-base';
import React from 'react';
const DashboardCardView = ({ type, name, value }) => {
  return (
      <Column>
          <Text fontSize={'xs'} color={'black'}>{name}</Text>
            <Row>
              {type === 'amount' && <Text style={{fontSize: 12, lineHeight: 18, color: '#FF4E00'}}>&#8369;</Text>}
              <Heading size='md' color={'black'}>{`${parseInt(value).toLocaleString()}`}</Heading>
              {type === 'amount' && <Text style={{fontSize: 12, lineHeight: 25 }}>.{value.toFixed(2).split('.')[1] || ''}</Text>}
            </Row>
      </Column>
  );
};
export default DashboardCardView;