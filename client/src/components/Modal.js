import React, {Component} from 'react'
import { Button, Modal } from 'semantic-ui-react'

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

  afterClick() {
    const type = this.props.type;

    switch (type) {
      case 1: // create wallet
        return <Button positive icon='checkmark' labelPosition='right' content="Next" onClick={(event) => {
           this.close(); APIS.createWallet("thisismypassword").then(() => {
             this.props.update();
           });
         }} />;
        break;
        
      case 2: // open channel
        return <Button positive icon='checkmark' labelPosition='right' content="Next" onClick={(event) => {
            this.close(); APIS.openChannel('0292c50922a7d9876f45122e5179fdf391e0902b26a467a631170f5d55381e76a1','100000').then(() => {
              console.log("we have opened a channel");
            });
          }} />;
        break;

      case 3:
        return <Button positive icon='checkmark' labelPosition='right' content="Next" onClick={(event) => {
           this.close(); APIS.connectPeer(this.state.value).then(() => {
             console.log("we are connected to peer");
           });
         }} />;
        break;

      default:
        break;

    }
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
           {this.afterClick()}
         </Modal.Actions>
        </Modal>
      </div>
    );
  }

}



export default ModalLink
