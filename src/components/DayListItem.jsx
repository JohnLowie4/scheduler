import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {

  const dayClass = function() {
    const dayClass = classNames("day-list__item", {
      "--selected": props.selected,
      "--full": props.spots === 0
    });
    return dayClass.replace(" ", "");
  };

  const formatSpots = function() {
    if (!props.spots) {
      return "no spots remaining";
    }
    if (props.spots === 1) {
      return "1 spot remaining";
    }
    if (props.spots >= 2) {
      return `${props.spots} spots remaining`;
    }
  };

  return (
    <li className={dayClass()} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}