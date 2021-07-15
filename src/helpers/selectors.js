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

/**
 * Finds the student and the interviewer for a specific time slot
 * @param {Object} state 
 * @param {Object} interview 
 * @returns {Object} with student name and interviewer information
 */
function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const student = interview.student

  /**
   * Finds the interviewer for a specific student
   * @returns {Object} of interviewer information
   */
  const interviewer = function() {
    for (const obj in state.interviewers) {
      if (interview.interviewer === state.interviewers[obj].id) {
        return state.interviewers[obj];
      }
    }
    return null;
  };

  return {
    "student": student,
    "interviewer": interviewer()
  };
};

/**
 * Given the current day, returns an array of available interviewers for that specific day
 * @param {Object} state 
 * @param {String} day current day 
 * @returns {Array} an array of interviewers information for the day
 */
function getInterviewersForDay(state, day) {
  const result = [];

  /**
   * Given the day, searches for appointment info for
   * that day
   * @returns an array of appointment id's
   */
   function getInterviewersID() {
    const days = state.days;
    for (const obj of days) {
      if (obj.name === day) {
        return obj.interviewers;
      }
    }
    return [];
  }

  const interviewersID = getInterviewersID();
  const interviewers = state.interviewers;

  for (const id of interviewersID) {
    result.push(interviewers[id]);
  }

  return result;
};

module.exports = {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
};