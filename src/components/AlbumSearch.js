import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import disco from '../lib/disco';
import Album from './Album';
import Spinner from './Spinner';

export default class AlbumSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            artist: '',
            title: '',
            searchResults: null,
            searching: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        if (this.state.artist !== '' || this.state.title !== '') {
            this.setState({
                searching: true
            });
            disco.searchForAlbums(this.state.artist, this.state.title)
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

    render() {
        return (
            <div>
                <h1>Search for Albums</h1>
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
                    <div className="text-danger text-lg mt-3">
                        <p>No results found.</p>
                    </div>
                )}
                { this.state.searchResults && this.state.searchResults.length > 0 && (
                    <div className="mt-3">
                        <h2>Search Results</h2>
                        {this.state.searchResults.map((album, i) =>
                            <Album key={album.id} options={{sortable: false, addToPlaylist: true}} index={i} {...album} rowClassName="border-bottom py-1"/>	
                        )}
                    </div>
                )}
            </div>
        );
    }
}
  