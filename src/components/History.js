import React, { Component } from 'react';
import moment from 'moment';
import { Col, Row } from 'reactstrap';

import disco from '../lib/disco';
import { TrackList } from './TrackList';
import Spinner from './Spinner';

export default class History extends Component {
    constructor(props) {
        super(props);

        this.state = {
            history: []
        }
    }

    componentDidMount() {
        disco.getPlaylistHistory()
        .then(data => this.setState({ 
            history: data.reverse()
        }));
    }

    render() {
        return (
            <Row>
                <Col>
                    <h1>History<br/><span className="text-muted small">{moment().format('LL')}</span></h1>
                    { this.state.history.length > 0 ? (                   
                        <TrackList tracks={this.state.history} options={{sortable: false, addToPlaylist: true, showLastPlayed: true, showDuration: true}} />
                    ): (
                        <Spinner />
                    ) }
                </Col>
            </Row>
        );
    }
}
