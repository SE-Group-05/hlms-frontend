// import dependencies
import React from "react";

// import react-testing methods
import {  cleanup } from "@testing-library/react";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";

// import react dom
import ReactDOM from "react-dom";

// import renderer for take snapshots
import renderer from "react-test-renderer";

// import the component for testing
import LoginPage from "../../pages/LoginPage";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LoginPage />, div);
});

it("matches snapshot", async () => {
  const tree = renderer.create(<LoginPage />);
  expect(tree).toMatchSnapshot();
});
