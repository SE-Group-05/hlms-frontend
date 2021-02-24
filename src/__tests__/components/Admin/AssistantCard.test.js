import React from "react";
import ReactDOM from "react-dom";
import AssistantCard from "../../../components/Admin/AssistantCard";

import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from 'react-test-renderer';



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

