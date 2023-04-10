import { GMT_8_TIMEZONE_OFFSET } from "../constants/date-constants";

const getLocalCurrentDate = () => {
    return new Date(Date.now() + GMT_8_TIMEZONE_OFFSET)
};

const getDateToday = () => {
  const now = new Date(Date.now() + GMT_8_TIMEZONE_OFFSET);
  now.setHours(15);
  now.setMinutes(59);
  now.setSeconds(59);
  return now;
};

const getPastDate = (numberOfDays) => {
  const now = getLocalCurrentDate();
  const sevenDaysAgoDate = new Date(now.getTime() - numberOfDays * 24 * 60 * 60 * 1000); // date 7 days ago in GMT+8
  const sevenDaysAgoDateaAndTime = new Date(sevenDaysAgoDate.getFullYear(), sevenDaysAgoDate.getMonth(), sevenDaysAgoDate.getDate());
  return sevenDaysAgoDateaAndTime;
};

const formatDateToString = (date, time) => {
  if(!date){
    return '';
  }
  const formattedDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).replace(',', '') + " " + time;
  return formattedDate ;
};

const formatDateToUnixTimestamp = (date) => {
  const formatted = new Date(date.toString()).getTime() / 1000;
  return formatted;
};

const getDefaultFilter = () => {
  // get the first day of last months date
  const today = new Date();
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const firstDayOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1);
  const formattedFirstDayDate = formatDateToString(firstDayOfLastMonth, '12:00 AM');
  // get the last day of last months date
  const lastDayOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0,23,59,59,999);
  const formattedLastDayDate = formatDateToString(lastDayOfLastMonth, '11:59 PM');

  return { startDate: { text: formattedFirstDayDate , unixtimestamp: formatDateToUnixTimestamp(firstDayOfLastMonth) }, endDate: { text: formattedLastDayDate, unixtimestamp: formatDateToUnixTimestamp(lastDayOfLastMonth) }};
};

export { 
    getLocalCurrentDate,
    getPastDate,
    formatDateToString,
    formatDateToUnixTimestamp,
    getDefaultFilter,
    getDateToday,
  };