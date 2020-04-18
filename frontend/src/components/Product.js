import React from 'react';
import { Card, Image } from 'semantic-ui-react'
import PropTypes from 'prop-types';

const Product = ({ name, image,  updatedAt}) => {
  return (
    <Card>
      <Image src={image} wrapped ui={false} />
      <Card.Header>{name}</Card.Header>
      <Card.Meta>
        <span className='date'>Last updated in {updatedAt}</span>
      </Card.Meta>
    </Card>
  );
};

Product.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
};

export default Product;
