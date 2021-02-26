// import dependencies
import React from "react";

// import API mocking utilities from Mock Service Worker
import { rest } from "msw";
import { setupServer } from "msw/node";

// import react-testing methods
import { render, fireEvent, cleanup } from "@testing-library/react";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";

// import react dom
import ReactDOM from "react-dom";

// import renderer for take snapshots
import renderer from "react-test-renderer";

// import the component for testing
import VisitingPlacePreview from "../../../components/Assistant/VisitingPlacePreview";



afterEach(cleanup);
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <VisitingPlacePreview data={{ placename: "Galle", methods: ["bus"] }} />,
    div
  );
});

it("renders visiting place preview correctly", () => {
  const { getByTestId } = render(
    <VisitingPlacePreview
      data={{
        placeName: "Galle",
        distance: "20",
        timeToReach: "30",
        description: "no description",
        methods: ["bus"],
      }}
    />
  );
  expect(getByTestId("placename")).toHaveTextContent("Galle");
  expect(getByTestId("distance")).toHaveTextContent("20 km");
  expect(getByTestId("timetoreach")).toHaveTextContent("30 min");
  expect(getByTestId("description")).toHaveTextContent("no description");
});


it("matches snapshot", () => {
  const tree = renderer.create(
    <VisitingPlacePreview
      data={{
        placename: "Galle",
        distance: "20",
        timeToReach: "30",
        description: "no description",
        methods: ["bus"],
      }}
    />
  );

  expect(tree).toMatchSnapshot();
});

