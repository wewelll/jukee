import moment from 'moment';

const formatNumberWithTwoDigits = number => (`0${number}`).slice(-2);

export const formatDuration = (milliseconds) => {
  const duration = moment.duration(milliseconds);
  const hh = duration.hours();
  const mm = formatNumberWithTwoDigits(duration.minutes());
  const ss = formatNumberWithTwoDigits(duration.seconds());
  return hh ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`;
};
