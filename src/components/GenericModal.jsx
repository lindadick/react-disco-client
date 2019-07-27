import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import PropTypes from 'prop-types'

export default class GenericModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
        }

        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.setState((prevState) => ({
            modal: !prevState.modal,
        }))
    }

    render() {
        const { modal } = this.state
        const { className, title, body } = this.props
        return (
            <React.Fragment>
                <Modal isOpen={modal} toggle={this.toggle} className={className}>
                    <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
                    <ModalBody>{body}</ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>
                            OK
                        </Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

GenericModal.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
}

GenericModal.defaultProps = {
    className: '',
}
