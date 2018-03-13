import React, { Component } from 'react';

import './App.css';

class App extends Component {
  state = {
    peers: '0',
    address: '0x',
    balance: '0',
  };

  componentDidMount() {
    this.getInfo()
      .then(res =>
        this.setState({address: res.address, peers: res.peers })
      )
      .catch(err => console.log(err));

    this.getBalance()
      .then(res =>
        // console.log(res)
        this.setState({ balance: res.total_balance })
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

  render() {
    return (
      <div className="App">
        <header className="header">
          <h1 className="header--title">DEXTER</h1>
          <h3 className="header--subtitle">Lightning Network Test</h3>
        </header>
        <div className="modal">
          <span>Address <input type="text" /></span>
          <span>Amount <input type="text" /></span>
          <button>SEND</button>
        </div>
        <div className="container--body">
          <p>Node Public Key <br/>
            <span className="sub">{this.state.address}</span>
          </p>
          <p>Node Balance <br/>
            <span className="sub">{this.state.balance} Satoshis</span>
          </p>
          <p>Number of Peers <br/>
            <span className="sub">{this.state.peers}</span>
          </p>
        </div>
      </div>
    );
  }
}

export default App;
