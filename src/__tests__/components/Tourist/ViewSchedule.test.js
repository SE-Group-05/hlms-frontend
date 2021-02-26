// import dependencies
import React from "react";

// import react-testing methods
import { render, fireEvent, cleanup, waitFor } from "@testing-library/react";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";

// import react dom
import ReactDOM from "react-dom";

// import renderer for take snapshots
import renderer from "react-test-renderer";

// import the component for testing
import ViewSchedule from "../../../components/Tourist/ViewSchedule";

afterEach(cleanup);


it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <ViewSchedule />,
    div
  );
});


it("edit button works correctly", async () => {
  const { queryByTestId, getByText } = render(
    <ViewSchedule />
  );


  
  fireEvent.click(getByText("Edit")) 



  fireEvent.change(queryByTestId("place"),{ target: { value: 'mirissa' } })
  fireEvent.change(queryByTestId("date"),{ target: { value: '2020/12/23' } })
  fireEvent.change(queryByTestId("time"),{ target: { value: '23:20' } })

 
  
  fireEvent.click(getByText("Delete")) 

  
});

it("matches snapshot", () => {
  const tree = renderer.create(
    <ViewSchedule
      data={{
        placename: "Galle",
        distance: "20",
        timeToReach: "30",
        description: "no description",
        methods: ["bus"],
      }}
    />
  );

  expect(tree).toMatchSnapshot();
});
