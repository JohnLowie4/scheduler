import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  // Set up default state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // API request to the days and number of slots left for those days
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, []);

  // Set the currently selected day
  const setDay = day => setState({ ...state, day });

  /**
   * Finds the index of the current day in state.days
   * @returns {Number} the index of the current day in state.days
   */
  function findDayIndex() {
    for (let i = 0; i < state.days.length; i++) {
      if (state.days[i].name === state.day) {
        return i;
      }
    }
    return;
  }

  /**
   * Books/updates an interview appointment
   * @param {Number} id appointment id
   * @param {Object} interview object that contains the student name and interviewer id
   * @returns {Promise} that updates the database
   */
  function bookInterview(id, interview) {
  
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = [...state.days];
    const dayIndex = findDayIndex();
    
    return axios.put(`/api/appointments/${id}`, {interview})
      .then((res) => {
        if (state.appointments[id].interview === null) {
          days[dayIndex] = {
            ...days[dayIndex],
            spots: days[dayIndex].spots - 1
          };
        }
        setState({
          ...state,
          appointments,
          days
        });
      });
  }

  /**
   * Deletes a currently booked interview appointment
   * @param {Number} id appointment id
   * @returns {Promise} that updates the database
   */
  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = [...state.days];
    const dayIndex = findDayIndex();

    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        days[dayIndex] = {
          ...days[dayIndex],
          spots: days[dayIndex].spots + 1
        };
        setState({
          ...state,
          appointments,
          days
        });
      });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}