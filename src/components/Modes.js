import React from 'react';
import { Button, Col, Form, FormGroup, Label, Input, Row } from 'reactstrap';

import disco from '../lib/disco';
import Spinner from './Spinner';

export default class Modes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentMode: [],
            modes: ["Console", "Random", "Jukebox", "Mixed", "Playlist", "Play-Mixed"],
            selectedMode: null,
            playlists: [],
            selectedPlaylist: null,
            playlistsVisible: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        disco.getCurrentMode().then((mode) => {
            this.setState({
                currentMode: mode,
                selectedMode: mode,
                playlistsVisible: (mode === "Playlist" || mode === "Play-Mixed")
            });
        });
        disco.getAllPlaylists().then((playlists) => {
            this.setState({
                playlists: playlists
            })
        });
        this.interval = setInterval(() => this.refreshCurrentMode(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    refreshCurrentMode() {
        disco.getCurrentMode().then((mode) => {
            this.setState({
                currentMode: mode,
            });
        });
    }

    handleSubmit(event) {
        disco.setCurrentMode(this.state.selectedMode, this.state.selectedPlaylist);
        event.preventDefault();
    }

    updateModeSelection(event) {
        let selectedMode = event.target.value;
        let playlistsVisible = (selectedMode === "Playlist" || selectedMode === "Play-Mixed");
        this.setState({"playlistsVisible": playlistsVisible, "selectedMode": selectedMode});
    }

    updatePlaylistSelection(event) {
        this.setState({"selectedPlaylist": event.target.value});
    }

    render() {
        return (
            <Row>
                <Col>
                    { this.state.currentMode ? (
                        <React.Fragment>
                            <h1 className="mb-3">Current Mode: <strong>{this.state.currentMode}</strong></h1>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label for="mode"><h2>Change Mode</h2></Label>
                                    <Input 
                                        type="select" 
                                        name="mode" 
                                        id="mode" 
                                        value={this.state.selectedMode} 
                                        onChange={(e) => this.updateModeSelection(e)}
                                    >
                                    {
                                        this.state.modes.map((mode, i) =>
                                            <option value={mode} key={i}>{mode}</option>
                                        )
                                    }
                                    </Input>
                                </FormGroup>
                                { this.state.playlistsVisible && this.state.playlists && (
                                    <FormGroup>
                                        <Label for="playlist">Playlist name</Label>
                                        <Input 
                                            type="select" 
                                            name="playlist" 
                                            id="playlist" 
                                            value={this.state.selectedPlaylist} 
                                            onChange={(e) => this.updatePlaylistSelection(e)}
                                        >
                                        <option value="">-- choose --</option>
                                        {this.state.playlists.map((playlist, i) =>
                                            <option value={playlist.name} key={i}>{playlist.name}</option>
                                        )}
                                        </Input>
                                    </FormGroup>
                                )}
                                <Button type="submit">Change</Button>
                            </Form>
                        </React.Fragment>
                    ): (
                        <Spinner />
                    ) }
                </Col>
            </Row>
        );
    }
}
