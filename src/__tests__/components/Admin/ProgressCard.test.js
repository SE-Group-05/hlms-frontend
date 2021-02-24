// import dependencies
import React from "react";

// import react-testing methods
import { render, cleanup } from "@testing-library/react";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom";

// import react dom
import ReactDOM from "react-dom";

// import renderer for take snapshots
import renderer from "react-test-renderer";

// import the component for testing
import ProgressCard from "../../../components/Admin/ProgressCard";


afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ProgressCard />, div);
});

it("renders progress card correctly", () => {
  const { getByTestId } = render(
    <ProgressCard
     currentvalue = {25}
     Heading = "Asisstants"

    />
  );
  expect(getByTestId('current_value')).toHaveTextContent("25");
  expect(getByTestId('heading')).toHaveTextContent("Asisstants");
});

it("matches snapshot", () => {
  const tree = renderer.create(<ProgressCard
    currentvalue = {25}
    heading = "Asisstants"

   />);

    expect(tree).toMatchSnapshot();
})

