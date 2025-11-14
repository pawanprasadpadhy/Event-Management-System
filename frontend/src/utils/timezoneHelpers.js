import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatEventDate = (dateString, userTimeZone = dayjs.tz.guess()) => {
    if (!dateString) return 'N/A';
    // Assume dateString is in UTC if no timezone info is present
    const date = dayjs.utc(dateString);
    return date.tz(userTimeZone).format('MMMM D, YYYY h:mm A z');
};
