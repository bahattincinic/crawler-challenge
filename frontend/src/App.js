import React, { Fragment } from 'react';
import { Container, Menu } from 'semantic-ui-react';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import Products from './layouts/Products';
import Compare from "./layouts/Compare";

function App() {
  return (
    <Fragment>
      <Container>
          <Menu>
            <Menu.Item as={Link} to='/'>
              Home
            </Menu.Item>
            <Menu.Item as={Link} to='/compare'>
              Compare
            </Menu.Item>
          </Menu>

          <Switch>
            <Route path="/compare">
              <Compare />
            </Route>
            <Route path="/">
              <Products />
            </Route>
          </Switch>
      </Container>
    </Fragment>
  );
}

export default App;
