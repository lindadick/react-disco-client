import React from 'react'
import { Button, Col, Row } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import PropTypes from 'prop-types'

import disco from '../lib/disco'

export default class Playlist extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            added: false,
        }
    }

    addToCurrentPlaylist = () => {
        const { name } = this.props
        this.setState({
            added: disco.addPlaylistToCurrentPlaylist(name),
        })
    }

    render() {
        // Build menu options
        const buttons = []
        const { added } = this.state
        const { rowClassName, name, id } = this.props

        if (added) {
            buttons.push({
                tooltip: 'Added!',
                icon: faCheck,
                color: 'green',
            })
        } else {
            buttons.push({
                onClick: this.addToCurrentPlaylist,
                tooltip: 'Add playlist to playlist',
                icon: faPlus,
            })
        }

        return (
            <Row className={rowClassName}>
                <Col xs="auto">{name}</Col>
                <Col xs="auto" md="2" className="ml-auto">
                    <Row noGutters>
                        {buttons.map((option) => (
                            <Col key={`buttoncol${id}`}>
                                <Button
                                    type="button"
                                    className="btn-block"
                                    key={`button${id}`}
                                    id={`button${id}`}
                                    onClick={option.onClick}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title={option.tooltip} // TODO use Bootstrap's fancy tooltips
                                >
                                    <FontAwesomeIcon
                                        key={`icon${id}`}
                                        icon={option.icon}
                                        color={option.color}
                                        onClick={option.onClick}
                                    />
                                </Button>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        )
    }
}

Playlist.propTypes = {
    id: PropTypes.number.isRequired,
    rowClassName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}
