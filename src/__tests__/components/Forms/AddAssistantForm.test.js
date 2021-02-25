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
import AddAssistantForm from "../../../components/Forms/AddAssistantForm";

afterEach(cleanup);


it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <AddAssistantForm />,
    div
  );
});

it("adds assistant correctly", () => {
  const { getByTestId, getByText } = render(
    <AddAssistantForm />
  );

 
  fireEvent.change(getByTestId("firstname"),{ target: { value: 'mirissa' } })
  fireEvent.change(getByTestId("lastname"),{ target: { value: '23' } })
  fireEvent.change(getByTestId("email"),{ target: { value: '23' } })
  
  
  fireEvent.click(getByText("Add the Assistant")) 

  
});

it("matches snapshot", () => {
  const tree = renderer.create(
    <AddAssistantForm />
  );

  expect(tree).toMatchSnapshot();
});
