// import dependencies
import React from "react";

// import react-testing methods
import { render, cleanup } from "@testing-library/react";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom";

// import react dom
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";


// import renderer for take snapshots
import renderer from "react-test-renderer";

// import the component for testing
import MenuPreviewCard from "../../../components/Assistant/MenuPreviewCard";

afterEach(cleanup);
it("renders without crashing", () => {
  const div = document.createElement("div");
    ReactDOM.render(
        <MemoryRouter>
            <MenuPreviewCard />
        </MemoryRouter>
        , div);
});

it("renders menu preview card correctly", () => {
    const { getByTestId } = render(
        <MemoryRouter>
            <MenuPreviewCard
                imageUrl="https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/8/2017/04/21143242/tourists.jpg"
                imageAlt="Tourist Couple Picture"
                title="Tourist Manager"
                linkTo="/app/tourists"
                description="Add Tousrists, Delete Tourists, Update Tourists Information and View Activites"
            />
        </MemoryRouter>
    );
    expect(getByTestId('title')).toHaveTextContent("Tourist Manager");

});

it("matches snapshot", () => {
    const tree = renderer.create(
        <MemoryRouter>
        <MenuPreviewCard
                imageUrl="https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/8/2017/04/21143242/tourists.jpg"
                imageAlt="Tourist Couple Picture"
                title="Tourist Manager"
                linkTo="/app/tourists"
                description="Add Tousrists, Delete Tourists, Update Tourists Information and View Activites"
        
  /></MemoryRouter>);

    expect(tree).toMatchSnapshot();
})

