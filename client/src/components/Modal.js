import React, {Component} from 'react'
import { Header, Button, Modal } from 'semantic-ui-react'

import APIS from '../actions/api'



class ModalLink extends Component {

  state = {
    open: false,
    value: ""
  }

  close = () => this.setState({ open: false })
  show  = () => this.setState({ open: true })

  handleChange(event) {
    this.setState({value: event.target.value});
  }


  render() {
    return (
      <div>
        <Button onClick={this.show}>{this.props.title}</Button>
        <Modal dimmer="blurring" open={this.state.open} onClose={this.close}>
         <Modal.Header>{this.props.sub}</Modal.Header>
         <Modal.Content>
           <Modal.Description>
             <p>{this.props.body}</p>
             <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />
           </Modal.Description>
         </Modal.Content>
         <Modal.Actions>
           {/* so the update function runs no matter what but thats not really what were tryna do tbh */}
           {/* we could do an if else thing maybe for what function to run? */}
           <Button positive icon='checkmark' labelPosition='right' content="Next" onClick={(event) => {
              this.close(); APIS.connectPeer(this.state.value).then(() => {
                console.log("we are connected to peer");
              });
            }} />
           {/* <Button positive icon='checkmark' labelPosition='right' content="Next" onClick={(event) => {
              this.close(); APIS.createWallet(this.state.value).then(() => {
                this.props.update();
              });
            }} /> */}
         </Modal.Actions>
        </Modal>
      </div>
    );
  }

}



export default ModalLink
