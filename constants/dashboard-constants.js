import { StyleSheet } from "react-native";

export const EMPTY_DASHBOARD_VALUE = [
  { id: 1, name: "Total Commission", value: 0},
  { id: 2, name: "Total Order", value: 0},
  { id: 3, name: "Total Brand Commission", value: 0},
  { id: 4, name: "Shopee Commission", value: 0},
  { id: 5, name: "Seller Commission", value: 0},
  { id: 6, name: "Cancelled", value: 0},
  { id: 7, name: "Completed", value: 0},
  { id: 8, name: "Pending", value: 0},
];

export const DASHBOARD_CARD_STYLE = StyleSheet.create({
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
  },
  box: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    borderColor: 'gray',
    borderRadius: 10,
    elevation: 2,
    backgroundColor: '#f6f7f9',
    paddingRight: 10,
    paddingLeft: 10,
    marginLeft: '1%',
    marginRight: '1%',
    marginTop: '3%',
  },
});

export const DASHBOARD_DATE_BUTTONS = [
  { id: 0, name: 'Yesterday', value: 1},
  { id: 1, name: 'Last 7 days', value: 7},
  { id: 2, name: 'Last month', value: 30},
  { id: 3, name: 'Last 3 months', value: 90},
];

export const YESTERDAY = 1;
export const SEVEN_DAYS_AGO = 7;
export const THIRTY_DAYS_AGO = 30;
export const NINETY_DAYS_AGO = 90;