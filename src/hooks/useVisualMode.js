import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      const newHistory = [...history];
      newHistory.pop();
      setMode(newMode);
      setHistory((prevHistory) => [...newHistory, newMode]);
    } 
    if (!replace) {
      setMode(newMode);
      setHistory((prevHistory) => [...prevHistory, newMode]);
    }
  }

  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
      setHistory(history);
    }
  }

  return { mode, transition, back };
}