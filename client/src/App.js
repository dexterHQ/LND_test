// DEXTER -- test wallet
// 4.1.18
// Michael Gingras

// TODO:
// what if someone already has a wallet? How do we interface with that?
// is there anyway to get grpc in the browser?
// make more versatile components.
// get the menu bar app thing working.

import React, { Component } from 'react';
import { Button, Header, Modal, Image } from 'semantic-ui-react'

import APIS from './actions/api'

import Button2 from './components/Button'
import ModalLink from './components/Modal'
import WalletStatsContainer from './components/walletStatsContainer'

import './App.css';

class App extends Component {
  state = {
    peers: 0,
    address: '0x',
    balance: 0,
    invoice: '',
    channels: [],
    isWallet: false,
  };

  componentDidMount() {

    // do we even need anything in here?

  }

  // the most trivial of wallet unlocks. will need to include some tests somewhere
  updateWallet = () => {
    this.setState({ isWallet: true })
  }

  render() {

    return (
      <div className="App">
        <header className="hero">
          <h1 className="hero--title">DEXTER</h1>
          <h3 className="hero--subtitle">Lightning Network Test</h3>
          <p>{this.state.wallet}</p>
          {!this.state.wallet && <ModalLink title="Create a LN Node" update={this.updateWallet}></ModalLink>}
        </header>

        {/* the code below utilizes a ternary if... can be confusing if you arent looking for it */}
        {this.state.isWallet ?
          <WalletStatsContainer address={this.state.address} balance={this.state.balance} peers={this.state.peers}></WalletStatsContainer> :
          <div className="container--body">
            No wallet exists! Click the button above to get started. Already have one? Unlock here.
          </div>
        }
      </div>
    );
  }
}

export default App;
