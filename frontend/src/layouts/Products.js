import React from 'react';
import { Header, Grid } from 'semantic-ui-react';
import Product from '../components/Product';
import useProduct from '../hooks/useProduct';

import './Products.css';

const Products = () => {
  const products = useProduct();

  return (
    <div>
      <div className="Products-header">
        <Header as='h1'>Product List</Header>
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
