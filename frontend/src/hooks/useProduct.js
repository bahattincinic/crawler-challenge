import { useEffect, useState } from "react";
import { apiDomain } from '../config';

const useProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${apiDomain}/api/v1/products/`)
      .then(response => response.json())
      .then(json => setProducts(json));
  }, []);

  return products;
};

export default useProduct;
