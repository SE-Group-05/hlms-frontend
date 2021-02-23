import React from "react";
import ReactDOM from "react-dom";
import AssistantCard from "../../../components/Admin/AssistantCard";

import { render, fireEvent } from "@testing-library/react";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AssistantCard />, div);
});

it("render button correctly", () => {
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
});
