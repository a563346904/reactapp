import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

import Default from './components/Default'

class App extends Component {
  render() {
    return (
        <Router>
            <Switch>
              <Route path={'/'} component={Default} />
            </Switch>
        </Router>
    );
  }
}

export default App;
