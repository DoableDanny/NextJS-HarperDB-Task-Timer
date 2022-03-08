const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_MINUTE = 60;

export const displayTimeString = (seconds: number) => {
  const { formattedHours, formattedMins, formattedSecs } = formatTime(seconds);
  return `${formattedHours}h ${formattedMins}m ${formattedSecs}s`;
};

// timestamp => dd/mm/yyyy
export const timestampToDayMonthYear = (timestamp: number) => {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString();
  return formattedDate;
};

// HH:MM:SS
export const formatTime = (seconds: number) => {
  const { hours, mins, secs } = calculateHoursMinsAndSecs(seconds);

  const formattedHours = prependZeroIfLessThanTen(hours);
  const formattedMins = prependZeroIfLessThanTen(mins);
  const formattedSecs = prependZeroIfLessThanTen(secs);

  return {
    formattedHours,
    formattedMins,
    formattedSecs,
  };
};

// Prefix time with 0 if less than 10. E.g. '1' => '01'.
const prependZeroIfLessThanTen = (time: number) => {
  const formattedTime: string = time < 10 ? `0${time}` : `${time}`;
  return formattedTime;
};

// Convert seconds into hours, mins, and secs
const calculateHoursMinsAndSecs = (seconds: number) => {
  const hours = calculateHours(seconds);
  const mins = calculateMins(seconds);
  const secs = calculateSecs(seconds);

  return {
    hours,
    mins,
    secs,
  };
};

const calculateHours = (seconds: number) => {
  const hours = Math.floor(seconds / SECONDS_PER_HOUR);
  return hours;
};

const calculateMins = (seconds: number) => {
  const mins = Math.floor((seconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE);
  return mins;
};

const calculateSecs = (seconds: number) => {
  const secs = Math.floor((seconds % SECONDS_PER_HOUR) % SECONDS_PER_MINUTE);
  return secs;
};
