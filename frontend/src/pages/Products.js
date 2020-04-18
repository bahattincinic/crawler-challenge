import React, { useState, useEffect } from 'react';
import { Header, Grid } from 'semantic-ui-react';
import Product from '../components/Product';

import './Products.css';
import CompareForm from "../components/CompareForm";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/products/")
      .then(response => response.json())
      .then(json => setProducts(json));
  }, []);

  return (
    <div>
      <div className="Products-header">
        <Header as='h2'>Product Compare</Header>
      </div>

      <CompareForm products={products} />

      <div className="Products-header">
        <Header as='h2'>Product List</Header>
      </div>
      <Grid columns={3}>
        <Grid.Row>
          {products.map((item, idx) =>
            <Grid.Column key={idx} className='Product-item'>
              <Product name={item.name} key={idx} image={item.image} updatedAt={item.updated_at} />
            </Grid.Column>)}
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Products;
