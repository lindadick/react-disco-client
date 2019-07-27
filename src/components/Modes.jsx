import React from 'react'
import { Button, Col, Form, FormGroup, Label, Input, Row } from 'reactstrap'

import disco from '../lib/disco'
import Spinner from './Spinner'

export default class Modes extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentMode: [],
            modes: ['Console', 'Random', 'Jukebox', 'Mixed', 'Playlist', 'Play-Mixed'],
            selectedMode: null,
            playlists: [],
            selectedPlaylist: null,
            playlistsVisible: false,
        }
    }

    componentDidMount() {
        disco.getCurrentMode().then((mode) => {
            this.setState({
                currentMode: mode,
                selectedMode: mode,
                playlistsVisible: mode === 'Playlist' || mode === 'Play-Mixed',
            })
        })
        disco.getAllPlaylists().then((playlists) => {
            this.setState({
                playlists,
            })
        })
        this.interval = setInterval(() => this.refreshCurrentMode(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    refreshCurrentMode = () => {
        disco.getCurrentMode().then((mode) => {
            this.setState({
                currentMode: mode,
            })
        })
    }

    handleSubmit = (event) => {
        const { selectedMode, selectedPlaylist } = this.state
        disco.setCurrentMode(selectedMode, selectedPlaylist)
        event.preventDefault()
    }

    updateModeSelection = (event) => {
        const selectedMode = event.target.value
        const playlistsVisible = selectedMode === 'Playlist' || selectedMode === 'Play-Mixed'
        this.setState({ playlistsVisible, selectedMode })
    }

    updatePlaylistSelection = (event) => {
        this.setState({ selectedPlaylist: event.target.value })
    }

    render() {
        const {
            currentMode,
            selectedMode,
            modes,
            playlistsVisible,
            playlists,
            selectedPlaylist,
        } = this.state
        return (
            <Row>
                <Col>
                    {currentMode ? (
                        <React.Fragment>
                            <h1 className="mb-3">
                                Current Mode: <strong>{currentMode}</strong>
                            </h1>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label for="mode">
                                        <h2>Change Mode</h2>
                                    </Label>
                                    <Input
                                        type="select"
                                        name="mode"
                                        id="mode"
                                        value={selectedMode}
                                        onChange={(e) => this.updateModeSelection(e)}
                                    >
                                        {modes.map((mode) => (
                                            <option value={mode} key={mode}>
                                                {mode}
                                            </option>
                                        ))}
                                    </Input>
                                </FormGroup>
                                {playlistsVisible && playlists && (
                                    <FormGroup>
                                        <Label for="playlist">Playlist name</Label>
                                        <Input
                                            type="select"
                                            name="playlist"
                                            id="playlist"
                                            value={selectedPlaylist}
                                            onChange={(e) => this.updatePlaylistSelection(e)}
                                        >
                                            <option value="">-- choose --</option>
                                            {playlists.map((playlist) => (
                                                <option value={playlist.name} key={playlist.id}>
                                                    {playlist.name}
                                                </option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                )}
                                <Button type="submit">Change</Button>
                            </Form>
                        </React.Fragment>
                    ) : (
                        <Spinner />
                    )}
                </Col>
            </Row>
        )
    }
}
