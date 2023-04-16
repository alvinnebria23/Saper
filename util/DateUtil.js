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
  const pastDate = new Date(now.getTime() - numberOfDays * 24 * 60 * 60 * 1000);
  const pastDateAndTime = new Date(pastDate.getFullYear(), pastDate.getMonth(), pastDate.getDate());
  return pastDateAndTime;
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
  const today = new Date();
  const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  const formattedLastWeekDate = formatDateToString(lastWeek, '12:00 AM');
  
  const formattedCurrentDate = formatDateToString(today, '11:59 PM');
  today.setHours(23);
  today.setMinutes(59);
  today.setSeconds(59);

  return {
    startDate: { text: formattedLastWeekDate, unixtimestamp: formatDateToUnixTimestamp(lastWeek) },
    endDate: { text: formattedCurrentDate, unixtimestamp: formatDateToUnixTimestamp(today) }
  };
};

export { 
    getLocalCurrentDate,
    getPastDate,
    formatDateToString,
    formatDateToUnixTimestamp,
    getDefaultFilter,
    getDateToday,
  };