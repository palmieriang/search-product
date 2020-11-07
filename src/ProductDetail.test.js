import React from "react";
import { shallow } from "enzyme";
import {render, waitFor} from "@testing-library/react";

import ProductDetail from "./ProductDetail";
import { fetchProductDetail } from "./utils/api";

jest.mock("./utils/api");

const productId = "1790102";
const productInfo = {
  name: "shirt in navy",
  productCode: "1774327",
  productImage: "https://asos.com/image.json",
  price: "£60.00"
};

const productId2 = "1785683";
const productInfo2 = {
  name: "shirt in multi",
  productCode: "1785683",
  productImage: "https://asos.com/image.json",
  price: "£30.00"
};

describe("ProductDetail", () => {
  beforeEach(() => {
    fetchProductDetail.mockClear();
  });

  it("renders correctly", () => {
    const wrapper = shallow(<ProductDetail />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should show product id, name and price", async () => {
    fetchProductDetail.mockResolvedValueOnce(productInfo);

    const { getByText, getByAltText } = render(<ProductDetail productId={productId} />);

    await waitFor(() => expect(getByText(productInfo.name)).toBeInTheDocument());
    expect(getByText(productInfo.productCode)).toBeInTheDocument();
    expect(getByText(productInfo.price)).toBeInTheDocument();
    expect(getByAltText(productInfo.name)).toHaveAttribute('src', productInfo.productImage);
  });

  it("should show loading state while fetching new item", async () => {
    fetchProductDetail.mockResolvedValueOnce(productInfo).mockResolvedValueOnce(productInfo2);

    const { getByText, rerender, getByTestId } = render(<ProductDetail productId={productId} />);

    await waitFor(() => expect(getByText(productInfo.name)).toBeInTheDocument());

    rerender(<ProductDetail productId={productId2} />);

    await waitFor(() => expect(getByTestId("loading-icon")).toBeInTheDocument());
    expect(getByText(productInfo2.name)).toBeInTheDocument();
  });
});
