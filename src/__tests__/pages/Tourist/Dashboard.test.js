// import dependencies
import React from "react";

// import API mocking utilities from Mock Service Worker
import { rest } from "msw";
import { setupServer } from "msw/node";

// import react-testing methods
import { render, cleanup, waitFor } from "@testing-library/react";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";

// import react dom
import ReactDOM from "react-dom";

// import renderer for take snapshots
import renderer from "react-test-renderer";

// import the component for testing
import TouristDashboard from "../../../pages/Tourist/Dashboard";
import { MemoryRouter } from "react-router-dom";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MemoryRouter><TouristDashboard /></MemoryRouter>, div);
});


it("matches snapshot", async () => {
  const tree = renderer.create(<MemoryRouter><TouristDashboard /></MemoryRouter>);
  expect(tree).toMatchSnapshot();
});
