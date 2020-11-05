import React from "react";
import { shallow } from "enzyme";
import {render, screen, waitFor} from "@testing-library/react";

import ProductDetail from "./ProductDetail";
import { fetchProductDetail } from "./utils/api";

jest.mock("./utils/api");

const productId = '1790102';
const productInfo = {
  name: "shirt in navy",
  productCode: "1774327",
  productImage: "https://asos.com/image.json",
  price: "£60.00"
};

describe("ProductDetail", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<ProductDetail />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should show product id, name and price", async () => {
    fetchProductDetail.mockResolvedValueOnce(productInfo);

    render(<ProductDetail productId={productId} />);

    await waitFor(() => expect(screen.getByText(productInfo.name)).toBeInTheDocument());
    expect(screen.getByText(productInfo.productCode)).toBeInTheDocument();
    expect(screen.getByText(productInfo.price)).toBeInTheDocument();
    expect(screen.getByAltText(productInfo.name)).toHaveAttribute('src', productInfo.productImage);
  });
});
