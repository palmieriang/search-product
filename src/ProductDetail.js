import React, { useState, useEffect } from "react";

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
    return (
      <div className="detail-container">
        <div className="row">
          <img src={productInfo.productImage} className="product-image" alt="" />
        </div>

        <div className="row">
          <div className="row-body">{productInfo.name}</div>
        </div>

        <div className="row">
          <div className="row-body product-price">{productInfo.price}</div>
          <div className="row-body product-id">{productInfo.productCode}</div>
        </div>
      </div>
    );
  };

  return productInfo && renderProductInfo();
}

export default ProductDetail;
