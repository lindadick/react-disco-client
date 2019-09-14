import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'reactstrap'

export default class GenericAlert extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: true,
        }

        this.onDismiss = this.onDismiss.bind(this)
    }

    componentDidMount() {
        // this.timer = setTimeout(this.onDismiss, 7000)
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    onDismiss() {
        this.setState({ visible: false })
    }

    render() {
        const { messageText, messageType } = this.props
        const { visible } = this.state

        return (
            <Alert
                color={messageType}
                isOpen={visible}
                toggle={this.onDismiss}
                className="mx-auto w-50"
            >
                {messageText}
            </Alert>
        )
    }
}

GenericAlert.propTypes = {
    messageText: PropTypes.string.isRequired,
    messageType: PropTypes.string.isRequired,
}
