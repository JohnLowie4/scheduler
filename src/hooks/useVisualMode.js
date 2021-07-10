import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      history.pop();
      setMode(newMode);
      setHistory(history.push(newMode));
    }
    if (!replace) {
      setMode(newMode);
      setHistory(history.push(newMode));
    }
  }

  function back() {
    if (history.length > 0) {
      history.pop();
      setHistory(history);
      setMode(history[history.length - 1]);
    }
  }

  return { mode, transition, back };
}