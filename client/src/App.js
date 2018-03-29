import React, { Component } from 'react';
import { Button, Header, Modal, Image } from 'semantic-ui-react'

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
    wallet: 'what',
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

  // probably cant include these API calls in a separate file
  // could also probably abstract these functions out

  getBalance = async () => {
    const response = await fetch('/api/balance');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  getInfo = async () => {
    const response = await fetch('/api/info');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  getChannels = async () => {
    const response = await fetch('/api/channels');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  genInvoice = async (amount) => {
    const response = await fetch('/api/invoice?amount='+amount);
    const body = await response.json();
    console.log(body);

    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  hello = async (data) => {
    const response = await fetch('/api/hello?data='+data);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  createWallet = async (password) => {
    const response = await fetch('/api/createWallet?password='+password);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    this.setState({'wallet': body.res.wallet });
    return body;
  };


  render() {
    return (
      <div className="App">
        <header className="hero">
          <h1 className="hero--title">DEXTER</h1>
          <h3 className="hero--subtitle">Lightning Network Test</h3>
          <p>{this.state.wallet}</p>

          <ModalLink title="Create a LN node"></ModalLink>
        </header>

        <WalletStatsContainer></WalletStatsContainer>
      </div>
    );
  }
}

export default App;
