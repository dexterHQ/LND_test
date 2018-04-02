import React from 'react'
import { Button } from 'semantic-ui-react'

import ModalLink from './Modal'

import APIS from '../actions/api'

const WalletStatsContainer = (props) => (

<div className="container--body">
  <p>Node Public Key <br/>
    <span className="sub">{props.address}</span>
  </p>
  <p>Node Balance <br/>
    <span className="sub">{props.balance} Satoshis</span>
  </p>
  <p>Peers ({props.peers})<br/>
    <span className="sub">No peers. Connect now!</span><br/>
  </p>
  <p>Open Channels<br/>
    <span className="sub">Test One</span><br/>
    <span className="sub">Test Two</span><br/>
    <span className="sub">Test Three</span><br/>
  </p>

</div>

)

export default WalletStatsContainer
