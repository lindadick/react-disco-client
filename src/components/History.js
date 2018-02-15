import React, { Component } from 'react';
import { Button, Grid, Header, Loader } from 'semantic-ui-react';

import disco from '../lib/disco';
import { TrackList } from './TrackList';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';

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
            <Container>
                <Header as="h1">History</Header>
                { this.state.history.length > 0 ? (                   
                <TrackList tracks={this.state.history} options={{sortable: false, addToPlaylist: true, showLastPlayed: true, showDuration: true}} />
                ): (
                <Loader active />
                ) }
            </Container>
        );
    }
}
