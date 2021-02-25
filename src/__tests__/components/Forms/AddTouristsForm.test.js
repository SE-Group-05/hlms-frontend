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
import AddTouristsForm from "../../../components/Forms/AddTouristsForm";

afterEach(cleanup);


it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <AddTouristsForm />,
    div
  );
});

it("adds assistant correctly", () => {
  const { getByTestId, getByText } = render(
    <AddTouristsForm />
  );

 
  fireEvent.change(getByTestId("first_name"),{ target: { value: 'chandima' } })
  fireEvent.change(getByTestId("last_name"),{ target: { value: 'amarasena' } })
  fireEvent.change(getByTestId("email"),{ target: { value: 'chandima@gmail.com' } })
  fireEvent.change(getByTestId("phone"),{ target: { value: '0987653421' } })
  
  
  fireEvent.click(getByText("Add Customer")) 

  
});

it("matches snapshot", () => {
  const tree = renderer.create(
    <AddTouristsForm/>
  );

  expect(tree).toMatchSnapshot();
});
