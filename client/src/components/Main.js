// DEXTER -- test wallet
// 4.15.18
// Michael Gingras

// TODO:
// make more versatile components.
// get the menu bar app thing working.

// MAJOR TODO: GET THE SERVER TO PERIODICALLY CHECK IF WALLET EXISTS OR NOT OR WHAT....

import React, { Component } from 'react';

import APIS from '../actions/api'

import ModalLink from './Modal'
import WalletStatsContainer from './walletStatsContainer'

import History from './HistoryComponent'
import Peers from './PeersComponent'

import Card from './Card'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

import '../App.css';

class Main extends Component {

  render() {

    return (
        <div className="body--main">
            
            <Route path="/history" component={History} />
            <Route path="/peers" component={Peers} />
            <Route path="/channels" component={History} />

            <Card />

        </div>
    );
  }
}

export default Main;
