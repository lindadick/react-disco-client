import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import disco from '../lib/disco';
import TrackList from './TrackList';
import Spinner from './Spinner';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

export default class TrackSearch extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            artist: '',
            title: '',
            searchResults: null,
            searching: false,
            allAdded: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        if (this.state.artist != '' || this.state.title != '') {
            this.setState({
                searching: true,
                allAdded: false
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
        this.setState({
            allAdded: true
        })
    }

    render() {
        return (
            <div>
                <h1>Search for Tracks</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="artist">Artist</Label>
                        <Input type="text" id="artist" value={this.state.artist} onChange={(e) => this.setState({artist: e.target.value})} />
                    </FormGroup>                    
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" id="title" value={this.state.title} onChange={(e) => this.setState({title: e.target.value})} />
                    </FormGroup>                    
                    <Button type="submit">Search</Button>	
                </Form>
                { this.state.searching && <Spinner /> }
                { this.state.searchResults && this.state.searchResults.length == 0 && (
                    <div className="text-danger text-lg">
                        <p>No results found.</p>
                    </div>
                )}
                { this.state.searchResults && this.state.searchResults.length > 0 && (
                    <div>
                        <h2>Search Results</h2>
                        <TrackList tracks={this.state.searchResults} options={{sortable: false, addToPlaylist: true, showLastPlayed: false, showDuration: true, showAlbumLink: true}} />
                        { this.state.allAdded ? (
                            <Button disabled>
                                <FontAwesomeIcon icon={faCheck} color="green" /> All tracks added to current playlist
                            </Button>
                        ) : (
                            <Button onClick={this.addAllToCurrentPlaylist.bind(this)}>
                                <FontAwesomeIcon icon={faPlus} /> Add all tracks to current playlist
                            </Button>
                        )}
                    </div>
                )}
            </div>
        );
    }
}