import { Column, Heading, Text } from 'native-base';
import React from 'react';
import { View, StyleSheet } from 'react-native';
const DashboardCardView = ({name, value, style }) => {
  return (
    <View style={{ ...styles.card, ...style }}>
        <Column>
            <Text fontSize={'xs'} color={'black'}>{name}</Text>
            <Heading size='lg' color={'black'}>{value}</Heading>
        </Column>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    borderColor: 'gray',
    borderRadius: 10,
    elevation: 2,
    backgroundColor: '#f6f7f9',
    padding: 20,
    margin: '1%',
    flex: 2,
  }
});
export default DashboardCardView;