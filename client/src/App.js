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
    lnd: null,
    meta: null,
  };

  componentDidMount() {


    this.getLnd()
      .then(res =>
        this.setState({lnd: res.lnd, meta: res.meta})
      )
      .catch(err => console.log(err));


    APIS.getInfo()
    .then(res =>
      console.log(res)
    )


    // this.getInfo()
    //   .then(res =>
    //     this.setState({address: res.address, peers: res.peers, channels: res.channels})
    //   )
    //   .catch(err => console.log(err));
    //
    // this.getBalance()
    //   .then(res =>
    //     this.setState({ balance: res.total_balance })
    //   )
    //   .catch(err => console.log(err));
    //
    // this.getChannels()
    //   .then(res =>
    //     console.log(res)
    //     // this.setState({ balance: res.total_balance })
    //   )
    //   .catch(err => console.log(err));

  }

  getLnd = async () => {
     const response = await fetch('/api/lnd');
     const body = await response.json();

     if (response.status !== 200) throw Error(body.message);

     return body;
   };

   getInfo = () => {
     var lnd = this.state.lnd;
     var meta = this.state.meta;

     lnd.getInfo({}, meta, function(err, response) {
         if (err) console.log(err);
         if (response) console.log(response);
     });
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

        <p onClick={this.getInfo}>get info</p>

        {this.state.isWallet && <WalletStatsContainer address={this.state.address} balance={this.state.balance}></WalletStatsContainer> }
      </div>
    );
  }
}

export default App;
