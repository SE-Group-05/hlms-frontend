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
import AssistantVisitingPlaces from "../../../pages/Assistant/AssistantVisitingPlaces";
import { MemoryRouter } from "react-router-dom";

afterEach(cleanup);


it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter><AssistantVisitingPlaces /></MemoryRouter>,
    div
  );
});

it("search button works correctly", async () => {
    const { queryByTestId } = render(
        <MemoryRouter><AssistantVisitingPlaces /></MemoryRouter>
    );
    fireEvent.change(queryByTestId("search"),{ target: { value: 'mirissa' } })
    
  });
  


it("matches snapshot", () => {
  const tree = renderer.create(
    <MemoryRouter><AssistantVisitingPlaces /></MemoryRouter>
  );

  expect(tree).toMatchSnapshot();
});
