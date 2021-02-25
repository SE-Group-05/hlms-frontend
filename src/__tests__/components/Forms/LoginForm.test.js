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
import LoginForm from "../../../components/Forms/LoginForm";

afterEach(cleanup);


it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <LoginForm />,
    div
  );
});

it("Log in correctly", () => {
  const { getByTestId } = render(
    <LoginForm />
  );

 
  fireEvent.change(getByTestId("email"),{ target: { value: 'chandima@gmail.com' } })
  fireEvent.change(getByTestId("password"),{ target: { value: 'amarasena' } })
 
  
  fireEvent.click(getByTestId("login")) 

  
});

it("matches snapshot", () => {
  const tree = renderer.create(
    <LoginForm/>
  );

  expect(tree).toMatchSnapshot();
});
