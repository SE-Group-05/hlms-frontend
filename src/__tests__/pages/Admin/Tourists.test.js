// import dependencies
import React from "react";

// import API mocking utilities from Mock Service Worker
import { rest } from "msw";
import { setupServer } from "msw/node";

// import react-testing methods
import { render, cleanup, waitFor } from "@testing-library/react";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";

// import react dom
import ReactDOM from "react-dom";

// import renderer for take snapshots
import renderer from "react-test-renderer";

// import the component for testing
import Tourists from "../../../pages/Admin/Tourists";

afterEach(cleanup);

const server = setupServer(
  rest.get("/tourists", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        tourists: [
            {
                firstname:"chandima",
                lastname:"amarasena"
            }
        ]
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Tourists />, div);
});

it("renders tourists page preview correctly", async () => {
  const { getAllByTestId } = render(<Tourists />);

  await waitFor(() => {
    const touriststable = getAllByTestId("name");
    expect(touriststable[0]).toHaveTextContent("chandima amarasena");
  
  });
});

it("matches snapshot", async () => {
  const tree = renderer.create(<Tourists />);
  expect(tree).toMatchSnapshot();
});
