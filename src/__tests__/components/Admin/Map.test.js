// import dependencies
import React from "react";

// import react-testing methods
import { render, cleanup, fireEvent } from "@testing-library/react";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom";

// import react dom
import ReactDOM from "react-dom";

// import renderer for take snapshots
import renderer from "react-test-renderer";

// import the component for testing
import Map from "../../../components/Admin/Map";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Map />, div);
});

it("renders map correctly", () => {
  const onClickonMap = (longitude, latitude) => {
    expect(longitude).toBeDefined();
    expect(latitude).toBeDefined();
  };
  const { getByTestId } = render(<Map onClickonMap={onClickonMap} />);

//  fireEvent.click(getByTestId("map"));
});

it("matches snapshot", () => {
  const tree = renderer.create(
    <Map/>
  );

  expect(tree).toMatchSnapshot();
});
