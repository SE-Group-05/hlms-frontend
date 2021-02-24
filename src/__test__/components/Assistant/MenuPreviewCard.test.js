import React from 'react';
import ReactDOM from 'react-dom';
import PreviewCard from '../../../components/Assistant/MenuPreviewCard';

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<PreviewCard />, div);
});