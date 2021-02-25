import React from "react";
import ReactDOM from "react-dom";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import ScheduleCard from "../../../components/Tourist/ScheduleCard";

afterEach(cleanup);

it("renders schedule card correctly", () => {
  const { getByTestId } = render(
    <ScheduleCard
      place="Hikkaduwa"
      date="24-02-2021"
      travellingMethod="bus"
      fair="100"
      state="true"
    />
  );
  expect(getByTestId("place")).toHaveTextContent("Hikkaduwa");
});

it("schedule card matches snapshot", () => {
  const tree = renderer.create(
    <ScheduleCard
      place="Hikkaduwa"
      date="24-02-2021"
      travellingMethod="bus"
      fair="100"
      state="true"
    />
  );

  expect(tree).toMatchSnapshot();
});
