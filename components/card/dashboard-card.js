import { Column, Heading, Text, Skeleton, Row } from 'native-base';
import React from 'react';
const DashboardCardView = ({ type, name, value, isLoading }) => {
  return (
      <Column>
          <Text fontSize={'xs'} color={'black'}>{name}</Text>
          {isLoading ? 
            <Skeleton size={8} w={'100%'} rounded="md" startColor={'gray.300'}/> :
            (
              <Row>
                {type === 'amount' && <Text style={{fontSize: 12, lineHeight: 18, color: '#FF4E00'}}>&#8369;</Text>}
                <Heading size='lg' color={'black'}>{`${value}`}</Heading>
              </Row>
            )
          }
      </Column>
  );
};
export default DashboardCardView;