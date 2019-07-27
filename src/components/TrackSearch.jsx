import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import disco from '../lib/disco'
import TrackList from './TrackList'
import Spinner from './Spinner'

export default class TrackSearch extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            artist: '',
            title: '',
            searchResults: null,
            searching: false,
            allAdded: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        const { artist, title } = this.state
        if (artist !== '' || title !== '') {
            this.setState({
                searching: true,
                allAdded: false,
            })
            disco.searchForTracks(artist, title).then((data) => {
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

    addAllToCurrentPlaylist() {
        const { searchResults } = this.state
        searchResults.forEach((track) => {
            if (track.online) {
                disco.addTrackToCurrentPlaylist(track.album_id, track.track_id)
            }
        })
        this.setState({
            allAdded: true,
        })
    }

    render() {
        const { allAdded, artist, searching, searchResults, title } = this.state
        return (
            <div>
                <h1>Search for Tracks</h1>
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
                        <TrackList
                            tracks={searchResults}
                            options={{
                                sortable: false,
                                addToPlaylist: true,
                                showLastPlayed: false,
                                showDuration: true,
                                showAlbumLink: true,
                            }}
                        />
                        {allAdded ? (
                            <Button disabled>
                                <FontAwesomeIcon icon={faCheck} color="green" /> All tracks added to
                                current playlist
                            </Button>
                        ) : (
                            <Button onClick={() => this.addAllToCurrentPlaylist}>
                                <FontAwesomeIcon icon={faPlus} /> Add all tracks to current playlist
                            </Button>
                        )}
                    </div>
                )}
            </div>
        )
    }
}
