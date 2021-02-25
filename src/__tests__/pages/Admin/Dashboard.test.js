// import dependencies
import React from "react";

// import API mocking utilities from Mock Service Worker
import { rest } from "msw";
import { setupServer } from "msw/node";

// import react-testing methods
import { render, fireEvent, cleanup, waitFor } from "@testing-library/react";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";

// import react dom
import ReactDOM from "react-dom";

// import renderer for take snapshots
import renderer from "react-test-renderer";

// import the component for testing
import AdminDashboard from "../../../pages/Admin/Dashboard";

afterEach(cleanup);

const server = setupServer(
  rest.get("/dashboard/admin", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        dashboardValues: {
          users_count: 7,
          tourist_count_total: 0,
          assistant_count_total: 3,
          tourist_count_in: 0,
          place_count: 9,
          place_names: [
            {
              name: "Mirisa",
            },
            {
              name: "Galle fort",
            },
            {
              name: "Rumassala",
            },
          ],
          place_locations: [
            {
              longitude: 5.9447392257447005,
              latitude: 80.45886764887479,
            },
            {
              longitude: 6.036183444282042,
              latitude: 80.26456133343571,
            },
            {
              longitude: 6.151012544600507,
              latitude: 80.31923575218129,
            },
          ],
          schedules_count_total: 1,
          schedules_count_new: 0,
          schedules_count_canceled: 0,
          schedules_count_notcompleted: 0,
          schedules_count_completed: 0,
        },
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AdminDashboard />, div);
});

it("renders visiting place preview correctly", async () => {
  const { getAllByTestId } = render(<AdminDashboard />);

  await waitFor(() => {
    const ProgressCardsValues = getAllByTestId("current_value");
    expect(ProgressCardsValues[0]).toHaveTextContent("7");
    expect(ProgressCardsValues[1]).toHaveTextContent("0");
    expect(ProgressCardsValues[2]).toHaveTextContent("0");
    expect(ProgressCardsValues[3]).toHaveTextContent("9");
    expect(ProgressCardsValues[4]).toHaveTextContent("1");
  });
});

it("matches snapshot", async () => {
  const tree = renderer.create(<AdminDashboard />);
  expect(tree).toMatchSnapshot();
});
