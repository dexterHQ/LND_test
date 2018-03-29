import React, { Component } from 'react';
import { Button, Header, Modal, Image } from 'semantic-ui-react'

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
  };

  componentDidMount() {

    this.hello(this.state.address)
      .then(res =>
        console.log(res)
      )
      .catch(err => console.log(err));

    this.getInfo()
      .then(res =>
        this.setState({address: res.address, peers: res.peers, channels: res.channels})
      )
      .catch(err => console.log(err));

    this.getBalance()
      .then(res =>
        this.setState({ balance: res.total_balance })
      )
      .catch(err => console.log(err));

    this.getChannels()
      .then(res =>
        console.log(res)
        // this.setState({ balance: res.total_balance })
      )
      .catch(err => console.log(err));

  }

  render() {
    return (
      <div className="App">
        <header className="hero">
          <h1 className="hero--title">DEXTER</h1>
          <h3 className="hero--subtitle">Lightning Network Test</h3>
          <p>{this.state.wallet}</p>
          {!this.state.wallet && <ModalLink title="Create a LN Node"></ModalLink>}
        </header>

        {this.state.isWallet && <WalletStatsContainer address={this.state.address} balance={this.state.balance}></WalletStatsContainer> }
      </div>
    );
  }
}

export default App;
