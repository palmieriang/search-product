import React from "react";
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Autocomplete from "./Autocomplete";
import { fetchSuggestions } from "./utils/api";

jest.mock("./utils/api");

describe("Autocomplete", () => {
  beforeEach(() => {
    fetchSuggestions.mockClear()
  });

  it("renders correctly", () => {
    const { asFragment } = render(<Autocomplete />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should not fetch if the user has not entered a search query", () => {
    render(<Autocomplete />);

    expect(fetchSuggestions).not.toHaveBeenCalled();
  });

  it("should fetch if the user has entered a search query", async () => {
    fetchSuggestions.mockResolvedValue([{id: 1, name: "shirt"}, {id: 2, name: "coat"}]);

    render(<Autocomplete />);

    const input = screen.getByLabelText(/Search/);
    const query = "adidas";

    fireEvent.change(input, { target: { value: query } });

    await waitFor(() => expect(fetchSuggestions).toHaveBeenCalledWith(query));
  });

  it("should show suggestions", async () => {
    fetchSuggestions.mockResolvedValueOnce([{id: 1, name: "shirt"}]);

    render(<Autocomplete />);

    fireEvent.change(screen.getByLabelText(/Search/), { target: { value: "shirt" } });

    await waitFor(() => expect(screen.getByText(/shirt/)).toBeInTheDocument());
  });

  it("should only show the top 10 suggestions at a time", async () => {
    const suggestions = [
      {id: "1", name: "shirt 1"},
      {id: "2", name: "shirt 2"},
      {id: "3", name: "shirt 3"},
      {id: "4", name: "shirt 4"},
      {id: "5", name: "shirt 5"},
      {id: "6", name: "shirt 6"},
      {id: "7", name: "shirt 7"},
      {id: "8", name: "shirt 8"},
      {id: "9", name: "shirt 9"},
      {id: "10", name: "shirt 10"},
      {id: "11", name: "shirt 11"},
    ];
    fetchSuggestions.mockResolvedValueOnce(suggestions);

    render(<Autocomplete />);

    fireEvent.change(screen.getByLabelText(/Search/), { target: { value: "query" } });

    await waitFor(() => expect(screen.getAllByText(/shirt/)).toHaveLength(10));
  });

  it("should not request for suggestions on every keystroke", async () => {
    const suggestions = [
      {id: "1", name: "shirt 1"},
    ];
    fetchSuggestions.mockResolvedValueOnce(suggestions);

    render(<Autocomplete />);

    const input = screen.getByLabelText(/Search/);

    userEvent.type(input, "queryasdasdasdasdassadsadadsdsadsa");

    await waitFor(() => expect(fetchSuggestions).toHaveBeenCalledTimes(1));
  })
});
