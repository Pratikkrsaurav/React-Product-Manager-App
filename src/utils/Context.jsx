import axios from './axios';
import React, { createContext, useEffect, useState } from 'react';

export const productContext = createContext();

const Context = (props) => {
  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem("products");
    return stored ? JSON.parse(stored) : null; // null triggers API call
  });

  useEffect(() => {
    const getProducts = async () => {
      if (!products) {
        try {
          const res = await axios("/products");
          setProducts(res.data);
          localStorage.setItem("products", JSON.stringify(res.data));
        } catch (err) {
          console.log("Error fetching products:", err);
        }
      }
    };

    getProducts();
  }, []);

  // Sync localStorage on any products update
  useEffect(() => {
    if (products) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  return (
    <productContext.Provider value={{ products, setProducts }}>
      {props.children}
    </productContext.Provider>
  );
};

export default Context;
