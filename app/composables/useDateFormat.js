/**
 * Composable for formatting date and time values
 */
export const useDateFormat = () => {
  /**
   * Formats a timestamp to DD/MM/YYYY HH:mm format
   * @param {string} timestamp - ISO string or any valid date string
   * @returns {string} Formatted date string in DD/MM/YYYY HH:mm format
   */
  const formatDateTime = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);

    // Check if date is valid
    if (isNaN(date.getTime())) return "";

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  /**
   * Formats a timestamp to DD/MM/YYYY format (date only)
   * @param {string} timestamp - ISO string or any valid date string
   * @returns {string} Formatted date string in DD/MM/YYYY format
   */
  const formatDate = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);

    // Check if date is valid
    if (isNaN(date.getTime())) return "";

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  /**
   * Formats a timestamp to HH:mm format (time only)
   * @param {string} timestamp - ISO string or any valid date string
   * @returns {string} Formatted time string in HH:mm format
   */
  const formatTime = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);

    // Check if date is valid
    if (isNaN(date.getTime())) return "";

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  /**
   * Formats a date range for exhibitions (DD/MM - DD/MM YYYY)
   * @param {string} startDate - ISO string or any valid date string for start date
   * @param {string} endDate - ISO string or any valid date string for end date
   * @returns {string} Formatted date range string in DD/MM - DD/MM YYYY format
   */
  const formatDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return "";

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check if dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return "";

    const formatDay = (date) => {
      return date.getDate().toString().padStart(2, "0");
    };

    const formatMonth = (date) => {
      return (date.getMonth() + 1).toString().padStart(2, "0");
    };

    const startFormatted = `${formatDay(start)}/${formatMonth(start)}`;
    const endFormatted = `${formatDay(end)}/${formatMonth(end)}`;
    const year = end.getFullYear();

    return `${startFormatted} - ${endFormatted} ${year}`;
  };

  /**
   * Formats a date range for exhibitions in a readable format (9. - 19. October 2025)
   * @param {string} startDate - ISO string or any valid date string for start date
   * @param {string} endDate - ISO string or any valid date string for end date
   * @returns {string} Formatted date range string in "9. - 19. October 2025" format
   */
  const formatExhibitionDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return "";

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check if dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return "";

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const startDay = start.getDate();
    const endDay = end.getDate();
    const monthName = monthNames[end.getMonth()];
    const year = end.getFullYear();

    // If same month and year, show "9. - 19. October 2025"
    if (
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear()
    ) {
      if (startDay === endDay) {
        // Same day
        return `${startDay}. ${monthName} ${year}`;
      } else {
        // Different days, same month
        return `${startDay}. - ${endDay}. ${monthName} ${year}`;
      }
    } else {
      // Different months or years
      const startMonthName = monthNames[start.getMonth()];
      const startYear = start.getFullYear();

      if (startYear === year) {
        // Same year, different months
        return `${startDay}. ${startMonthName} - ${endDay}. ${monthName} ${year}`;
      } else {
        // Different years
        return `${startDay}. ${startMonthName} ${startYear} - ${endDay}. ${monthName} ${year}`;
      }
    }
  };

  return {
    formatDateTime,
    formatDate,
    formatTime,
    formatDateRange,
    formatExhibitionDateRange,
  };
};
