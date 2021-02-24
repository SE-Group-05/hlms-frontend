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
import AssistantCard from "../../../components/Admin/AssistantCard";


afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AssistantCard />, div);
});

it("renders assistant card correctly", () => {
  const { getByTestId } = render(
    <AssistantCard
      imageUrl="./user.png"
      imageAlt="User"
      id="2"
      firstname="chandima"
      lastname="amarasena"
      email="chandima334@gmail.com"
      fetch="fetch"
    />
  );
  expect(getByTestId('display_name')).toHaveTextContent("chandima amarasena");
  expect(getByTestId('email')).toHaveTextContent("chandima334@gmail.com");
});

it("matches snapshot", () => {
  const tree = renderer.create(<AssistantCard
    imageUrl="./user.png"
    imageAlt="User"
    id="2"
    firstname="chandima"
    lastname="amarasena"
    email="chandima334@gmail.com"
    fetch="fetch"
  />);

    expect(tree).toMatchSnapshot();
})

