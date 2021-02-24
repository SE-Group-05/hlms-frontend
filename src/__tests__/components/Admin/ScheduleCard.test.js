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
import ScheduleCard from "../../../components/Admin/ScheduleCard";


afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ScheduleCard path={[]} />, div);
});

it("renders schedule card correctly", () => {
  var sample_path = ['mirissa', 'galle'];
  const { getByTestId, getAllByTestId } = render(
    <ScheduleCard
      user = "Chandima"
      fair = {100}
      path = {sample_path}
      travelmethod = "Bus"
    />
  );
  expect(getByTestId('fair')).toHaveTextContent("Rs. 100");
  expect(getByTestId('user')).toHaveTextContent("Chandima");
  expect(getByTestId('method')).toHaveTextContent("Bus");
  getAllByTestId('path').forEach((value, index)=>{
    expect(value).toHaveTextContent(sample_path[index]);
  })
  

});

it("matches snapshot", () => {
  const tree = renderer.create(<ScheduleCard
    user = "Chandima"
    fair = {100}
    path = {['mirissa', 'galle']}
    travelmethod = "Bus"
  />);

    expect(tree).toMatchSnapshot();
})

