import React, { Component } from 'react';
import moment from 'moment';

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
            <div>
                <h1>History for {moment().format('LL')}</h1>
                { this.state.history.length > 0 ? (                   
                    <TrackList tracks={this.state.history} options={{sortable: false, addToPlaylist: true, showLastPlayed: true, showDuration: true}} />
                ): (
                    <Spinner />
                ) }
            </div>
        );
    }
}
