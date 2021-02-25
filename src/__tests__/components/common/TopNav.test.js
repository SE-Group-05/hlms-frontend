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
import TopNav from "../../../components/common/TopNav";

afterEach(cleanup);


it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <TopNav routes = {[]}/>,
    div
  );
});

it("matches snapshot", () => {
    const tree = renderer.create(
      <TopNav routes = {[]}/>
    );
  
    expect(tree).toMatchSnapshot();
  });
  