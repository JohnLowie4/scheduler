import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {

  const interviewerClass = function() {
    const interviewerClass = classNames(
      "interviewers__item",
      {
        "--selected": props.selected,
      }
    );
    return interviewerClass.replace(" ", "");

  }


  return (
    <li id={props.id} className={interviewerClass()} onClick={() => props.setInterviewer(props.name)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt="Sylvia Palmer"
      />
      {props.name}
    </li>
  );
}