import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

import disco from '../lib/disco';
import { TrackList } from './TrackList';
import Spinner from './Spinner';

export default class AlbumDetails extends React.Component {
    componentDidMount() {
        let album_id = this.props.match.params.id
        disco.getAlbumDetails(album_id)
        .then(data => this.setState(data));
    }

    addAllToCurrentPlaylist = () => {
        this.state.tracks.map((track, i) => {
            if (track.online) {
                disco.addTrackToCurrentPlaylist(track.album_id, track.track_id);
            }
            return true;
        });
        this.setState({
            allAdded: true
        })
    }

    render() {
        return (
            <Row>
                <Col>
                    {!this.state? (
                        <Spinner />
                    ) : (
                        <React.Fragment>
                            <h1>
                                <span className="text-muted">Album Artist:</span> {this.state.artist}<br/>
                                <span className="text-muted">Album Title:</span> {this.state.title}<br/>
                                <span className="text-muted">Duration:</span> {this.state.duration}
                            </h1>
                            { this.state.tracks.length > 0 ? (                   
                                <React.Fragment>
                                    <TrackList tracks={this.state.tracks} options={{sortable: false, addToPlaylist: true, showLastPlayed: false, showDuration: true}} />
                                    { this.state.allAdded ? (
                                        <Button disabled>
                                            <FontAwesomeIcon icon={faCheck} color="green" /> All tracks added to current playlist
                                        </Button>
                                    ) : (
                                        <Button onClick={this.addAllToCurrentPlaylist.bind(this)}>
                                            <FontAwesomeIcon icon={faPlus} /> Add all tracks to current playlist
                                        </Button>
                                    )}
                                    </React.Fragment>
                            ): (
                                <p>No tracks found.</p>
                            ) }
                        </React.Fragment>
                    )}
                </Col>
            </Row>
        )
    }
}