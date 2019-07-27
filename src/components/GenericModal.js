import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class GenericModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          title: this.props.title,
          body: this.props.body,
          type: this.props.type
        };
    
        this.toggle = this.toggle.bind(this);
      }
    
      toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
    
      render() {
        return (
          <React.Fragment>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
              <ModalBody>
                {this.props.body}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggle}>OK</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </React.Fragment>
        );
      }
}
