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
import AddVisitingPlacesForm from "../../../components/Forms/AddVisitingPlacesForm";

afterEach(cleanup);


it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <AddVisitingPlacesForm data={{ placename: "Galle", methods: ["bus"] }} />,
    div
  );
});


it("add place correctly", () => {
  const { queryByTestId, getByText } = render(
    <AddVisitingPlacesForm />
  );

 
  
  fireEvent.click(getByText("Bus")) 
  fireEvent.click(getByText("Car")) 
  fireEvent.click(getByText("Foot")) 


  fireEvent.change(queryByTestId("placename"),{ target: { value: 'mirissa' } })
  fireEvent.change(queryByTestId("latitude"),{ target: { value: '23' } })
  fireEvent.change(queryByTestId("longitude"),{ target: { value: '23' } })
  fireEvent.change(queryByTestId("description"),{ target: { value: 'agasghasg hasdh' } })

 
  fireEvent.click(getByText("Add the place")) 

  
});

it("matches snapshot", () => {
  const tree = renderer.create(
    <AddVisitingPlacesForm />
  );

  expect(tree).toMatchSnapshot();
});
