import React from "react";
import renderer from "react-test-renderer";
import {  cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ReactDOM from "react-dom";
import SearchBar from "../../../components/Tourist/SearchBar";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <SearchBar/>,
    div
  );
});

it("matches snapshot", () => {
  const tree = renderer.create(
    <SearchBar/>
  );

  expect(tree).toMatchSnapshot();
});
