import React from 'react';
import { render } from '@testing-library/react';
import Product from "./Product";

test('Test rendered product', () => {
  const name = 'test product';
  const image = 'http://example.com/';
  const updatedAt = 'today';

  const { container, getByText } = render(
    <Product name={name} image={image} updatedAt={updatedAt} />);

  expect(getByText(name)).toBeInTheDocument();
  expect(container.querySelector('img').src).toBe(image);
  expect(getByText(`Last updated in ${updatedAt}`)).toBeInTheDocument();
});
