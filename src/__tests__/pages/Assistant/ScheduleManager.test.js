// import dependencies
import React from "react";

// import react-testing methods
import { render, fireEvent, cleanup } from "@testing-library/react";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";

// import react dom
import ReactDOM from "react-dom";

// import renderer for take snapshots
import renderer from "react-test-renderer";

// import the component for testing
import ScheduleManager from "../../../pages/Assistant/ScheduleManager";
import { MemoryRouter } from "react-router-dom";

afterEach(cleanup);


it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter><ScheduleManager /></MemoryRouter>,
    div
  );
});

it("search button works correctly", async () => {
    const { queryByTestId } = render(
        <MemoryRouter><ScheduleManager /></MemoryRouter>
    );
    fireEvent.change(queryByTestId("search"),{ target: { value: 'mirissa' } })
    
  });
  


it("matches snapshot", () => {
  const tree = renderer.create(
    <MemoryRouter><ScheduleManager /></MemoryRouter>
  );

  expect(tree).toMatchSnapshot();
});
