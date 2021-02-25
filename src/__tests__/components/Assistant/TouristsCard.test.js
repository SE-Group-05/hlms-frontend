// import dependencies
import React from "react";

// import react-testing methods
import { render, cleanup } from "@testing-library/react";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom";

// import react dom
import ReactDOM from "react-dom";



// import renderer for take snapshots
import renderer from "react-test-renderer";

// import the component for testing
import TouristCard from "../../../components/Assistant/TouristsCard";


afterEach(cleanup);
it("renders without crashing", () => {
  const div = document.createElement("div");
    ReactDOM.render(        
            <TouristCard />        
        , div);
});

it("renders tourists card correctly", () => {
    const { getByTestId } = render(
        
        <TouristCard
                            key="01"
                            id="01"
                            imageUrl="https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png"
                            first_name="Chris"
                            last_name="Haynes"
                            email="Chrishaynes@gmail.com"
                            phone="0771234567"
                
            />
        
    );
    expect(getByTestId('full_name')).toHaveTextContent("Chris Haynes");
    expect(getByTestId('email')).toHaveTextContent("Chrishaynes@gmail.com");
    expect(getByTestId('phone')).toHaveTextContent("0771234567");

});

it("matches snapshot", () => {
    const tree = renderer.create(
        <TouristCard
            key="01"
            id="01"
            imageUrl="https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png"
            first_name="Chris"
            last_name="Haynes"
            email="Chrishaynes@gmail.com"
            phone="0771234567"
  />);

    expect(tree).toMatchSnapshot();
})
