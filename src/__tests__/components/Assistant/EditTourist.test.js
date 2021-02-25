// import dependencies
import React from "react";

// import API mocking utilities from Mock Service Worker
import { rest } from "msw";
import { setupServer } from "msw/node";

// import react-testing methods
import {
  render,
  fireEvent,
  cleanup,
} from "@testing-library/react";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";

// import react dom
import ReactDOM from "react-dom";

// import the component for testing
import EditTourist from "../../../components/Assistant/EditTourist";

afterEach(cleanup);


it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<EditTourist  />, div);
});
