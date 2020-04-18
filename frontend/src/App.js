import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import Products from './pages/Products';

function App() {
  return (
    <Fragment>
      <Container>
        <Products/>
      </Container>
    </Fragment>
  );
}

export default App;
