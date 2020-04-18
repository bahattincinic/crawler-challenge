import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom'
import { MemoryRouter } from 'react-router-dom'
import App from './App';
import { createMemoryHistory } from 'history'
import useProduct from "./hooks/useProduct";

jest.mock("./hooks/useProduct");

const mockProducts = [
  {
    name: 'Test Product',
    image: 'http://example.com',
    updated_at: '2020-04-18',
    id: 1
  }
];

test('Check Menu', () => {
  useProduct.mockReturnValue(mockProducts);

  const { getByText } = render(<App />, { wrapper: MemoryRouter });

  const homeElement = getByText(/Home/i);
  expect(homeElement).toBeInTheDocument();

  const compareElement = getByText(/Compare/i);
  expect(compareElement).toBeInTheDocument();
});


test('Check Navigation', () => {
  useProduct.mockReturnValue(mockProducts);

  const history = createMemoryHistory();
  history.push('/compare');

  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );

  const compareElement = getByText('Compare HTML Results');
  expect(compareElement).toBeInTheDocument();

});

test('Check Product', () => {
  useProduct.mockReturnValue(mockProducts);

  const { getByText } = render(<App />, { wrapper: MemoryRouter });
  const homeElement = getByText('Test Product');

  expect(homeElement).toBeInTheDocument();
});
