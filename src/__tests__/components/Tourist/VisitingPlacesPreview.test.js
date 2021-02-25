import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import renderer from "react-test-renderer";
import VisitingPlacePreview from "../../../components/Tourist/VisitingPlacePreview";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <VisitingPlacePreview
      data={{ placename: "Hikkaduwa", methods: ["bus"] }}
    />,
    div
  );
});

it("renders visiting place preview correctly", () => {
  const { getByTestId } = render(
    <VisitingPlacePreview
      data={{
        timeToReach: "20",
        description: "beach",
        distance: "23.6",
        methods: ["bus", "car"],
      }}
    />
  );
  expect(getByTestId("distance")).toHaveTextContent("23.6 km");
  expect(getByTestId("timeToReach")).toHaveTextContent("20 min");
  expect(getByTestId("description")).toHaveTextContent("beach");
});

it("matches snapshot", () => {
  const tree = renderer.create(
    <VisitingPlacePreview
      data={{
        timeToReach: "20",
        description: "beach",
        distance: "23.6",
        methods: ["bus", "car"],
      }}
    />
  );

  expect(tree).toMatchSnapshot();
});
