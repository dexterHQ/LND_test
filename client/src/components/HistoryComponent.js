import React, { Component } from 'react';

import APIS from '../actions/api'

import ModalLink from './Modal'
import WalletStatsContainer from './walletStatsContainer'

import '../App.css';

class HistoryComponent extends Component {

  render() {

    return (
        <header className="hero">
          <span className="hero--title">History</span>
        </header>
    );
  }
}

export default HistoryComponent;
