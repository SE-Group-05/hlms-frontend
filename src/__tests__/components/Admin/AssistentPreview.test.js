// import dependencies
import React from "react";

// import API mocking utilities from Mock Service Worker
import { rest } from "msw";
import { setupServer } from "msw/node";

// import renderer for take snapshots
import renderer from "react-test-renderer";

// import react-testing methods
import { render, cleanup, fireEvent } from "@testing-library/react";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";

// import react dom
import ReactDOM from "react-dom";

// import the component for testing
import AssistantPreview from "../../../components/Admin/AssistentPreview";



afterEach(cleanup);



const server = setupServer(
  rest.get("/employees/2", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        firstname: "chandima",
        lastname: "Amarasena",
        email: "chandima334@gmail.com",
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AssistantPreview data={{ firstname: "chandima" }} />, div);
});

it("renders assistant preview correctly", () => {
  const { getByTestId } = render(
    <AssistantPreview
      data={{
        firstname: "Chandima",
        lastname: "Amarasena",
        email: "chandima334@gmail.com",
      }}
    />
  );
  expect(getByTestId("firstname")).toHaveTextContent("Chandima");
  expect(getByTestId("lastname")).toHaveTextContent("Amarasena");
  expect(getByTestId("email")).toHaveTextContent("chandima334@gmail.com");
});

it("edit button works correctly", () => {
  const { queryByTestId } = render(
    <AssistantPreview
      data={{
        firstname: "Chandima",
        lastname: "Amarasena",
        email: "chandima334@gmail.com",
      }}
    />
  );

 
  expect(queryByTestId("firstname")).toBeInTheDocument();
  expect(queryByTestId("lastname")).toBeInTheDocument();
  expect(queryByTestId("email")).toBeInTheDocument();

  expect(queryByTestId("firstname_input")).not.toBeInTheDocument();
  expect(queryByTestId("lastname_input")).not.toBeInTheDocument();
  expect(queryByTestId("email_input")).not.toBeInTheDocument();

  fireEvent.click(queryByTestId("edit_button")) 

  expect(queryByTestId("firstname")).not.toBeInTheDocument();
  expect(queryByTestId("lastname")).not.toBeInTheDocument();
  expect(queryByTestId("email")).not.toBeInTheDocument();

  expect(queryByTestId("firstname_input")).toBeInTheDocument();
  expect(queryByTestId("lastname_input")).toBeInTheDocument();
  expect(queryByTestId("email_input")).toBeInTheDocument();

  fireEvent.change(queryByTestId("firstname_input"),{ target: { value: 'chandima' } })
  fireEvent.change(queryByTestId("lastname_input"),{ target: { value: 'amarasena' } })
  fireEvent.change(queryByTestId("email_input"),{ target: { value: 'chandima@gmail.com' } })

  fireEvent.click(queryByTestId("show_button")) 

  fireEvent.click(queryByTestId("submit_button")) 

  
});

it("matches snapshot", () => {
  const tree = renderer.create(
    <AssistantPreview
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
