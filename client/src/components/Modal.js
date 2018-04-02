import React, {Component} from 'react'
import { Header, Button, Modal } from 'semantic-ui-react'

import APIS from '../actions/api'



class ModalLink extends Component {

  state = {
    open: false,
  }

  close = () => this.setState({ open: false })
  show  = () => this.setState({ open: true })


  render() {
    return (
      <div>
        <Button onClick={this.show}>{this.props.title}</Button>
        <Modal dimmer="blurring" open={this.state.open} onClose={this.close}>
         <Modal.Header>Welcome to Dexter!</Modal.Header>
         <Modal.Content>
           <Modal.Description>
             <Header>Create a Node</Header>
             <p>In order to get started, make sure your LND instance is running in a terminal window. That's all you need to do for now!</p>
             <p>Next, enter a password. Since this a complete test and just a formality in getting a LN node set up, you dont have to worry about security. Just enter a password you dont care much about.</p>
             <input type="text" />
           </Modal.Description>
         </Modal.Content>
         <Modal.Actions>
           {/* so the update function runs no matter what but thats not really what were tryna do tbh */}
           <Button color="black" positive icon='checkmark' labelPosition='right' content="Next" onClick={(event) => {
              this.close(); APIS.createWallet('mikityg196').then(this.props.update); this.props.update();
            }} />
         </Modal.Actions>
        </Modal>
      </div>
    );
  }

}



export default ModalLink
