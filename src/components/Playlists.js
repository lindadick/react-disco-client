import React, { Component } from 'react';
import { Button, Container, Form, Grid, Header } from 'semantic-ui-react';

import disco from '../lib/disco';
import { Playlist } from './Playlist'

export default class Playlists extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allPlaylists: []
        }
    }

    onError(error){
        console.log(error);
    }

    refreshData() {
        disco.getAllPlaylists()
        .then(data => this.setState({ 
            allPlaylists: data
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
                            <Header as="h1">Playlists</Header>
                            <Grid>
                            {this.state.allPlaylists.map((playlist, i) =>
                                <Playlist key={`item-${i}`} index={i} {...playlist}/>	
                            )}
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}
