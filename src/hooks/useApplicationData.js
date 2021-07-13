import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

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

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
  
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
      .then((res) => {
        setState({...state, appointments});
        axios.get("/api/days")
          .then((res) => {
            setState((prev) => ({
              ...prev,
              days: res.data
            }));
          });
      });
  }

  function cancelInterview(id) {
    
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        setState({...state, appointments});
        axios.get("/api/days")
          .then((res) => {
            setState((prev) => ({
              ...prev,
              days: res.data
            }));
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