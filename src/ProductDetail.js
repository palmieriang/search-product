import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { fetchProductDetail } from "./utils/api";
import { ReactComponent as LoadingIcon } from "./svg/loading.svg";

import "./ProductDetail.css";

const ProductDetail = ({ productId }) => {
  const [productInfo, setProductInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    setIsLoading(true);
    fetchProductDetail(productId).then((productInfo) => {
      setProductInfo(productInfo);
      setIsLoading(false);
    });
  }, [productId]);

  if (!productInfo) {
    return null;
  }

  const {productImage, name, price, productCode} = productInfo;

  return (
    <>
      {isLoading ?
        (
          <div className="loading-container" data-testid="loading-icon">
            <LoadingIcon />
          </div>
        )
        :
        (
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
        )
      }
    </>
  );
}

ProductDetail.propTypes = {
  productId: PropTypes.string,
};

export default ProductDetail;
