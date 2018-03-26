import React, { Component } from 'react';
import { Button, Header, Modal, Image } from 'semantic-ui-react'

import './App.css';

class App extends Component {
  state = {
    peers: 0,
    address: '0x',
    balance: 0,
    invoice: '',
    channels: [],
    open: false
  };

  close = () => this.setState({ open: false })
  show  = () => this.setState({ open: true })

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


  render() {
    return (
      <div className="App">
        <header className="hero">
          <h1 className="hero--title">DEXTER</h1>
          <h3 className="hero--subtitle">Lightning Network Test</h3>
          <Button onClick={this.show}>Create a LN Node</Button>

          <Modal dimmer="blurring" open={this.state.open} onClose={this.close}>
           <Modal.Header>Welcome!</Modal.Header>
           <Modal.Content>
             <Modal.Description>
               <Header>Create a Node</Header>
               <p>In order to get started, make sure your LND instance is running in a terminal window. That's all you need to do for now!</p>
               <p>Next, enter a password. (Whats the security on this?)</p>
             </Modal.Description>
           </Modal.Content>
           <Modal.Actions>
             <Button color="green" positive icon='checkmark' labelPosition='right' content="Continue" onClick={this.close} />
           </Modal.Actions>
         </Modal>

        </header>
        {/* <div className="modal">
          <span>Address <input type="text" /></span>
          <span>Amount <input type="text" /></span>
          <button>SEND</button>
        </div> */}
        <div className="container--body">
          <p>Node Public Key <br/>
            <span className="sub">{this.state.address}</span>
          </p>
          <p>Node Balance <br/>
            <span className="sub">{this.state.balance} Satoshis</span>
          </p>
          <p>Peers ({this.state.peers})<br/>
            <span className="sub">No peers. Connect now!</span><br/>
          </p>
          <p>Open Channels<br/>
            {/* <span className="sub">{this.state.connections}</span><br/> */}
            <span className="sub">Test One</span><br/>
            <span className="sub">Test Two</span><br/>
            <span className="sub">Test Three</span><br/>
          </p>
          <p>Generate Invoice<br/>
            <span className="sub">Amount <input type="text" /></span>
            <button onClick={() => this.genInvoice(1000).then(res => this.setState({'invoice': res.req}))}>Submit</button>
            <span className="sub">{this.state.invoice}</span>
          </p>
        </div>
      </div>
    );
  }
}

export default App;
