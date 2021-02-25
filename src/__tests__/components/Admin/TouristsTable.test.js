// import dependencies
import React from "react";

// import renderer for take snapshots
import renderer from "react-test-renderer";

// import react-testing methods
import { render, cleanup } from "@testing-library/react";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";

// import react dom
import ReactDOM from "react-dom";

// import the component for testing
import TouristsTable from "../../../components/Admin/TouristsTable";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <TouristsTable
      tourists={[
        {
          firstname: "chandima",
          lastname: "Amarasena",
        },

        {
          firstname: "Hirumal",
          lastname: "Perera",
        },
      ]}
    />,
    div
  );
});

it("renders tourists table correctly", () => {
  const { getAllByTestId } = render(
    <TouristsTable
      tourists={[
        {
          firstname: "chandima",
          lastname: "amarasena",
        },

        {
          firstname: "Hirumal",
          lastname: "Perera",
        },
      ]}
    />
  );

  const names = getAllByTestId("name");
  expect(names[0]).toHaveTextContent("chandima amarasena");
  expect(names[1]).toHaveTextContent("Hirumal Perera");
 });

it("matches snapshot", () => {
  const tree = renderer.create(
    <TouristsTable
      tourists={[
        {
          firstname: "chandima",
          lastname: "amarasena",
        },

        {
          firstname: "Hirumal",
          lastname: "Perera",
        },
      ]}
    />
  );

  expect(tree).toMatchSnapshot();
});
