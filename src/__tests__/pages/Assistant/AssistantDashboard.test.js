// import dependencies
import React from "react";

// import react-testing methods
import { render, fireEvent, cleanup, waitFor } from "@testing-library/react";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";

// import react dom
import ReactDOM from "react-dom";

// import renderer for take snapshots
import renderer from "react-test-renderer";

// import the component for testing
import AssistantDashboard from "../../../pages/Assistant/AssistantDashboard";
import { MemoryRouter } from "react-router-dom";

afterEach(cleanup);


it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter><AssistantDashboard /></MemoryRouter>,
    div
  );
});



it("matches snapshot", () => {
  const tree = renderer.create(
    <MemoryRouter><AssistantDashboard /></MemoryRouter>
  );

  expect(tree).toMatchSnapshot();
});
