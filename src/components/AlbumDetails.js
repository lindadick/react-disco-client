import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import moment from 'moment';

import {ART_URL} from 'discoConfig';
import disco from '../lib/disco';
import TrackList from './TrackList';
import Spinner from './Spinner';

export default class AlbumDetails extends React.Component {
    componentDidMount() {
        let album_id = this.props.match.params.id
        disco.getAlbumDetails(album_id)
        .then(data => this.setState({album: data}));
    }

    addAllToCurrentPlaylist = () => {
        this.state.album.tracks.map((track, i) => {
            if (track.online) {
                disco.addTrackToCurrentPlaylist(track.album_id, track.track_id);
            }
            return true;
        });
        this.setState({
            allAdded: true
        })
    }

    formatDuration = (duration) => {
        let formattedDuration = moment(duration, "mm:ss").format("m:ss")
        if (formattedDuration === "Invalid date") {
            // Moment doesn't like durations with more than 59 minutes.
            // Fall back to raw value.
            return duration;
        }   
        return duration;
    }

    render() {
        return (
            <React.Fragment>
                {!this.state? (
                    <Spinner />
                ) : (
                    <React.Fragment>
                        <Row className="mb-3">
                            { ART_URL && 
                            <Col xs="auto">
                                <img src={disco.getAlbumArtURL(this.state.album.album_id)} alt="" className="large-cover img-responsive img-fluid float-left mr-2 img-thumbnail"/>
                            </Col>
                            }
                            <Col>
                                <h1>
                                    {this.state.album.artist}<br/>
                                    {this.state.album.title}<br/>
                                    {this.formatDuration(this.state.album.duration)}
                                </h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            { this.state.album.tracks.length > 0 ? (                   
                                <React.Fragment>
                                    <TrackList tracks={this.state.album.tracks} options={{sortable: false, addToPlaylist: true, showLastPlayed: false, showDuration: true, showAlbumLink: false, showAlbumArt: false}} />
                                    { this.state.album.allAdded ? (
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
                            </Col>
                        </Row>
                    </React.Fragment>
                )}
            </React.Fragment>
        )
    }
}