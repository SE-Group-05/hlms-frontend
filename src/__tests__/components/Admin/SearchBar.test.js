// import dependencies
import React from "react";

// import renderer for take snapshots
import renderer from "react-test-renderer";

// import react-testing methods
import {  cleanup } from "@testing-library/react";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";

// import react dom
import ReactDOM from "react-dom";

// import the component for testing
import SearchBar from "../../../components/Admin/SearchBar";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <SearchBar/>,
    div
  );
});

it("matches snapshot", () => {
  const tree = renderer.create(
    <SearchBar/>
  );

  expect(tree).toMatchSnapshot();
});
