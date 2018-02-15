import React, { Component } from 'react';
import { Button, Form, Header, Loader, Message, Table } from 'semantic-ui-react';

import disco from '../lib/disco'
import { Album } from './Album'

export default class AlbumSearch extends Component {
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
            disco.searchForAlbums(this.state.artist, this.state.title)
            .then(data => {
                // TODO weed out offline tracks
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
                <Header as="h1">Search for Albums</Header>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input id="form-input-control-artist" name="artist" value={this.state.artist} label="Artist" placeholder="Artist name" onChange={this.handleInputChange} />
                    <Form.Input id="form-input-control-title" name="title" value={this.state.title} label="Title" placeholder="Album title" onChange={this.handleInputChange} />
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
                    <Table basic compact unstackable striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Artist</Table.HeaderCell>
                                <Table.HeaderCell>Title</Table.HeaderCell>
                                <Table.HeaderCell>Duration</Table.HeaderCell>
                                <Table.HeaderCell singleLine>Track Count</Table.HeaderCell>
                                <Table.HeaderCell>Options</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.state.searchResults.map((album, i) =>
                            <Album key={`item-${i}`} options={{sortable: false, addToPlaylist: true}} index={i} {...album}/>	
                            )}
                        </Table.Body>
                    </Table>
                </div>
                ) : (
                    null
                )}
            </div>
        );
    }
}
  