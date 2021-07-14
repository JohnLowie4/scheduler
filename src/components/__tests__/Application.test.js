import React from "react";

import { render,
  cleanup,
  waitForElement,
  fireEvent,
  prettyDOM,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText
} from "@testing-library/react";

import Application from "components/Application";
import Appointment from "components/Appointment";

afterEach(cleanup);

describe("Application", () => {

  it("renders without crashing", () => {
    render(<Appointment />);
  });

  it("defaults to Monday and changes the schedule when a new day is selected", async() => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async() => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointments = getAllByTestId(container, "appointment");

    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "Lydia Miller-Jones"}
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    // console.log(debug(appointment));

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // This worked but we will use the next line of code for better industry practice
    // const day = getAllByTestId(container, "day")[0];
    // expect(getByText(day, "Monday")).toBeInTheDocument();

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    console.log(prettyDOM(day));

  });

});