import React, { Component } from 'react';
import { Button, Container, Grid, Header } from 'semantic-ui-react';

import disco from '../lib/disco';
import { Track } from './Track';

export default class History extends Component {
    constructor(props) {
        super(props);

        this.state = {
            history: []
        }

        this.options = {
            sortable: false, 
            addToPlaylist: true
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
                            {
                            // TODO use TrackList Component instead, once the History API includes all the required fields
                            }
                            <Grid>   
                            {this.state.history.map((track, i) =>
                                <Track key={`item-${i}`} options={this.options} online={"Y"} index={i} {...track}/>
                            // TODO: Remove "online=Y" once the API returns online status for history
                            )}
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}
