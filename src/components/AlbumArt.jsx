import React from 'react'
import { Link } from 'react-router-dom'
import { ART_URL } from 'discoConfig'
import { Modal, ModalBody } from 'reactstrap'

import PropTypes from 'prop-types'

export default class AlbumArt extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
        }

        this.toggleModal = this.toggleModal.bind(this)
    }

    toggleModal() {
        this.setState((prevState) => ({
            modal: !prevState.modal,
        }))
    }

    render() {
        const { id, displayModal, size, linkToAlbum } = this.props
        const { modal } = this.state

        const albumArtURL = `${ART_URL}/${id.toString().padStart(4, '0')}.png`
        let extraClassNames = ''
        if (size === 'large') {
            extraClassNames = 'large-cover'
        } else {
            extraClassNames = 'small-cover'
        }
        if (linkToAlbum) {
            return (
                <Link to={`/albumdetails/${id}`} title="View album details">
                    <img
                        src={albumArtURL}
                        alt=""
                        className={`${extraClassNames} img-thumbnail img-responsive img-fluid float-left mr-2`}
                    />
                </Link>
            )
        }
        if (displayModal) {
            return (
                <React.Fragment>
                    <Modal isOpen={modal} toggle={this.toggleModal}>
                        <ModalBody toggle={this.toggleModal}>
                            <img
                                src={albumArtURL}
                                alt=""
                                className="img-thumbnail img-responsive mx-auto d-block"
                            />
                        </ModalBody>
                    </Modal>
                    <img
                        onClick={this.toggleModal}
                        onKeyPress={this.toggleModal}
                        src={albumArtURL}
                        role="presentation"
                        alt=""
                        className={`${extraClassNames} img-thumbnail img-responsive img-fluid float-left mr-2`}
                    />
                </React.Fragment>
            )
        }
        return (
            <img
                src={albumArtURL}
                alt=""
                className={`${extraClassNames} img-thumbnail img-responsive img-fluid float-left mr-2`}
            />
        )
    }
}

AlbumArt.propTypes = {
    id: PropTypes.number.isRequired,
    displayModal: PropTypes.bool.isRequired,
    size: PropTypes.oneOf('large', 'small').isRequired,
    linkToAlbum: PropTypes.bool.isRequired,
}
