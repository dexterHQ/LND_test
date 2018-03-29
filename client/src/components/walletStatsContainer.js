import React from 'react'
import { Button } from 'semantic-ui-react'

import ModalLink from './Modal'

const WalletStatsContainer = () => (

<div className="container--body">
  <p>Node Public Key <br/>
    <span className="sub">{this.props.address}</span>
  </p>
  <p>Node Balance <br/>
    <span className="sub">{this.props.balance} Satoshis</span>
  </p>
  <p>Peers ({this.state.peers})<br/>
    <span className="sub">No peers. Connect now!</span><br/>
    <ModalLink title="Connect to Peers"></ModalLink>
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

)

export default WalletStatsContainer
