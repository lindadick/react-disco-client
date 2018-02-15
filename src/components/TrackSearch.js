import React, { Component } from 'react';
import { Button, Form, Header, Loader, Message, Segment } from 'semantic-ui-react';

import disco from '../lib/disco'
import { TrackList } from './TrackList'

export default class TrackSearch extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            artist: '',
            title: '',
            searchResults: null,
            searching: false
        };

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
            this.setState({
                searching: true
            });
            disco.searchForTracks(this.state.artist, this.state.title)
            .then(data => {
                this.setState({ 
                    searchResults: data,
                    searching: false
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
        return (
            <div>
                <Header as="h1">Search for Tracks</Header>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input id="form-input-control-artist" name="artist" value={this.state.artist} label="Artist" placeholder="Artist name" onChange={this.handleInputChange} />
                    <Form.Input id="form-input-control-title" name="title" value={this.state.title} label="Title" placeholder="Track title" onChange={this.handleInputChange} />
                    <Button type="submit" icon="search" content="Search" />	
                </Form>
                { this.state.searching ? (
                <Message>
                    <Loader active />
                    <p>Searching...</p>
                </Message>
                ) : (
                    null 
                )}
                { this.state.searchResults && this.state.searchResults.length == 0 ? (
                <Message negative>
                    <p>No results found.</p>
                </Message>
                ) : (
                    null 
                )}
                { this.state.searchResults && this.state.searchResults.length > 0 ? (
                <div>
                    <Header as="h2">Search Results</Header>
                    <TrackList tracks={this.state.searchResults} options={{sortable: false, addToPlaylist: true, showLastPlayed: false, showDuration: true}} />
                    <Button onClick={this.addAllToCurrentPlaylist.bind(this)} icon="add" content="Add all results to current playlist" />
                </div>
                ) : (
                    null
                )}
            </div>
        );
    }
}