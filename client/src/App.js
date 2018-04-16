// DEXTER -- test wallet
// 4.15.18
// Michael Gingras

// TODO:
// make more versatile components.
// get the menu bar app thing working.

// MAJOR TODO: GET THE SERVER TO PERIODICALLY CHECK IF WALLET EXISTS OR NOT OR WHAT....

import React, { Component } from 'react';

import Home from './components/Home'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

import Main from './components/Main'

import './App.css';

class App extends Component {

  render() {

    return (
      <Router>

        <div class="container--full">
          <div className="sidenav">
            <h1 className="logo">DEXTER</h1>
            <span className="route--item"><Link to="/history">History</Link></span>
            <span className="route--item"><Link to="/peers">Peers</Link></span>
            <span className="route--item"><Link to="/channels">Channels</Link></span>
          </div>

          <Route path="/" component={Main}/>

        </div>

    </Router>
    );
  }
}

export default App;
