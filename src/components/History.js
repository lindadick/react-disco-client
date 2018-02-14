import React, { Component } from 'react';
import { Button, Grid, Header, Loader } from 'semantic-ui-react';

import disco from '../lib/disco';
import { TrackList } from './TrackList';

export default class History extends Component {
    constructor(props) {
        super(props);

        this.state = {
            history: []
        }

        this.options = {
            sortable: false, 
            addToPlaylist: true,
            showLastPlayed: true,
            showDuration: true
        }

    }

    onError(error){
        console.log(error);
    }

    componentDidMount() {
        disco.getPlaylistHistory()
        .then(data => this.setState({ 
            history: data.reverse()
        }));
    }

    render() {
        return (
            <Grid>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Header as="h1">History</Header>
                        { this.state.history.length > 0 ? (                   
                        <Grid>   
                            <TrackList tracks={this.state.history} options={this.options} />
                        </Grid>
                        ): (
                        <Loader active />
                        ) }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}
