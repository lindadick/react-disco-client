import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Row } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons/faCompactDisc'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import moment from 'moment'

import PropTypes from 'prop-types'

// eslint-disable-next-line import/no-unresolved
import { ART_URL } from 'discoConfig'
import disco from '../lib/disco'
import AlbumArt from './AlbumArt'

export default class Album extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            added: false,
        }
    }

    addToCurrentPlaylist = () => {
        const { album_id } = this.props
        this.setState({
            added: disco.addAlbumToCurrentPlaylist(album_id),
        })
    }

    render() {
        const { album_id, artist, duration, options, rowClassName, title, track_count } = this.props
        const { added } = this.state

        // Build menu options
        const buttons = []

        if (options.addToPlaylist) {
            if (added) {
                buttons.push({
                    tooltip: 'Added!',
                    icon: faCheck,
                    color: 'green',
                })
            } else {
                buttons.push({
                    onClick: this.addToCurrentPlaylist,
                    tooltip: 'Add album to playlist',
                    icon: faPlus,
                })
            }
        }

        let parsedDuration = moment(duration, 'mm:ss').format('m:ss')
        if (parsedDuration === 'Invalid date') {
            // Moment doesn't like durations with more than 59 minutes.
            // Fall back to raw value.
            parsedDuration = duration
        }

        return (
            <Row className={`no-gutters ${rowClassName}`}>
                {ART_URL && (
                    <Col xs="2" sm="1" className="pr-2">
                        <AlbumArt id={album_id} linkToAlbum={options.showAlbumLink} />
                    </Col>
                )}
                <Col className="pr-2">
                    {artist}
                    {' - '}
                    {title}
                    <ul className="list-inline font-italic text-muted">
                        <li className="list-inline-item">{duration}</li>
                        <li className="list-inline-item">
                            {track_count}
                            {' tracks'}
                        </li>
                    </ul>
                </Col>
                <Col xs="2" sm="2" className="ml-auto">
                    <Row noGutters>
                        {buttons.map((option) => (
                            <Col key={`buttoncol${album_id}`} className="p-1">
                                <Button
                                    type="button"
                                    className="btn-block"
                                    key={`button${album_id}`}
                                    id={`button${album_id}`}
                                    onClick={option.onClick}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title={option.tooltip}
                                >
                                    <FontAwesomeIcon
                                        key={`icon${album_id}`}
                                        icon={option.icon}
                                        color={option.color}
                                        onClick={option.onClick}
                                    />
                                </Button>
                            </Col>
                        ))}
                        {options.showAlbumLink && (
                            <Col key={`album_details${album_id}`} className="p-1">
                                <Link
                                    to={`/albumdetails/${album_id}`}
                                    className="btn btn-secondary btn-block"
                                    title="View album details"
                                >
                                    <FontAwesomeIcon icon={faCompactDisc} />
                                </Link>
                            </Col>
                        )}
                    </Row>
                </Col>
            </Row>
        )
    }
}

Album.propTypes = {
    album_id: PropTypes.number.isRequired,
    duration: PropTypes.string.isRequired,
    options: PropTypes.objectOf(PropTypes.string).isRequired,
    rowClassName: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    track_count: PropTypes.number.isRequired,
}
