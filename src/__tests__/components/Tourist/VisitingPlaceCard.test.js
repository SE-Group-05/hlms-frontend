import React from "react";
import ReactDOM from "react-dom";
import VisitingPlaceCard from "../../../components/Tourist/VisitingPlaceCard";

import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";

afterEach(cleanup);

it("renders card without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<VisitingPlaceCard methods={[]} />, div);
});

it("renders visiting places card correctly", () => {
  const { getByTestId,getAllByTestId } = render(
    <VisitingPlaceCard
      placeName="Hikkaduwa"
      imageUrl="./1.png"
      distance="23.6"
      methods={["bus","van"]}
      timeToReach="20"
    />
  );
  expect(getByTestId("reachTime")).toHaveTextContent("20");
  expect(getByTestId("travel_distance")).toHaveTextContent("23.6");
  expect(getByTestId("travel_place")).toHaveTextContent("Hikkaduwa");
  getAllByTestId('travel_method').map((value, index)=>{
    expect(value).toHaveTextContent(["bus","van","car"][index]);
  });
});

it("matches snapshot", () => {
  const tree = renderer.create(
    <VisitingPlaceCard
      placeName="Hikkaduwa"
      imageUrl="./1.png"
      distance="23.6"
      methods={["bus", "van", "car"]}
      timeToReach="20"
    />
  );

  expect(tree).toMatchSnapshot();
});
