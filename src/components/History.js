import React, { Component } from 'react';
import { Button, Container, Grid, Header, Loader } from 'semantic-ui-react';

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
            showLastPlayed: true
        }

    }

    onError(error){
        console.log(error);
    }

    refreshData() {
        disco.getPlaylistHistory()
        .then(data => this.setState({ 
            history: data.reverse()
        }));
    }

    componentDidMount() {
        this.interval = setInterval(() => this.refreshData(), 50000);    
        this.refreshData();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <Container>
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
            </Container>
        );
    }
}
