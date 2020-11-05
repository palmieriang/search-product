import React, { useState, useCallback } from "react";

import Autocomplete from "./Autocomplete";
import ProductDetail from "./ProductDetail";

import "./App.css";

const App = () => {
  const [productId, setProductId] = useState('');

  const handleSelection = useCallback((id) => {
    setProductId(id);
  }, []);

  return (
    <div className="app">
      <Autocomplete onSelect={handleSelection} />
      <ProductDetail productId={productId} />
    </div>
  );
}

export default App;
