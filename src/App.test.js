import React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";
import { fetchSuggestions, fetchProductDetail } from "./utils/api";

jest.mock("./utils/api");

const suggestions = [{id: "1", name: 'suggested shirt'}, {id: "2", name: "coat"}];
const productDetail = {
  name: "shirt in navy",
  productCode: "1774327",
  productImage: "https://asos.com/image.json",
  price: "£60.00"
};

describe("App", () => {
  it("should fetch and display the product details when a suggestion is selected", async () => {
    fetchSuggestions.mockResolvedValueOnce(suggestions);
    fetchProductDetail.mockResolvedValueOnce(productDetail);

    render(<App />);

    const input = screen.getByLabelText(/Search/);

    userEvent.type(input, 'query');

    await waitFor(() => expect(screen.getByText(/shirt/)).toBeInTheDocument());

    const button = screen.getByRole('button', {name: /suggested shirt/});

    userEvent.click(button);

    await waitFor(() => expect(screen.getByText(productDetail.name)).toBeInTheDocument());
    expect(screen.getByText(productDetail.productCode)).toBeInTheDocument();
    expect(screen.getByText(productDetail.price)).toBeInTheDocument();
    expect(screen.getByAltText(productDetail.name)).toHaveAttribute('src', productDetail.productImage);
  });

  it("should clear the search input when the user selects a suggestion", async () => {
    fetchSuggestions.mockResolvedValueOnce(suggestions);
    fetchProductDetail.mockResolvedValueOnce(productDetail);

    render(<App />);

    const input = screen.getByLabelText(/Search/);

    userEvent.type(input, 'query');

    await waitFor(() => expect(screen.getByText(/shirt/)).toBeInTheDocument());

    const button = screen.getByRole('button', {name: /suggested shirt/});

    userEvent.click(button);

    expect(input).toHaveValue('');
  });
});
