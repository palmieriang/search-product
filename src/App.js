import React,  { useState } from "react";

import "./App.css";

import Autocomplete from "./Autocomplete";
import ProductDetail from "./ProductDetail";

const App = () => {
  const [productId, setProductId] = useState('');

  const handleProductId = (id) => {
    setProductId(id);
  };

  return (
    <div className="App">
      <Autocomplete handleProductId={handleProductId} />
      <ProductDetail productId={productId} />
    </div>
  );
}

export default App;
