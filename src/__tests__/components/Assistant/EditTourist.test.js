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
// import renderer for take snapshots
import renderer from "react-test-renderer";

// import the component for testing
import EditTourist from "../../../components/Assistant/EditTourist";

afterEach(cleanup);


it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<EditTourist  />, div);
});

// it("renders edit tourists correctly", () => {
//   const { getByTestId } = render(
//     <EditTourist
//         imageUrl="https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png"
//         imageAlt="user image"
//         id="1"
//         first_name="Chirs"
//         last_name="Haynes"
//         email="ChrisHaynes@gmail.com"
//         phone="0711234567"
//     />
//   );
//   expect(getByTestId("firstname")).toHaveTextContent("Chirs");
//   expect(getByTestId("lastname")).toHaveTextContent("Haynes");
//   expect(getByTestId("email")).toHaveTextContent("ChrisHaynes@gmail.com");
// });

it('render edit tourist correctly and submit as well', () => {
    const { getByTestId } = render(<EditTourist
        imageUrl="https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png"
        imageAlt="user image"
        id="1"
        first_name="Chirs"
        last_name="Haynes"
        email="ChrisHaynes@gmail.com"
        phone="0711234567"
    />);

    
    
     fireEvent.submit(getByTestId("form"),)
    
    

    
})
 
 it("matches snapshot", () => {
  const tree = renderer.create(
    <EditTourist
      imageUrl="https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png"
        imageAlt="user image"
        id="1"
        first_name="Chirs"
        last_name="Haynes"
        email="ChrisHaynes@gmail.com"
        phone="0711234567"
    />
  );

  expect(tree).toMatchSnapshot();
});
