import { GMT_8_TIMEZONE_OFFSET } from "../constants/date-constants";

const getLocalCurrentDate = () => {
    return new Date(Date.now() + GMT_8_TIMEZONE_OFFSET)
};

const getDateToday = () => {
  const now = new Date(Date.now() + GMT_8_TIMEZONE_OFFSET);
  now.setHours(23);
  now.setMinutes(59);
  now.setSeconds(59);
  return now;
};
const getYesterdayDateRange = () => {
  const now = getLocalCurrentDate();
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  const yesterdayStart = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
  const yesterdayEnd = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 23, 59, 59, 999);
  return { yesterdayStart: yesterdayStart, yesterdayEnd: yesterdayEnd };
};

const getSevenDaysAgoDate = () => {
  const now = getLocalCurrentDate();
  const sevenDaysAgoDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // date 7 days ago in GMT+8
  const sevenDaysAgoDateaAndTime = new Date(sevenDaysAgoDate.getFullYear(), sevenDaysAgoDate.getMonth(), sevenDaysAgoDate.getDate());
  return sevenDaysAgoDateaAndTime;
};

const getThiryDaysAgoDate = () => {
  const now = getLocalCurrentDate();
  const ThirtyDaysAgoDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const ThirtyDaysAgoDateAndTime = new Date(ThirtyDaysAgoDate.getFullYear(), ThirtyDaysAgoDate.getMonth(), ThirtyDaysAgoDate.getDate());
  return ThirtyDaysAgoDateAndTime;
};

const getNinetyDaysAgoDate = () => {
  const now = getLocalCurrentDate();
  const NinetyDaysAgoDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
  const ThirtyDaysAgoDateAndTime = new Date(NinetyDaysAgoDate.getFullYear(), NinetyDaysAgoDate.getMonth(), NinetyDaysAgoDate.getDate());
  return ThirtyDaysAgoDateAndTime;
};

const formatDateToString = (date) => {
  const formattedDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).replace(',', '');
  return formattedDate;
};

const formatDateToUnixTimestamp = (date) => {
  const formatted = Math.floor(new Date(date.toString()).getTime() / 1000);
  return formatted;
};

const getDefaultFilter = () => {
  // get the first day of last months date
  const today = new Date();
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const firstDayOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1);
  const formattedFirstDayDate = formatDateToString(firstDayOfLastMonth);
  // get the last day of last months date
  const lastDayOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0,23,59,59,999);
  const formattedLastDayDate = formatDateToString(lastDayOfLastMonth);

  return { startDate: { text: formattedFirstDayDate , unixtimestamp: formatDateToUnixTimestamp(firstDayOfLastMonth) }, endDate: { text: formattedLastDayDate, unixtimestamp: formatDateToUnixTimestamp(lastDayOfLastMonth) }};
};

export { 
    getLocalCurrentDate,
    getYesterdayDateRange, 
    getSevenDaysAgoDate, 
    getThiryDaysAgoDate, 
    getNinetyDaysAgoDate,
    formatDateToString,
    formatDateToUnixTimestamp,
    getDefaultFilter,
    getDateToday,
  };