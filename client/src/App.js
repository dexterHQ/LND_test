// DEXTER -- test wallet
// 4.1.18
// Michael Gingras

// TODO:
// what if someone already has a wallet? How do we interface with that?
// is there anyway to get grpc in the browser?
// make more versatile components.
// get the menu bar app thing working.

// MAJOR TODO: GET THE SERVER TO PERIODICALLY CHECK IF WALLET EXISTS OR NOT OR WHAT....

import React, { Component } from 'react';

import APIS from './actions/api'

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
    meta: null,
  };

  componentDidMount() {

    APIS.getInfo()
    .then((body) => {
      if(body.error){
        console.log(body.error);
      }
      else{
        this.setState({isWallet: true, address: body.address, peers: body.peers, channels: body.channels})
      }
    })

  }

  walletParams = {
    type: 1,
    title: "Create a LN Wallet",
    sub: "Create a LN Wallet!",
    body: "Next, enter a password. Since this a complete test and just a formality in getting a LN node set up, you dont have to worry about security. Just enter a password you dont care much about."
  }

  unlockParams = {
    type: 2,
    title: "Unlock Wallet",
    sub: "Unlock your Wallet",
    body: "Enter your password to unlock your wallet"
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
          <p>{this.state.isWallet}</p>
          {!this.state.isWallet && <ModalLink {...this.walletParams} update={this.updateWallet}></ModalLink>}
        </header>

        {/* the code below utilizes a ternary if... can be confusing if you arent looking for it */}
        {this.state.isWallet ?
          <WalletStatsContainer address={this.state.address} balance={this.state.balance} peers={this.state.peers}></WalletStatsContainer> :
          <div className="container--body">
            No wallet exists! Click the button above to get started. Already have one? Unlock here.
            <ModalLink {...this.unlockParams}></ModalLink>
          </div>
        }
      </div>
    );
  }
}

export default App;
