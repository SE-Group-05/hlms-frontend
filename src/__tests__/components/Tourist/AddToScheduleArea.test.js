import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { Button } from "@chakra-ui/react";
import AddToScheduleArea from "../../../components/Tourist/AddToScheduleArea";
//import AddScheduleForm from "../../../components/Forms/AddScheduleForm";
afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AddToScheduleArea />, div);
});

// it("renders button correctly", () => {
//   function onOpen() {
//     done();
//   }
//   const { getByTestId } = render(
//     <Button onClick={onOpen}>Add to schedule</Button>
//   );
//   expect(getByTestId('add_button')).toHaveTextContent("Add to schedule");
// });

// it("renders button correctly", () => {

//     const { getByTestId } = render(<Button>Add To Schedule</Button>);

//     expect(getByTestId('addButton')).toHaveTextContent(buttonText);
//   });

