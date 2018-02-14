import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Container, Grid, Menu, Header } from 'semantic-ui-react'

import disco from '../lib/disco';

import TrackSearch from './TrackSearch';
import AlbumSearch from './AlbumSearch';
import Playlists from './Playlists';
import History from './History';
import Admin from './Admin';
import NowPlaying from './NowPlaying';
import UpcomingPlaylist from './UpcomingPlaylist';

class AppMenu extends Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu stackable inverted>
                <Menu.Item href='/' name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>Current Playlist</Menu.Item>
                <Menu.Item href='#/search' name='search' active={activeItem === 'search'} onClick={this.handleItemClick}>Tracks</Menu.Item>
                <Menu.Item href='#/albums' name='albums' active={activeItem === 'albums'} onClick={this.handleItemClick}>Albums</Menu.Item>
                {/* <Menu.Item href='#/playlists' name='playlists' active={activeItem === 'playlists'} onClick={this.handleItemClick}>Playlists</Menu.Item> */}
                <Menu.Item href='#/history' name='history' active={activeItem === 'history'} onClick={this.handleItemClick}>History</Menu.Item>
                {/* <Menu.Item href='#/admin' name='admin' active={activeItem === 'admin'} onClick={this.handleItemClick}>Admin</Menu.Item> */}
            </Menu>
        )
    }
}

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTrack: null,
            currentPlaylist: [],
            upcomingPlaylist: []
        }
    }

    onError(error){
        console.log(error)
    }

    refreshData() {
        disco.getCurrentPlaylist()
        .then(data => this.updateStateIfNeeded(data));
    }

    updateStateIfNeeded(newData) {
        // Only update the state if it actually changed, to prevent unnecessary render calls
        if (newData == null) {
            this.state.currentPlaylist = [];
        } else if (!this.state.currentPlaylist || JSON.stringify(newData) !== JSON.stringify(this.state.currentPlaylist)) {
            this.setState({ 
                currentPlaylist: newData,
                currentTrack: newData[0],
                upcomingPlaylist: newData.slice(1)
            });            
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.refreshData(), 1000);                 
        this.refreshData();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <Container>
                <Header size="huge">Robinet Disco</Header>

                <AppMenu/>

                <NowPlaying currentTrack={this.state.currentTrack} />

                <Switch>
                    <Route exact path='/' component={() => (<UpcomingPlaylist upcomingPlaylist={this.state.upcomingPlaylist} />)}/> />
                    <Route path="/search" component={TrackSearch} />
                    <Route path="/albums" component={AlbumSearch} />
                    <Route path="/playlists" component={Playlists} />
                    <Route path="/history" component={History} />
                    <Route path="/admin" component={Admin} />
                </Switch>
            </Container>
        );
    }
}