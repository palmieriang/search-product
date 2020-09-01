import React from "react";
import { shallow } from "enzyme";

import Autocomplete from "./Autocomplete";

jest.mock("./utils/api");

describe("Autocomplete", () => {
  it("Renders correctly", () => {
    const wrapper = shallow(<Autocomplete />);
    expect(wrapper).toMatchSnapshot();
  });
});
