import React from 'react'

import ModalLink from './Modal'


// params are what make up the modal
var channelParams = {
  type: 3,
  title: "Open a Channel",
  sub: "Enter a Channel",
  body: "opening a channel will allow us to transact back and forth. we need an address and an amount."
}

var peerParams = {
  type: 4,
  title: "Connect to Peer",
  sub: "Connecting to Peer",
  body: "Enter the Lightning address of the peer, in the format <pubkey>@host"
}





const WalletStatsContainer = (props) => {

  const peerList = props.peerList.map((peer,i) => {
    return (
      <span className="sub" key={i}>
        {peer} <br/>
      </span>
    )
  })

  return (
    <div className="container--body">
      <p>Node Public Key <br/>
        <span className="sub">{props.address}</span>
      </p>
      <p>Node Balance <br/>
        <span className="sub">{props.balance} Satoshis</span>
      </p>
      <p>Peers ({props.peers})<br/>
        {peerList}
        {props.peers == 0 && <span className="sub">No peers connected!</span>}
        <ModalLink {...peerParams} />
      </p>
      <p>Open Channels<br/>
        <span className="sub">No channels. Connect now!</span><br/>
        <ModalLink {...channelParams} />
      </p>
    </div>
  )

}

export default WalletStatsContainer;
