import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';
import Checkout from './components/Checkout';
import Admin from './components/Admin';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Checkout} />
          <Route exact path="/admin" component={Admin} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
