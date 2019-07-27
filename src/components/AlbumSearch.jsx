import React from 'react'
import { Button, Col, Form, FormGroup, Label, Input, Row } from 'reactstrap'

import disco from '../lib/disco'
import Album from './Album'
import Spinner from './Spinner'

export default class AlbumSearch extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            artist: '',
            title: '',
            searchResults: null,
            searching: false,
        }
    }

    handleSubmit = (event) => {
        const { artist, title } = this.state
        if (artist !== '' || title !== '') {
            this.setState({
                searching: true,
            })
            disco.searchForAlbums(artist, title).then((data) => {
                this.setState({
                    searchResults: data,
                    searching: false,
                })
            })
        } else {
            this.setState({
                searchResults: [],
            })
        }
        event.preventDefault()
    }

    render() {
        const { artist, searching, searchResults, title } = this.state
        return (
            <Row className="mt-2">
                <Col>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="artist">Artist</Label>
                            <Input
                                type="text"
                                id="artist"
                                value={artist}
                                onChange={(e) => this.setState({ artist: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => this.setState({ title: e.target.value })}
                            />
                        </FormGroup>
                        <Button type="submit">Search</Button>
                    </Form>
                    {searching && <Spinner />}
                    {searchResults && searchResults.length === 0 && (
                        <div className="text-danger text-lg mt-3">
                            <p>No results found.</p>
                        </div>
                    )}
                    {searchResults && searchResults.length > 0 && (
                        <div className="mt-3">
                            <h2>Search Results</h2>
                            {searchResults.map((album, i) => (
                                <Album
                                    key={album.id}
                                    options={{
                                        sortable: false,
                                        addToPlaylist: true,
                                        showAlbumLink: true,
                                    }}
                                    index={i}
                                    {...album}
                                    rowClassName="border-bottom py-1"
                                />
                            ))}
                        </div>
                    )}
                </Col>
            </Row>
        )
    }
}
