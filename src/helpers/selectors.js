/**
 * Searches a specific day of the week, and returns all
 * the appointments for that specific day
 * @param {Object} state 
 * @param {String} day 
 * @returns {Array} an array of all appointments for the day
 */
function getAppointmentsForDay(state, day) {

  const result = [];

  /**
   * Given the day, searches for appointment info for
   * that day
   * @returns an array of appointment id's
   */
  function getInterviewDayInfo() {
    const days = state.days;
    for (const obj of days) {
      if (obj.name === day) {
        return obj.appointments;
      }
    }
    return [];
  }

  const appDayInfo = getInterviewDayInfo();
  const appointments = state.appointments;

  // Loops through appointments and pushes matching id to result
  for (const id in appointments) {
    if (appDayInfo.includes(appointments[id].id)) {
      result.push(appointments[id]);
    }
  }
  
  return result;
};

module.exports = {getAppointmentsForDay};