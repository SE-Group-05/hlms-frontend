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
import VisitingPlaceCard from "../../../components/Assistant/VisitingPlaceCard";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<VisitingPlaceCard methods={[]} />, div);
});

it("renders visiting place card correctly", () => {
  const sample_methods = ["bus", "car", "bike"];
  const { getByTestId, getAllByTestId } = render(
    <VisitingPlaceCard
      placeName = "mirissa"
      distance = {20}
      timeToReach = {30}
      methods = {sample_methods}

    />
    );
    
getAllByTestId('method').forEach((value, index)=>{
    expect(value).toHaveTextContent(sample_methods[index]);
  })
  expect(getByTestId('place')).toHaveTextContent("mirissa");
  expect(getByTestId('distance')).toHaveTextContent("20 km from the hotel");
  expect(getByTestId('timetoreach')).toHaveTextContent("30 min journey");
});
  
it("matches snapshot", () => {
  const sample_methods = ["bus", "car", "bike"];
  const tree = renderer.create(<VisitingPlaceCard
    placeName = "mirissa"
    distance = {20}
    timeToReach = {30}
    methods = {sample_methods}

  />);

    expect(tree).toMatchSnapshot();
})

