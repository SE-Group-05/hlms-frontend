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
import VisitingPlacePreview from "../../../components/Admin/VisitingPlacePreview";

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

it("edit button works correctly", () => {
  const { queryByTestId, getByText } = render(
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

 
  expect(queryByTestId("placename")).toBeInTheDocument();
  expect(queryByTestId("distance")).toBeInTheDocument();
  expect(queryByTestId("timetoreach")).toBeInTheDocument();
  expect(queryByTestId("description")).toBeInTheDocument();

  expect(queryByTestId("placename_input")).not.toBeInTheDocument();
  expect(queryByTestId("distance_input")).not.toBeInTheDocument();
  expect(queryByTestId("timetoreach_input")).not.toBeInTheDocument();
  expect(queryByTestId("description_input")).not.toBeInTheDocument();
  
  fireEvent.click(getByText("Delete the place")) 
  fireEvent.click(getByText("Edit the place")) 

  expect(queryByTestId("placename")).not.toBeInTheDocument();
  expect(queryByTestId("distance")).not.toBeInTheDocument();
  expect(queryByTestId("timetoreach")).not.toBeInTheDocument();
  expect(queryByTestId("description")).not.toBeInTheDocument();

  expect(queryByTestId("placename_input")).toBeInTheDocument();
  expect(queryByTestId("distance_input")).toBeInTheDocument();
  expect(queryByTestId("timetoreach_input")).toBeInTheDocument();
  expect(queryByTestId("description_input")).toBeInTheDocument();
  
  fireEvent.click(getByText("Bus")) 
  fireEvent.click(getByText("Car")) 
  fireEvent.click(getByText("Foot")) 


  fireEvent.change(queryByTestId("placename_input"),{ target: { value: 'mirissa' } })
  fireEvent.change(queryByTestId("latitude_input"),{ target: { value: '23' } })
  fireEvent.change(queryByTestId("longitude_input"),{ target: { value: '23' } })
  fireEvent.change(queryByTestId("description_input"),{ target: { value: 'agasghasg hasdh' } })

 
  fireEvent.click(getByText("Update the place")) 

  
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
