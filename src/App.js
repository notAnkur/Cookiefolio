import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';
import Checkout from './components/Checkout';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Checkout} />
          <Route path="/checkout" component={Checkout} />
          {/* <Route component={PageNotFound} /> */}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
