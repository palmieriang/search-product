import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { fetchProductDetail } from "./utils/api";

import "./ProductDetail.css";

const ProductDetail = ({ productId }) => {
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (!productId) return;

    fetchProductDetail(productId).then((productInfo) =>
      setProductInfo(productInfo)
    );
  }, [productId]);

  const renderProductInfo = () => {
    const {productImage, name, price, productCode} = productInfo;

    return (
      <div className="detail-container">
        <div className="row">
          <img src={productImage} className="product-image" alt={name} />
        </div>

        <div className="row">
          <div className="row-body">{name}</div>
        </div>

        <div className="row">
          <div className="row-body product-price">{price}</div>
          <div className="row-body product-id">{productCode}</div>
        </div>
      </div>
    );
  };

  return productInfo && renderProductInfo();
}

ProductDetail.propTypes = {
  productId: PropTypes.string,
};

export default ProductDetail;
