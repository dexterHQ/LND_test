import React, { Component } from 'react';

import logo from './logo.svg';

import './App.css';

class App extends Component {
  state = {
    // response: '',
    info: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res =>
        this.setState({ channels: res.channels, address: res.address })
      )
      .catch(err => console.log(err));
  }

  callApi = async () => {
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
            <span className="sub">10000 Satoshis</span>
          </p>
          <p>Number of Active Channels <br/>
            <span className="sub">{this.state.channels}</span>
          </p>
        </div>
      </div>
    );
  }
}

export default App;
