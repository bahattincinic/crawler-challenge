import React from 'react';
import { Card } from 'semantic-ui-react'
import PropTypes from 'prop-types';


const Product = ({ name, image,  updatedAt }) => (
  <Card
    image={image}
    header={name}
    description={`Last updated in ${updatedAt}`}
  />
);

Product.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
};

export default Product;
