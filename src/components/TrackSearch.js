import React, { Component } from 'react';
import { Button, Container, Form, Grid, Header } from 'semantic-ui-react';

import disco from '../lib/disco'
import { Track } from './Track'

export default class TrackSearch extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            artist: '',
            title: '',
            searchResults: [],
        };

        this.searchOptions = {
            sortable: false, 
            addToPlaylist: true
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit(event) {
        if (this.state.artist != '' || this.state.title != '') {
            disco.searchForTracks(this.state.artist, this.state.title)
            .then(data => {
                // TODO weed out offline tracks
                this.setState({ 
                    searchResults: data
                });
            });
        } else {
            this.setState({ 
                searchResults: []
            });       
        }
        event.preventDefault();
    }

    addAllToCurrentPlaylist() {
        this.state.searchResults.map((track, i) => {
            if (track.online) {
                disco.addTrackToCurrentPlaylist(track.album_id, track.track_id);
            }
        });
    }

    render() {
        const searchResultsAvailable = this.state.searchResults.length > 0;

        return (
            <Container>
                <Grid>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <Header as="h1">Search for Tracks</Header>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Input id="form-input-control-artist" name="artist" value={this.state.artist} label="Artist" placeholder="Artist name" onChange={this.handleInputChange} />
                                <Form.Input id="form-input-control-title" name="title" value={this.state.title} label="Title" placeholder="Track title" onChange={this.handleInputChange} />
                                <Button type="submit" icon="search" content="Search" />	
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                    { searchResultsAvailable ? (
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <Header as="h2">Search Results</Header>
                            <Grid>
                                {this.state.searchResults.map((track, i) =>
                                    <Track key={`item-${i}`} options={this.searchOptions} index={i} {...track}/>	
                                )}
                            </Grid>
                            <Button onClick={this.addAllToCurrentPlaylist.bind(this)} icon="add" content="Add all results to current playlist" />
                        </Grid.Column>
                    </Grid.Row>
                    ) : null }
                </Grid>
            </Container>
        );
    }
}
  