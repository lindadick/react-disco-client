import React from 'react'
import { Button, Col, Row } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import moment from 'moment'
import PropTypes from 'prop-types'

import { ART_URL } from 'discoConfig'
import disco from '../lib/disco'
import AlbumArt from './AlbumArt'
import TrackList from './TrackList'
import Spinner from './Spinner'

// TODO: rewrite this component to work properly! Relying on routing doesn't work. Maybe combine with Album.jsx?
export default class AlbumDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            album: null,
        }
    }

    componentDidMount() {
        const { match } = this.props
        disco.getAlbumDetails(match.params.id).then((data) => this.setState({ album: data }))
    }

    addAllToCurrentPlaylist = () => {
        const { album } = this.state
        album.tracks.map((track) => {
            if (track.online) {
                disco.addTrackToCurrentPlaylist(track.album_id, track.track_id)
            }
            return true
        })
    }

    formatDuration = (duration) => {
        const formattedDuration = moment(duration, 'mm:ss').format('m:ss')
        if (formattedDuration === 'Invalid date') {
            // Moment doesn't like durations with more than 59 minutes.
            // Fall back to raw value.
            return duration
        }
        return duration
    }

    render() {
        const { album } = this.state
        return (
            <React.Fragment>
                {!album ? (
                    <Spinner />
                ) : (
                    <React.Fragment>
                        <Row className="mb-3">
                            {ART_URL && (
                                <Col xs="auto">
                                    <AlbumArt
                                        id={album.album_id}
                                        size="large"
                                        linkToAlbum={false}
                                        displayModal
                                    />
                                </Col>
                            )}
                            <Col>
                                <h1>
                                    {album.artist}
                                    <br />
                                    {album.title}
                                    <br />
                                    {this.formatDuration(album.duration)}
                                </h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {album.tracks.length > 0 ? (
                                    <React.Fragment>
                                        <TrackList
                                            tracks={album.tracks}
                                            options={{
                                                sortable: false,
                                                addToPlaylist: true,
                                                showLastPlayed: false,
                                                showDuration: true,
                                                showAlbumLink: false,
                                                showAlbumArt: false,
                                            }}
                                        />
                                        {album.allAdded ? (
                                            <Button disabled>
                                                <FontAwesomeIcon icon={faCheck} color="green" /> All
                                                tracks added to current playlist
                                            </Button>
                                        ) : (
                                            <Button onClick={() => this.addAllToCurrentPlaylist}>
                                                <FontAwesomeIcon icon={faPlus} /> Add all tracks to
                                                current playlist
                                            </Button>
                                        )}
                                    </React.Fragment>
                                ) : (
                                    <p>No tracks found.</p>
                                )}
                            </Col>
                        </Row>
                    </React.Fragment>
                )}
            </React.Fragment>
        )
    }
}

AlbumDetails.propTypes = {
    match: PropTypes.objectOf(PropTypes.string).isRequired,
}
